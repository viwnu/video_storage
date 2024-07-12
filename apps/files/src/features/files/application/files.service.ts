import { BadRequestException, Injectable, Logger, NotFoundException, StreamableFile } from '@nestjs/common';
import { FileDescriptionsRepository } from '../infrastucture/repository/file-descriptions.repository';
import { CreateFileDescriptionType } from './commands/create-file-description';
import { FileDescriptionAgregate, FileMetaDataAgregate, IDownloadFileResponse, IFileMetaData } from '../domain';
import { FileManagerService } from '@app/shared/managers/file-manager';
import { UploadFileType } from './commands/upload-file';
import { FileMetaDatasRepository } from '../infrastucture/repository';

@Injectable()
export class FilesService {
  private logger = new Logger(FilesService.name);
  constructor(
    private readonly fileDescriptionsRepository: FileDescriptionsRepository,
    private readonly fileMetaDatasRepository: FileMetaDatasRepository,
    private readonly fileManagerService: FileManagerService,
  ) {}
  async createFileDescription(createFileDescriptionDto: CreateFileDescriptionType) {
    this.logger.log(`Creating new file description with: ${JSON.stringify(createFileDescriptionDto)}`);
    const newFileDescription = FileDescriptionAgregate.create(createFileDescriptionDto);
    newFileDescription.plainToInstance();
    const fileDescription = await this.fileDescriptionsRepository.save(newFileDescription);
    return FileDescriptionAgregate.buildFileDescriptionResponse(fileDescription);
  }

  async uploadFile({ fileId, file }: UploadFileType): Promise<IFileMetaData> {
    this.logger.log(`Uploading file with: ${fileId} and ${file?.originalname}`);
    const existingFile = await this.fileDescriptionsRepository.findOne(fileId);
    if (!existingFile) throw new NotFoundException('File doesn`t exist');
    if (!file) throw new BadRequestException('No file provided');
    const uploadedFile = await this.fileMetaDatasRepository.findOne(fileId);
    if (uploadedFile) throw new BadRequestException('File already uploaded');
    await this.fileManagerService.uploadFile(fileId, file);
    const newMetaData = FileMetaDataAgregate.create({
      fileId,
      label: file.originalname,
      size: file.size,
      type: file.mimetype,
      url: await this.fileManagerService.getFileUrl(fileId),
    });
    newMetaData.plainToInstance();
    const fileMetaData = await this.fileMetaDatasRepository.save(newMetaData);
    return FileMetaDataAgregate.buildFileMetaDataResponse(fileMetaData);
  }

  async downloadFile(fileId: string): Promise<IDownloadFileResponse> {
    this.logger.log(`Downloading file with: ${fileId}`);
    const existingFile = await this.fileDescriptionsRepository.findOne(fileId);
    const metaData = await this.fileMetaDatasRepository.findOne(fileId);
    if (!existingFile || !metaData) throw new NotFoundException('File doesn`t exist');
    const buffer = await this.fileManagerService.downloadFile(fileId);
    return {
      fileName: existingFile.title + '.' + metaData.label.split('.')[1],
      file: buffer,
      type: metaData.type,
    };
  }

  async downloadFileStreamable(fileId: string): Promise<StreamableFile> {
    this.logger.log(`Downloading file with: ${fileId}`);
    const existingFile = await this.fileDescriptionsRepository.findOne(fileId);
    const metaData = await this.fileMetaDatasRepository.findOne(fileId);
    if (!existingFile || !metaData) throw new NotFoundException('File doesn`t exist');
    return new StreamableFile(await this.fileManagerService.downloadFileStream(fileId), {
      type: metaData.type,
      disposition: `attachment; filename="${existingFile.title + '.' + metaData.label.split('.')[1]}"`,
      length: metaData.size,
    });
  }

  async getFileUrl(fileId: string) {
    const existingFile = await this.fileDescriptionsRepository.findOne(fileId);
    const metaData = await this.fileMetaDatasRepository.findOne(fileId);
    if (!existingFile || !metaData) throw new NotFoundException('File doesn`t exist');
    return await this.fileManagerService.getFileUrl(fileId);
  }

  async deleteFile(fileId: string) {
    this.logger.log(`Deleting file with: ${fileId}`);
    const existingFile = await this.fileDescriptionsRepository.findOne(fileId);
    if (!existingFile) throw new NotFoundException('File doesn`t exist');
    await this.fileManagerService.deleteFile(fileId);
    await this.fileDescriptionsRepository.delete(fileId);
    return;
  }

  async deleteAllFiles() {
    this.logger.log(`Deleting all files`);
    await this.fileManagerService.deleteAllFiles();
    await this.fileDescriptionsRepository.deleteAll();
    return;
  }

  async getFileDescription(fileId: string): Promise<FileDescriptionAgregate> {
    this.logger.log(`Getting file descriptions with fileId: ${fileId}`);
    const existingFile = await this.fileDescriptionsRepository.findOne(fileId);
    return existingFile;
  }
}
