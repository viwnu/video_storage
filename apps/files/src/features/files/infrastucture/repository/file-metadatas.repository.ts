import { FileMetaDataAgregate } from '../../domain/file-meta-data.agregate';

export abstract class FileMetaDatasRepository {
  abstract save(file: FileMetaDataAgregate): Promise<FileMetaDataAgregate>;
  abstract findOne(fileId: string): Promise<FileMetaDataAgregate>;
}
