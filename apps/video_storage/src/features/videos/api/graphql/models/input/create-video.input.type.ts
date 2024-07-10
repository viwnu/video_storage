import { Field, InputType, Int } from '@nestjs/graphql';
import { availabledResolutions } from 'apps/video_storage/src/const';
import {
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

@InputType()
export class CreateVideoInputType {
  @IsDefined({ message: 'title must be defined' })
  @IsString()
  @IsByteLength(0, 40)
  @Field({ nullable: false, description: 'Название видео' })
  title: string;

  @IsDefined({ message: 'author must be defined' })
  @IsString()
  @IsByteLength(0, 20)
  @Field({ nullable: false, description: 'Автор видео' })
  author: string;

  @IsOptional()
  @IsEnum(availabledResolutions)
  @IsOptional() // Optional because some videos might not have resolutions defined
  @Field(() => availabledResolutions, { nullable: true, description: 'Доступные разрешения видео' })
  availabledResolutions?: availabledResolutions;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true, description: 'Можно ли скачать' })
  canBeDownloaded?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(18)
  @Field(() => Int, { nullable: true, description: 'Минимальный  разрешенный возраст' })
  minAgeRestriction?: number;

  @IsOptional()
  @IsDate() // Accept instanse of Date
  @MinDate(new Date('1950-01-01Z00:00:00:000Z'))
  @MaxDate(new Date('2070-01-01Z00:00:00:000Z'))
  publicationDate?: string;
}
