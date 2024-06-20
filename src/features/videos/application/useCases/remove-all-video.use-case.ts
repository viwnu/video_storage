import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { VideosRepository } from '../../infrastucture/repository';

export class RemoveAllVideoCommand {
  constructor() {}
}

@CommandHandler(RemoveAllVideoCommand)
export class RemoveAllVideoUseCase implements ICommandHandler<RemoveAllVideoCommand, void> {
  private logger = new Logger(RemoveAllVideoUseCase.name);
  constructor(private readonly videosRepository: VideosRepository) {}
  async execute(): Promise<void> {
    this.logger.log('Removing All Videos');
    await this.videosRepository.removeAll();
  }
}
