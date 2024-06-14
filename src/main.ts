import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Video Storage')
    .setDescription('The Video Storage API description')
    .setVersion('1.0')
    .addTag('VS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  if (process.env.DOCUMENTATION === 'enable') SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.port || 3000, () =>
    console.log(`Server running on PORT: ${process.env.port || 3000}`),
  );
}
bootstrap();
