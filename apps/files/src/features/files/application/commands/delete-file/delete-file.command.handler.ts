import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFileCommand } from './delete-file.command';
import { Logger } from '@nestjs/common';
import { FilesService } from '../../files.service';

@CommandHandler(DeleteFileCommand)
export class DeleteFileCommandHandler implements ICommandHandler<DeleteFileCommand, void> {
  private readonly logger = new Logger(DeleteFileCommandHandler.name);
  constructor(private readonly filesService: FilesService) {}
  async execute({ fileId }: DeleteFileCommand): Promise<void> {
    this.logger.log(`Deleting File with: ${fileId}`);
    return await this.filesService.deleteFile(fileId);
  }
}
