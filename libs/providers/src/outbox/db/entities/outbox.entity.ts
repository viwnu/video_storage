import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@app/core';

enum outboxStatus {
  created = 'created',
  sent = 'sent',
  error = 'error',
}

@Entity()
export class Outbox extends BaseEntity {
  @Column('varchar', { length: 20, nullable: false })
  topic: string;

  @Column('varchar', { length: 1000, nullable: false })
  payload: string;

  @Column({ type: 'enum', enum: outboxStatus, nullable: false })
  status: outboxStatus;

  // @OneToOne((E) => E)
  // @JoinColumn({ name: 'videoId', referencedColumnName: 'id' })
  // entityId: string;
}
