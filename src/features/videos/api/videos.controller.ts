import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, ParseUUIDPipe, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Create, FindAll, FindOne, UpdateOne, DeleteOne } from '../../../common/decorators';
import { CreateVideoCommand, RemoveVideoCommand, UpdateVideoCommand } from '../application/commands';

import { CreateVideoInputModel, UpdateVideoInputModel } from './models/input';
import { VideoViewModel } from './models/views';
import { GetVideoQuery } from '../application/queries/get-video/get-video.query';
import { GetVideosQuery } from '../application/queries/get-videos/get-videos.query';

@ApiTags('Видео хостинг')
@Controller('videos')
export class VideosController {
  private logger = new Logger(VideosController.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Create()
  @Post()
  async create(@Body() createVideoDto: CreateVideoInputModel): Promise<VideoViewModel> {
    this.logger.log(`controller ${this.create.name} method with recieved: ${JSON.stringify(createVideoDto)}`);
    const video = await this.commandBus.execute(new CreateVideoCommand(createVideoDto));
    return video;
  }

  @FindAll()
  @Get()
  findAll(): Promise<VideoViewModel[]> {
    this.logger.log(`controller ${this.findAll.name} method`);
    return this.queryBus.execute(new GetVideosQuery());
  }

  @FindOne()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<VideoViewModel> {
    this.logger.log(`controller ${this.findOne.name} method with recieved: ${id}`);
    return this.queryBus.execute(new GetVideoQuery(id));
  }

  @HttpCode(204)
  @UpdateOne()
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateVideoDto: UpdateVideoInputModel): Promise<void> {
    this.logger.log(`controller ${this.update.name} method with recieved: ${id} and ${JSON.stringify(updateVideoDto)}`);
    await this.commandBus.execute(new UpdateVideoCommand(id, updateVideoDto));
  }

  @DeleteOne()
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.logger.log(`controller ${this.remove.name} method with recieved: ${id}`);
    await this.commandBus.execute(new RemoveVideoCommand(id));
  }
}
