import { HttpCode, HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function DeleteAllFiles() {
  return applyDecorators(
    ApiOperation({ summary: 'Удаление всех файлов' }),
    ApiResponse({ status: 204, description: 'If deleted return nothing' }),
    ApiResponse({ status: 404, description: 'Files doesn`t exist' }),
    HttpCode(HttpStatus.NO_CONTENT),
  );
}
