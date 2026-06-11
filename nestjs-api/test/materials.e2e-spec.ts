/**
 * E2E tests — Materials module.
 * Covers: Supplier, UnitMeasurement, MaterialType, Material (incl. HABTM materialtypes).
 *
 * Requires DATABASE_URL in env pointing to a test database.
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

describe('Materials (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let testUserId: number;
  const testUsername = `e2e_mat_${Date.now()}`;

  // Track created IDs for cleanup
  const ids = {
    supplier: [] as number[],
    unitMeasurement: [] as number[],
    materialType: [] as number[],
    material: [] as number[],
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
  });

  afterAll(async () => {
    // Cleanup in dependency order
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

  const auth = (): { Authorization: string } => ({ Authorization: `Bearer ${token}` });
  const post = (url: string, body: object) =>
    request(app.getHttpServer()).post(url).set(auth()).send(body);
  const get = (url: string) => request(app.getHttpServer()).get(url).set(auth());
  const patch = (url: string, body: object) =>
    request(app.getHttpServer()).patch(url).set(auth()).send(body);
  const del = (url: string) => request(app.getHttpServer()).delete(url).set(auth());

  // ── Supplier ──────────────────────────────────────────────────────────────
  describe('Supplier', () => {
    let id: number;

    it('POST /suppliers → 201 with displayName', async () => {
      const res = await post('/suppliers', {
        company: 'Acme Fabrics',
        name: 'John',
        surname: 'Doe',
      }).expect(201);

      expect(res.body.displayName).toBe('Acme Fabrics - John Doe');
      id = res.body.id as number;
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
      // displayName reflects the update
      expect(res.body.displayName).toContain('Acme Ltd');
    });

    it('GET /suppliers/9999999 → 404', () => get('/suppliers/9999999').expect(404));

    it('DELETE /suppliers/:id → 204', async () => {
      await del(`/suppliers/${id}`).expect(204);
      ids.supplier.splice(ids.supplier.indexOf(id), 1);
    });
  });

  // ── Supplier displayName edge cases ───────────────────────────────────────
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

  // ── UnitMeasurement ───────────────────────────────────────────────────────
  describe('UnitMeasurement', () => {
    let id: number;

    it('POST /unit-measurements → 201', async () => {
      const res = await post('/unit-measurements', { code: 'MT', description: 'Metres' }).expect(201);
      expect(res.body.displayName).toBe('MT - Metres');
      id = res.body.id as number;
      ids.unitMeasurement.push(id);
    });

    it('PATCH /unit-measurements/:id → 200', async () => {
      const res = await patch(`/unit-measurements/${id}`, { description: 'Metri' }).expect(200);
      expect(res.body.displayName).toBe('MT - Metri');
    });

    it('GET /unit-measurements/9999999 → 404', () =>
      get('/unit-measurements/9999999').expect(404));
  });

  // ── MaterialType ──────────────────────────────────────────────────────────
  describe('MaterialType', () => {
    let id: number;

    it('POST /material-types → 201', async () => {
      const res = await post('/material-types', { code: 'COTTON', description: 'Cotton fibres' }).expect(201);
      expect(res.body.displayName).toBe('COTTON - Cotton fibres');
      id = res.body.id as number;
      ids.materialType.push(id);
    });

    it('GET /material-types → sorted by code', async () => {
      const res = await get('/material-types?limit=50').expect(200);
      const codes = (res.body.data as Array<{ code: string }>).map(r => r.code);
      expect(codes).toEqual([...codes].sort());
    });
  });

  // ── Material ──────────────────────────────────────────────────────────────
  describe('Material', () => {
    let supplierId: number;
    let umId: number;
    let mt1Id: number;
    let mt2Id: number;
    let materialId: number;

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
        materialTypeIds: [mt1Id, mt2Id],
      }).expect(201);

      expect(res.body.code).toBe('C001');
      expect(res.body.price).toBe(12.5);               // number, not string
      expect(res.body.displayName).toBe('C001');        // legacy: displayField = 'code'
      expect(res.body.supplier.id).toBe(supplierId);
      expect(res.body.unitmeasurement.code).toBe('KG');
      expect(res.body.materialtypes).toHaveLength(2);

      materialId = res.body.id as number;
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
        materialTypeIds: [mt1Id],   // remove mt2, keep only mt1
      }).expect(200);
      expect(res.body.materialtypes).toHaveLength(1);
      expect(res.body.materialtypes[0].id).toBe(mt1Id);
    });

    it('PATCH /materials/:id → bad supplierId → 400', () =>
      patch(`/materials/${materialId}`, { supplierId: 9999999 }).expect(400));

    it('POST /materials → bad materialTypeIds → 400', () =>
      post('/materials', { code: 'BAD', materialTypeIds: [9999999] }).expect(400));

    it('GET /materials/9999999 → 404', () => get('/materials/9999999').expect(404));

    it('DELETE /materials/:id → 204', async () => {
      await del(`/materials/${materialId}`).expect(204);
      ids.material.splice(ids.material.indexOf(materialId), 1);
    });
  });
});
