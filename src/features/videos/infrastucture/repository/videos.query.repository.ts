import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Video } from '../../domain/entities/video.entity';
import { VideoResponse } from '../../domain/entities/video.response.entity';

@Injectable()
export class VideosQueryRepository {
  constructor(@InjectRepository(Video) private videosRepository: Repository<Video>) {}

  async findAll(): Promise<VideoResponse[]> {
    return (await this.videosRepository.find()).map((video) => new VideoResponse(video));
  }

  async findOne(id: string): Promise<VideoResponse> {
    const candidate = await this.videosRepository.findOneBy({ id });
    if (!candidate) throw new NotFoundException('Video doesn`t exist');
    return new VideoResponse(candidate);
  }
}
