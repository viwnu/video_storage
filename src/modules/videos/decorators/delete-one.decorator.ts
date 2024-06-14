import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteOne() {
  return applyDecorators(
    ApiOperation({ summary: 'Удаление одного видео' }),
    ApiResponse({ status: 204, description: 'deleteing result: {raw: any[], affected: number }' }),
    ApiResponse({ status: 404, description: 'Video doesn`t exist' }),
    ApiParam({ name: 'id', required: true, allowEmptyValue: false }),
  );
}
