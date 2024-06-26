import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { CreateFileCommandHandler } from './create-file/create-file.command.handler';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [CreateFileCommandHandler];
