import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import request from 'supertest';
describe('Workers (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let workerId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // cria usuário para autenticação
    await request(app.getHttpServer()).post('/auth/register').send({
      firstName: 'Teste',
      lastName: 'Worker',
      email: 'worker@test.com',
      password: '123456',
    });

    // faz login e captura token
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'worker@test.com',
        password: '123456',
      });

    token = login.body.token || login.body.access_token;
  });

  it('POST /workers - criar worker', async () => {
    const response = await request(app.getHttpServer())
      .post('/workers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'João',
        role: 'Pedreiro',
      })
      .expect(201);

    workerId = response.body.id;

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('João');
  });

  it('GET /workers - listar workers', async () => {
    const response = await request(app.getHttpServer())
      .get('/workers')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /workers/:id - buscar worker', async () => {
    const response = await request(app.getHttpServer())
      .get(`/workers/${workerId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.id).toBe(workerId);
  });

  it('PATCH /workers/:id - atualizar worker', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/workers/${workerId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        role: 'Eletricista',
      })
      .expect(200);

    expect(response.body.role).toBe('Eletricista');
  });

  it('DELETE /workers/:id - remover worker', async () => {
    await request(app.getHttpServer())
      .delete(`/workers/${workerId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});