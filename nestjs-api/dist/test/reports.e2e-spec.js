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
describe('Reports (e2e)', () => {
    let app;
    let prisma;
    let token;
    let testUserId;
    const testUsername = `e2e_rep_${Date.now()}`;
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
    });
    afterAll(async () => {
        await prisma.user.delete({ where: { id: testUserId } });
        await app.close();
    });
    const auth = () => ({ Authorization: `Bearer ${token}` });
    const get = (url) => request(app.getHttpServer()).get(url).set(auth());
    describe('Cost calculation CSV', () => {
        it('GET /reports/cost-calculation → 200 CSV', async () => {
            const res = await get('/reports/cost-calculation').expect(200);
            expect(res.headers['content-type']).toContain('text/csv');
            expect(res.headers['content-disposition']).toContain('cost_calculation.csv');
            expect(res.text).toContain('Articolo,Descrizione');
        });
        it('GET /reports/cost-calculation?multiplier=2 → 200', () => get('/reports/cost-calculation?multiplier=2').expect(200));
    });
    describe('Articles list PDF', () => {
        it('GET /reports/articles-list → 200 PDF', async () => {
            const res = await get('/reports/articles-list').expect(200);
            expect(res.headers['content-type']).toContain('application/pdf');
        }, 30_000);
    });
    describe('Order form PDF', () => {
        it('GET /reports/orders/form → 200 PDF', async () => {
            const res = await get('/reports/orders/form').expect(200);
            expect(res.headers['content-type']).toContain('application/pdf');
        }, 30_000);
    });
    describe.skip('Order-specific PDFs (requires seeded order)', () => {
        const ORDER_ID = 1;
        it('GET /reports/orders/:id/export → 200 PDF', () => get(`/reports/orders/${ORDER_ID}/export`).expect(200));
        it('GET /reports/orders/:id/choose-quantity → 200 PDF', () => get(`/reports/orders/${ORDER_ID}/choose-quantity`).expect(200));
        it('GET /reports/orders/:id/choose-quantity-ws → 200 PDF', () => get(`/reports/orders/${ORDER_ID}/choose-quantity-ws`).expect(200));
    });
});
//# sourceMappingURL=reports.e2e-spec.js.map