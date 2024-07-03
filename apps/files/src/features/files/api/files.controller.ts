import { Body, Controller, Delete, Get, Logger, Param, ParseUUIDPipe, Post, Res, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import {
  CreateFileDescription,
  DeleteAllFiles,
  DeleteFile,
  DownloadFile,
  GetFileUrl,
  UploadFile,
} from '../../../common/decorators';
import { CreateFileDescriptionInputModel } from './models/input';
import { FileFasade } from '../application';

@ApiTags('Хранение файлов')
@Controller('files')
export class FilesController {
  private logger = new Logger(FilesController.name);
  constructor(private readonly fileFasade: FileFasade) {}

  @CreateFileDescription()
  @Post()
  async createFileDescription(@Body() createFileDescriptionDto: CreateFileDescriptionInputModel) {
    this.logger.log(
      `controller ${this.createFileDescription.name} method with recieved: ${JSON.stringify(createFileDescriptionDto)}`,
    );
    return await this.fileFasade.commands.createFileDescription(createFileDescriptionDto);
  }

  @UploadFile()
  @Post('/:fileId/upload')
  async upload(@Param('fileId', ParseUUIDPipe) fileId: string, @UploadedFile() file: Express.Multer.File) {
    this.logger.log(
      `controller ${this.upload.name} method with recieved: ${fileId} and ${file?.originalname} with size ${file?.size}`,
    );
    return await this.fileFasade.commands.uploadFile({ fileId, file });
  }

  @DownloadFile()
  @Get('/:fileId/download')
  async download(@Param('fileId', ParseUUIDPipe) fileId: string, @Res({ passthrough: true }) response: Response) {
    this.logger.log(`controller ${this.download.name} method with recieved: ${fileId}`);
    const { file, fileName, type } = await this.fileFasade.queries.downloadFile(fileId);
    response.set({
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': type,
    });
    response.send(file);
  }

  @DownloadFile()
  @Get('/:fileId/download_streamable')
  async downloadStreamable(@Param('fileId', ParseUUIDPipe) fileId: string) {
    this.logger.log(`controller ${this.download.name} method with recieved: ${fileId}`);
    return await this.fileFasade.queries.downloadFileStreamable(fileId);
  }

  @GetFileUrl()
  @Get('/:fileId/url')
  async getUrl(@Param('fileId', ParseUUIDPipe) fileId: string) {
    this.logger.log(`controller ${this.getUrl.name} method with recieved: ${fileId}`);
    return await this.fileFasade.queries.getFileUrl(fileId);
  }

  @DeleteFile()
  @Delete('/:fileId')
  async delete(@Param('fileId', ParseUUIDPipe) fileId: string) {
    this.logger.log(`controller ${this.delete.name} method with recieved: ${fileId}`);
    await this.fileFasade.commands.deleteFile(fileId);
    return;
  }

  @DeleteAllFiles()
  @Delete()
  async DeleteAllFilesCommand() {
    this.logger.log(`controller ${this.DeleteAllFilesCommand.name} method`);
    await this.fileFasade.commands.deleteAllFiles();
    return;
  }
}
