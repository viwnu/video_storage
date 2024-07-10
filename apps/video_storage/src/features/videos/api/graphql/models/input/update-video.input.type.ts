import { InputType, PartialType } from '@nestjs/graphql';
import { CreateVideoInputType } from './create-video.input.type';

@InputType()
export class UpdateVideoInputType extends PartialType(CreateVideoInputType) {}
