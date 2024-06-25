import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MinioAdapterModule } from './minio-adapter/minio-adapter.module';
import { FileManagerModule } from './file-manager/file-manager.module';

@Module({
  providers: [SharedService],
  exports: [SharedService],
  imports: [MinioAdapterModule, FileManagerModule],
})
export class SharedModule {}
