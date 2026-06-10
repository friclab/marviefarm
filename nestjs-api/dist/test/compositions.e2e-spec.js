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
describe('Compositions (e2e)', () => {
    let app;
    let prisma;
    let token;
    let testUserId;
    const testUsername = `e2e_comp_${Date.now()}`;
    const ids = {
        fixedComposition: [],
        dynamicComposition: [],
        material: [],
        supplier: [],
        unitMeasurement: [],
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
        const um = await prisma.unitmeasurement.create({ data: { code: 'E2E_UM', description: 'Test' } });
        ids.unitMeasurement.push(um.id);
        const mat = await prisma.material.create({
            data: { code: 'E2E_MAT', unitmeasurementId: um.id },
        });
        ids.material.push(mat.id);
    });
    afterAll(async () => {
        await prisma.fixedCompositionMaterial.deleteMany({
            where: { fixedCompositionId: { in: ids.fixedComposition } },
        });
        await prisma.fixedComposition.deleteMany({ where: { id: { in: ids.fixedComposition } } });
        await prisma.dynamicCompositionMaterial.deleteMany({
            where: { dynamicCompositionId: { in: ids.dynamicComposition } },
        });
        await prisma.dynamicComposition.deleteMany({ where: { id: { in: ids.dynamicComposition } } });
        await prisma.material.deleteMany({ where: { id: { in: ids.material } } });
        await prisma.unitmeasurement.deleteMany({ where: { id: { in: ids.unitMeasurement } } });
        await prisma.user.delete({ where: { id: testUserId } });
        await app.close();
    });
    const auth = () => ({ Authorization: `Bearer ${token}` });
    const post = (url, body) => request(app.getHttpServer()).post(url).set(auth()).send(body);
    const get = (url) => request(app.getHttpServer()).get(url).set(auth());
    const patch = (url, body) => request(app.getHttpServer()).patch(url).set(auth()).send(body);
    const del = (url) => request(app.getHttpServer()).delete(url).set(auth());
    describe('FixedComposition', () => {
        let fcId;
        let fcmId;
        it('POST /fixed-compositions → 201', async () => {
            const res = await post('/fixed-compositions', {
                code: 'E2E_FC',
                description: 'E2E Fixed',
            }).expect(201);
            expect(res.body.code).toBe('E2E_FC');
            expect(res.body.displayName).toBe('E2E_FC - E2E Fixed');
            expect(res.body.materials).toEqual([]);
            fcId = res.body.id;
            ids.fixedComposition.push(fcId);
        });
        it('GET /fixed-compositions → paginated', () => get('/fixed-compositions').expect(200).expect(r => {
            expect(r.body).toHaveProperty('data');
            expect(r.body).toHaveProperty('total');
        }));
        it('GET /fixed-compositions/:id → 200 with materials', async () => {
            const res = await get(`/fixed-compositions/${fcId}`).expect(200);
            expect(res.body.code).toBe('E2E_FC');
            expect(Array.isArray(res.body.materials)).toBe(true);
        });
        it('PATCH /fixed-compositions/:id → 200', async () => {
            const res = await patch(`/fixed-compositions/${fcId}`, { description: 'Updated' }).expect(200);
            expect(res.body.displayName).toBe('E2E_FC - Updated');
        });
        it('GET /fixed-compositions/9999999 → 404', () => get('/fixed-compositions/9999999').expect(404));
        it('POST /fixed-composition-materials → 201', async () => {
            const res = await post('/fixed-composition-materials', {
                fixedCompositionId: fcId,
                materialId: ids.material[0],
                quantity: 1.5,
            }).expect(201);
            expect(res.body.quantity).toBe(1.5);
            expect(res.body.fixedComposition.id).toBe(fcId);
            fcmId = res.body.id;
        });
        it('PATCH /fixed-composition-materials/:id → updates quantity', async () => {
            const res = await patch(`/fixed-composition-materials/${fcmId}`, { quantity: 2.0 }).expect(200);
            expect(res.body.quantity).toBe(2);
        });
        it('POST /fixed-composition-materials → bad materialId → 400', () => post('/fixed-composition-materials', {
            fixedCompositionId: fcId,
            materialId: 9999999,
            quantity: 1,
        }).expect(400));
        it('DELETE /fixed-composition-materials/:id → 204', () => del(`/fixed-composition-materials/${fcmId}`).expect(204));
        it('DELETE /fixed-compositions/:id → 204', () => del(`/fixed-compositions/${fcId}`).expect(204).then(() => {
            ids.fixedComposition.splice(ids.fixedComposition.indexOf(fcId), 1);
        }));
    });
    describe('DynamicComposition', () => {
        let dcId;
        it('POST /dynamic-compositions → 201', async () => {
            const res = await post('/dynamic-compositions', {
                code: 'E2E_DC',
                description: 'E2E Dynamic',
            }).expect(201);
            expect(res.body.displayName).toBe('E2E_DC - E2E Dynamic');
            dcId = res.body.id;
            ids.dynamicComposition.push(dcId);
        });
        it('POST /dynamic-composition-materials → 201', async () => {
            const res = await post('/dynamic-composition-materials', {
                dynamicCompositionId: dcId,
                materialId: ids.material[0],
                quantity: 0.75,
            }).expect(201);
            expect(res.body.quantity).toBe(0.75);
            expect(res.body.dynamicComposition.id).toBe(dcId);
            await del(`/dynamic-composition-materials/${res.body.id}`).expect(204);
        });
        it('DELETE /dynamic-compositions/:id → 204', () => del(`/dynamic-compositions/${dcId}`).expect(204).then(() => {
            ids.dynamicComposition.splice(ids.dynamicComposition.indexOf(dcId), 1);
        }));
    });
});
//# sourceMappingURL=compositions.e2e-spec.js.map