import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '@app/providers/kafka/consumer';
import { FileFasade } from '../application';

@Injectable()
export class FilesConsumer implements OnModuleInit {
  private logger = new Logger(FilesConsumer.name);
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly fileFasade: FileFasade,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topics: { topics: ['create-video'] },
      config: { groupId: 'files-consumer' },
      onMessage: async ({ value }) => {
        this.logger.log('Consumed file description: ', value.toString());
        const fileDescription = JSON.parse(value.toString());
        await this.fileFasade.commands.createFileDescription(fileDescription);
      },
    });
  }
}
