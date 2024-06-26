import { Module } from '@nestjs/common';
import { MinioAdapterService } from './minio-adapter.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [MinioAdapterService],
  exports: [MinioAdapterService],
})
export class MinioAdapterModule {}
