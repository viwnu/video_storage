import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { CreateVideoCommand } from './';
import { VideoAgregate, VideoBuildResponse } from '../../../domain';
import { VideosRepository } from '../../../infrastucture/repository';

@CommandHandler(CreateVideoCommand)
export class CreateVideoCommandHandler implements ICommandHandler<CreateVideoCommand, VideoBuildResponse> {
  private logger = new Logger(CreateVideoCommandHandler.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute({ createVideoDto }: CreateVideoCommand): Promise<VideoBuildResponse> {
    this.logger.log(`Creating Video with: ${JSON.stringify(createVideoDto)}`);
    const newVideo = VideoAgregate.create(createVideoDto);
    newVideo.plainToInstance();
    const video = await this.videosRepository.save(newVideo);
    return VideoAgregate.buildVideoResponse(video);
  }
}
