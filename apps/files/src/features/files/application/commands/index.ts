import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { CreateFileDescriptionCommandHandler } from './create-file-description/create-file-description.command.handler';
import { UploadFileCommandHandler } from './upload-file';
import { DeleteFileCommandHandler } from './delete-file';
import { DeleteAllFilesCommandHandler } from './delete-all-files';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [
  CreateFileDescriptionCommandHandler,
  UploadFileCommandHandler,
  DeleteFileCommandHandler,
  DeleteAllFilesCommandHandler,
];
