import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsByteLength,
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxDate,
  Min,
  MinDate,
} from 'class-validator';

import { Video, availabledResolutions } from '../entities/video.entity';

export class CreateVideoDto extends PartialType(Video) {
  @ApiProperty({ required: true })
  @IsDefined({ message: 'title must be defined' })
  @IsString()
  @IsByteLength(0, 40)
  title!: string;

  @ApiProperty({ required: true })
  @IsDefined({ message: 'author must be defined' })
  @IsString()
  @IsByteLength(0, 20)
  author!: string;

  @IsOptional()
  @IsArray()
  @IsEnum(availabledResolutions, { each: true })
  availabledResolutions?: availabledResolutions[];

  @IsOptional()
  @IsBoolean()
  canBeDownloaded?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(18)
  minAgeRestriction?: number;

  @Transform(({ value }) => new Date(value)) // Потому что не уверен можно ли в JSON передать instanse of Date
  @IsDate() // Accept instanse of Date
  @MinDate(new Date('1950-01-01Z00:00:00:000Z'))
  @MaxDate(new Date('2070-01-01Z00:00:00:000Z'))
  publicationDate?: string;
}
