import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { CreateVideoCommand } from './';
import { VideoBuildResponse } from '../../../domain';
import { VideosService } from '../../video.service';

@CommandHandler(CreateVideoCommand)
export class CreateVideoCommandHandler implements ICommandHandler<CreateVideoCommand, VideoBuildResponse> {
  private logger = new Logger(CreateVideoCommandHandler.name);
  constructor(private readonly videosService: VideosService) {}
  async execute({ createVideoDto }: CreateVideoCommand): Promise<VideoBuildResponse> {
    this.logger.log(`Creating Video with: ${JSON.stringify(createVideoDto)}`);
    return await this.videosService.createVideo(createVideoDto);
  }
}
