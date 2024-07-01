import { ApiProperty } from '@nestjs/swagger';

// Rename to Description or MetaData
export class FileDescriptionViewModel {
  @ApiProperty({ type: 'string', example: 'sdfsdf123123', description: 'Id of description entity' })
  id: string;

  @ApiProperty({ type: 'string', example: 'sdfsdf123123', description: 'Id of file' })
  fileId: string;

  @ApiProperty({ type: 'string', example: 'New File', description: 'File title' })
  title: string;
}
