import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '@app/providers/kafka/consumer';
import { FileFasade } from '../application';

@Injectable()
export class FilesConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly fileFasade: FileFasade,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topics: { topics: ['create-video'] },
      config: { groupId: 'files-consumer' },
      onMessage: async ({ value }) => {
        const fileDescription = JSON.parse(value.toString());
        console.log('consumed file description: ', fileDescription);
        const descriptionCreatingResult = await this.fileFasade.commands.createFileDescription(fileDescription);
        console.log('and created file description: ', descriptionCreatingResult);
      },
    });
  }
}
