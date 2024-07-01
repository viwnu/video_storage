import { randomUUID } from 'crypto';
import { IsByteLength, IsOptional, IsString, IsUUID, validateSync } from 'class-validator';
import { Logger } from '@nestjs/common';

import { IFileDescription } from '.';

export class FileDescriptionAgregate implements IFileDescription {
  logger = new Logger(FileDescriptionAgregate.name);

  @IsUUID()
  id: string;

  @IsUUID()
  fileId: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 40)
  title: string;
  static create(_fileDescription: Partial<IFileDescription>): FileDescriptionAgregate {
    const fileDescription = new FileDescriptionAgregate();
    fileDescription.id = randomUUID();
    fileDescription.fileId = _fileDescription.fileId;
    fileDescription.title = _fileDescription.title;

    const error = validateSync(fileDescription);
    if (!!error.length) {
      error.forEach((e) => fileDescription.logger.error(e.constraints));
      throw new Error('Video not valid');
    }
    return fileDescription;
  }

  static mapping(_fileDescription: Partial<IFileDescription>): FileDescriptionAgregate {
    const fileDescription = new FileDescriptionAgregate();
    fileDescription.id = _fileDescription.id;
    fileDescription.fileId = _fileDescription.fileId;
    fileDescription.title = _fileDescription.title;

    const error = validateSync(fileDescription);
    if (!!error.length) {
      error.forEach((e) => fileDescription.logger.error(e.constraints));
      throw new Error('Video not valid');
    }
    return fileDescription;
  }

  static buildFileDescriptionResponse(fileDescription: FileDescriptionAgregate): IFileDescription {
    return {
      id: fileDescription.id,
      fileId: fileDescription.fileId,
      title: fileDescription.title,
    };
  }

  plainToInstance(): void {
    validateSync(this, { whitelist: true });
  }
}
