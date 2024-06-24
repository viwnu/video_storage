import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { VideoFasade } from './video.fasade';

export const videoFasadeFactory = (commndBus: CommandBus, eventBus: EventBus, queryBus: QueryBus) =>
  new VideoFasade(commndBus, eventBus, queryBus);
