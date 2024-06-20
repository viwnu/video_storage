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
import { CommandBus } from '@nestjs/cqrs';

import { Create, FindAll, FindOne, UpdateOne, DeleteOne } from '../../../common/decorators';
import { VideosQueryRepository } from '../infrastucture/repository';
import {
  CreateVideoCommand,
  RemoveVideoCommand,
  UpdateVideoCommand,
} from '../application/useCases';
import { CreateVideoInputModel, UpdateVideoInputModel } from './models/input';
import { VideoViewModel } from './models/views';

@ApiTags('Видео хостинг')
@Controller('videos')
export class VideosController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly videosQueryRepository: VideosQueryRepository,
  ) {}

  @Create()
  @Post()
  async create(@Body() createVideoDto: CreateVideoInputModel): Promise<VideoViewModel> {
    const video = await this.commandBus.execute(new CreateVideoCommand(createVideoDto));
    return video;
  }

  @FindAll()
  @Get()
  findAll(): Promise<VideoViewModel[]> {
    return this.videosQueryRepository.findAll();
  }

  @FindOne()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<VideoViewModel> {
    return this.videosQueryRepository.findOne(id);
  }

  @HttpCode(204)
  @UpdateOne()
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVideoDto: UpdateVideoInputModel,
  ): Promise<void> {
    await this.commandBus.execute(new UpdateVideoCommand(id, updateVideoDto));
  }

  @DeleteOne()
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.commandBus.execute(new RemoveVideoCommand(id));
  }
}
