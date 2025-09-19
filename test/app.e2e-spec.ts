import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { v4 as uuid } from 'uuid';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/notificar (POST)', async () => {
    const mensagemId = uuid();

    const res = await request(app.getHttpServer())
      .post('/api/notificar')
      .send({ mensagemId, conteudoMensagem: 'Teste integração' })
      .expect(202);

    expect(res.body).toEqual({
      mensagemId,
      status: 'AGUARDANDO_PROCESSAMENTO',
    });
  });
});
