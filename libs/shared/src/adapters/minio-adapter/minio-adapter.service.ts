import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioAdapterService {
  private minioClient: Minio.Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT'),
      port: Number(this.configService.get('MINIO_PORT')),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get('MINIO_SECRET_KEY'),
    });
    this.bucketName = this.configService.get('MINIO_BUCKET_NAME');
  }

  async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName);
    }
  }

  async uploadFile(fileId: string, file: Express.Multer.File) {
    return await this.minioClient.putObject(this.bucketName, fileId, file.buffer, file.size);
  }

  async downloadFile(fileId: string): Promise<Buffer> {
    const dataStream = await this.minioClient.getObject(this.bucketName, fileId);
    const chunks: any[] = [];
    return new Promise((resolve, reject) => {
      dataStream.on('data', (chunk) => {
        chunks.push(chunk);
      });
      dataStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      dataStream.on('error', (error) => {
        reject(error);
      });
    });
  }

  async getFileUrl(fileId: string) {
    return await this.minioClient.presignedUrl('GET', this.bucketName, fileId);
  }

  async deleteFile(fileId: string) {
    await this.minioClient.removeObject(this.bucketName, fileId);
  }
}
