import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { AdapterRepository } from '@app/core';
import { VideosRepository } from '../repository';
import { Video } from '../../../../db/entities';
import { VideoAgregate } from '../../domain';
import { OutboxService } from '../../../outbox/application';

@Injectable()
export class VideosAdapter extends AdapterRepository<VideoAgregate, Video> implements VideosRepository {
  logger = new Logger(VideosAdapter.name);
  constructor(
    @InjectRepository(Video) private videosRepository: Repository<Video>,
    private readonly dataSource: DataSource,
    private readonly outboxService: OutboxService,
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
      await this.outboxService.addMessage(manager, 'create-video', savedEntity);
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
