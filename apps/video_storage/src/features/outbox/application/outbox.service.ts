import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Outbox, Video } from '../../../db/entities';
import { OutboxRepository } from '../infrastucture/repository/outbox.repository';
import { ProducerService } from '@app/providers/kafka/producer';

enum outboxStatus {
  created = 'created',
  sent = 'sent',
  error = 'error',
}

@Injectable()
export class OutboxService {
  private logger = new Logger(OutboxService.name);
  constructor(
    private outboxRepository: OutboxRepository,
    private readonly producerService: ProducerService,
  ) {}

  async addMessage(manager: EntityManager, topic: string, payload: Video): Promise<void> {
    this.logger.log(`${this.addMessage.name} method`);
    const entityInstance = manager.create(Outbox, {
      topic,
      payload: JSON.stringify(payload),
      status: outboxStatus.created,
      videoId: payload.id,
    });
    await manager.save(entityInstance);
  }

  async findCreatedMessages(): Promise<Outbox[]> {
    this.logger.log(`${this.findCreatedMessages.name} method`);
    return this.outboxRepository.findCreatedMessages();
  }

  async sendMessage(message: Outbox): Promise<void> {
    this.logger.log(`${this.sendMessage.name} method with ${message.payload}`);
    await this.producerService.produce(message.topic, { value: message.payload });
  }

  async sendMessages(): Promise<void> {
    const unsendedMessages = await this.findCreatedMessages();
    for (const message of unsendedMessages) {
      await this.sendMessage(message);
      await this.outboxRepository.save({ ...message, status: outboxStatus.sent });
    }
  }
}
