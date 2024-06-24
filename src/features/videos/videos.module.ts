import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';

import { VideosService } from './application';
import { VideosController, VideosTestingController } from './api';
import { Video } from '../../db/entities';
import { VideosRepository } from './infrastucture/repository';
import { COMMAND_HANDLERS } from './application/commands';
import { QUERIES_HANDLERS } from './application/queries';
import { VideoFasade } from './application/video.fasade';
import { videoFasadeFactory } from './application/video.fasade.factory';
import { VideosAdapter } from './infrastucture/adapter';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), CqrsModule],
  exports: [VideosService],
  controllers: [VideosController, VideosTestingController],
  providers: [
    VideosService,
    ...COMMAND_HANDLERS,
    ...QUERIES_HANDLERS,
    { provide: VideoFasade, inject: [CommandBus, EventBus, QueryBus], useFactory: videoFasadeFactory },
    { provide: VideosRepository, useClass: VideosAdapter },
  ],
})
export class VideosModule {}
