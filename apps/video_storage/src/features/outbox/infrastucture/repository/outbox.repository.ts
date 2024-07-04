import { Outbox } from '../../../../db/entities';

export abstract class OutboxRepository {
  abstract findCreatedMessages(): Promise<Outbox[]>;
  abstract save(outbox: Outbox): Promise<Outbox>;
}
