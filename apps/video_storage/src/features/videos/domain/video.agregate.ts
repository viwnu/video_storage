import { randomUUID } from 'crypto';
import {
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

import { VideoService } from './service';
import { IVideo, VideoBuildResponse } from './video.interface';
import { availabledResolutions } from '../../../const';

export class VideoAgregate extends VideoService implements IVideo {
  logger = new Logger(VideoAgregate.name);

  @IsUUID()
  id: string;

  @IsDefined({ message: 'title must be defined' })
  @IsString()
  @IsByteLength(0, 40)
  title: string;

  @IsDefined({ message: 'author must be defined' })
  @IsString()
  @IsByteLength(0, 20)
  author: string;

  @IsOptional()
  @IsEnum(availabledResolutions)
  availabledResolutions: availabledResolutions;

  @IsOptional()
  @IsBoolean()
  canBeDownloaded: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(18)
  minAgeRestriction: number;

  createdAt: string;

  @IsOptional()
  @IsDate() // Accept instanse of Date
  @MinDate(new Date('1950-01-01Z00:00:00:000Z'))
  @MaxDate(new Date('2070-01-01Z00:00:00:000Z'))
  publicationDate: string;

  static create(createVideoDto: Partial<IVideo>): VideoAgregate {
    const newVideo = new VideoAgregate();
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

  static mapping(createVideoDto: Partial<IVideo>): VideoAgregate {
    const newVideo = new VideoAgregate();
    newVideo.author = createVideoDto.author;
    newVideo.availabledResolutions = createVideoDto.availabledResolutions;
    newVideo.canBeDownloaded = createVideoDto.canBeDownloaded;
    newVideo.minAgeRestriction = createVideoDto.minAgeRestriction;
    newVideo.publicationDate = createVideoDto.publicationDate;
    newVideo.title = createVideoDto.title;
    newVideo.id = createVideoDto.id;

    const error = validateSync(newVideo);
    if (!!error.length) {
      error.forEach((e) => newVideo.logger.error(e.constraints));
      throw new Error('Video not valid');
    }
    return newVideo;
  }

  static buildVideoResponse(video: VideoAgregate): VideoBuildResponse {
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

  static buildVideosResponse(videos: VideoAgregate[]): VideoBuildResponse[] {
    return videos.map((video) => VideoAgregate.buildVideoResponse(video));
  }

  plainToInstance(): void {
    validateSync(this, { whitelist: true });
  }
}
