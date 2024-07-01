import { FileDescriptionViewModel } from '../../src/features/files/api/models/view';

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const modelChecker = (mockFileDescription: FileDescriptionViewModel) => {
  return (fileDescription) => {
    expect(fileDescription.id).toMatch(uuidRe);
    expect(fileDescription.fileId).toEqual(mockFileDescription.fileId);
    expect(fileDescription.title).toEqual(mockFileDescription.title);
  };
};
