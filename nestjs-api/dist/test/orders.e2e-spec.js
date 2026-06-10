"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const bcrypt = require("bcrypt");
const app_module_1 = require("../src/app.module");
const prisma_service_1 = require("../src/prisma/prisma.service");
async function getToken(app, username) {
    const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username, password: 'pass' });
    return res.body.accessToken;
}
describe('Orders (e2e)', () => {
    let app;
    let prisma;
    let token;
    let testUserId;
    const testUsername = `e2e_ord_${Date.now()}`;
    let customerId;
    let articleId;
    let fabricId;
    let modeltypeSexId;
    let modeltypeSexSizeId;
    let seedSexId;
    let seedMtId;
    let seedSizeId;
    const ids = {
        orderHeader: [],
        orderDetail: [],
    };
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({ imports: [app_module_1.AppModule] }).compile();
        app = module.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
        await app.init();
        prisma = module.get(prisma_service_1.PrismaService);
        const hash = await bcrypt.hash('pass', 12);
        const user = await prisma.user.create({ data: { username: testUsername, password: hash } });
        testUserId = user.id;
        token = await getToken(app, testUsername);
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
    const post = (url, body) => request(app.getHttpServer()).post(url).set(auth()).send(body);
    const get = (url) => request(app.getHttpServer()).get(url).set(auth());
    const patch = (url, body) => request(app.getHttpServer()).patch(url).set(auth()).send(body);
    const del = (url) => request(app.getHttpServer()).delete(url).set(auth());
    describe('OrderHeader', () => {
        let ohId;
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
            ohId = res.body.id;
            ids.orderHeader.push(ohId);
        });
        it('GET /order-headers → paginated', () => get('/order-headers').expect(200).expect(r => expect(r.body).toHaveProperty('data')));
        it('GET /order-headers/:id → 200 with totals', async () => {
            const res = await get(`/order-headers/${ohId}`).expect(200);
            expect(res.body.totals).toBeDefined();
            expect(res.body.orderDetails).toEqual([]);
        });
        it('POST /order-headers → bad customerId → 400', () => post('/order-headers', { customerId: 9999999 }).expect(400));
        it('GET /order-headers/9999999 → 404', () => get('/order-headers/9999999').expect(404));
    });
    describe('OrderDetail', () => {
        let ohId;
        let odId;
        beforeAll(async () => {
            const res = await post('/order-headers', { customerId, orderNumber: 'E2E-DET' }).expect(201);
            ohId = res.body.id;
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
            expect(res.body.fabric.id).toBe(fabricId);
            odId = res.body.id;
            ids.orderDetail.push(odId);
        });
        it('GET /order-headers/:id → totals updated after detail added', async () => {
            const res = await get(`/order-headers/${ohId}`).expect(200);
            expect(res.body.totals.partialTotal).toBe(250);
            expect(res.body.orderDetails).toHaveLength(1);
        });
        it('PATCH /order-details/:id → updates quantity', async () => {
            const res = await patch(`/order-details/${odId}`, { quantity: 10 }).expect(200);
            expect(res.body.quantity).toBe(10);
        });
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
        it('POST /order-details/batch → creates multiple details', async () => {
            const res = await post('/order-details/batch', {
                orderHeaderId: ohId,
                articleId,
                fabricId,
                items: [
                    { modeltypeSexSizeId, quantity: 3 },
                    { modeltypeSexSizeId, quantity: 0 },
                ],
            }).expect(201);
            expect(res.body.created).toBe(1);
        });
        it('DELETE /order-details/:id → 204', () => del(`/order-details/${odId}`).expect(204).then(() => {
            ids.orderDetail.splice(ids.orderDetail.indexOf(odId), 1);
        }));
    });
});
//# sourceMappingURL=orders.e2e-spec.js.map