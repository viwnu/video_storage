import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosModule } from '../videos/videos.module';
import { AppTestingController } from './app.testing.controller';
import { TypeOrmConfigService } from '../../db/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
    VideosModule,
  ],
  controllers: [AppTestingController],
})
export class AppModule {}
