import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Video } from '../../domain/entities/video.entity';

@Injectable()
export class VideosRepository {
  private logger = new Logger(VideosRepository.name);
  constructor(@InjectRepository(Video) private videosRepository: Repository<Video>) {}

  async save(video: Video): Promise<Video> {
    this.logger.log(`Save Video with: ${JSON.stringify(video)}`);
    return await this.videosRepository.save(video);
  }

  async findAll(): Promise<Video[]> {
    this.logger.log(`Searching All Video`);
    return await this.videosRepository.find();
  }

  async findOne(id: string): Promise<Video | null> {
    this.logger.log(`Searching Video by id: ${id}`);
    const candidate = await this.videosRepository.findOneBy({ id });
    if (!candidate) return null;
    return candidate;
  }

  async remove(id: string): Promise<boolean> {
    this.logger.log(`Removing Video by id: ${id}`);
    const deleteResult = await this.videosRepository.delete({ id });
    if (deleteResult.affected === 0) return false;
    return true;
  }

  async removeAll(): Promise<void> {
    this.logger.log(`Removing all Video}`);
    await this.videosRepository.delete({});
  }
}
