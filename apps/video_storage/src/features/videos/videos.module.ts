import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { VideosService } from './application';
import { VideosController, VideosTestingController } from './api/rest';
import { Video } from '../../db/entities';
import { VideosRepository } from './infrastucture/repository';
import { COMMAND_HANDLERS } from './application/commands';
import { QUERIES_HANDLERS } from './application/queries';
import { EVENTS_HANDLERS } from './application/events';
import { VideoFasade } from './application/video.fasade';
import { videoFasadeFactory } from './application/video.fasade.factory';
import { VideosQueryAdapter } from './infrastucture/adapter';
import { OutboxModule } from '@app/providers/outbox/features/outbox/outbox.module';
import { ProducerService } from '@app/providers/kafka/producer';
import { Outbox } from '@app/providers/outbox/db/entities';
import { VideosResolver } from './api/graphql';
import { gqlErrorHandler } from '@app/common/handlers/gql-error.handler';
import { KafkaModule } from '@app/providers/kafka/kafka.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video, Outbox]),
    CqrsModule,
    HttpModule.register({ timeout: 5000 }),
    KafkaModule,
    OutboxModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/video_storage/src/features/videos/api/graphql/schema.gql'),
      formatError: gqlErrorHandler,
    }),
  ],
  exports: [VideosService],
  controllers: [VideosController, VideosTestingController],
  providers: [
    VideosService,
    ...COMMAND_HANDLERS,
    ...QUERIES_HANDLERS,
    ...EVENTS_HANDLERS,
    { provide: VideoFasade, inject: [CommandBus, EventBus, QueryBus], useFactory: videoFasadeFactory },
    { provide: VideosRepository, useClass: VideosQueryAdapter },
    ProducerService,
    VideosResolver,
  ],
})
export class VideosModule {}
