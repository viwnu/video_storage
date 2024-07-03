import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer';
import { ProducerService } from './producer';

@Module({
  imports: [],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
