import { Logger } from '@nestjs/common';
import { OutboxRepository } from '../repository/outbox.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Outbox } from '../../../../db/entities';
import { Repository } from 'typeorm';
import { outboxStatus } from '../../../../const';

export class OutboxAdapter implements OutboxRepository {
  private logger = new Logger(OutboxAdapter.name);
  constructor(@InjectRepository(Outbox) private outboxRepository: Repository<Outbox>) {}
  findCreatedMessages(): Promise<Outbox[]> {
    return this.outboxRepository.find({ where: { status: outboxStatus.created } });
  }

  save(outbox: Outbox): Promise<Outbox> {
    return this.outboxRepository.save(outbox);
  }
}
