import { ClassSerializerInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiProduces, ApiResponse } from '@nestjs/swagger';

export function DownloadFile() {
  return applyDecorators(
    ApiOperation({ summary: 'Скачивание файла по fileId' }),
    ApiOkResponse({ schema: { type: 'string', format: 'binary' }, description: 'Download file' }),
    ApiProduces('image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
    ApiResponse({ status: 400, description: 'Error object' }),
    ApiResponse({ status: 404, description: 'File doesn`t exist' }),
    ApiParam({ name: 'fileId', required: true, allowEmptyValue: false }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}
