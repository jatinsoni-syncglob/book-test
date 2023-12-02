import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Book Api', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/book (GET)', () => {
    return request(app.getHttpServer())
      .get('/book')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBeGreaterThan(0);

        for (const row of res.body) {
          expect(row).toHaveProperty('title');
          expect(row).toHaveProperty('isbn');
        }
      });
  });
});
