import { ApiProperty } from '@nestjs/swagger';
import { IFileMetaData } from '../../../domain';

export class FileMetaDataViewModel implements IFileMetaData {
  @ApiProperty({ type: 'string', example: 'sdfsdf123123', description: 'Id of metadata entity' })
  id: string;

  @ApiProperty({ type: 'string', example: 'sdfsdf123123', description: 'Label of file' })
  label: string;

  @ApiProperty({ type: 'string', example: 'http://test.com/fileId', description: 'Url to get file' })
  url: string;

  @ApiProperty({ type: 'string', example: '.docx', description: 'File type' })
  type: string;

  @ApiProperty({ type: 'string', example: 8800, description: 'File size' })
  size: number;

  @ApiProperty({ type: 'string', example: 'sdfsdf123123', description: 'Id of file' })
  fileId: string;
}
