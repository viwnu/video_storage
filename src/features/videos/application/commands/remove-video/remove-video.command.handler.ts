import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';

import { VideosRepository } from '../../../infrastucture/repository';
import { RemoveVideoCommand } from './remove-video.command';

@CommandHandler(RemoveVideoCommand)
export class RemoveVideoCommandHandler implements ICommandHandler<RemoveVideoCommand, void> {
  private logger = new Logger(RemoveVideoCommandHandler.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute({ id }: RemoveVideoCommand): Promise<void> {
    this.logger.log(`Removing Video with: ${id}`);
    const video = await this.videosRepository.findOne(id);
    if (!video) throw new NotFoundException('Video doesn`t exist');
    await this.videosRepository.remove(video.id);
  }
}
