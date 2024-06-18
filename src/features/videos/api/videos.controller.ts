import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { VideosService } from '../application';
import { CreateVideoDto, UpdateVideoDto } from './dto';
import { VideoResponse } from '../domain/entities';
import { Create, FindAll, FindOne, UpdateOne, DeleteOne } from '../../../common/decorators';
import { VideosQueryRepository } from '../infrastucture/repository/videos.query.repository';

@ApiTags('Видео хостинг')
@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly videosQueryRepository: VideosQueryRepository,
  ) {}

  @Create()
  @Post()
  create(@Body() createVideoDto: CreateVideoDto): Promise<VideoResponse> {
    return this.videosService.create(createVideoDto);
  }

  @FindAll()
  @Get()
  findAll(): Promise<VideoResponse[]> {
    return this.videosQueryRepository.findAll();
  }

  @FindOne()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<VideoResponse> {
    return this.videosQueryRepository.findOne(id);
  }

  @HttpCode(204)
  @UpdateOne()
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ): Promise<void> {
    await this.videosService.update(id, updateVideoDto);
  }

  @DeleteOne()
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.videosService.remove(id);
  }
}
