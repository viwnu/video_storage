import { ClassSerializerInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileViewModel } from '../../features/files/api/models/view';

export function Create() {
  return applyDecorators(
    ApiOperation({ summary: 'Добавление описания файла' }),
    ApiResponse({ status: 201, type: FileViewModel }),
    ApiResponse({ status: 400, description: 'Error object' }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}
