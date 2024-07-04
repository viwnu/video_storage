import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OutboxService } from './application';
import { Outbox } from '../../db/entities';
import { OutboxController } from './api';
import { OutboxRepository } from './infrastucture/repository/outbox.repository';
import { OutboxAdapter } from './infrastucture/adapter/outbox.adapter';
import { ProvidersModule } from '@app/providers';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Outbox]), ProvidersModule, ScheduleModule.forRoot()],
  providers: [OutboxService, { provide: OutboxRepository, useClass: OutboxAdapter }],
  exports: [OutboxService],
  controllers: [OutboxController],
})
export class OutboxModule {}
