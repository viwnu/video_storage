import { Logger } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';
import { IProducer } from './producer.interface';

export class KafkajsProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private logger = new Logger(KafkajsProducer.name);

  constructor(
    private readonly topic: string,
    broker: string,
  ) {
    this.kafka = new Kafka({ brokers: [broker] });
    this.producer = this.kafka.producer();
  }

  async produce(message: Message) {
    await this.producer.send({ topic: this.topic, messages: [message] });
  }

  async connect() {
    try {
      this.logger.log('Connecting to Kafka...');
      await this.producer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      await new Promise<void>((resolve) => setTimeout(resolve, 5000));
      await this.connect();
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
