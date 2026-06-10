/**
 * E2E tests for the Auth module.
 *
 * Requires DATABASE_URL in env pointing to a test database.
 * Run with: npm run test:e2e
 */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let testUserId: number;

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();

    prisma = module.get(PrismaService);

    // Seed a test user with bcrypt-hashed password
    const hash = await bcrypt.hash('testpass', 12);
    const user = await prisma.user.create({
      data: { username: `testuser_${Date.now()}`, password: hash },
    });
    testUserId = user.id;
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: testUserId } });
    await app.close();
  });

  it('POST /auth/login → 401 with wrong password', () =>
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: `testuser_${testUserId}`, password: 'wrong' })
      .expect(401));

  it('POST /auth/login → 200 with valid credentials', async () => {
    const user = await prisma.user.findUnique({ where: { id: testUserId } });
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: user!.username, password: 'testpass' })
      .expect(201);

    expect(res.body).toHaveProperty('accessToken');
    expect(typeof res.body.accessToken).toBe('string');
  });

  it('GET /sexes → 401 without token', () =>
    request(app.getHttpServer()).get('/sexes').expect(401));

  it('POST /auth/logout → 201 with token', async () => {
    const user = await prisma.user.findUnique({ where: { id: testUserId } });
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: user!.username, password: 'testpass' });

    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${loginRes.body.accessToken}`)
      .expect(201);
  });
});
