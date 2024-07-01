import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { UploadFileCommand } from './upload-file.command';
import { FilesService } from '../../files.service';
import { IFileMetaData } from '../../../domain';

@CommandHandler(UploadFileCommand)
export class UploadFileCommandHandler implements ICommandHandler<UploadFileCommand, IFileMetaData> {
  private logger = new Logger(UploadFileCommandHandler.name);
  constructor(private readonly filesService: FilesService) {}
  async execute({ uploadFileDto }: UploadFileCommand): Promise<IFileMetaData> {
    this.logger.log(`Uploading File with: ${uploadFileDto.fileId} and ${uploadFileDto.file?.originalname}`);
    return await this.filesService.uploadFile(uploadFileDto);
  }
}
