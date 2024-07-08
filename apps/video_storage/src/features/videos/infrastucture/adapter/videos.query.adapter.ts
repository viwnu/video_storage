import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { VideosRepository } from '../repository';
import { OutboxMessageType } from '../../../../const';
import { VideoAgregate } from '../../domain';
import { Video } from '../../../../db/entities';
import { OutboxService } from '@app/providers/outbox/features/outbox/application';

@Injectable()
export class VideosQueryAdapter implements VideosRepository {
  logger = new Logger(VideosQueryAdapter.name);
  constructor(
    private readonly dataSource: DataSource,
    private readonly outboxService: OutboxService,
  ) {}
  async save(video: VideoAgregate): Promise<VideoAgregate> {
    const savedEntity = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Video)
      .values(video)
      .orUpdate(Object.keys(video), ['id'])
      .execute();
    return VideoAgregate.mapping({ ...video, ...savedEntity.raw[0], ...savedEntity.identifiers[0] });
  }
  async saveWithMessage(video: VideoAgregate, message: OutboxMessageType): Promise<VideoAgregate> {
    const savedEntity = await this.dataSource.transaction<Video>(async (manager: EntityManager): Promise<Video> => {
      const savedEntity = await manager.createQueryBuilder().insert().into(Video).values(video).orUpdate([]).execute();
      await this.outboxService.addMessage(manager, 'create-video', message);
      return { ...video, ...savedEntity.raw[0], ...savedEntity.identifiers[0] };
    });
    return VideoAgregate.mapping(savedEntity);
  }
  async findAllVideos(): Promise<VideoAgregate[]> {
    const allVideos = await this.dataSource.getRepository(Video).createQueryBuilder('video').getMany();
    return allVideos.map(VideoAgregate.mapping);
  }
  async findOne(id: string): Promise<VideoAgregate | null> {
    const video = await this.dataSource
      .getRepository(Video)
      .createQueryBuilder('video')
      .where('video.id = :id', { id })
      .getOne();
    return video ? VideoAgregate.mapping(video) : null;
  }
  delete(id: string): Promise<boolean> {
    return this.dataSource
      .getRepository(Video)
      .createQueryBuilder()
      .delete()
      .from(Video)
      .where('id = :id', { id })
      .execute()
      .then(({ affected }) => affected > 0);
  }
  async removeAll(): Promise<void> {
    await this.dataSource.getRepository(Video).createQueryBuilder().delete().execute();
    return;
  }
}
