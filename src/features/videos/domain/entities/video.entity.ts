import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'crypto';
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
  IsUUID,
  Max,
  MaxDate,
  Min,
  MinDate,
  validateSync,
} from 'class-validator';
import { Logger } from '@nestjs/common';

import { availabledResolutions } from '../../../../const';
import { VideoService } from './service';
import { CreateVideoType, VideoViewType } from '../../application/commands/types';

@Entity()
export class Video extends VideoService {
  logger = new Logger(Video.name);

  @IsUUID()
  @PrimaryColumn('uuid')
  id: string;

  @IsDefined({ message: 'title must be defined' })
  @IsString()
  @IsByteLength(0, 40)
  @Column('varchar', { length: 40 })
  title: string;

  @IsDefined({ message: 'author must be defined' })
  @IsString()
  @IsByteLength(0, 20)
  @Column('varchar', { length: 20 })
  author: string;

  @IsOptional()
  @IsArray()
  @IsEnum(availabledResolutions, { each: true })
  @Column({ type: 'simple-array', nullable: true })
  availabledResolutions: availabledResolutions[];

  @IsOptional()
  @IsBoolean()
  @Column({ type: 'bool', nullable: true })
  canBeDownloaded?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(18)
  @Column({ type: 'int', nullable: true })
  minAgeRestriction?: number;

  @CreateDateColumn()
  createdAt?: string;

  @IsOptional()
  @IsDate() // Accept instanse of Date
  @MinDate(new Date('1950-01-01Z00:00:00:000Z'))
  @MaxDate(new Date('2070-01-01Z00:00:00:000Z'))
  @CreateDateColumn()
  @Column('timestamp', { nullable: true })
  publicationDate?: string;

  static create(createVideoDto: CreateVideoType): Video {
    const newVideo = new Video();
    newVideo.author = createVideoDto.author;
    newVideo.availabledResolutions = createVideoDto.availabledResolutions;
    newVideo.canBeDownloaded = createVideoDto.canBeDownloaded;
    newVideo.minAgeRestriction = createVideoDto.minAgeRestriction;
    newVideo.publicationDate = createVideoDto.publicationDate;
    newVideo.title = createVideoDto.title;
    newVideo.id = randomUUID();

    const error = validateSync(newVideo);
    if (!!error.length) {
      error.forEach((e) => newVideo.logger.error(e.constraints));
      throw new Error('Video not valid');
    }

    return newVideo;
  }

  static buildVideoResponse(video: Video): VideoViewType {
    return {
      id: video.id,
      author: video.author,
      availabledResolutions: video.availabledResolutions,
      canBeDownloaded: video.canBeDownloaded,
      createdAt: video.createdAt,
      minAgeRestriction: video.minAgeRestriction,
      publicationDate: video.publicationDate,
      title: video.title,
    };
  }

  static buildVideosResponse(videos: Video[]): VideoViewType[] {
    return videos.map((video) => Video.buildVideoResponse(video));
  }

  plainToInstance(): void {
    validateSync(this, { whitelist: true });
  }
}
