import { FileDescriptionAgregate } from '../../domain';

export abstract class FileDescriptionsRepository {
  abstract save(file: FileDescriptionAgregate): Promise<FileDescriptionAgregate>;
  abstract findOne(fileId: string): Promise<FileDescriptionAgregate>;
  abstract delete(fileId: string): Promise<boolean>;

  abstract deleteAll(): Promise<boolean>;
}
