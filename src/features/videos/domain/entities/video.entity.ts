import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'crypto';

import { availabledResolutions } from 'src/const/availabled-resolutions.enum';
import { VideoService } from './service';
import { CreateVideoType, VideoViewType } from '../../application/useCases/types';

@Entity()
export class Video extends VideoService {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 40 })
  title: string;

  @Column('varchar', { length: 20 })
  author: string;

  @Column({ type: 'simple-array', nullable: true })
  availabledResolutions: availabledResolutions[];

  @Column({ type: 'bool', nullable: true })
  canBeDownloaded?: boolean;

  @Column({ type: 'int', nullable: true })
  minAgeRestriction?: number;

  @CreateDateColumn()
  createdAt?: string;

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
}
