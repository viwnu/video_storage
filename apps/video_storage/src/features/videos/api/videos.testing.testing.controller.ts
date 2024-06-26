import { Controller, Delete, HttpCode, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VideoFasade } from '../application/video.fasade';

@ApiTags('Очистка всей таблицы')
@Controller('testing')
export class VideosTestingController {
  private logger = new Logger(VideosTestingController.name);
  constructor(private readonly videoFasade: VideoFasade) {}

  @ApiOperation({ summary: 'Очиска' })
  @ApiResponse({ status: 204 })
  @Delete('all-data')
  @HttpCode(204)
  async clearDatabase(): Promise<void> {
    this.logger.log(`controller ${this.clearDatabase.name} method`);
    await this.videoFasade.commands.removeAllVideo();
  }
}
