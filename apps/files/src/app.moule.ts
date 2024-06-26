import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { AllExceptionsFilter } from '@app/common/filters';
import { FilesModule } from './features/files.module';
import { TypeOrmConfigService } from './db';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.files.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
    FilesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
