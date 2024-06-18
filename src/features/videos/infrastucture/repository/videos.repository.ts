import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Video } from '../../domain/entities/video.entity';

@Injectable()
export class VideosRepository {
  constructor(@InjectRepository(Video) private videosRepository: Repository<Video>) {}

  async save(video: Video): Promise<Video> {
    return await this.videosRepository.save(video);
  }

  async findAll(): Promise<Video[]> {
    return await this.videosRepository.find();
  }

  async findOne(id: string): Promise<Video | null> {
    const candidate = await this.videosRepository.findOneBy({ id });
    if (!candidate) return null;
    return candidate;
  }

  async remove(id: string): Promise<boolean> {
    const deleteResult = await this.videosRepository.delete({ id });
    if (deleteResult.affected === 0) return false;
    return true;
  }

  async removeAll(): Promise<void> {
    await this.videosRepository.delete({});
  }
}
