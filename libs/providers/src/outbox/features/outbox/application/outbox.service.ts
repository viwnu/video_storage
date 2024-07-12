import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { Outbox } from '../../../db/entities';
import { OutboxRepository } from '../infrastucture/repository';
import { ProducerService } from '../../../../kafka/producer';
import { OutboxAgregate } from '../domain';
import { Cron } from '@nestjs/schedule';

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

  async addMessage(manager: EntityManager, topic: string, payload: any): Promise<void> {
    this.logger.log(`${this.addMessage.name} method`);
    const message = OutboxAgregate.create({
      topic,
      payload: JSON.stringify(payload),
      status: outboxStatus.created,
      // entityId: payload.id,
    });
    await manager.save(manager.create(Outbox, message));
  }

  async findCreatedMessages(): Promise<OutboxAgregate[]> {
    // this.logger.log(`${this.findCreatedMessages.name} method`);
    return this.outboxRepository.findCreatedMessages();
  }

  async sendMessage(message: OutboxAgregate): Promise<void> {
    this.logger.log(`${this.sendMessage.name} method with ${message.payload}`);
    await this.producerService.produce(message.topic, { value: message.payload });
    const sendedMessage = OutboxAgregate.mapping({ ...message, status: outboxStatus.sent });
    sendedMessage.plainToInstance();
    await this.outboxRepository.save(sendedMessage);
  }

  async sendMessages(): Promise<void> {
    const unsendedMessages = await this.findCreatedMessages();
    unsendedMessages.forEach(async (message) => await this.sendMessage(message));
  }

  @Cron('*/5 * * * * *')
  async sendOutboxMessages(): Promise<void> {
    // this.logger.log(`${this.sendOutboxMessages.name} method`);
    await this.sendMessages();
  }
}
