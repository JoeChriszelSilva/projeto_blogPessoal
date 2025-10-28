import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    afterAll(async () => {
      await app.close();
    });

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
});
