import { AdapterRepository } from '@app/core';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileAgregate } from '../../domain/file.agregate';
import { File } from '../../../../db/entities';
import { FilesRepository } from '../repository/files.repository';

@Injectable()
export class FilesAdaptor extends AdapterRepository<FileAgregate, File> implements FilesRepository {
  mapping(entity: FileAgregate): FileAgregate {
    return FileAgregate.mapping(entity);
  }
  logger = new Logger(FilesAdaptor.name);
  constructor(@InjectRepository(File) private filesRepository: Repository<File>) {
    super(filesRepository);
  }
}
