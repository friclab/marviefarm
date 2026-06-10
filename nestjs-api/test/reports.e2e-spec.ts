/**
 * E2E tests — Reports module.
 *
 * PDF tests require Puppeteer (headless Chrome).
 * The CSV cost calculation test does not require Puppeteer.
 *
 * PDF tests will fail with a clear "Cannot find module 'puppeteer'" error
 * if puppeteer is not installed (run `npm install` first).
 */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

async function getToken(app: INestApplication, username: string): Promise<string> {
  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ username, password: 'pass' });
  return res.body.accessToken as string;
}

describe('Reports (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let testUserId: number;
  const testUsername = `e2e_rep_${Date.now()}`;

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
    prisma = module.get(PrismaService);

    const hash = await bcrypt.hash('pass', 12);
    const user = await prisma.user.create({ data: { username: testUsername, password: hash } });
    testUserId = user.id;
    token = await getToken(app, testUsername);
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: testUserId } });
    await app.close();
  });

  const auth = () => ({ Authorization: `Bearer ${token}` });
  const get = (url: string) => request(app.getHttpServer()).get(url).set(auth());

  // ── Cost calculation CSV (no Puppeteer required) ───────────────────────────
  describe('Cost calculation CSV', () => {
    it('GET /reports/cost-calculation → 200 CSV', async () => {
      const res = await get('/reports/cost-calculation').expect(200);
      expect(res.headers['content-type']).toContain('text/csv');
      expect(res.headers['content-disposition']).toContain('cost_calculation.csv');
      // Body starts with the CSV header row
      expect(res.text).toContain('Articolo,Descrizione');
    });

    it('GET /reports/cost-calculation?multiplier=2 → 200', () =>
      get('/reports/cost-calculation?multiplier=2').expect(200));
  });

  // ── Articles list PDF (Puppeteer required) ─────────────────────────────────
  describe('Articles list PDF', () => {
    it('GET /reports/articles-list → 200 PDF', async () => {
      const res = await get('/reports/articles-list').expect(200);
      expect(res.headers['content-type']).toContain('application/pdf');
    }, 30_000); // generous timeout for Chrome launch
  });

  // ── Order form PDF (Puppeteer required) ────────────────────────────────────
  describe('Order form PDF', () => {
    it('GET /reports/orders/form → 200 PDF', async () => {
      const res = await get('/reports/orders/form').expect(200);
      expect(res.headers['content-type']).toContain('application/pdf');
    }, 30_000);
  });

  // ── Order-specific PDFs: require an existing order ─────────────────────────
  // These are integration tests — they need real data and Puppeteer.
  // Run manually after seeding an order: GET /reports/orders/:id/export
  describe.skip('Order-specific PDFs (requires seeded order)', () => {
    const ORDER_ID = 1;

    it('GET /reports/orders/:id/export → 200 PDF', () =>
      get(`/reports/orders/${ORDER_ID}/export`).expect(200));

    it('GET /reports/orders/:id/choose-quantity → 200 PDF', () =>
      get(`/reports/orders/${ORDER_ID}/choose-quantity`).expect(200));

    it('GET /reports/orders/:id/choose-quantity-ws → 200 PDF', () =>
      get(`/reports/orders/${ORDER_ID}/choose-quantity-ws`).expect(200));
  });
});
