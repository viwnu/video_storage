import { UpdateVideoType } from './update-video.type';

export class UpdateVideoCommand {
  constructor(
    public id: string,
    public updateVideoDto: UpdateVideoType,
  ) {}
}
