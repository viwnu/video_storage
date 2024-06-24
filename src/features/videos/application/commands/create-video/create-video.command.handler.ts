import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { Video } from '../../../domain/entities';
import { VideosRepository } from '../../../infrastucture/repository';
import { VideoViewType } from '../types';
import { CreateVideoCommand } from './create-video.command';

@CommandHandler(CreateVideoCommand)
export class CreateVideoCommandHandler implements ICommandHandler<CreateVideoCommand, VideoViewType> {
  private logger = new Logger(CreateVideoCommandHandler.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute({ createVideoDto }: CreateVideoCommand): Promise<VideoViewType> {
    this.logger.log(`Creating Video with: ${JSON.stringify(createVideoDto)}`);
    const newVideo = Video.create(createVideoDto);
    newVideo.plainToInstance();
    const video = await this.videosRepository.save(newVideo);
    return Video.buildVideoResponse(video);
  }
}
