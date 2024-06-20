import { Controller, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { RemoveAllVideoCommand } from '../application/useCases/remove-all-video.use-case';

@ApiTags('Очистка всей таблицы')
@Controller('testing')
export class VideosTestingController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Очиска' })
  @ApiResponse({ status: 204 })
  @Delete('all-data')
  @HttpCode(204)
  async clearDatabase(): Promise<void> {
    await this.commandBus.execute(new RemoveAllVideoCommand());
  }
}
