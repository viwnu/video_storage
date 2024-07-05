import { Controller, Logger, Post } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OutboxService } from '../application';

@Controller('outbox')
export class OutboxController {
  private logger = new Logger(OutboxController.name);
  constructor(private readonly outboxService: OutboxService) {}
  @Post()
  @Cron('*/5 * * * * *')
  async sendOutboxMessages(): Promise<void> {
    this.logger.log(`${this.sendOutboxMessages.name} method`);
    await this.outboxService.sendMessages();
  }
}
