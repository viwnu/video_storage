import { randomUUID } from 'crypto';
import { IsByteLength, IsNumber, IsOptional, IsString, IsUUID, validateSync } from 'class-validator';
import { Logger } from '@nestjs/common';

import { IFileMetaData } from './file-meta-data.interface';

export class FileMetaDataAgregate implements IFileMetaData {
  logger = new Logger(FileMetaDataAgregate.name);

  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 40)
  label: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 1000)
  url: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 100)
  type: string;

  @IsOptional()
  @IsNumber()
  size: number;

  @IsOptional()
  @IsUUID()
  fileId: string;

  static create(_fileMetaData: Partial<IFileMetaData>): FileMetaDataAgregate {
    const fileMetaData = new FileMetaDataAgregate();
    fileMetaData.id = randomUUID();
    fileMetaData.label = _fileMetaData.label;
    fileMetaData.url = _fileMetaData.url;
    fileMetaData.type = _fileMetaData.type;
    fileMetaData.size = _fileMetaData.size;
    fileMetaData.fileId = _fileMetaData.fileId;

    const error = validateSync(fileMetaData);
    if (!!error.length) {
      error.forEach((e) => fileMetaData.logger.error(e.constraints));
      throw new Error('MetaData is not valid');
    }
    return fileMetaData;
  }

  static mapping(_fileMetaData: Partial<IFileMetaData>): FileMetaDataAgregate {
    const fileMetaData = new FileMetaDataAgregate();
    fileMetaData.id = _fileMetaData.id;
    fileMetaData.label = _fileMetaData.label;
    fileMetaData.url = _fileMetaData.url;
    fileMetaData.type = _fileMetaData.type;
    fileMetaData.size = _fileMetaData.size;
    fileMetaData.fileId = _fileMetaData.fileId;

    const error = validateSync(fileMetaData);
    if (!!error.length) {
      error.forEach((e) => fileMetaData.logger.error(e.constraints));
      throw new Error('MetaData is not valid');
    }
    return fileMetaData;
  }

  static buildFileMetaDataResponse(fileMetaData: FileMetaDataAgregate): IFileMetaData {
    return {
      id: fileMetaData.id,
      label: fileMetaData.label,
      url: fileMetaData.url,
      type: fileMetaData.type,
      size: fileMetaData.size,
      fileId: fileMetaData.fileId,
    };
  }

  plainToInstance(): void {
    validateSync(this, { whitelist: true });
  }
}
