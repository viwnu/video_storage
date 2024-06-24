import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';

import { VideosRepository } from '../../../infrastucture/repository';
import { GetVideoQuery } from './get-video.query';
import { Video } from '../../../domain/entities/video.entity';
import { VideoViewType } from '../../commands/types';

@QueryHandler(GetVideoQuery)
export class GetVideoQueryHandler implements IQueryHandler<GetVideoQuery, VideoViewType> {
  private logger = new Logger(GetVideoQueryHandler.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute({ id }: GetVideoQuery): Promise<VideoViewType> {
    this.logger.log(`Searching Video by id: ${id}`);
    const video = await this.videosRepository.findOne(id);
    if (!video) throw new NotFoundException('Video doesn`t exist');
    return Video.buildVideoResponse(video);
  }
}
