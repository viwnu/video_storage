import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Logger } from '@nestjs/common';

import { CreateFileDescriptionCommand } from './create-file-description.command';
import { FilesService } from '../../files.service';
import { IFileDescription } from '../../../domain';

@CommandHandler(CreateFileDescriptionCommand)
export class CreateFileDescriptionCommandHandler implements ICommandHandler<CreateFileDescriptionCommand, IFileDescription> {
  private logger = new Logger(CreateFileDescriptionCommandHandler.name);
  constructor(private readonly filesService: FilesService) {}
  async execute({ createFileDescriptionDto }: CreateFileDescriptionCommand): Promise<IFileDescription> {
    this.logger.log(`Creating File with: ${JSON.stringify(createFileDescriptionDto)}`);
    const existingFile = await this.filesService.getFileDescription(createFileDescriptionDto.fileId);
    if (existingFile) throw new BadRequestException('File already exists');
    return await this.filesService.createFileDescription(createFileDescriptionDto);
  }
}
