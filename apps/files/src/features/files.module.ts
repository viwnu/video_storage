import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';

import { File } from '../db/entities';
import { FilesService } from './files/application/files.service';

import { COMMAND_HANDLERS } from './files/application/commands';
import { FilesController } from './files/api';
import { FileFasade, fileFasadeFactory } from './files/application';
import { FilesRepository } from './files/infrastucture/repository/files.repository';
import { FilesAdaptor } from './files/infrastucture/adapter/files.adaptor';

@Module({
  imports: [TypeOrmModule.forFeature([File]), CqrsModule],
  exports: [FilesService],
  controllers: [FilesController],
  providers: [
    FilesService,
    { provide: FileFasade, inject: [CommandBus, EventBus, QueryBus], useFactory: fileFasadeFactory },
    ...COMMAND_HANDLERS,
    { provide: FilesRepository, useClass: FilesAdaptor },
  ],
})
export class FilesModule {}
