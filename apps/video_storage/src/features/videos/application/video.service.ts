import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import { VideoAgregate } from '../domain';
import { VideosRepository } from '../infrastucture/repository';
import { CreateVideoEvent } from './events/create-video';
import { CreateVideoType } from './commands/create-video';
import { UpdateVideoType } from './commands/update-video';
import { OutboxMessageType } from 'apps/video_storage/src/const';

@Injectable()
export class VideosService {
  private logger = new Logger(VideosService.name);
  constructor(
    private videosRepository: VideosRepository,
    private readonly eventBus: EventBus,
  ) {}

  async createVideo(createVideoDto: CreateVideoType) {
    this.logger.log(`In ${this.createVideo.name} handler with: ${JSON.stringify(createVideoDto)}`);
    const newVideo = VideoAgregate.create(createVideoDto);
    newVideo.plainToInstance();
    const message: OutboxMessageType = { ...newVideo, fileId: newVideo.id };
    const video = await this.videosRepository.saveWithMessage(newVideo, message);
    await this.eventBus.publish<CreateVideoEvent>(new CreateVideoEvent(video.id, video.title)); // Events dosesnt need anymore
    return VideoAgregate.buildVideoResponse(video);
  }

  async removeAll() {
    this.logger.log(`In ${this.removeAll.name} handler`);
    await this.videosRepository.removeAll();
  }

  async removeOneVideo(id: string): Promise<void> {
    this.logger.log(`In ${this.removeOneVideo.name} handler with: ${id}`);
    const video = await this.videosRepository.findOne(id);
    if (!video) throw new NotFoundException('Video doesn`t exist');
    await this.videosRepository.delete(video.id);
  }

  async updateVideo(id: string, updateVideoDto: UpdateVideoType) {
    this.logger.log(`In ${this.updateVideo.name} handler with: ${id} and ${JSON.stringify(updateVideoDto)}`);
    const video = await this.videosRepository.findOne(id);
    if (!video) throw new NotFoundException('Video doesn`t exist');
    video.update(updateVideoDto);
    video.plainToInstance();
    await this.videosRepository.save(video);
  }
}
