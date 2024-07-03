import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { KafkaModule } from './kafka/kafka.module';
import { ConsumerService } from './kafka/consumer';
import { ProducerService } from './kafka/producer';

@Module({
  imports: [KafkaModule],
  providers: [ProvidersService, ProducerService, ConsumerService],
  exports: [ProvidersService, ProducerService, ConsumerService],
})
export class ProvidersModule {}
