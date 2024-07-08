import { Logger } from '@nestjs/common';
import { IMessage } from './outbox.interface';
import { outboxStatus } from '../../../const';
import { IsByteLength, IsDefined, IsEnum, IsString, IsUUID, validateSync } from 'class-validator';
import { randomUUID } from 'crypto';

export class OutboxAgregate implements IMessage {
  logger = new Logger(OutboxAgregate.name);

  @IsUUID()
  id: string;

  @IsDefined()
  @IsString()
  @IsByteLength(0, 20)
  topic: string;

  @IsDefined()
  @IsString()
  @IsByteLength(0, 1000)
  payload: string;

  @IsDefined()
  @IsEnum(outboxStatus)
  status: outboxStatus;

  // @IsDefined()
  // @IsUUID()
  // entityId: string;

  static create(createOutboxDto: Partial<IMessage>): OutboxAgregate {
    const newOutbox = new OutboxAgregate();
    newOutbox.logger.log(`${this.create.name} method`);
    newOutbox.id = randomUUID();
    newOutbox.topic = createOutboxDto.topic;
    newOutbox.payload = createOutboxDto.payload;
    newOutbox.status = createOutboxDto.status;
    // newOutbox.entityId = createOutboxDto.entityId;

    const error = validateSync(newOutbox);
    if (!!error.length) {
      error.forEach((e) => newOutbox.logger.error(e.constraints));
      throw new Error('Message is not valid');
    }
    return newOutbox;
  }

  static mapping(createOutboxDto: Partial<IMessage>): OutboxAgregate {
    const newOutbox = new OutboxAgregate();
    newOutbox.logger.log(`${this.mapping.name} method`);
    newOutbox.id = createOutboxDto.id;
    newOutbox.topic = createOutboxDto.topic;
    newOutbox.payload = createOutboxDto.payload;
    newOutbox.status = createOutboxDto.status;
    // newOutbox.entityId = createOutboxDto.entityId;

    const error = validateSync(newOutbox);
    if (!!error.length) {
      error.forEach((e) => newOutbox.logger.error(e.constraints));
      throw new Error('Message is not valid');
    }
    return newOutbox;
  }

  plainToInstance(): void {
    this.logger.log(`${this.plainToInstance.name}`);
    validateSync(this, { whitelist: true });
  }
}
