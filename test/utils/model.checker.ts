import { VideoResponse } from 'src/features/videos/domain/entities/video.response.entity';

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const dateISOStringRe = /\d{4}(.\d{2}){2}(\s|T)(\d{2}.){2}\d{2}/g;

export const modelChecker = (mockVideo: VideoResponse) => {
  return (video) => {
    expect(video.id).toMatch(uuidRe);
    expect(video.title).toEqual(mockVideo.title);
    expect(video.author).toEqual(mockVideo.author);
    expect(video.availabledResolutions).toEqual(mockVideo.availabledResolutions);
    expect(video.createdAt).toMatch(dateISOStringRe);
  };
};
