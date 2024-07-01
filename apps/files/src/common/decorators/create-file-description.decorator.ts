import { ClassSerializerInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileDescriptionViewModel } from '../../features/files/api/models/view';

export function CreateFileDescription() {
  return applyDecorators(
    ApiOperation({ summary: 'Добавление описания файла' }),
    ApiResponse({ status: 201, type: FileDescriptionViewModel }),
    ApiResponse({ status: 400, description: 'Error object' }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}
