import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from '../db';
import { VideosModule } from '../features/videos/videos.module';
import { AppTestingController } from '../features/app.testing.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
    VideosModule,
  ],
  controllers: [AppTestingController],
})
export class AppModule {}
