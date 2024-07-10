import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, ParseUUIDPipe, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Create, FindAll, FindOne, UpdateOne, DeleteOne } from '../../../../common/decorators';
import { CreateVideoInputModel, UpdateVideoInputModel } from './models/input';
import { VideoViewModel } from './models/views';
import { VideoFasade } from '../../application';

@ApiTags('Видео хостинг')
@Controller('videos')
export class VideosController {
  private logger = new Logger(VideosController.name);
  constructor(private readonly videoFasade: VideoFasade) {}

  @Create()
  @Post()
  async create(@Body() createVideoDto: CreateVideoInputModel): Promise<VideoViewModel> {
    this.logger.log(`controller ${this.create.name} method with recieved: ${JSON.stringify(createVideoDto)}`);
    const video = await this.videoFasade.commands.createVideo(createVideoDto);
    return video;
  }

  @FindAll()
  @Get()
  findAll(): Promise<VideoViewModel[]> {
    this.logger.log(`controller ${this.findAll.name} method`);
    return this.videoFasade.queries.getVideos();
  }

  @FindOne()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<VideoViewModel> {
    this.logger.log(`controller ${this.findOne.name} method with recieved: ${id}`);
    return await this.videoFasade.queries.getVideo(id);
  }

  @HttpCode(204)
  @UpdateOne()
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateVideoDto: UpdateVideoInputModel): Promise<void> {
    this.logger.log(`controller ${this.update.name} method with recieved: ${id} and ${JSON.stringify(updateVideoDto)}`);
    await this.videoFasade.commands.updateVideo(id, updateVideoDto);
  }

  @DeleteOne()
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.logger.log(`controller ${this.remove.name} method with recieved: ${id}`);
    await this.videoFasade.commands.removeVideo(id);
  }
}
