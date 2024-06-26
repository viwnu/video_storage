import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { FileFasade } from './file.fasade';

export const fileFasadeFactory = (commandBus: CommandBus, eventBus: EventBus, queryBus: QueryBus) =>
  new FileFasade(commandBus, eventBus, queryBus);
