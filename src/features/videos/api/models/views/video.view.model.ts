import { ApiProperty } from '@nestjs/swagger';
import { availabledResolutions } from '../../../../../const';

export class VideoViewModel {
  @ApiProperty({ type: 'string', example: 'sdfgser56446dsfg', description: 'ID видео' })
  id: string;

  @ApiProperty({ type: 'string', example: 'My Vacation', description: 'Название видео' })
  title: string;

  @ApiProperty({ type: 'string', example: 'Mikle', description: 'Имя автора' })
  author: string;

  @ApiProperty({
    enum: availabledResolutions,
    isArray: true,
    example: ['P360', 'P480'],
    description: 'Доступные разрешения',
  })
  availabledResolutions: availabledResolutions[];

  @ApiProperty({ type: 'boolean', example: true, description: 'Можно ли скачать' })
  canBeDownloaded?: boolean;

  @ApiProperty({ type: 'number', example: 18, description: 'Минимальный  разрешенный возраст' })
  minAgeRestriction?: number;

  @ApiProperty({
    type: 'string',
    example: '2024-06-10T13:19:00.377Z',
    description: 'Дата создания в формате ISO',
  })
  createdAt?: string;

  @ApiProperty({
    type: 'string',
    example: '2024-06-10T13:19:00.377Z',
    description: 'Дата публикации в формате ISO',
  })
  publicationDate?: string;
}
