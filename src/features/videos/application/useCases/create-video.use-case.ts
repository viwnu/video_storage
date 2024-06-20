import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { Video } from '../../domain/entities';
import { VideosRepository } from '../../infrastucture/repository';
import { CreateVideoType, VideoViewType } from './types';

export class CreateVideoCommand {
  constructor(public createVideoDto: CreateVideoType) {} // Type
}

@CommandHandler(CreateVideoCommand)
export class CreateVideoUseCase implements ICommandHandler<CreateVideoCommand, VideoViewType> {
  private logger = new Logger(CreateVideoUseCase.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute({ createVideoDto }: CreateVideoCommand): Promise<VideoViewType> {
    const newVideo = Video.create(createVideoDto);
    const video = await this.videosRepository.save(newVideo);
    return Video.buildVideoResponse(video);
  }
}
