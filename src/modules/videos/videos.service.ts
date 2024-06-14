import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { VideoResponse } from './entities/video.response.entity';
import { Response } from 'express';

@Injectable()
export class VideosService {
  constructor(@InjectRepository(Video) private videosRepository: Repository<Video>) {}

  async create(createVideoDto: CreateVideoDto) {
    return new VideoResponse(await this.videosRepository.save(createVideoDto));
  }

  async findAll() {
    return (await this.videosRepository.find()).map((video) => new VideoResponse(video));
  }

  async findOne(id: string) {
    const candidate = await this.videosRepository.findOneBy({ id });
    if (!candidate) throw new NotFoundException('Video doesn`t exist');
    return new VideoResponse(candidate);
  }

  async update(response: Response, id: string, updateVideoDto: UpdateVideoDto) {
    const updateResult = await this.videosRepository.update({ id }, updateVideoDto);
    if (updateResult.affected === 0) throw new NotFoundException('Video doesn`t exist');
    response.status(HttpStatus.NO_CONTENT);
    return updateResult;
  }

  async remove(response: Response, id: string) {
    const deleteResult = await this.videosRepository.delete({ id });
    if (deleteResult.affected === 0) throw new NotFoundException('Video doesn`t exist');
    response.status(HttpStatus.NO_CONTENT);
    return deleteResult;
  }

  async removeAll() {
    return await this.videosRepository.delete({});
  }
}
