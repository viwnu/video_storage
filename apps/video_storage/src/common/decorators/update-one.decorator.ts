import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function UpdateOne() {
  return applyDecorators(
    ApiOperation({ summary: 'Редактирование видео' }),
    ApiResponse({
      status: 204,
      description: 'Updating result: {generatedMaps: any[], raw: any[], affected: number} ',
    }),
    ApiResponse({ status: 400, description: 'Error object' }),
    ApiResponse({ status: 404, description: 'Video doesn`t exist' }),
    ApiParam({ name: 'id', required: true, allowEmptyValue: false }),
  );
}
