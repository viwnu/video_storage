import { Controller, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VideosService } from './videos/application/videos.service';

@ApiTags('Очистка всей таблицы')
@Controller('testing')
export class AppTestingController {
  constructor(private videosService: VideosService) {}

  @ApiOperation({ summary: 'Очиска' })
  @ApiResponse({ status: 204 })
  @Delete('all-data')
  @HttpCode(204)
  async clearDatabase(): Promise<void> {
    await this.videosService.removeAll();
  }
}
