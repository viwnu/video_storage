import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { VideosRepository } from '../../../infrastucture/repository';
import { GetVideosQuery } from './';
import { VideoAgregate, VideoBuildResponse } from '../../../domain';

@QueryHandler(GetVideosQuery)
export class GetVideosQueryHandler implements IQueryHandler<GetVideosQuery, VideoBuildResponse[]> {
  private logger = new Logger(GetVideosQueryHandler.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute({}: GetVideosQuery): Promise<VideoBuildResponse[]> {
    this.logger.log(`Searching All Video`);
    const videos = await this.videosRepository.findAllVideos();
    return VideoAgregate.buildVideosResponse(videos);
  }
}
