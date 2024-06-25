import { ClassSerializerInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { VideoViewModel } from 'src/features/videos/api/models/views';

export function FindOne() {
  return applyDecorators(
    ApiOperation({ summary: 'получение одного видео' }),
    ApiResponse({ status: 200, type: VideoViewModel }),
    ApiResponse({ status: 404, description: 'Video doesn`t exist' }),
    ApiParam({ name: 'id', required: true, allowEmptyValue: false }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}
