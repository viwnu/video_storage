import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { KafkaModule } from './kafka/kafka.module';
import { ConsumerService } from './kafka/consumer';
import { ProducerService } from './kafka/producer';
import { OutboxModule } from './outbox/features/outbox/outbox.module';
import { OutboxService } from './outbox/features/outbox/application';

@Module({
  imports: [KafkaModule, OutboxModule],
  providers: [ProvidersService, ProducerService, ConsumerService, OutboxService],
  exports: [ProvidersService, ProducerService, ConsumerService, OutboxService],
})
export class ProvidersModule {}
