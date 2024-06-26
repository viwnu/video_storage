import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { MinioAdapterModule } from '@app/shared/adapters/minio-adapter/minio-adapter.module';

@Module({
  imports: [MinioAdapterModule],
  providers: [FileManagerService],
})
export class FileManagerModule {}
