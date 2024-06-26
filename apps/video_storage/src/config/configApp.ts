import { INestApplication } from '@nestjs/common';
import { pipesSetup, swaggerSetup, preffixSetup } from '.';

export const configApp = (app: INestApplication) => {
  pipesSetup(app);
  preffixSetup(app);
  swaggerSetup(app);
};
