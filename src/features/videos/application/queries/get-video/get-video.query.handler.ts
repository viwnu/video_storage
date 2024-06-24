import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';

import { VideosRepository } from '../../../infrastucture/repository';
import { GetVideoQuery } from './';
import { VideoAgregate, VideoBuildResponse } from '../../../domain';

@QueryHandler(GetVideoQuery)
export class GetVideoQueryHandler implements IQueryHandler<GetVideoQuery, VideoBuildResponse> {
  private logger = new Logger(GetVideoQueryHandler.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute({ id }: GetVideoQuery): Promise<VideoBuildResponse> {
    this.logger.log(`Searching Video by id: ${id}`);
    const video = await this.videosRepository.findOne(id);
    if (!video) throw new NotFoundException('Video doesn`t exist');
    return VideoAgregate.buildVideoResponse(video);
  }
}
