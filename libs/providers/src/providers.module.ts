import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { ConsumerService } from './kafka/consumer';
import { ProducerService } from './kafka/producer';

@Module({
  imports: [KafkaModule],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class ProvidersModule {}
