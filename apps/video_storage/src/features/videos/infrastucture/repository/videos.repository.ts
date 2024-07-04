import { VideoAgregate } from '../../domain';
export abstract class VideosRepository {
  abstract save(video: VideoAgregate): Promise<VideoAgregate>;
  abstract saveWithTransaction(video: VideoAgregate): Promise<VideoAgregate>;
  abstract findAllVideos(): Promise<VideoAgregate[]>;
  abstract findOne(id: string): Promise<VideoAgregate | null>;
  abstract delete(id: string): Promise<boolean>;
  abstract removeAll(): Promise<void>;
}
