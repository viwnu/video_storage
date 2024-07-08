import { BaseEntity } from '@app/core';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { FileDescription } from './file-description.entity';

@Entity()
export class FileMetaData extends BaseEntity {
  @Column('varchar', { length: 40, nullable: true })
  label: string;

  @Column('varchar', { length: 1000, nullable: true })
  url: string;

  @Column('varchar', { length: 100, nullable: true })
  type: string;

  @Column('int', { nullable: false })
  size: number;

  @OneToOne(() => FileDescription, (FileDescription) => FileDescription.fileId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fileId', referencedColumnName: 'fileId' })
  fileId: string;
}
