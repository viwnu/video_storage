import { BaseEntity } from '@app/core';
import { Column, Entity } from 'typeorm';

enum availabledResolutions {
  P144 = 'P144',
  P240 = 'P240',
  P360 = 'P360',
  P480 = 'P480',
  P720 = 'P720',
  P1080 = 'P1080',
  P1440 = 'P1440',
  P2160 = 'P2160',
}

@Entity()
export class Video extends BaseEntity {
  @Column('varchar', { length: 40 })
  title: string;

  @Column('varchar', { length: 20 })
  author: string;

  @Column({ type: 'enum', enum: availabledResolutions, nullable: true })
  availabledResolutions: availabledResolutions;

  @Column({ type: 'bool', nullable: true })
  canBeDownloaded?: boolean;

  @Column({ type: 'int', nullable: true })
  minAgeRestriction?: number;

  @Column('timestamp', { nullable: true })
  publicationDate?: string;
}
