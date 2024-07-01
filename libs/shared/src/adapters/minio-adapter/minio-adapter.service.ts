import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioAdapterService {
  private logger = new Logger(MinioAdapterService.name);
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
    this.logger.log(`createBucketIfNotExists`);
    try {
      const bucketExists = await this.minioClient.bucketExists(this.bucketName);
      if (!bucketExists) {
        await this.minioClient.makeBucket(this.bucketName);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async uploadFile(fileId: string, file: Express.Multer.File) {
    this.logger.log(`${this.uploadFile.name} method with: ${fileId} and ${file.originalname}`);
    return await this.minioClient.putObject(this.bucketName, fileId, file.buffer, file.size, {
      'Content-Type': file.mimetype || 'application/octet-stream',
    });
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

  async downloadFileStream(fileId: string) {
    return await this.minioClient.getObject(this.bucketName, fileId);
  }

  async getFileUrl(fileId: string) {
    return await this.minioClient.presignedUrl('GET', this.bucketName, fileId, 24 * 60 * 60);
  }

  async deleteFile(fileId: string) {
    await this.minioClient.removeObject(this.bucketName, fileId);
  }

  async deleteAllFiles() {
    const stream = await this.minioClient.listObjects(this.bucketName);
    stream.on('data', async (obj) => {
      await this.minioClient.removeObject(this.bucketName, obj.name);
    });
    stream.on('error', (err) => {
      console.log(err);
    });
  }
}
