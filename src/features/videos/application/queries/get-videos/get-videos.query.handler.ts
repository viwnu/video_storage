import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { VideosRepository } from '../../../infrastucture/repository';
import { GetVideosQuery } from './get-videos.query';

import { Video } from '../../../domain/entities/video.entity';
import { VideoViewType } from '../../commands/types';

@QueryHandler(GetVideosQuery)
export class GetVideosQueryHandler implements IQueryHandler<GetVideosQuery, VideoViewType[]> {
  private logger = new Logger(GetVideosQueryHandler.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute({}: GetVideosQuery): Promise<VideoViewType[]> {
    this.logger.log(`Searching All Video`);
    return (await this.videosRepository.findAll()).map((video) => Video.buildVideoResponse(video));
  }
}
