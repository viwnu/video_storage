import { HttpCode, HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteFile() {
  return applyDecorators(
    ApiOperation({ summary: 'Удаление одного файла' }),
    ApiResponse({ status: 204, description: 'If deleted return nothing' }),
    ApiResponse({ status: 404, description: 'File doesn`t exist' }),
    ApiParam({ name: 'fileId', required: true, allowEmptyValue: false }),
    HttpCode(HttpStatus.NO_CONTENT),
  );
}
