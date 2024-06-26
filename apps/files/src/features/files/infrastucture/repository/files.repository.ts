import { FileAgregate } from '../../domain/file.agregate';

export abstract class FilesRepository {
  abstract save(file: FileAgregate): Promise<FileAgregate>;
  //   abstract upload(): Promise<void>;
  //   abstract download(): Promise<void>;
  //   abstract getUrl(): Promise<void>;
  //   abstract delete(): Promise<void>;
}
