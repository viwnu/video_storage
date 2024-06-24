import { CreateVideoType } from './create-video.type';

export class CreateVideoCommand {
  constructor(public createVideoDto: CreateVideoType) {}
}
