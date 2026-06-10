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
describe('Materials (e2e)', () => {
    let app;
    let prisma;
    let token;
    let testUserId;
    const testUsername = `e2e_mat_${Date.now()}`;
    const ids = {
        supplier: [],
        unitMeasurement: [],
        materialType: [],
        material: [],
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
    });
    afterAll(async () => {
        await prisma.materialMaterialtype.deleteMany({
            where: { materialId: { in: ids.material } },
        });
        await prisma.material.deleteMany({ where: { id: { in: ids.material } } });
        await prisma.materialtype.deleteMany({ where: { id: { in: ids.materialType } } });
        await prisma.unitmeasurement.deleteMany({ where: { id: { in: ids.unitMeasurement } } });
        await prisma.supplier.deleteMany({ where: { id: { in: ids.supplier } } });
        await prisma.user.delete({ where: { id: testUserId } });
        await app.close();
    });
    const auth = () => ({ Authorization: `Bearer ${token}` });
    const post = (url, body) => request(app.getHttpServer()).post(url).set(auth()).send(body);
    const get = (url) => request(app.getHttpServer()).get(url).set(auth());
    const patch = (url, body) => request(app.getHttpServer()).patch(url).set(auth()).send(body);
    const del = (url) => request(app.getHttpServer()).delete(url).set(auth());
    describe('Supplier', () => {
        let id;
        it('POST /suppliers → 201 with displayName', async () => {
            const res = await post('/suppliers', {
                company: 'Acme Fabrics',
                name: 'John',
                surname: 'Doe',
            }).expect(201);
            expect(res.body.displayName).toBe('Acme Fabrics - John Doe');
            id = res.body.id;
            ids.supplier.push(id);
        });
        it('GET /suppliers → paginated list', async () => {
            const res = await get('/suppliers').expect(200);
            expect(res.body).toHaveProperty('data');
            expect(res.body).toHaveProperty('total');
        });
        it('GET /suppliers/:id → 200', () => get(`/suppliers/${id}`).expect(200));
        it('PATCH /suppliers/:id → updates company', async () => {
            const res = await patch(`/suppliers/${id}`, { company: 'Acme Ltd' }).expect(200);
            expect(res.body.company).toBe('Acme Ltd');
            expect(res.body.displayName).toContain('Acme Ltd');
        });
        it('GET /suppliers/9999999 → 404', () => get('/suppliers/9999999').expect(404));
        it('DELETE /suppliers/:id → 204', async () => {
            await del(`/suppliers/${id}`).expect(204);
            ids.supplier.splice(ids.supplier.indexOf(id), 1);
        });
    });
    describe('Supplier displayName variants', () => {
        it('only company → displayName = company', async () => {
            const res = await post('/suppliers', { company: 'Solo Corp' }).expect(201);
            expect(res.body.displayName).toBe('Solo Corp');
            await del(`/suppliers/${res.body.id}`).expect(204);
        });
        it('only name+surname → displayName = "name surname"', async () => {
            const res = await post('/suppliers', { name: 'Jane', surname: 'Smith' }).expect(201);
            expect(res.body.displayName).toBe('Jane Smith');
            await del(`/suppliers/${res.body.id}`).expect(204);
        });
    });
    describe('UnitMeasurement', () => {
        let id;
        it('POST /unit-measurements → 201', async () => {
            const res = await post('/unit-measurements', { code: 'MT', description: 'Metres' }).expect(201);
            expect(res.body.displayName).toBe('MT - Metres');
            id = res.body.id;
            ids.unitMeasurement.push(id);
        });
        it('PATCH /unit-measurements/:id → 200', async () => {
            const res = await patch(`/unit-measurements/${id}`, { description: 'Metri' }).expect(200);
            expect(res.body.displayName).toBe('MT - Metri');
        });
        it('GET /unit-measurements/9999999 → 404', () => get('/unit-measurements/9999999').expect(404));
    });
    describe('MaterialType', () => {
        let id;
        it('POST /material-types → 201', async () => {
            const res = await post('/material-types', { code: 'COTTON', description: 'Cotton fibres' }).expect(201);
            expect(res.body.displayName).toBe('COTTON - Cotton fibres');
            id = res.body.id;
            ids.materialType.push(id);
        });
        it('GET /material-types → sorted by code', async () => {
            const res = await get('/material-types?limit=50').expect(200);
            const codes = res.body.data.map(r => r.code);
            expect(codes).toEqual([...codes].sort());
        });
    });
    describe('Material', () => {
        let supplierId;
        let umId;
        let mt1Id;
        let mt2Id;
        let materialId;
        beforeAll(async () => {
            const s = await prisma.supplier.create({ data: { company: 'E2E Supplier' } });
            supplierId = s.id;
            ids.supplier.push(supplierId);
            const um = await prisma.unitmeasurement.create({ data: { code: 'KG', description: 'Kilograms' } });
            umId = um.id;
            ids.unitMeasurement.push(umId);
            const mt1 = await prisma.materialtype.create({ data: { code: 'RAW', description: null } });
            mt1Id = mt1.id;
            ids.materialType.push(mt1Id);
            const mt2 = await prisma.materialtype.create({ data: { code: 'DYE', description: null } });
            mt2Id = mt2.id;
            ids.materialType.push(mt2Id);
        });
        it('POST /materials → 201 with linked materialtypes', async () => {
            const res = await post('/materials', {
                code: 'C001',
                description: 'Cotton yarn',
                price: 12.5,
                supplierId,
                unitmeasurementId: umId,
                materialtypeIds: [mt1Id, mt2Id],
            }).expect(201);
            expect(res.body.code).toBe('C001');
            expect(res.body.price).toBe(12.5);
            expect(res.body.displayName).toBe('C001');
            expect(res.body.supplier.id).toBe(supplierId);
            expect(res.body.unitmeasurement.code).toBe('KG');
            expect(res.body.materialtypes).toHaveLength(2);
            materialId = res.body.id;
            ids.material.push(materialId);
        });
        it('GET /materials/:id includes all relations', async () => {
            const res = await get(`/materials/${materialId}`).expect(200);
            expect(res.body.supplier).not.toBeNull();
            expect(res.body.unitmeasurement).not.toBeNull();
            expect(Array.isArray(res.body.materialtypes)).toBe(true);
        });
        it('PATCH /materials/:id → replaces materialtypes (full-replace)', async () => {
            const res = await patch(`/materials/${materialId}`, {
                materialtypeIds: [mt1Id],
            }).expect(200);
            expect(res.body.materialtypes).toHaveLength(1);
            expect(res.body.materialtypes[0].id).toBe(mt1Id);
        });
        it('PATCH /materials/:id → bad supplierId → 400', () => patch(`/materials/${materialId}`, { supplierId: 9999999 }).expect(400));
        it('POST /materials → bad materialtypeIds → 400', () => post('/materials', { code: 'BAD', materialtypeIds: [9999999] }).expect(400));
        it('GET /materials/9999999 → 404', () => get('/materials/9999999').expect(404));
        it('DELETE /materials/:id → 204', async () => {
            await del(`/materials/${materialId}`).expect(204);
            ids.material.splice(ids.material.indexOf(materialId), 1);
        });
    });
});
//# sourceMappingURL=materials.e2e-spec.js.map