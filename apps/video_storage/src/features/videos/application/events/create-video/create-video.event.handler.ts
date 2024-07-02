import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { CreateVideoEvent } from './';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@EventsHandler(CreateVideoEvent)
export class CreateVideoEventHandler implements IEventHandler<CreateVideoEvent> {
  private logger = new Logger(CreateVideoEventHandler.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  filesAppBaseEndpoint = this.configService.get('FILES_APP_BASE_ENDPOINT');
  async handle({ videoId, title }: CreateVideoEvent): Promise<void> {
    this.logger.log(`Video with id: ${videoId} was created with title: ${title}`);
    const { data } = await firstValueFrom(
      this.httpService.post(this.filesAppBaseEndpoint, { title, fileId: videoId }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    console.log('event result: ', data);

    // Another way to do it:

    // this.httpService.post(this.filesAppBaseEndpoint, { title, fileId: videoId }).subscribe({
    //   next: (response) => {
    //     this.logger.log(response.data);
    //   },
    //   error: (error) => {
    //     this.logger.error(error.response.data);
    //   },
    //   complete: () => {
    //     this.logger.log('complete');
    //   },
    // });
  }
}
