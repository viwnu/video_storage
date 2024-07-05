import { Outbox } from '@app/providers/outbox/db/entities';
import { Video } from './video.entity';

export * from './video.entity';
export const VIDEO_ENTITIES = [Video, Outbox];
