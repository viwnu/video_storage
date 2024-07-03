import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MinioAdapterModule } from './adapters/minio-adapter/minio-adapter.module';
import { FileManagerModule, FileManagerService } from './managers/file-manager';

@Module({
  providers: [SharedService, FileManagerService],
  exports: [SharedService, FileManagerService],
  imports: [MinioAdapterModule, FileManagerModule],
})
export class SharedModule {}
