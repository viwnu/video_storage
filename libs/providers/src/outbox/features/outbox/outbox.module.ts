import { Module } from '@nestjs/common';

import { OutboxService } from './application';
import { OutboxController } from './api';
import { OutboxRepository } from './infrastucture/repository';
import { OutboxAdapter } from './infrastucture/adapter';
import { ScheduleModule } from '@nestjs/schedule';
import { KafkaModule } from '../../../kafka/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outbox } from '../../db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Outbox]), KafkaModule, ScheduleModule.forRoot()],
  providers: [OutboxService, { provide: OutboxRepository, useClass: OutboxAdapter }],
  exports: [OutboxService, OutboxRepository],
  controllers: [OutboxController],
})
export class OutboxModule {}
