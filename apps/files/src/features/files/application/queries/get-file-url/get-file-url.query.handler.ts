import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GetFileUrlQuery } from './get-file-url.query';
import { FilesService } from '../../files.service';

@QueryHandler(GetFileUrlQuery)
export class GetFileUrlQueryHandler implements IQueryHandler<GetFileUrlQuery, string> {
  private logger = new Logger(GetFileUrlQueryHandler.name);
  constructor(private readonly filesService: FilesService) {}
  async execute({ fileId }: GetFileUrlQuery): Promise<string> {
    this.logger.log(`Searching File by id: ${fileId}`);
    const fileUrl = await this.filesService.getFileUrl(fileId);
    return fileUrl;
  }
}
