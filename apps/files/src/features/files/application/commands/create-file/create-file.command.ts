import { CreateFileType } from './create-file.type';

export class CreateFileCommand {
  constructor(public createFileDto: CreateFileType) {}
}
