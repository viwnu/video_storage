import { randomUUID } from 'crypto';
import { IsByteLength, IsNumber, IsOptional, IsString, IsUUID, validateSync } from 'class-validator';
import { Logger } from '@nestjs/common';

import { IFile } from './file.interface';

export class FileAgregate implements IFile {
  logger = new Logger(FileAgregate.name);

  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 40)
  label: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 100)
  url: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 20)
  type: string;

  @IsOptional()
  @IsNumber()
  size: number;
  static create(_file: Partial<IFile>): FileAgregate {
    const file = new FileAgregate();
    file.id = randomUUID();
    file.label = _file.label;
    file.url = _file.url;
    file.type = _file.type;
    file.size = _file.size;

    const error = validateSync(file);
    if (!!error.length) {
      error.forEach((e) => file.logger.error(e.constraints));
      throw new Error('File not valid');
    }
    return file;
  }

  static mapping(_file: Partial<IFile>): FileAgregate {
    const file = new FileAgregate();
    file.id = _file.id;
    file.label = _file.label;
    file.url = _file.url;
    file.type = _file.type;
    file.size = _file.size;

    const error = validateSync(file);
    if (!!error.length) {
      error.forEach((e) => file.logger.error(e.constraints));
      throw new Error('File not valid');
    }
    return file;
  }

  static buildFileResponse(file: FileAgregate): IFile {
    return {
      id: file.id,
      label: file.label,
      url: file.url,
      type: file.type,
      size: file.size,
    };
  }

  plainToInstance(): void {
    validateSync(this, { whitelist: true });
  }
}
