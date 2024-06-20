import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';

import { VideosRepository } from '../../infrastucture/repository';

export class RemoveVideoCommand {
  constructor(public id: string) {}
}

@CommandHandler(RemoveVideoCommand)
export class RemoveVideoUseCase implements ICommandHandler<RemoveVideoCommand, void> {
  private logger = new Logger(RemoveVideoUseCase.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute({ id }: RemoveVideoCommand): Promise<void> {
    this.logger.log('Removing Video');
    const video = await this.videosRepository.findOne(id);
    if (!video) throw new NotFoundException('Video doesn`t exist');
    await this.videosRepository.remove(video.id);
  }
}
