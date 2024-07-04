import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { VideosRepository } from '../repository';
import { Video } from '../../../../db/entities';
import { VideoAgregate } from '../../domain';
import { AdapterRepository } from '@app/core';
import { Outbox } from 'apps/video_storage/src/db/entities/outbox.entity';

enum outboxStatus {
  created = 'created',
  sent = 'sent',
  error = 'error',
}

@Injectable()
export class VideosAdapter extends AdapterRepository<VideoAgregate, Video> implements VideosRepository {
  logger = new Logger(VideosAdapter.name);
  constructor(
    @InjectRepository(Video) private videosRepository: Repository<Video>,
    @InjectRepository(Outbox) private outBoxRepository: Repository<Outbox>,
    private readonly dataSource: DataSource,
  ) {
    super(videosRepository);
  }
  mapping(entity: VideoAgregate | Video): VideoAgregate {
    return VideoAgregate.mapping(entity);
  }

  async saveWithTransaction(entity: VideoAgregate): Promise<VideoAgregate> {
    const createdEntity = this.videosRepository.create(entity);
    const savedEntity = await this.dataSource.transaction<Video>(async (manager: EntityManager): Promise<Video> => {
      const savedEntity = await manager.save(createdEntity);
      const createdOutBoxEntity = this.outBoxRepository.create({
        payload: JSON.stringify(savedEntity),
        status: outboxStatus.created,
      });
      await manager.save(createdOutBoxEntity);
      return savedEntity;
    });
    return this.mapping(savedEntity);
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
