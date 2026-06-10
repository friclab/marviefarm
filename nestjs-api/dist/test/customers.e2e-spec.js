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
describe('Customers (e2e)', () => {
    let app;
    let prisma;
    let token;
    let testUserId;
    const testUsername = `e2e_cust_${Date.now()}`;
    const createdIds = [];
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
        await prisma.customer.deleteMany({ where: { id: { in: createdIds } } });
        await prisma.user.delete({ where: { id: testUserId } });
        await app.close();
    });
    const auth = () => ({ Authorization: `Bearer ${token}` });
    const post = (body) => request(app.getHttpServer()).post('/customers').set(auth()).send(body);
    const get = (path) => request(app.getHttpServer()).get(path).set(auth());
    const patch = (id, body) => request(app.getHttpServer()).patch(`/customers/${id}`).set(auth()).send(body);
    const del = (id) => request(app.getHttpServer()).delete(`/customers/${id}`).set(auth());
    it('POST /customers → 201 with company + person', async () => {
        const res = await post({
            company: 'Boutique Milano',
            name: 'Giulia',
            surname: 'Rossi',
            vatApplied: 22,
        }).expect(201);
        expect(res.body.displayName).toBe('Boutique Milano - Giulia Rossi');
        expect(res.body.vatApplied).toBe(22);
        createdIds.push(res.body.id);
    });
    it('POST /customers → 201 only company', async () => {
        const res = await post({ company: 'Solo Corp' }).expect(201);
        expect(res.body.displayName).toBe('Solo Corp');
        createdIds.push(res.body.id);
    });
    it('POST /customers → 201 only person', async () => {
        const res = await post({ name: 'Marco', surname: 'Bianchi' }).expect(201);
        expect(res.body.displayName).toBe('Marco Bianchi');
        createdIds.push(res.body.id);
    });
    it('GET /customers → paginated list', () => get('/customers').expect(200).expect(r => {
        expect(r.body).toHaveProperty('data');
        expect(r.body).toHaveProperty('total');
    }));
    it('GET /customers/:id → 200', () => get(`/customers/${createdIds[0]}`).expect(200));
    it('PATCH /customers/:id → updates email', async () => {
        const res = await patch(createdIds[0], { email: 'test@example.com' }).expect(200);
        expect(res.body.email).toBe('test@example.com');
    });
    it('POST /customers → invalid email → 400', () => post({ email: 'not-an-email' }).expect(400));
    it('GET /customers/9999999 → 404', () => get('/customers/9999999').expect(404));
    it('DELETE /customers/:id → 204', async () => {
        const id = createdIds.pop();
        await del(id).expect(204);
    });
});
//# sourceMappingURL=customers.e2e-spec.js.map