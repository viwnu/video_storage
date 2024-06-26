import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MinioAdapterModule } from './adapters/minio-adapter/minio-adapter.module';
import { FileManagerModule } from './managers/file-manager/file-manager.module';

@Module({
  providers: [SharedService],
  exports: [SharedService],
  imports: [MinioAdapterModule, FileManagerModule],
})
export class SharedModule {}
