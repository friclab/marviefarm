"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const bcrypt = require("bcrypt");
const app_module_1 = require("../src/app.module");
const prisma_service_1 = require("../src/prisma/prisma.service");
async function getToken(app, username, password) {
    const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username, password });
    return res.body.accessToken;
}
describe('Sizing (e2e)', () => {
    let app;
    let prisma;
    let token;
    let testUsername;
    let testUserId;
    const createdSexIds = [];
    const createdModeltypeIds = [];
    const createdModeltypesSexIds = [];
    const createdSizeIds = [];
    const createdModeltypesSexSizeIds = [];
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({ imports: [app_module_1.AppModule] }).compile();
        app = module.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
        await app.init();
        prisma = module.get(prisma_service_1.PrismaService);
        testUsername = `e2e_sizing_${Date.now()}`;
        const hash = await bcrypt.hash('pass', 12);
        const user = await prisma.user.create({ data: { username: testUsername, password: hash } });
        testUserId = user.id;
        token = await getToken(app, testUsername, 'pass');
    });
    afterAll(async () => {
        for (const id of createdModeltypesSexSizeIds) {
            await prisma.modeltypeSexSize.deleteMany({ where: { id } });
        }
        for (const id of createdModeltypesSexIds) {
            await prisma.modeltypeSex.deleteMany({ where: { id } });
        }
        for (const id of createdSizeIds) {
            await prisma.size.deleteMany({ where: { id } });
        }
        for (const id of createdModeltypeIds) {
            await prisma.modeltype.deleteMany({ where: { id } });
        }
        for (const id of createdSexIds) {
            await prisma.sex.deleteMany({ where: { id } });
        }
        await prisma.user.delete({ where: { id: testUserId } });
        await app.close();
    });
    const auth = () => ({ Authorization: `Bearer ${token}` });
    describe('Sex CRUD', () => {
        let sexId;
        it('POST /sexes creates a sex', async () => {
            const res = await request(app.getHttpServer())
                .post('/sexes')
                .set(auth())
                .send({ code: 'E2E_F' })
                .expect(201);
            expect(res.body).toMatchObject({ code: 'E2E_F', displayName: 'E2E_F' });
            sexId = res.body.id;
            createdSexIds.push(sexId);
        });
        it('GET /sexes returns paginated list', async () => {
            const res = await request(app.getHttpServer())
                .get('/sexes')
                .set(auth())
                .expect(200);
            expect(res.body).toHaveProperty('data');
            expect(res.body).toHaveProperty('total');
            expect(res.body).toHaveProperty('page', 1);
            expect(res.body).toHaveProperty('limit', 20);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
        it('GET /sexes/:id returns the sex', async () => {
            const res = await request(app.getHttpServer())
                .get(`/sexes/${sexId}`)
                .set(auth())
                .expect(200);
            expect(res.body).toMatchObject({ id: sexId, code: 'E2E_F' });
        });
        it('PATCH /sexes/:id updates the sex', async () => {
            const res = await request(app.getHttpServer())
                .patch(`/sexes/${sexId}`)
                .set(auth())
                .send({ code: 'E2E_M' })
                .expect(200);
            expect(res.body).toMatchObject({ id: sexId, code: 'E2E_M' });
        });
        it('GET /sexes/9999999 → 404', () => request(app.getHttpServer()).get('/sexes/9999999').set(auth()).expect(404));
        it('DELETE /sexes/:id → 204', () => {
            createdSexIds.splice(createdSexIds.indexOf(sexId), 1);
            return request(app.getHttpServer())
                .delete(`/sexes/${sexId}`)
                .set(auth())
                .expect(204);
        });
    });
    describe('Modeltype CRUD', () => {
        let modeltypeId;
        it('POST /modeltypes creates', async () => {
            const res = await request(app.getHttpServer())
                .post('/modeltypes')
                .set(auth())
                .send({ code: 'E2E_T', description: 'T-shirt' })
                .expect(201);
            expect(res.body).toMatchObject({ code: 'E2E_T', displayName: 'E2E_T - T-shirt' });
            modeltypeId = res.body.id;
            createdModeltypeIds.push(modeltypeId);
        });
        it('GET /modeltypes/:id → 200', async () => {
            const res = await request(app.getHttpServer())
                .get(`/modeltypes/${modeltypeId}`)
                .set(auth())
                .expect(200);
            expect(res.body.id).toBe(modeltypeId);
        });
    });
    describe('ModeltypeSex CRUD', () => {
        let sexId;
        let modeltypeId;
        let mtsId;
        beforeAll(async () => {
            const s = await prisma.sex.create({ data: { code: 'E2E_SX2' } });
            sexId = s.id;
            createdSexIds.push(sexId);
            const m = await prisma.modeltype.create({ data: { code: 'E2E_MT2', description: null } });
            modeltypeId = m.id;
            createdModeltypeIds.push(modeltypeId);
        });
        it('POST /modeltypes-sexes creates with displayName', async () => {
            const res = await request(app.getHttpServer())
                .post('/modeltypes-sexes')
                .set(auth())
                .send({ modeltypeId, sexId })
                .expect(201);
            expect(res.body).toMatchObject({ modeltypeId, sexId });
            expect(res.body.displayName).toBe('E2E_MT2 - E2E_SX2');
            mtsId = res.body.id;
            createdModeltypesSexIds.push(mtsId);
        });
        it('POST /modeltypes-sexes → 400 for non-existent sexId', () => request(app.getHttpServer())
            .post('/modeltypes-sexes')
            .set(auth())
            .send({ modeltypeId, sexId: 9999999 })
            .expect(400));
    });
    describe('Size CRUD', () => {
        it('POST /sizes creates', async () => {
            const res = await request(app.getHttpServer())
                .post('/sizes')
                .set(auth())
                .send({ code: 'E2E_S' })
                .expect(201);
            createdSizeIds.push(res.body.id);
            expect(res.body.code).toBe('E2E_S');
        });
    });
    describe('ModeltypeSexSize CRUD', () => {
        let mtsId;
        let sizeId;
        beforeAll(async () => {
            const sex = await prisma.sex.create({ data: { code: 'E2E_SX3' } });
            createdSexIds.push(sex.id);
            const mt = await prisma.modeltype.create({ data: { code: 'E2E_MT3', description: null } });
            createdModeltypeIds.push(mt.id);
            const mts = await prisma.modeltypeSex.create({ data: { modeltypeId: mt.id, sexId: sex.id } });
            mtsId = mts.id;
            createdModeltypesSexIds.push(mtsId);
            const sz = await prisma.size.create({ data: { code: 'E2E_SZ3' } });
            sizeId = sz.id;
            createdSizeIds.push(sizeId);
        });
        it('POST /modeltypes-sex-sizes creates with displayName', async () => {
            const res = await request(app.getHttpServer())
                .post('/modeltypes-sex-sizes')
                .set(auth())
                .send({ modeltypeSexId: mtsId, sizeId })
                .expect(201);
            expect(res.body.displayName).toContain('E2E_SZ3');
            createdModeltypesSexSizeIds.push(res.body.id);
        });
        it('GET /modeltypes-sex-sizes → sorted by size.code', async () => {
            const res = await request(app.getHttpServer())
                .get('/modeltypes-sex-sizes?limit=5')
                .set(auth())
                .expect(200);
            const codes = res.body.data.map(r => r.size.code);
            const sorted = [...codes].sort();
            expect(codes).toEqual(sorted);
        });
    });
});
//# sourceMappingURL=sizing.e2e-spec.js.map