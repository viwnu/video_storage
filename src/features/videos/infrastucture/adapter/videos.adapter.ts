import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VideosRepository } from '../repository';
import { Video } from '../../../../db/entities';
import { VideoAgregate } from '../../domain';
import { AdapterRepository } from '@app/core';

@Injectable()
export class VideosAdapter extends AdapterRepository<VideoAgregate, Video> implements VideosRepository {
  logger = new Logger(VideosAdapter.name);
  constructor(@InjectRepository(Video) private videosRepository: Repository<Video>) {
    super(videosRepository);
  }
  mapping(entity: VideoAgregate): VideoAgregate {
    return VideoAgregate.mapping(entity);
  }
  async findOne(id: string): Promise<VideoAgregate> {
    return await this.findByOptions({ where: { id } });
  }
  async findAllVideos(): Promise<VideoAgregate[]> {
    const [allVideos] = await this.findAll();
    return allVideos;
  }
  async removeAll(): Promise<void> {
    await this.videosRepository.clear();
  }
}
