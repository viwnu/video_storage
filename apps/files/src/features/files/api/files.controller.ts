import { Body, Controller, Logger, Post } from '@nestjs/common';

import { Create } from '../../../common/decorators';
import { CreateFileInputModel } from './models/input/create-file.input.model';
import { FileFasade } from '../application';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Хранение файлов')
@Controller('files')
export class FilesController {
  private logger = new Logger(FilesController.name);
  constructor(private readonly fileFasade: FileFasade) {}

  @Create()
  @Post()
  async create(@Body() createFileDto: CreateFileInputModel) {
    this.logger.log(`controller ${this.create.name} method with recieved: ${JSON.stringify(createFileDto)}`);
    return await this.fileFasade.commands.createFile(createFileDto);
  }
}
