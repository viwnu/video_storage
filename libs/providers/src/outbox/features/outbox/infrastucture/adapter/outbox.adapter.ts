import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OutboxRepository } from '../repository';
import { Outbox } from '../../../../db/entities';
import { outboxStatus } from '../../../../const';
import { AdapterRepository } from '@app/core';
import { OutboxAgregate } from '../../domain';

@Injectable()
export class OutboxAdapter extends AdapterRepository<OutboxAgregate, Outbox> implements OutboxRepository {
  logger = new Logger(OutboxAdapter.name);
  constructor(@InjectRepository(Outbox) private outboxRepository: Repository<Outbox>) {
    super(outboxRepository);
  }

  async findCreatedMessages(): Promise<OutboxAgregate[]> {
    // this.logger.log(`${this.findCreatedMessages.name} method`);
    const raw = await this.outboxRepository.find({ where: { status: outboxStatus.created }, loadRelationIds: true });
    return raw.map((message) => this.mapping(message));
  }

  mapping(entity: Outbox | OutboxAgregate): OutboxAgregate {
    return OutboxAgregate.mapping(entity);
  }
}
