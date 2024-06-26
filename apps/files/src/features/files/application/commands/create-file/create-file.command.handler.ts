import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { CreateFileCommand } from './create-file.command';
import { FilesRepository } from '../../../infrastucture/repository/files.repository';
import { FileAgregate } from '../../../domain';

@CommandHandler(CreateFileCommand)
export class CreateFileCommandHandler implements ICommandHandler<CreateFileCommand> {
  private logger = new Logger(CreateFileCommandHandler.name);
  constructor(private readonly filesRepository: FilesRepository) {}
  async execute({ createFileDto }: CreateFileCommand): Promise<any> {
    this.logger.log(`Creating File with: ${JSON.stringify(createFileDto)}`);
    const newFile = FileAgregate.create(createFileDto);
    newFile.plainToInstance();
    const file = await this.filesRepository.save(newFile);
    return FileAgregate.buildFileResponse(file);
  }
}
