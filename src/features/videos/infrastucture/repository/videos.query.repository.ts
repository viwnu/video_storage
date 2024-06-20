import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Video } from '../../domain/entities';
import { VideoViewType } from '../../application/useCases/types';

@Injectable()
export class VideosQueryRepository {
  constructor(@InjectRepository(Video) private videosRepository: Repository<Video>) {}

  async findAll(): Promise<VideoViewType[]> {
    return (await this.videosRepository.find()).map((video) => Video.buildVideoResponse(video));
  }

  async findOne(id: string): Promise<VideoViewType> {
    const video = await this.videosRepository.findOneBy({ id });
    if (!video) throw new NotFoundException('Video doesn`t exist');
    return Video.buildVideoResponse(video);
  }
}
