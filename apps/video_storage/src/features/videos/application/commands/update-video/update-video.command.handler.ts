import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { UpdateVideoCommand } from './';
import { VideosService } from '../../video.service';

@CommandHandler(UpdateVideoCommand)
export class UpdateVideoCommandHandler implements ICommandHandler<UpdateVideoCommand, void> {
  private logger = new Logger(UpdateVideoCommandHandler.name);
  constructor(private readonly videoService: VideosService) {}
  async execute({ id, updateVideoDto }: UpdateVideoCommand): Promise<void> {
    this.logger.log(`Updating Video with: ${id} and: ${JSON.stringify(updateVideoDto)}`);
    await this.videoService.updateVideo(id, updateVideoDto);
  }
}
