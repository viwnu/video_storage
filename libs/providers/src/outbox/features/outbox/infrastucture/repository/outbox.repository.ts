import { OutboxAgregate } from '../../domain';

export abstract class OutboxRepository {
  abstract findCreatedMessages(): Promise<OutboxAgregate[]>;
  abstract save(outbox: OutboxAgregate): Promise<OutboxAgregate>;
}
