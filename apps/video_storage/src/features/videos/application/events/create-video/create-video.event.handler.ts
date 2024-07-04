import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreateVideoEvent } from './';
import { ProducerService } from '@app/providers/kafka/producer';

@EventsHandler(CreateVideoEvent)
export class CreateVideoEventHandler implements IEventHandler<CreateVideoEvent> {
  private logger = new Logger(CreateVideoEventHandler.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly producerService: ProducerService,
  ) {}
  filesAppBaseEndpoint = this.configService.get('FILES_APP_BASE_ENDPOINT');
  async handle({ videoId, title }: CreateVideoEvent): Promise<void> {
    this.logger.log(`Video with id: ${videoId} was created with title: ${title}`);

    // Do it with kafka:
    await this.producerService.produce('create-video', { value: JSON.stringify({ title, fileId: videoId }) });
  }
}
