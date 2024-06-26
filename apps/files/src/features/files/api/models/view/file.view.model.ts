import { ApiProperty } from '@nestjs/swagger';

export class FileViewModel {
  @ApiProperty({ type: 'string', example: 'New File', description: 'File label' })
  label: string;

  @ApiProperty({ type: 'string', example: 'http://localhost/api/files/23rfwersdrs', description: 'File URL addres' })
  url: string;

  @ApiProperty({ type: 'string', example: 'mp4', description: 'Type of file' })
  type: string;

  @ApiProperty({ type: 'number', example: 512, description: 'Size of file' })
  size: number;
}
