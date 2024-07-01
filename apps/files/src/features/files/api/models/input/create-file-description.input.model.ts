import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsDefined, IsString, IsUUID } from 'class-validator';

export class CreateFileDescriptionInputModel {
  @ApiProperty({ required: true })
  @IsDefined()
  @IsUUID()
  fileId: string;

  @ApiProperty({ required: true })
  @IsDefined()
  @IsString()
  @IsByteLength(0, 40)
  title: string;
}
