import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.moule';
import { configApp } from './config';

async function bootstrap() {
  const port = new ConfigService().get('PORT');
  const app = await NestFactory.create(AppModule);

  configApp(app);

  await app.listen(port || 3001, () => console.log(`Server running on PORT: ${port || 3001}`));
}
bootstrap();
