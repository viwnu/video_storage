import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAllFilesCommand } from './delete-all-files.command';
import { Logger } from '@nestjs/common';
import { FilesService } from '../../files.service';

@CommandHandler(DeleteAllFilesCommand)
export class DeleteAllFilesCommandHandler implements ICommandHandler<DeleteAllFilesCommand, void> {
  private readonly logger = new Logger(DeleteAllFilesCommandHandler.name);
  constructor(private readonly fileService: FilesService) {}
  async execute(): Promise<void> {
    this.logger.log(`Deleting All Files`);
    return await this.fileService.deleteAllFiles();
  }
}
