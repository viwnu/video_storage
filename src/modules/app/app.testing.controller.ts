import { Controller, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VideosService } from '../videos/videos.service';

@ApiTags('Очистка всей таблицы')
@Controller('api/testing')
export class AppTestingController {
  constructor(private videosService: VideosService) {}

  @ApiOperation({ summary: 'Очиска' })
  @ApiResponse({ status: 204 })
  @Delete('all-data')
  @HttpCode(204)
  clearDatabase() {
    this.videosService.removeAll();
  }
}
