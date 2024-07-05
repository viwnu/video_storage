import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { CreateVideoCommand } from './';
import { VideoAgregate, VideoBuildResponse } from '../../../domain';
import { VideosRepository } from '../../../infrastucture/repository';
import { CreateVideoEvent } from '../../events/create-video';
import { OutboxMessageType } from '../../../../../const';

@CommandHandler(CreateVideoCommand)
export class CreateVideoCommandHandler implements ICommandHandler<CreateVideoCommand, VideoBuildResponse> {
  private logger = new Logger(CreateVideoCommandHandler.name);
  constructor(
    private readonly videosRepository: VideosRepository,
    private readonly eventBus: EventBus,
  ) {}
  async execute({ createVideoDto }: CreateVideoCommand): Promise<VideoBuildResponse> {
    this.logger.log(`Creating Video with: ${JSON.stringify(createVideoDto)}`);
    const newVideo = VideoAgregate.create(createVideoDto);
    newVideo.plainToInstance();
    const message: OutboxMessageType = { ...newVideo, fileId: newVideo.id };
    const video = await this.videosRepository.saveWithMessage(newVideo, message);
    await this.eventBus.publish<CreateVideoEvent>(new CreateVideoEvent(video.id, video.title));
    return VideoAgregate.buildVideoResponse(video);
  }
}
