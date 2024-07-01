import { FileDescription } from './file-description.entity';
import { FileMetaData } from './file-metadata.entity';

export * from './file-description.entity';
export * from './file-metadata.entity';
export const FILES_ENTITY = [FileMetaData, FileDescription];
