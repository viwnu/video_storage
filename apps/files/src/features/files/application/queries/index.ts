import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';

import { DownloadFileQueryHandler } from './download-file';
import { DownloadFileStreamableQueryHandler } from './download-file-streamable';
import { GetFileUrlQueryHandler } from './get-file-url';

export const QUERIES_HANDLERS: Type<IQueryHandler>[] = [
  DownloadFileQueryHandler,
  DownloadFileStreamableQueryHandler,
  GetFileUrlQueryHandler,
];
