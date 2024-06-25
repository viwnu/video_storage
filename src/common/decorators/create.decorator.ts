import { ClassSerializerInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VideoViewModel } from 'src/features/videos/api/models/views';

export function Create() {
  return applyDecorators(
    ApiOperation({ summary: 'Добавление видео' }),
    ApiResponse({ status: 201, type: VideoViewModel }),
    ApiResponse({ status: 400, description: 'Error object' }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}
