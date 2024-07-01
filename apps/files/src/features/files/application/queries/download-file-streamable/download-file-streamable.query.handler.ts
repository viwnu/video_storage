import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger, StreamableFile } from '@nestjs/common';
import { DownloadFileStreamableQuery } from './download-file-streamable.query';
import { FilesService } from '../../files.service';

@QueryHandler(DownloadFileStreamableQuery)
export class DownloadFileStreamableQueryHandler implements IQueryHandler<DownloadFileStreamableQuery, StreamableFile> {
  private logger = new Logger(DownloadFileStreamableQueryHandler.name);
  constructor(private readonly filesService: FilesService) {}
  async execute({ fileId }: DownloadFileStreamableQuery): Promise<StreamableFile> {
    this.logger.log(`Downloading File with: ${fileId}`);
    return await this.filesService.downloadFileStreamable(fileId);
  }
}
