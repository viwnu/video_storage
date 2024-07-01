import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import {
  CreateFileDescriptionCommand,
  CreateFileDescriptionCommandHandler,
  CreateFileDescriptionType,
} from './commands/create-file-description';
import { UploadFileCommand, UploadFileCommandHandler, UploadFileType } from './commands/upload-file';
import { IFileDescription, IFileMetaData } from '../domain';
import { DownloadFileQuery, DownloadFileQueryHandler } from './queries/download-file';
import { DownloadFileStreamableQuery, DownloadFileStreamableQueryHandler } from './queries/download-file-streamable';
import { GetFileUrlQuery, GetFileUrlQueryHandler } from './queries/get-file-url';
import { DeleteFileCommand, DeleteFileCommandHandler } from './commands/delete-file';
import { DeleteAllFilesCommand, DeleteAllFilesCommandHandler } from './commands/delete-all-files';

export class FileFasade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
  ) {}
  commands = {
    createFileDescription: (dto: CreateFileDescriptionType): Promise<IFileDescription> => this.createFileDescription(dto),
    uploadFile: (dto: UploadFileType): Promise<IFileMetaData> => this.uploadFile(dto),
    deleteFile: (fileId: string) => this.deleteFile(fileId),
    deleteAllFiles: () => this.deleteAllFiles(),
  };
  events = {};
  queries = {
    downloadFile: (fileId: string) => this.downloadFile(fileId),
    downloadFileStreamable: (fileId: string) => this.downloadFileStreamable(fileId),
    getFileUrl: (fileId: string) => this.getFileUrl(fileId),
  };

  private async createFileDescription(dto: CreateFileDescriptionType): Promise<IFileDescription> {
    return this.commandBus.execute<
      CreateFileDescriptionCommand,
      Awaited<ReturnType<CreateFileDescriptionCommandHandler['execute']>>
    >(new CreateFileDescriptionCommand(dto));
  }

  private async uploadFile(dto: UploadFileType): Promise<IFileMetaData> {
    return this.commandBus.execute<UploadFileCommand, Awaited<ReturnType<UploadFileCommandHandler['execute']>>>(
      new UploadFileCommand(dto),
    );
  }

  private async downloadFile(fileId: string) {
    return this.queryBus.execute<DownloadFileQuery, Awaited<ReturnType<DownloadFileQueryHandler['execute']>>>(
      new DownloadFileQuery(fileId),
    );
  }

  private async downloadFileStreamable(fileId: string) {
    return this.queryBus.execute<
      DownloadFileStreamableQuery,
      Awaited<ReturnType<DownloadFileStreamableQueryHandler['execute']>>
    >(new DownloadFileStreamableQuery(fileId));
  }

  private async getFileUrl(fileId: string) {
    return this.queryBus.execute<GetFileUrlQuery, Awaited<ReturnType<GetFileUrlQueryHandler['execute']>>>(
      new GetFileUrlQuery(fileId),
    );
  }

  private async deleteFile(fileId: string) {
    return this.commandBus.execute<DeleteFileCommand, Awaited<ReturnType<DeleteFileCommandHandler['execute']>>>(
      new DeleteFileCommand(fileId),
    );
  }

  private async deleteAllFiles() {
    return this.commandBus.execute<DeleteAllFilesCommand, Awaited<ReturnType<DeleteAllFilesCommandHandler['execute']>>>(
      new DeleteAllFilesCommand(),
    );
  }
}
