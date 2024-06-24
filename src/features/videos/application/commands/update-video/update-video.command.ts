import { UpdateVideoInputModel } from 'src/features/videos/api/models/input';

export class UpdateVideoCommand {
  constructor(
    public id: string,
    public updateVideoDto: UpdateVideoInputModel,
  ) {}
}
