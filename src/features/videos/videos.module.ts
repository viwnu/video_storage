import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { VideosService } from './application';
import { VideosController, VideosTestingController } from './api';
import { Video } from './domain/entities';
import { VideosRepository, VideosQueryRepository } from './infrastucture/repository';
import { CreateVideoUseCase, RemoveAllVideoUseCase, RemoveVideoUseCase, UpdateVideoUseCase } from './application/useCases';

const useCases = [CreateVideoUseCase, UpdateVideoUseCase, RemoveVideoUseCase, RemoveAllVideoUseCase];
@Module({
  imports: [TypeOrmModule.forFeature([Video]), CqrsModule],
  exports: [VideosService],
  controllers: [VideosController, VideosTestingController],
  providers: [VideosService, VideosRepository, VideosQueryRepository, ...useCases],
})
export class VideosModule {}
