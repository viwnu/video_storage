import { ClassSerializerInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VideoResponse } from '../entities/video.response.entity';

export function FindAll() {
  return applyDecorators(
    ApiOperation({ summary: 'получение всех видео' }),
    ApiResponse({ status: 200, type: [VideoResponse] }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}
