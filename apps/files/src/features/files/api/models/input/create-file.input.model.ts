import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFileInputModel {
  @IsOptional()
  @IsString()
  @IsByteLength(0, 40)
  label: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 100)
  url: string;

  @IsOptional()
  @IsString()
  @IsByteLength(0, 20)
  type: string;

  @ApiProperty({ required: true })
  @IsDefined({ message: 'size must be defined' })
  @IsNumber()
  size: number;
}
