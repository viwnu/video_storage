import { FileViewModel } from '../../src/features/files/api/models/view';

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const modelChecker = (mockVideo: FileViewModel) => {
  return (video) => {
    expect(video.id).toMatch(uuidRe);
    expect(video.label).toEqual(mockVideo.label);
    expect(video.url).toEqual(mockVideo.url);
    expect(video.type).toEqual(mockVideo.type);
    expect(video.size).toEqual(mockVideo.size);
  };
};
