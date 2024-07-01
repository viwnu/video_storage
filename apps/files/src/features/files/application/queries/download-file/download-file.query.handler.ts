import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { DownloadFileQuery } from './download-file.query';
import { FilesService } from '../../files.service';
import { IDownloadFileResponse } from '../../../domain';

@QueryHandler(DownloadFileQuery)
export class DownloadFileQueryHandler implements IQueryHandler<DownloadFileQuery, IDownloadFileResponse> {
  private logger = new Logger(DownloadFileQueryHandler.name);
  constructor(private readonly filesService: FilesService) {}
  async execute({ fileId }: DownloadFileQuery): Promise<IDownloadFileResponse> {
    this.logger.log(`Downloading File with: ${fileId}`);
    return await this.filesService.downloadFile(fileId);
  }
}
