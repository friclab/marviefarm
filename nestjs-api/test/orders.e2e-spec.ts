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

describe('Orders (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let testUserId: number;
  const testUsername = `e2e_ord_${Date.now()}`;

  // Seed IDs
  let customerId: number;
  let articleId: number;
  let fabricId: number;
  let modeltypeSexId: number;
  let modeltypeSexSizeId: number;
  let seedSexId: number;
  let seedMtId: number;
  let seedSizeId: number;

  const ids = {
    orderHeader: [] as number[],
    orderDetail: [] as number[],
  };

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

    // Seed required entities
    const cust = await prisma.customer.create({
      data: { company: 'E2E Orders Customer', vatApplied: 22 },
    });
    customerId = cust.id;

    const mt = await prisma.modeltype.create({ data: { code: 'E2E_OMT', description: null } });
    seedMtId = mt.id;
    const sx = await prisma.sex.create({ data: { code: 'E2E_OSX' } });
    seedSexId = sx.id;
    const mts = await prisma.modeltypeSex.create({ data: { modeltypeId: mt.id, sexId: sx.id } });
    modeltypeSexId = mts.id;

    const sz = await prisma.size.create({ data: { code: 'E2E_SZ' } });
    seedSizeId = sz.id;
    const mtss = await prisma.modeltypeSexSize.create({
      data: { modeltypeSexId: mts.id, sizeId: sz.id },
    });
    modeltypeSexSizeId = mtss.id;

    const art = await prisma.article.create({
      data: { name: 'E2E Order Article', modeltypesSexId: mts.id },
    });
    articleId = art.id;

    const fab = await prisma.fabric.create({
      data: { code: 'E2E_OF01', price: 50, articleId: art.id },
    });
    fabricId = fab.id;
  });

  afterAll(async () => {
    await prisma.orderDetail.deleteMany({ where: { orderHeaderId: { in: ids.orderHeader } } });
    await prisma.orderHeader.deleteMany({ where: { id: { in: ids.orderHeader } } });
    await prisma.fabric.delete({ where: { id: fabricId } });
    await prisma.article.delete({ where: { id: articleId } });
    await prisma.modeltypeSexSize.delete({ where: { id: modeltypeSexSizeId } });
    await prisma.size.delete({ where: { id: seedSizeId } });
    await prisma.modeltypeSex.delete({ where: { id: modeltypeSexId } });
    await prisma.modeltype.delete({ where: { id: seedMtId } });
    await prisma.sex.delete({ where: { id: seedSexId } });
    await prisma.customer.delete({ where: { id: customerId } });
    await prisma.user.delete({ where: { id: testUserId } });
    await app.close();
  });

  const auth = () => ({ Authorization: `Bearer ${token}` });
  const post = (url: string, body: object) =>
    request(app.getHttpServer()).post(url).set(auth()).send(body);
  const get = (url: string) => request(app.getHttpServer()).get(url).set(auth());
  const patch = (url: string, body: object) =>
    request(app.getHttpServer()).patch(url).set(auth()).send(body);
  const del = (url: string) => request(app.getHttpServer()).delete(url).set(auth());

  // ── OrderHeader ────────────────────────────────────────────────────────────
  describe('OrderHeader', () => {
    let ohId: number;

    it('GET /order-headers/next-number → { nextId: number }', async () => {
      const res = await get('/order-headers/next-number').expect(200);
      expect(typeof res.body.nextId).toBe('number');
      expect(res.body.nextId).toBeGreaterThan(0);
    });

    it('POST /order-headers → 201 with totals', async () => {
      const res = await post('/order-headers', {
        customerId,
        orderNumber: 'E2E-001',
        discount: 10,
        date: '2024-06-01',
      }).expect(201);

      expect(res.body.orderNumber).toBe('E2E-001');
      expect(res.body.totals).toBeDefined();
      expect(res.body.totals.partialTotal).toBe(0);
      ohId = res.body.id as number;
      ids.orderHeader.push(ohId);
    });

    it('GET /order-headers → paginated', () =>
      get('/order-headers').expect(200).expect(r => expect(r.body).toHaveProperty('data')));

    it('GET /order-headers/:id → 200 with totals', async () => {
      const res = await get(`/order-headers/${ohId}`).expect(200);
      expect(res.body.totals).toBeDefined();
      expect(res.body.orderDetails).toEqual([]);
    });

    it('POST /order-headers → bad customerId → 400', () =>
      post('/order-headers', { customerId: 9999999 }).expect(400));

    it('GET /order-headers/9999999 → 404', () => get('/order-headers/9999999').expect(404));
  });

  // ── OrderDetail ────────────────────────────────────────────────────────────
  describe('OrderDetail', () => {
    let ohId: number;
    let odId: number;

    beforeAll(async () => {
      const res = await post('/order-headers', { customerId, orderNumber: 'E2E-DET' }).expect(201);
      ohId = res.body.id as number;
      ids.orderHeader.push(ohId);
    });

    it('POST /order-details → 201', async () => {
      const res = await post('/order-details', {
        orderHeaderId: ohId,
        articleId,
        fabricId,
        modeltypeSexSizeId,
        quantity: 5,
      }).expect(201);

      expect(res.body.quantity).toBe(5);
      expect(res.body.article.id).toBe(articleId);
      expect(res.body.fabric!.id).toBe(fabricId);
      odId = res.body.id as number;
      ids.orderDetail.push(odId);
    });

    it('GET /order-headers/:id → totals updated after detail added', async () => {
      const res = await get(`/order-headers/${ohId}`).expect(200);
      // price=50, qty=5, no discount, no vat → partialTotal=250
      expect(res.body.totals.partialTotal).toBe(250);
      expect(res.body.orderDetails).toHaveLength(1);
    });

    it('PATCH /order-details/:id → updates quantity', async () => {
      const res = await patch(`/order-details/${odId}`, { quantity: 10 }).expect(200);
      expect(res.body.quantity).toBe(10);
    });

    // AJAX endpoints
    it('GET /order-details/fabric-options?articleId → fabric list', async () => {
      const res = await get(`/order-details/fabric-options?articleId=${articleId}`).expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].code).toBe('E2E_OF01');
    });

    it('GET /order-details/size-options?articleId → size list', async () => {
      const res = await get(`/order-details/size-options?articleId=${articleId}`).expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].modeltypeSexSizeId).toBe(modeltypeSexSizeId);
    });

    it('GET /order-details/article-info?articleId → article + fabrics', async () => {
      const res = await get(`/order-details/article-info?articleId=${articleId}`).expect(200);
      expect(res.body.articleId).toBe(articleId);
      expect(Array.isArray(res.body.fabrics)).toBe(true);
    });

    // Batch create
    it('POST /order-details/batch → creates multiple details', async () => {
      const res = await post('/order-details/batch', {
        orderHeaderId: ohId,
        articleId,
        fabricId,
        items: [
          { modeltypeSexSizeId, quantity: 3 },
          { modeltypeSexSizeId, quantity: 0 },  // should be skipped
        ],
      }).expect(201);
      expect(res.body.created).toBe(1);
    });

    it('DELETE /order-details/:id → 204', () =>
      del(`/order-details/${odId}`).expect(204).then(() => {
        ids.orderDetail.splice(ids.orderDetail.indexOf(odId), 1);
      }));
  });

  // ── Price snapshot ───────────────────────────────────────────────────────────
  describe('Price snapshot (frozen totals)', () => {
    let ohId: number;

    it('freezes fabric.price onto the line at creation', async () => {
      const oh = await post('/order-headers', { customerId, orderNumber: 'E2E-FREEZE' }).expect(201);
      ohId = oh.body.id as number;
      ids.orderHeader.push(ohId);

      const od = await post('/order-details', {
        orderHeaderId: ohId, articleId, fabricId, modeltypeSexSizeId, quantity: 5,
      }).expect(201);
      ids.orderDetail.push(od.body.id as number);
      // fabric price is 50 → snapshot captured on the line
      expect(od.body.unitPrice).toBe(50);
    });

    it('does NOT alter saved totals when fabric.price changes afterwards', async () => {
      const before = await get(`/order-headers/${ohId}`).expect(200);
      expect(before.body.totals.partialTotal).toBe(250); // 50 × 5

      // Mutate the live fabric price directly in the DB.
      await prisma.fabric.update({ where: { id: fabricId }, data: { price: 999 } });
      try {
        const after = await get(`/order-headers/${ohId}`).expect(200);
        // Totals stay frozen because they read the line's unitPrice snapshot.
        expect(after.body.totals.partialTotal).toBe(250);
        expect(after.body.orderDetails[0].unitPrice).toBe(50);
      } finally {
        await prisma.fabric.update({ where: { id: fabricId }, data: { price: 50 } });
      }
    });
  });

  // ── Season scoping (collectionId filter) ──────────────────────────────────────
  describe('Season scoping', () => {
    let collA: number;
    let collB: number;
    let orderA: number;
    let orderB: number;
    let articleA: number;   // bound to season A via its project
    let articleB: number;   // bound to season B via its project
    let projA: number;
    let projB: number;

    beforeAll(async () => {
      const a = await prisma.collection.create({ data: { name: 'E2E Season A', type: 'SS', year: 2027 } });
      const b = await prisma.collection.create({ data: { name: 'E2E Season B', type: 'FW', year: 2027 } });
      collA = a.id;
      collB = b.id;

      const oa = await post('/order-headers', { customerId, orderNumber: 'E2E-SA', collectionId: collA }).expect(201);
      const ob = await post('/order-headers', { customerId, orderNumber: 'E2E-SB', collectionId: collB }).expect(201);
      orderA = oa.body.id as number;
      orderB = ob.body.id as number;
      ids.orderHeader.push(orderA, orderB);

      const pa = await prisma.project.create({ data: { name: 'E2E Proj A', collectionId: collA } });
      const pb = await prisma.project.create({ data: { name: 'E2E Proj B', collectionId: collB } });
      projA = pa.id; projB = pb.id;
      const aa = await prisma.article.create({ data: { name: 'E2E Art A', modeltypesSexId: modeltypeSexId, projectId: projA } });
      const ab = await prisma.article.create({ data: { name: 'E2E Art B', modeltypesSexId: modeltypeSexId, projectId: projB } });
      articleA = aa.id; articleB = ab.id;
    });

    afterAll(async () => {
      // Order details reference the articles (possibly via a seasonless order too);
      // remove every line for these articles before deleting them.
      await prisma.orderDetail.deleteMany({ where: { articleId: { in: [articleA, articleB] } } });
      await prisma.article.deleteMany({ where: { id: { in: [articleA, articleB] } } });
      await prisma.project.deleteMany({ where: { id: { in: [projA, projB] } } });
      await prisma.collection.deleteMany({ where: { id: { in: [collA, collB] } } });
    });

    it('GET /order-headers?collectionId → returns only that season', async () => {
      const res = await get(`/order-headers?collectionId=${collA}`).expect(200);
      const numbers = (res.body.data as Array<{ orderNumber: string; collectionId: number }>).map(o => o.orderNumber);
      expect(numbers).toContain('E2E-SA');
      expect(numbers).not.toContain('E2E-SB');
      expect((res.body.data as Array<{ collectionId: number }>).every(o => o.collectionId === collA)).toBe(true);
    });

    it('GET /order-headers (no scope) → returns orders from all seasons', async () => {
      const res = await get('/order-headers?limit=1000').expect(200);
      const numbers = (res.body.data as Array<{ orderNumber: string }>).map(o => o.orderNumber);
      expect(numbers).toContain('E2E-SA');
      expect(numbers).toContain('E2E-SB');
    });

    it('GET /order-headers?collectionId=abc → 400 (validation)', () =>
      get('/order-headers?collectionId=abc').expect(400));

    // ── Cross-season order line validation (req. 2, soft) ──────────────────────
    it('POST /order-details → article from a different season → 400', () =>
      post('/order-details', { orderHeaderId: orderA, articleId: articleB, modeltypeSexSizeId, quantity: 1 }).expect(400));

    it('POST /order-details → article from the same season → 201', async () => {
      const res = await post('/order-details', {
        orderHeaderId: orderA, articleId: articleA, modeltypeSexSizeId, quantity: 1,
      }).expect(201);
      ids.orderDetail.push(res.body.id as number);
    });

    it('POST /order-details → seasonless legacy order accepts any article (soft)', async () => {
      const legacy = await post('/order-headers', { customerId, orderNumber: 'E2E-NOSEASON' }).expect(201);
      ids.orderHeader.push(legacy.body.id as number);
      const res = await post('/order-details', {
        orderHeaderId: legacy.body.id, articleId: articleB, modeltypeSexSizeId, quantity: 1,
      }).expect(201);
      ids.orderDetail.push(res.body.id as number);
    });
  });
});
