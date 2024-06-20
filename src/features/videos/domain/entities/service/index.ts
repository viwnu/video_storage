import { IUpdateVideo, UPDATE_VIDEO } from './update-video.case';

export class VideoService implements IUpdateVideo {
  update = UPDATE_VIDEO;
}
