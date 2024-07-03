import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import * as request from 'supertest';
import { readFile } from 'fs/promises';

import { AppModule } from '../src/app.module';
import { IFileDescription } from '../src/features/files/domain';
import { modelChecker } from './utils/model.checker';
import { FileMetaDataViewModel } from '../src/features/files/api/models/view';

describe('files (e2e)', () => {
  const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const urlRe = /((http([s]){0,1}:\/\/){0,1}(localhost|127.0.0.1){1}(([:]){0,1}[\0-9]{4}){0,1}\/{0,1}){1}/;

  let app: INestApplication;

  const mockFileDescription: IFileDescription = {
    id: randomUUID(),
    fileId: randomUUID(),
    title: 'new file',
  };

  const fileName = 'ТЗ files (2).docx';

  const mockFileMetaData: FileMetaDataViewModel = {
    id: randomUUID(),
    label: 'Ð¢Ð files (2).docx',
    url: 'http://test.com/fileId',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 19616,
    fileId: randomUUID(),
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

  describe('create file description', () => {
    let postResponse;

    it(`api/files/POST`, async () => {
      const payload = {
        fileId: mockFileDescription.fileId,
        title: mockFileDescription.title,
      };
      postResponse = await request(app.getHttpServer()).post('/api/files').send(payload);
      expect(postResponse.status).toEqual(201);
      modelChecker(mockFileDescription)(postResponse.body);
    });

    it(`api/files/POST BAD REQUEST`, () => {
      return request(app.getHttpServer())
        .post('/api/files')
        .send({
          fileId: mockFileDescription.fileId,
        })
        .expect(400);
    });

    afterAll(() => {
      return request(app.getHttpServer()).del(`/api/files/${postResponse.body.fileId}`);
    });
  });

  describe('upload file', () => {
    let postResponse;

    it(`api/files/POST`, async () => {
      const payload = {
        fileId: mockFileDescription.fileId,
        title: mockFileDescription.title,
      };
      postResponse = await request(app.getHttpServer()).post('/api/files').send(payload);
      expect(postResponse.status).toEqual(201);
      modelChecker(mockFileDescription)(postResponse.body);
    });

    it(`api/files/:fileID/upload POST`, async () => {
      const file = await readFile('C:/Users/Porfirev/Downloads/' + fileName);
      const uploadResponse = await request(app.getHttpServer())
        .post(`/api/files/${mockFileDescription.fileId}/upload`)
        .attach('file', file, {
          filename: fileName,
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
      expect(uploadResponse.status).toEqual(201);
      expect(uploadResponse.body.id).toMatch(uuidRe);
      expect(uploadResponse.body.label).toEqual(mockFileMetaData.label);
      expect(uploadResponse.body.url).toMatch(urlRe);
      expect(uploadResponse.body.type).toEqual(mockFileMetaData.type);
      expect(uploadResponse.body.size).toEqual(mockFileMetaData.size);
      expect(uploadResponse.body.fileId).toEqual(mockFileDescription.fileId);
    });

    it(`api/files/:fileID/upload POST(bad id)`, async () => {
      const file = await readFile('C:/Users/Porfirev/Downloads/' + fileName);
      const uploadResponse = await request(app.getHttpServer()).post(`/api/files/${'bad-id'}/upload`).attach('file', file, {
        filename: fileName,
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      expect(uploadResponse.status).toEqual(400);
    });

    it(`api/files/:fileID/upload POST(no file)`, async () => {
      const uploadResponse = await request(app.getHttpServer()).post(`/api/files/${mockFileDescription.fileId}/upload`);
      expect(uploadResponse.status).toEqual(400);
    });

    it(`api/files/:fileID/upload POST(not existed fileId)`, async () => {
      const uploadResponse = await request(app.getHttpServer()).post(`/api/files/${randomUUID()}/upload`);
      expect(uploadResponse.status).toEqual(404);
    });

    afterAll(() => {
      return request(app.getHttpServer()).del(`/api/files/${postResponse.body.fileId}`);
    });
  });

  describe('download file', () => {
    let postResponse;

    it(`api/files/POST`, async () => {
      const payload = {
        fileId: mockFileDescription.fileId,
        title: mockFileDescription.title,
      };
      postResponse = await request(app.getHttpServer()).post('/api/files').send(payload);
      expect(postResponse.status).toEqual(201);
      modelChecker(mockFileDescription)(postResponse.body);
    });

    it(`api/files/:fileID/upload POST`, async () => {
      const file = await readFile('C:/Users/Porfirev/Downloads/' + fileName);
      const uploadResponse = await request(app.getHttpServer())
        .post(`/api/files/${mockFileDescription.fileId}/upload`)
        .attach('file', file, {
          filename: fileName,
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
      expect(uploadResponse.status).toEqual(201);
      expect(uploadResponse.body.id).toMatch(uuidRe);
      expect(uploadResponse.body.label).toEqual(mockFileMetaData.label);
      expect(uploadResponse.body.url).toMatch(urlRe);
      expect(uploadResponse.body.type).toEqual(mockFileMetaData.type);
      expect(uploadResponse.body.size).toEqual(mockFileMetaData.size);
      expect(uploadResponse.body.fileId).toEqual(mockFileDescription.fileId);
    });

    it(`api/files/:fileId/download GET`, async () => {
      const downloadResponse = await request(app.getHttpServer()).get(`/api/files/${mockFileDescription.fileId}/download`);
      expect(downloadResponse.status).toEqual(200);
      expect(downloadResponse.header['content-type']).toEqual(mockFileMetaData.type);
      expect(downloadResponse.header['content-disposition']).toEqual(
        `attachment; filename="${mockFileDescription.title}.docx"`,
      );
      expect(downloadResponse.header['content-length']).toEqual(`${mockFileMetaData.size}`);
    });

    it(`api/files/:fileId/download GET (not existing fileId)`, async () => {
      const downloadResponse = await request(app.getHttpServer()).get(`/api/files/${randomUUID()}/download`);
      expect(downloadResponse.status).toEqual(404);
    });

    it(`api/files/:fileId/download GET (bad fileId)`, async () => {
      const downloadResponse = await request(app.getHttpServer()).get(`/api/files/${'bad-id'}/download`);
      expect(downloadResponse.status).toEqual(400);
    });

    afterAll(() => {
      return request(app.getHttpServer()).del(`/api/files/${postResponse.body.fileId}`);
    });
  });

  describe('download file streamable', () => {
    let postResponse;

    it(`api/files/POST`, async () => {
      const payload = {
        fileId: mockFileDescription.fileId,
        title: mockFileDescription.title,
      };
      postResponse = await request(app.getHttpServer()).post('/api/files').send(payload);
      expect(postResponse.status).toEqual(201);
      modelChecker(mockFileDescription)(postResponse.body);
    });

    it(`api/files/:fileID/upload POST`, async () => {
      const file = await readFile('C:/Users/Porfirev/Downloads/' + fileName);
      const uploadResponse = await request(app.getHttpServer())
        .post(`/api/files/${mockFileDescription.fileId}/upload`)
        .attach('file', file, {
          filename: fileName,
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
      expect(uploadResponse.status).toEqual(201);
      expect(uploadResponse.body.id).toMatch(uuidRe);
      expect(uploadResponse.body.label).toEqual(mockFileMetaData.label);
      expect(uploadResponse.body.url).toMatch(urlRe);
      expect(uploadResponse.body.type).toEqual(mockFileMetaData.type);
      expect(uploadResponse.body.size).toEqual(mockFileMetaData.size);
      expect(uploadResponse.body.fileId).toEqual(mockFileDescription.fileId);
    });

    it(`api/files/:fileId/download GET`, async () => {
      const downloadResponse = await request(app.getHttpServer()).get(
        `/api/files/${mockFileDescription.fileId}/download_streamable`,
      );
      expect(downloadResponse.status).toEqual(200);
      expect(downloadResponse.header['content-type']).toEqual(mockFileMetaData.type);
      expect(downloadResponse.header['content-disposition']).toEqual(
        `attachment; filename="${mockFileDescription.title}.docx"`,
      );
      expect(downloadResponse.header['content-length']).toEqual(`${mockFileMetaData.size}`);
    });

    it(`api/files/:fileId/download GET (not existing fileId)`, async () => {
      const downloadResponse = await request(app.getHttpServer()).get(`/api/files/${randomUUID()}/download`);
      expect(downloadResponse.status).toEqual(404);
    });

    it(`api/files/:fileId/download GET (bad fileId)`, async () => {
      const downloadResponse = await request(app.getHttpServer()).get(`/api/files/${'bad-id'}/download`);
      expect(downloadResponse.status).toEqual(400);
    });

    afterAll(() => {
      return request(app.getHttpServer()).del(`/api/files/${postResponse.body.fileId}`);
    });
  });

  describe('get file url', () => {
    let postResponse;

    it(`api/files/POST`, async () => {
      const payload = {
        fileId: mockFileDescription.fileId,
        title: mockFileDescription.title,
      };
      postResponse = await request(app.getHttpServer()).post('/api/files').send(payload);
      expect(postResponse.status).toEqual(201);
      modelChecker(mockFileDescription)(postResponse.body);
    });

    it(`api/files/:fileID/upload POST`, async () => {
      const file = await readFile('C:/Users/Porfirev/Downloads/' + fileName);
      const uploadResponse = await request(app.getHttpServer())
        .post(`/api/files/${mockFileDescription.fileId}/upload`)
        .attach('file', file, {
          filename: fileName,
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
      expect(uploadResponse.status).toEqual(201);
      expect(uploadResponse.body.id).toMatch(uuidRe);
      expect(uploadResponse.body.label).toEqual(mockFileMetaData.label);
      expect(uploadResponse.body.url).toMatch(urlRe);
      expect(uploadResponse.body.type).toEqual(mockFileMetaData.type);
      expect(uploadResponse.body.size).toEqual(mockFileMetaData.size);
      expect(uploadResponse.body.fileId).toEqual(mockFileDescription.fileId);
    });

    it(`api/files/:fileId/url GET`, async () => {
      const getResponse = await request(app.getHttpServer()).get(`/api/files/${mockFileDescription.fileId}/url`);
      expect(getResponse.status).toEqual(200);
      expect(getResponse.text).toMatch(urlRe);
    });

    it(`api/files/:fileId/url GET (bad fileId)`, async () => {
      const getResponse = await request(app.getHttpServer()).get(`/api/files/${'bad-id'}/url`);
      expect(getResponse.status).toEqual(400);
    });

    it(`api/files/:fileId/url GET (not existing fileId)`, async () => {
      const getResponse = await request(app.getHttpServer()).get(`/api/files/${randomUUID()}/url`);
      expect(getResponse.status).toEqual(404);
    });

    afterAll(() => {
      return request(app.getHttpServer()).del(`/api/files/${postResponse.body.fileId}`);
    });
  });

  describe('delete file', () => {
    let postResponse;

    it(`api/files/POST`, async () => {
      const payload = {
        fileId: mockFileDescription.fileId,
        title: mockFileDescription.title,
      };
      postResponse = await request(app.getHttpServer()).post('/api/files').send(payload);
      expect(postResponse.status).toEqual(201);
      modelChecker(mockFileDescription)(postResponse.body);
    });

    it(`api/files/:fileID/upload POST`, async () => {
      const file = await readFile('C:/Users/Porfirev/Downloads/' + fileName);
      const uploadResponse = await request(app.getHttpServer())
        .post(`/api/files/${mockFileDescription.fileId}/upload`)
        .attach('file', file, {
          filename: fileName,
          contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
      expect(uploadResponse.status).toEqual(201);
      expect(uploadResponse.body.id).toMatch(uuidRe);
      expect(uploadResponse.body.label).toEqual(mockFileMetaData.label);
      expect(uploadResponse.body.url).toMatch(urlRe);
      expect(uploadResponse.body.type).toEqual(mockFileMetaData.type);
      expect(uploadResponse.body.size).toEqual(mockFileMetaData.size);
      expect(uploadResponse.body.fileId).toEqual(mockFileDescription.fileId);
    });

    it(`api/files/:fileId DELETE`, async () => {
      const deleteResponse = await request(app.getHttpServer()).delete(`/api/files/${mockFileDescription.fileId}`);
      expect(deleteResponse.status).toEqual(204);
    });

    it(`api/files/:fileId DELETE (bad fileId)`, async () => {
      const deleteResponse = await request(app.getHttpServer()).delete(`/api/files/${'bad-fileId'}`);
      expect(deleteResponse.status).toEqual(400);
    });

    it(`api/files/:fileId DELETE (not existing fileId)`, async () => {
      const deleteResponse = await request(app.getHttpServer()).delete(`/api/files/${randomUUID()}`);
      expect(deleteResponse.status).toEqual(404);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
