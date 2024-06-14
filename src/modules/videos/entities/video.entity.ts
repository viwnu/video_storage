import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum availabledResolutions {
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
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 40 })
  @ApiProperty({ type: 'string', example: 'My Vacation', description: 'Название видео' })
  title: string;

  @Column('varchar', { length: 20 })
  @ApiProperty({ type: 'string', example: 'Mikle', description: 'Имя автора' })
  author: string;

  @Column({ type: 'simple-array', nullable: true })
  @ApiProperty({
    enum: availabledResolutions,
    isArray: true,
    example: ['P360', 'P480'],
    description: 'Доступные разрешения',
  })
  availabledResolutions: availabledResolutions[];

  @Column({ type: 'bool', nullable: true })
  @ApiProperty({ type: 'boolean', example: true, description: 'Можно ли скачать' })
  canBeDownloaded?: boolean;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({ type: 'number', example: 18, description: 'Минимальный  разрешенный возраст' })
  minAgeRestriction?: number;

  @CreateDateColumn()
  createdAt?: string;

  @Column('timestamp', { nullable: true })
  @ApiProperty({
    type: 'string',
    example: '2024-06-10T13:19:00.377Z',
    description: 'Дата публикации в формате ISO',
  })
  publicationDate?: string;
}
