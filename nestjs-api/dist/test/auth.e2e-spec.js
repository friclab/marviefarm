"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../src/app.module");
const prisma_service_1 = require("../src/prisma/prisma.service");
const bcrypt = require("bcrypt");
describe('Auth (e2e)', () => {
    let app;
    let prisma;
    let testUserId;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({ imports: [app_module_1.AppModule] }).compile();
        app = module.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
        await app.init();
        prisma = module.get(prisma_service_1.PrismaService);
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
    it('POST /auth/login → 401 with wrong password', () => request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: `testuser_${testUserId}`, password: 'wrong' })
        .expect(401));
    it('POST /auth/login → 200 with valid credentials', async () => {
        const user = await prisma.user.findUnique({ where: { id: testUserId } });
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: user.username, password: 'testpass' })
            .expect(201);
        expect(res.body).toHaveProperty('accessToken');
        expect(typeof res.body.accessToken).toBe('string');
    });
    it('GET /sexes → 401 without token', () => request(app.getHttpServer()).get('/sexes').expect(401));
    it('POST /auth/logout → 201 with token', async () => {
        const user = await prisma.user.findUnique({ where: { id: testUserId } });
        const loginRes = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: user.username, password: 'testpass' });
        await request(app.getHttpServer())
            .post('/auth/logout')
            .set('Authorization', `Bearer ${loginRes.body.accessToken}`)
            .expect(201);
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map