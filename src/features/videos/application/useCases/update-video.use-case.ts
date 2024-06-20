import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';

import { VideosRepository } from '../../infrastucture/repository';
import { UpdateVideoInputModel } from '../../api/models/input';

export class UpdateVideoCommand {
  constructor(
    public id: string,
    public updateVideoDto: UpdateVideoInputModel,
  ) {}
}

@CommandHandler(UpdateVideoCommand)
export class UpdateVideoUseCase implements ICommandHandler<UpdateVideoCommand, void> {
  private logger = new Logger(UpdateVideoUseCase.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute({ id, updateVideoDto }: UpdateVideoCommand): Promise<void> {
    this.logger.log(`Updating Video with: ${id} and: ${JSON.stringify(updateVideoDto)}`);
    const video = await this.videosRepository.findOne(id);
    if (!video) throw new NotFoundException('Video doesn`t exist');
    video.update(updateVideoDto);
    await this.videosRepository.save(video);
  }
}
