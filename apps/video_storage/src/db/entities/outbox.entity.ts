import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Video } from '.';

enum outboxStatus {
  created = 'created',
  sent = 'sent',
  error = 'error',
}

@Entity()
export class Outbox {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 20, nullable: false })
  topic: string;

  @Column('varchar', { length: 1000, nullable: false })
  payload: string;

  @Column({ type: 'enum', enum: outboxStatus, nullable: false })
  status: outboxStatus;

  @OneToOne(() => Video)
  @JoinColumn({ name: 'videoId', referencedColumnName: 'id' })
  videoId: string;
}
