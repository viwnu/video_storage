import { MinioAdapterService } from '@app/shared/adapters/minio-adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileManagerService {
  constructor(private readonly minioAdapterService: MinioAdapterService) {}

  async uploadFile(fileId: string, file: Express.Multer.File) {
    await this.minioAdapterService.createBucketIfNotExists();
    return await this.minioAdapterService.uploadFile(fileId, file);
  }

  async downloadFile(fileId: string): Promise<Buffer> {
    return await this.minioAdapterService.downloadFile(fileId);
  }

  async downloadFileStream(fileId: string) {
    return await this.minioAdapterService.downloadFileStream(fileId);
  }

  async getFileUrl(fileId: string) {
    return await this.minioAdapterService.getFileUrl(fileId);
  }

  async deleteFile(fileId: string) {
    await this.minioAdapterService.deleteFile(fileId);
  }

  async deleteAllFiles() {
    await this.minioAdapterService.deleteAllFiles();
  }
}
