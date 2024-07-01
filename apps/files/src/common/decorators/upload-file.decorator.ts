import { ClassSerializerInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileMetaDataViewModel } from '../../features/files/api/models/view';

export function UploadFile() {
  return applyDecorators(
    ApiOperation({
      summary: 'Загрузка файла по fileId',
      requestBody: {
        content: {
          'multipart/form-data': { schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } },
        },
      },
    }),
    ApiResponse({ status: 201, type: FileMetaDataViewModel, description: 'Upload metadata' }),
    ApiResponse({ status: 400, description: 'Error object' }),
    UseInterceptors(ClassSerializerInterceptor),
    UseInterceptors(FileInterceptor('file')),
  );
}
