import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MinioAdapterModule } from './adapters/minio-adapter/minio-adapter.module';
import { FileManagerModule } from './managers/file-manager/file-manager.module';
import { FileManagerService } from './managers/file-manager/file-manager.service';

@Module({
  providers: [SharedService, FileManagerService],
  exports: [SharedService, FileManagerService],
  imports: [MinioAdapterModule, FileManagerModule],
})
export class SharedModule {}
