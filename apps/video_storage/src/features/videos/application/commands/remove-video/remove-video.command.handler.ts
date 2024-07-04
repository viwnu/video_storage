import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { RemoveVideoCommand } from './';
import { VideosService } from '../../video.service';

@CommandHandler(RemoveVideoCommand)
export class RemoveVideoCommandHandler implements ICommandHandler<RemoveVideoCommand, void> {
  private logger = new Logger(RemoveVideoCommandHandler.name);
  constructor(private readonly videoService: VideosService) {}
  async execute({ id }: RemoveVideoCommand): Promise<void> {
    this.logger.log(`Removing Video with: ${id}`);
    await this.videoService.removeOneVideo(id);
  }
}
