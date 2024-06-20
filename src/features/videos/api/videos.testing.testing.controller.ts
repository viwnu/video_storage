import { Controller, Delete, HttpCode, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { RemoveAllVideoCommand } from '../application/useCases';

@ApiTags('Очистка всей таблицы')
@Controller('testing')
export class VideosTestingController {
  private logger = new Logger(VideosTestingController.name);
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Очиска' })
  @ApiResponse({ status: 204 })
  @Delete('all-data')
  @HttpCode(204)
  async clearDatabase(): Promise<void> {
    this.logger.log(`controller ${this.clearDatabase.name} method`);
    await this.commandBus.execute(new RemoveAllVideoCommand());
  }
}
