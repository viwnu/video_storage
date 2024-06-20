import { PartialType } from '@nestjs/swagger';
import { CreateVideoInputModel } from './create-video.input.model';

export class UpdateVideoInputModel extends PartialType(CreateVideoInputModel) {}
