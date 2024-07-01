import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '@app/core';
import { FileMetaData } from './file-metadata.entity';

@Entity()
export class FileDescription extends BaseEntity {
  @Column('varchar', { length: 40, nullable: true, unique: true })
  fileId: string;

  @Column('varchar', { length: 40, nullable: true })
  title: string;

  @OneToOne(() => FileMetaData, (file) => file)
  file: FileMetaData;
}
