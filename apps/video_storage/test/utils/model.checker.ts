import { VideoViewModel } from '../../src/features/videos/api/rest/models/views';

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const modelChecker = (mockVideo: VideoViewModel) => {
  return (video) => {
    expect(video.id).toMatch(uuidRe);
    expect(video.title).toEqual(mockVideo.title);
    expect(video.author).toEqual(mockVideo.author);
    expect(video.availabledResolutions).toEqual(mockVideo.availabledResolutions);
  };
};
