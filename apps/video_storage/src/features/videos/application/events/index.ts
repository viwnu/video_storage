import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { CreateVideoEventHandler } from './create-video';

export const EVENTS_HANDLERS: Type<IEventHandler>[] = [CreateVideoEventHandler];
