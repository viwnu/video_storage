import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { CreateVideoCommandHandler } from './create-video';
import { UpdateVideoCommandHandler } from './update-video';
import { RemoveVideoCommandHandler } from './remove-video';
import { RemoveAllVideoCommandHandler } from './remove-all-video';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [
  CreateVideoCommandHandler,
  UpdateVideoCommandHandler,
  RemoveVideoCommandHandler,
  RemoveAllVideoCommandHandler,
];
