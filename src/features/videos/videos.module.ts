import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideosService } from './application';
import { VideosController } from './api';
import { Video } from './domain/entities';
import { VideosRepository, VideosQueryRepository } from './infrastucture/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  exports: [VideosService],
  controllers: [VideosController],
  providers: [VideosService, VideosRepository, VideosQueryRepository],
})
export class VideosModule {}
