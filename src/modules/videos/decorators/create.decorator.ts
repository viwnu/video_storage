import { ClassSerializerInterceptor, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VideoResponse } from '../entities/video.response.entity';

export function Create() {
  return applyDecorators(
    ApiOperation({ summary: 'Добавление видео' }),
    ApiResponse({ status: 201, type: VideoResponse }),
    ApiResponse({ status: 400, description: 'Error object' }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}
