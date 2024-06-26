import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import * as request from 'supertest';

import { AppModule } from '../src/app.moule';
import { IFile } from '../src/features/files/domain';
import { modelChecker } from './utils/model.checker';

describe('FilesController (e2e)', () => {
  let app: INestApplication;

  const mockFile: IFile = {
    id: randomUUID(),
    label: 'new file',
    url: 'http://test.com',
    type: 'video/mp4',
    size: 1024,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  describe('post', () => {
    let postResponse;

    it(`api/videos/POST`, async () => {
      const payload = {
        label: mockFile.label,
        type: mockFile.type,
        size: mockFile.size,
      };
      postResponse = await request(app.getHttpServer()).post('/api/videos').send(payload);
      expect(postResponse.status).toEqual(201);
      modelChecker(mockFile)(postResponse.body);
    });

    // it(`api/videos/GET/\${id}`, async () => {
    //   const getResponse = await request(app.getHttpServer()).get(`/api/videos/${postResponse.body.id}`);
    //   expect(getResponse.status).toEqual(200);
    //   modelChecker(mockFile)(getResponse.body);
    // });

    it(`api/videos/POST BAD REQUEST`, () => {
      return request(app.getHttpServer())
        .post('/api/videos')
        .send({
          title: mockFile.label,
        })
        .expect(400);
    });

    // afterAll(() => {
    //   return request(app.getHttpServer()).del(`/api/videos/${postResponse.body.id}`);
    // });
  });

  afterAll(async () => {
    await app.close();
  });
});
