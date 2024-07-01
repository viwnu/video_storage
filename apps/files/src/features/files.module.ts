import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';

import { FileMetaData } from '../db/entities';
import { FilesService } from './files/application/files.service';

import { COMMAND_HANDLERS } from './files/application/commands';
import { FilesController } from './files/api';
import { FileFasade, fileFasadeFactory } from './files/application';
import { FileDescriptionsRepository } from './files/infrastucture/repository/file-descriptions.repository';
import { FileDescriptionsAdaptor } from './files/infrastucture/adapter/file-descriptions.adaptor';
import { SharedModule } from '@app/shared';
import { FileDescription } from '../db/entities/file-description.entity';
import { FileMetaDatasRepository } from './files/infrastucture/repository';
import { FileMetaDataAdaptor } from './files/infrastucture/adapter/file-metadata.adaptor';
import { QUERIES_HANDLERS } from './files/application/queries';

@Module({
  imports: [TypeOrmModule.forFeature([FileDescription, FileMetaData]), CqrsModule, SharedModule],
  exports: [FilesService],
  controllers: [FilesController],
  providers: [
    FilesService,
    { provide: FileFasade, inject: [CommandBus, EventBus, QueryBus], useFactory: fileFasadeFactory },
    ...COMMAND_HANDLERS,
    ...QUERIES_HANDLERS,
    { provide: FileDescriptionsRepository, useClass: FileDescriptionsAdaptor },
    { provide: FileMetaDatasRepository, useClass: FileMetaDataAdaptor },
  ],
})
export class FilesModule {}
