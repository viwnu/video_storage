import { CreateFileDescriptionType } from './create-file-description.type';

export class CreateFileDescriptionCommand {
  constructor(public createFileDescriptionDto: CreateFileDescriptionType) {}
}
