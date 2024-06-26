import { BaseEntity } from '@app/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class File extends BaseEntity {
  @Column('varchar', { length: 40, nullable: true })
  label: string;

  @Column('varchar', { length: 100, nullable: true })
  url: string;

  @Column('varchar', { length: 20, nullable: true })
  type: string;

  @Column('int', { nullable: false })
  size: number;
}
