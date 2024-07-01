import { AdapterRepository } from '@app/core';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileMetaDataAgregate } from '../../domain';
import { FileMetaData } from '../../../../db/entities';
import { FileMetaDatasRepository } from '../repository';

@Injectable()
export class FileMetaDataAdaptor
  extends AdapterRepository<FileMetaDataAgregate, FileMetaData>
  implements FileMetaDatasRepository
{
  logger = new Logger(FileMetaDataAdaptor.name);
  constructor(@InjectRepository(FileMetaData) private fileMetaDatasRepository: Repository<FileMetaData>) {
    super(fileMetaDatasRepository);
  }
  mapping(entity: FileMetaDataAgregate): FileMetaDataAgregate {
    return FileMetaDataAgregate.mapping(entity);
  }

  async findOne(fileId: string): Promise<FileMetaDataAgregate> {
    return await this.findByOptions({ where: { fileId } });
  }
}
