import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { VideosRepository } from '../../../infrastucture/repository';
import { RemoveAllVideoCommand } from './remove-all-video.command';

@CommandHandler(RemoveAllVideoCommand)
export class RemoveAllVideoCommandHandler implements ICommandHandler<RemoveAllVideoCommand, void> {
  private logger = new Logger(RemoveAllVideoCommandHandler.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute(): Promise<void> {
    this.logger.log('Removing All Videos');
    await this.videosRepository.removeAll();
  }
}
