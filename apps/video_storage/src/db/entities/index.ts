import { Outbox } from './outbox.entity';
import { Video } from './video.entity';

export * from './video.entity';
export const VIDEO_ENTITIES = [Video, Outbox];
