import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'; 
import { AppModule } from '../src/app.module';
import { JobStatus } from '../src/jobs/entities/job.entity';

describe('Radar (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/jobs/radar (GET)', () => {
    return request(app.getHttpServer())
      .get('/jobs/radar')
      .query({
        latitude: -6.4584,
        longitude: -37.0979,
        radius: 10000,
      })
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        if (res.body.length > 0) {
          expect(res.body[0].status).toBe(JobStatus.SEARCHING);
        }
      });
  });

  afterAll(async () => {
    await app.close();
  });
});