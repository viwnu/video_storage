import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { VideosService } from './application';
import { VideosController, VideosTestingController } from './api';
import { Video } from './domain/entities';
import { VideosRepository } from './infrastucture/repository';
import {
  CreateVideoCommandHandler,
  RemoveAllVideoCommandHandler,
  RemoveVideoCommandHandler,
  UpdateVideoCommandHandler,
} from './application/commands';
import { GetVideoQueryHandler } from './application/queries/get-video/get-video.query.handler';
import { GetVideosQueryHandler } from './application/queries/get-videos/get-videos.query.handler';

const commandHadnlers = [
  CreateVideoCommandHandler,
  UpdateVideoCommandHandler,
  RemoveVideoCommandHandler,
  RemoveAllVideoCommandHandler,
];

const queryHandlers = [GetVideoQueryHandler, GetVideosQueryHandler];
@Module({
  imports: [TypeOrmModule.forFeature([Video]), CqrsModule],
  exports: [VideosService],
  controllers: [VideosController, VideosTestingController],
  providers: [VideosService, VideosRepository, ...commandHadnlers, ...queryHandlers],
})
export class VideosModule {}
