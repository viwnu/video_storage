import { Controller, Get, Post, Body, Param, Delete, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Create } from './decorators/create.decorator';
import { FindAll } from './decorators/find-all.decorator';
import { FindOne } from './decorators/find-one.decorator';
import { UpdateOne } from './decorators/update-one.decorator';
import { DeleteOne } from './decorators/delete-one.decorator';
import { QueryParamsDto } from './dto/query-params.dto';
import { Response } from 'express';

@ApiTags('Видео хостинг')
@Controller('api/videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Create()
  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @FindAll()
  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @FindOne()
  @Get(':id')
  findOne(@Param() params: QueryParamsDto) {
    return this.videosService.findOne(params.id);
  }

  @UpdateOne()
  @Put(':id')
  async update(
    @Res() response: Response,
    @Param() params: QueryParamsDto,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    await this.videosService.update(response, params.id, updateVideoDto);
    response.end();
  }

  @DeleteOne()
  @Delete(':id')
  async remove(@Res() response: Response, @Param() params: QueryParamsDto): Promise<void> {
    await this.videosService.remove(response, params.id);
    response.end();
  }
}
