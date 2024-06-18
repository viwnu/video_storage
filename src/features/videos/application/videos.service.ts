import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateVideoDto, UpdateVideoDto } from '../api/dto';
import { Video, VideoResponse } from '../domain/entities';
import { VideosRepository } from '../infrastucture/repository';

@Injectable()
export class VideosService {
  constructor(private videosRepository: VideosRepository) {}

  async create(createVideoDto: CreateVideoDto): Promise<VideoResponse> {
    const newVideo = new Video();
    newVideo.author = createVideoDto.author;
    newVideo.availabledResolutions = createVideoDto.availabledResolutions;
    newVideo.canBeDownloaded = createVideoDto.canBeDownloaded;
    newVideo.createdAt = createVideoDto.createdAt;
    newVideo.minAgeRestriction = createVideoDto.minAgeRestriction;
    newVideo.publicationDate = createVideoDto.publicationDate;
    newVideo.title = createVideoDto.title;
    newVideo.id = randomUUID();
    const video = await this.videosRepository.save(newVideo);
    return new VideoResponse(video);
  }

  async update(id: string, updateVideoDto: UpdateVideoDto): Promise<void> {
    const video = await this.videosRepository.findOne(id);
    if (!video) throw new NotFoundException('Video doesn`t exist');
    video.author = updateVideoDto.author ?? video.author;
    video.availabledResolutions =
      updateVideoDto.availabledResolutions ?? video.availabledResolutions;
    video.canBeDownloaded = updateVideoDto.canBeDownloaded ?? video.canBeDownloaded;
    video.createdAt = updateVideoDto.createdAt ?? video.createdAt;
    video.minAgeRestriction = updateVideoDto.minAgeRestriction ?? video.minAgeRestriction;
    video.publicationDate = updateVideoDto.publicationDate ?? video.publicationDate;
    video.title = updateVideoDto.title ?? video.title;
    await this.videosRepository.save(video);
  }

  async remove(id: string): Promise<void> {
    const video = await this.videosRepository.findOne(id);
    if (!video) throw new NotFoundException('Video doesn`t exist');
    await this.videosRepository.remove(video.id);
  }

  async removeAll(): Promise<void> {
    await this.videosRepository.removeAll();
  }
}
