import { ClassSerializerInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function GetFileUrl() {
  return applyDecorators(
    ApiOperation({ summary: 'получение ссылки на файл' }),
    ApiResponse({ status: 200, type: 'string' }),
    ApiResponse({ status: 404, description: 'File doesn`t exist' }),
    ApiParam({ name: 'fileId', required: true, allowEmptyValue: false }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}
