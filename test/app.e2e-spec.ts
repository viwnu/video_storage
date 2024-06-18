import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { modelChecker } from './utils/model.checker';
import { AppModule } from '../src/features/app.module';
import { availabledResolutions } from '../src/features/videos/domain/entities/video.entity';

describe('App (e2e)', () => {
  let app: INestApplication;

  const mockVideo = {
    title: 'test video',
    author: 'test author',
    availabledResolutions: [availabledResolutions.P480],
    canBeDownloaded: true,
    minAgeRestriction: 1,
    publicationDate: new Date().toISOString(),
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

  describe('delete all', () => {
    beforeAll(async () => {
      await Promise.all(
        [mockVideo, mockVideo, mockVideo].map(async (mockVideo) => {
          return await request(app.getHttpServer()).post('/api/videos').send(mockVideo);
        }),
      );
    });

    it(`api/testing/all-data`, () => {
      return request(app.getHttpServer()).del(`/api/testing/all-data`).expect(204);
    });
  });

  describe('post', () => {
    let postResponse;

    it(`api/videos/POST`, async () => {
      postResponse = await request(app.getHttpServer()).post('/api/videos').send({
        title: mockVideo.title,
        author: mockVideo.author,
        availabledResolutions: mockVideo.availabledResolutions,
      });
      expect(postResponse.status).toEqual(201);
      modelChecker(mockVideo)(postResponse.body);
    });

    it(`api/videos/GET/\${id}`, async () => {
      const getResponse = await request(app.getHttpServer()).get(
        `/api/videos/${postResponse.body.id}`,
      );
      expect(getResponse.status).toEqual(200);
      modelChecker(mockVideo)(getResponse.body);
    });

    it(`api/videos/POST BAD REQUEST`, () => {
      return request(app.getHttpServer())
        .post('/api/videos')
        .send({
          title: mockVideo.title,
          author: mockVideo.author,
          availabledResolutions: 'bla-bla',
        })
        .expect(400);
    });

    afterAll(() => {
      return request(app.getHttpServer()).del(`/api/videos/${postResponse.body.id}`);
    });
  });

  describe('get all', () => {
    beforeAll(async () => {
      await Promise.all(
        [mockVideo, mockVideo, mockVideo].map(async (mockVideo) => {
          return await request(app.getHttpServer()).post('/api/videos').send(mockVideo);
        }),
      );
    });

    it('api/videos', async () => {
      const response = await request(app.getHttpServer()).get('/api/videos');
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('length');
      modelChecker(mockVideo)(response.body[0]);
    });

    afterAll(async () => {
      return await request(app.getHttpServer()).del('/api/testing/all-data');
    });
  });

  describe('get by id', () => {
    let postResponse;
    beforeAll(async () => {
      postResponse = await request(app.getHttpServer()).post('/api/videos').send(mockVideo);
      return;
    });

    it(`api/videos/GET/\${id}`, async () => {
      const getResponse = await request(app.getHttpServer()).get(
        `/api/videos/${postResponse.body.id}`,
      );
      expect(getResponse.status).toEqual(200);
      modelChecker(mockVideo)(getResponse.body);
    });

    it(`api/videos/GET/\${wrong id} NOT FOUND`, async () => {
      const getResponse = await request(app.getHttpServer()).get(
        `/api/videos/b7737c30-de46-4f21-afac-26fbfddc6c1e`,
      );
      expect(getResponse.status).toEqual(404);
    });

    afterAll(() => {
      return request(app.getHttpServer()).del(`/api/videos/${postResponse.body.id}`);
    });
  });

  describe('put', () => {
    let postResponse;
    beforeAll(async () => {
      postResponse = await request(app.getHttpServer()).post('/api/videos').send(mockVideo);
      return;
    });

    it(`api/videos/PUT/\${id}`, async () => {
      const putResponse = await request(app.getHttpServer())
        .put(`/api/videos/${postResponse.body.id}`)
        .send({
          title: 'new title',
          minAgeRestriction: 15,
        });
      expect(putResponse.status).toEqual(204);
      expect(Object.keys(putResponse.body)).toHaveLength(0);
    });

    it(`api/videos/GET/\${id}`, async () => {
      const getResponse = await request(app.getHttpServer()).get(
        `/api/videos/${postResponse.body.id}`,
      );
      expect(getResponse.status).toEqual(200);
      modelChecker({ ...mockVideo, title: 'new title', minAgeRestriction: 15 })(getResponse.body);
    });

    it(`api/videos/PUT/\${wrong id} NOT FOUND`, async () => {
      const putResponse = await request(app.getHttpServer())
        .put(`/api/videos/b7737c30-de46-4f21-afac-26fbfddc6c1e`)
        .send({
          title: 'new title',
          minAgeRestriction: 15,
        });
      expect(putResponse.status).toEqual(404);
    });

    it(`api/videos/PUT/\${id} BAD REQUEST`, async () => {
      const putResponse = await request(app.getHttpServer())
        .put(`/api/videos/${postResponse.body.id}`)
        .send({
          availabledResolutions: 'bla-bla',
          minAgeRestriction: 90,
        });
      expect(putResponse.status).toEqual(400);
    });

    afterAll(() => {
      return request(app.getHttpServer()).del(`/api/videos/${postResponse.body.id}`);
    });
  });

  describe('delete by id', () => {
    let postResponse;
    beforeAll(async () => {
      postResponse = await request(app.getHttpServer()).post('/api/videos').send(mockVideo);
      return;
    });

    it(`api/videos/DEL/\${id}`, async () => {
      const delResponse = await request(app.getHttpServer()).del(
        `/api/videos/${postResponse.body.id}`,
      );
      expect(delResponse.status).toEqual(204);
    });

    it(`api/videos/DEL/\${wrong id} NOT FOUND`, async () => {
      const delResponse = await request(app.getHttpServer()).del(
        `/api/videos/b7737c30-de46-4f21-afac-26fbfddc6c1e`,
      );
      expect(delResponse.status).toEqual(404);
    });
  });

  afterAll(() => app.close());
});
