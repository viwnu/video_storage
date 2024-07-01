import { AdapterRepository } from '@app/core';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FileDescriptionsRepository } from '../repository/file-descriptions.repository';
import { FileDescriptionAgregate } from '../../domain';
import { FileDescription } from '../../../../db/entities';

@Injectable()
export class FileDescriptionsAdaptor
  extends AdapterRepository<FileDescriptionAgregate, FileDescription>
  implements FileDescriptionsRepository
{
  logger = new Logger(FileDescriptionsAdaptor.name);
  constructor(@InjectRepository(FileDescription) private fileDescriptionsRepository: Repository<FileDescription>) {
    super(fileDescriptionsRepository);
  }
  mapping(entity: FileDescriptionAgregate): FileDescriptionAgregate {
    return FileDescriptionAgregate.mapping(entity);
  }

  async findOne(fileId: string): Promise<FileDescriptionAgregate> {
    return await this.findByOptions({ where: { fileId } });
  }

  async delete(fileId: string): Promise<boolean> {
    const deleted = await this.deleteByOptions({ fileId });
    if (!deleted) throw new InternalServerErrorException('Culd not delete');
    return true;
  }

  async deleteAll(): Promise<boolean> {
    const deleted = await this.deleteByOptions({});
    if (!deleted) throw new InternalServerErrorException('Culd not delete');
    return true;
  }
}
