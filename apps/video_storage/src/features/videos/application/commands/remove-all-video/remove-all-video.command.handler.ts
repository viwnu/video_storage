import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { RemoveAllVideoCommand } from './';
import { VideosService } from '../../video.service';

@CommandHandler(RemoveAllVideoCommand)
export class RemoveAllVideoCommandHandler implements ICommandHandler<RemoveAllVideoCommand, void> {
  private logger = new Logger(RemoveAllVideoCommandHandler.name);
  constructor(private readonly videoService: VideosService) {}
  async execute(): Promise<void> {
    this.logger.log('Removing All Videos');
    await this.videoService.removeAll();
  }
}
