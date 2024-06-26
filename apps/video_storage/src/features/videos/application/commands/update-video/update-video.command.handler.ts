import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';

import { UpdateVideoCommand } from './';
import { VideosRepository } from '../../../infrastucture/repository';

@CommandHandler(UpdateVideoCommand)
export class UpdateVideoCommandHandler implements ICommandHandler<UpdateVideoCommand, void> {
  private logger = new Logger(UpdateVideoCommandHandler.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute({ id, updateVideoDto }: UpdateVideoCommand): Promise<void> {
    this.logger.log(`Updating Video with: ${id} and: ${JSON.stringify(updateVideoDto)}`);
    const video = await this.videosRepository.findOne(id);
    if (!video) throw new NotFoundException('Video doesn`t exist');
    video.update(updateVideoDto);
    video.plainToInstance();
    await this.videosRepository.save(video);
  }
}
