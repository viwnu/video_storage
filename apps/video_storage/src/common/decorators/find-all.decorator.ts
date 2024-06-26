import { ClassSerializerInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VideoViewModel } from '../../features/videos/api/models/views';

export function FindAll() {
  return applyDecorators(
    ApiOperation({ summary: 'получение всех видео' }),
    ApiResponse({ status: 200, type: [VideoViewModel] }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}
