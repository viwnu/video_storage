import { OutboxMessageType } from '../../../../const';
import { VideoAgregate } from '../../domain';
export abstract class VideosRepository {
  abstract save(video: VideoAgregate): Promise<VideoAgregate>;
  abstract saveWithMessage(video: VideoAgregate, message: OutboxMessageType): Promise<VideoAgregate>;
  abstract findAllVideos(): Promise<VideoAgregate[]>;
  abstract findOne(id: string): Promise<VideoAgregate | null>;
  abstract delete(id: string): Promise<boolean>;
  abstract removeAll(): Promise<void>;
}
