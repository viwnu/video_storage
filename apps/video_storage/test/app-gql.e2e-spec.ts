import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as request from 'supertest';

import { modelChecker } from './utils/model.checker';
import { AppModule } from '../src/features/app.module';
import { availabledResolutions } from '../src/const';

describe('App gql (e2e)', () => {
  let app: INestApplication;

  const mockVideo = {
    id: randomUUID(),
    title: 'test video',
    author: 'test author',
    availabledResolutions: availabledResolutions.P480,
    canBeDownloaded: true,
    minAgeRestriction: 1,
    publicationDate: new Date().toISOString(),
  };

  const createVideoDto = {
    title: mockVideo.title,
    author: mockVideo.author,
    availabledResolutions: mockVideo.availabledResolutions,
    canBeDownloaded: mockVideo.canBeDownloaded,
    minAgeRestriction: mockVideo.minAgeRestriction,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication({ logger: false });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  describe('delete all', () => {
    beforeAll(async () => {
      await Promise.all(
        [1, 2, 3].map(async () => {
          const mutation = `
          mutation createVideo($createVideoDto: CreateVideoInputType!) {
            createVideo(createVideoDto: $createVideoDto){
              ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
            }
          }`;
          return await request(app.getHttpServer())
            .post('/graphql')
            .send({
              query: mutation,
              operationName: 'createVideo',
              variables: { createVideoDto: createVideoDto },
            });
        }),
      );
    });

    it(`mutation deleteAllVideos`, () => {
      const mutation = `
        mutation deleteAllVideos {
          deleteAllVideos {
            success
          }
        }`;
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation, operationName: 'deleteAllVideos' })
        .then(({ body }) => {
          expect(body.data.deleteAllVideos.success).toBeTruthy();
        });
    });
  });

  describe('post', () => {
    let postResponse;

    it(`mutation createVideo`, async () => {
      const mutation = `
          mutation createVideo($createVideoDto: CreateVideoInputType!) {
            createVideo(createVideoDto: $createVideoDto){
              ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
            }
          }`;
      postResponse = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          operationName: 'createVideo',
          variables: { createVideoDto: createVideoDto },
        });
      modelChecker(mockVideo)(postResponse.body.data.createVideo);
    });

    it(`query { video(\${id}) }`, async () => {
      const query = `
        query {
          video(id: "${postResponse.body.data.createVideo.id}") {
            ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
          } 
        }`;
      const getResponse = await request(app.getHttpServer()).post('/graphql').send({ query });
      modelChecker(mockVideo)(getResponse.body.data.video);
    });

    it(`mutation createVideo BAD_USER_INPUT`, async () => {
      const mutation = `
          mutation createVideo($createVideoDto: CreateVideoInputType!) {
            createVideo(createVideoDto: $createVideoDto){
              ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
            }
          }`;
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          operationName: 'createVideo',
          variables: { createVideoDto: { title: createVideoDto.title } },
        });
      expect(response.body.errors[0].extensions.code).toEqual('BAD_USER_INPUT');
    });

    afterAll(async () => {
      const mutation = `
        mutation deleteVideo($id: String) {
          deleteVideo(id: $id) {
            success
          }
        }`;
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation, operationName: 'deleteVideo', variables: { id: postResponse.body.data.createVideo.id } })
        .then(({ body }) => {
          expect(body.data.deleteVideo.success).toBeTruthy();
        });
    });
  });

  describe('get all', () => {
    beforeAll(async () => {
      await Promise.all(
        [1, 2, 3].map(async () => {
          const mutation = `
          mutation createVideo($createVideoDto: CreateVideoInputType!) {
            createVideo(createVideoDto: $createVideoDto){
              ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
            }
          }`;
          return await request(app.getHttpServer())
            .post('/graphql')
            .send({
              query: mutation,
              operationName: 'createVideo',
              variables: { createVideoDto: createVideoDto },
            });
        }),
      );
    });

    it('query videos', async () => {
      const query = `
        query {
          videos {
            ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
          } 
        }`;
      const response = await request(app.getHttpServer()).post('/graphql').send({ query });
      expect(response.body.data.videos).toHaveProperty('length');
      modelChecker(mockVideo)(response.body.data.videos[0]);
    });

    afterAll(async () => {
      const mutation = `
        mutation deleteAllVideos {
          deleteAllVideos {
            success
          }
        }`;
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation, operationName: 'deleteAllVideos' })
        .then(({ body }) => {
          expect(body.data.deleteAllVideos.success).toBeTruthy();
        });
    });
  });

  describe('get by id', () => {
    let postResponse;
    beforeAll(async () => {
      const mutation = `
          mutation createVideo($createVideoDto: CreateVideoInputType!) {
            createVideo(createVideoDto: $createVideoDto){
              ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
            }
          }`;
      postResponse = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          operationName: 'createVideo',
          variables: { createVideoDto: createVideoDto },
        });
      modelChecker(mockVideo)(postResponse.body.data.createVideo);
    });

    it(`query { video(\${id}) }`, async () => {
      const query = `
        query {
          video(id: "${postResponse.body.data.createVideo.id}") {
            ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
          } 
        }`;
      const getResponse = await request(app.getHttpServer()).post('/graphql').send({ query });
      modelChecker(mockVideo)(getResponse.body.data.video);
    });

    it(`query { video(\${wrong id}) }`, async () => {
      const query = `
        query {
          video(id: "${randomUUID()}") {
            ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
          } 
        }`;
      const getResponse = await request(app.getHttpServer()).post('/graphql').send({ query });
      expect(getResponse.body.errors[0].extensions.statusCode).toEqual(404);
    });

    afterAll(async () => {
      const mutation = `
        mutation deleteVideo($id: String) {
          deleteVideo(id: $id) {
            success
          }
        }`;
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation, operationName: 'deleteVideo', variables: { id: postResponse.body.data.createVideo.id } })
        .then(({ body }) => {
          expect(body.data.deleteVideo.success).toBeTruthy();
        });
    });
  });

  describe('put', () => {
    let postResponse;
    beforeAll(async () => {
      const mutation = `
          mutation createVideo($createVideoDto: CreateVideoInputType!) {
            createVideo(createVideoDto: $createVideoDto){
              ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
            }
          }`;
      postResponse = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          operationName: 'createVideo',
          variables: { createVideoDto: createVideoDto },
        });
      modelChecker(mockVideo)(postResponse.body.data.createVideo);
    });

    it(`mutation updateVideo(\${id}, $dto: UpdateVideoInputType!)`, async () => {
      const mutation = `
          mutation updateVideo($id: String, $dto: UpdateVideoInputType!) {
            updateVideo(id: $id, updateVideoDto: $dto){
              success
            }
          }`;
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          operationName: 'updateVideo',
          variables: {
            id: postResponse.body.data.createVideo.id,
            dto: { title: 'changed title' },
          },
        });
      expect(response.body.data.updateVideo.success).toBeTruthy();
    });

    it(`query { video(\${id}) }`, async () => {
      const query = `
        query {
          video(id: "${postResponse.body.data.createVideo.id}") {
            ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
          } 
        }`;
      const getResponse = await request(app.getHttpServer()).post('/graphql').send({ query });
      modelChecker({ ...mockVideo, title: 'changed title' })(getResponse.body.data.video);
    });

    it(`mutation updateVideo(\${wrong id}, $dto: UpdateVideoInputType!) NOT FOUND`, async () => {
      const mutation = `
          mutation updateVideo($id: String, $dto: UpdateVideoInputType!) {
            updateVideo(id: $id, updateVideoDto: $dto){
              success
            }
          }`;
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          operationName: 'updateVideo',
          variables: {
            id: randomUUID(),
            dto: { title: 'changed title' },
          },
        });
      expect(response.body.errors[0].extensions.statusCode).toEqual(404);
    });

    it(`mutation updateVideo(\${id}, $dto: INVALID_INPUT) BAD_USER_INPUT`, async () => {
      const mutation = `
          mutation updateVideo($id: String, $dto: UpdateVideoInputType!) {
            updateVideo(id: $id, updateVideoDto: $dto){
              success
            }
          }`;
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          operationName: 'updateVideo',
          variables: {
            id: postResponse.body.data.createVideo.id,
            dto: { title: 'changed title', availabledResolutions: 90 },
          },
        });
      expect(response.body.errors[0].extensions.code).toEqual('BAD_USER_INPUT');
    });

    afterAll(async () => {
      const mutation = `
        mutation deleteVideo($id: String) {
          deleteVideo(id: $id) {
            success
          }
        }`;
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation, operationName: 'deleteVideo', variables: { id: postResponse.body.data.createVideo.id } })
        .then(({ body }) => {
          expect(body.data.deleteVideo.success).toBeTruthy();
        });
    });
  });

  describe('delete by id', () => {
    let postResponse;
    beforeAll(async () => {
      const mutation = `
          mutation createVideo($createVideoDto: CreateVideoInputType!) {
            createVideo(createVideoDto: $createVideoDto){
              ${Object.keys(mockVideo).reduce((acc, key) => acc + '\n' + key)}
            }
          }`;
      postResponse = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          operationName: 'createVideo',
          variables: { createVideoDto: createVideoDto },
        });
      modelChecker(mockVideo)(postResponse.body.data.createVideo);
    });

    it(`mutation deleteVideo($id: String)`, async () => {
      const mutation = `
        mutation deleteVideo($id: String) {
          deleteVideo(id: $id) {
            success
          }
        }`;
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation, operationName: 'deleteVideo', variables: { id: postResponse.body.data.createVideo.id } })
        .then(({ body }) => {
          expect(body.data.deleteVideo.success).toBeTruthy();
        });
    });

    it(`mutation deleteVideo($wrong id: String) NOT FOUND`, async () => {
      const mutation = `
        mutation deleteVideo($id: String) {
          deleteVideo(id: $id) {
            success
          }
        }`;
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: mutation, operationName: 'deleteVideo', variables: { id: randomUUID() } })
        .then(({ body }) => {
          expect(body.errors[0].extensions.statusCode).toEqual(404);
        });
    });
  });

  afterAll(() => app.close());
});
