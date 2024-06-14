import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Video } from './video.entity';
import { Transform } from 'class-transformer';

export class VideoResponse extends PartialType(Video) {
  @ApiProperty({
    type: 'string',
    example: '2024-06-10T13:19:00.377Z',
    description: 'Дата создания в формате ISO',
  })
  @Transform(({ value }) =>
    !value ? value : new Date(value - value.getTimezoneOffset() * 60 * 1000).toISOString(),
  )
  createdAt?: string;

  @Transform(({ value }) =>
    !value ? value : new Date(value - value.getTimezoneOffset() * 60 * 1000).toISOString(),
  )
  publicationDate?: string;

  constructor(partial: Partial<VideoResponse>) {
    super();
    Object.assign(this, partial);
  }
}
