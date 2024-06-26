import { INestApplication } from '@nestjs/common';

export const preffixSetup = (app: INestApplication) => {
  app.setGlobalPrefix('api');
};
