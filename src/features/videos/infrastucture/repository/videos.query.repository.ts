import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Video } from '../../domain/entities';
import { VideoViewType } from '../../application/useCases/types';

@Injectable()
export class VideosQueryRepository {
  private logger = new Logger(VideosQueryRepository.name);
  constructor(@InjectRepository(Video) private videosRepository: Repository<Video>) {}

  async findAll(): Promise<VideoViewType[]> {
    this.logger.log(`Searching All Video`);
    return (await this.videosRepository.find()).map((video) => Video.buildVideoResponse(video));
  }

  async findOne(id: string): Promise<VideoViewType> {
    this.logger.log(`Searching Video by id: ${id}`);
    const video = await this.videosRepository.findOneBy({ id });
    if (!video) throw new NotFoundException('Video doesn`t exist');
    return Video.buildVideoResponse(video);
  }
}
