import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { VideoFasade } from './video.fasade';

export const videoFasadeFactory = (commandBus: CommandBus, eventBus: EventBus, queryBus: QueryBus) =>
  new VideoFasade(commandBus, eventBus, queryBus);
