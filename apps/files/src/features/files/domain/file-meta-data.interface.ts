import { StreamableFile } from '@nestjs/common';

export interface IFileMetaData {
  id: string;
  label: string;
  url: string;
  type: string;
  size: number;
  fileId: string;
}

export interface IDownloadFileResponse {
  fileName: string;
  file: Buffer;
  type: string;
}

export interface IDownloadFileStreamResponse {
  fileName: string;
  fileStream: StreamableFile;
  type: string;
}
