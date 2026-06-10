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

describe('Catalog (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let testUserId: number;
  const testUsername = `e2e_cat_${Date.now()}`;

  // Shared seed data IDs
  let modeltypeSexId: number;
  let seedModeltypeId: number;
  let seedSexId: number;

  const ids = {
    project: [] as number[],
    collection: [] as number[],
    article: [] as number[],
    fabric: [] as number[],
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

    // Seed sizing (needed for articles)
    const mt = await prisma.modeltype.create({ data: { code: 'E2E_MT', description: null } });
    seedModeltypeId = mt.id;
    const sx = await prisma.sex.create({ data: { code: 'E2E_SX' } });
    seedSexId = sx.id;
    const mts = await prisma.modeltypeSex.create({
      data: { modeltypeId: mt.id, sexId: sx.id },
    });
    modeltypeSexId = mts.id;
  });

  afterAll(async () => {
    await prisma.articleProject.deleteMany({ where: { articleId: { in: ids.article } } });
    await prisma.fabric.deleteMany({ where: { articleId: { in: ids.article } } });
    await prisma.article.deleteMany({ where: { id: { in: ids.article } } });
    await prisma.collectionProject.deleteMany({ where: { collectionId: { in: ids.collection } } });
    await prisma.collection.deleteMany({ where: { id: { in: ids.collection } } });
    await prisma.articleProject.deleteMany({ where: { projectId: { in: ids.project } } });
    await prisma.collectionProject.deleteMany({ where: { projectId: { in: ids.project } } });
    await prisma.project.deleteMany({ where: { id: { in: ids.project } } });
    await prisma.modeltypeSex.delete({ where: { id: modeltypeSexId } });
    await prisma.modeltype.delete({ where: { id: seedModeltypeId } });
    await prisma.sex.delete({ where: { id: seedSexId } });
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

  // ── Project ────────────────────────────────────────────────────────────────
  describe('Project', () => {
    let projectId: number;

    it('POST /projects → 201', async () => {
      const res = await post('/projects', { name: 'E2E Project' }).expect(201);
      expect(res.body.name).toBe('E2E Project');
      expect(res.body.displayName).toBe('E2E Project');
      expect(res.body.articles).toEqual([]);
      projectId = res.body.id as number;
      ids.project.push(projectId);
    });

    it('GET /projects → paginated', () =>
      get('/projects').expect(200).expect(r => expect(r.body).toHaveProperty('data')));

    it('GET /projects/9999999 → 404', () => get('/projects/9999999').expect(404));

    it('PATCH /projects/:id → 200', async () => {
      const res = await patch(`/projects/${projectId}`, { name: 'E2E Project Updated' }).expect(200);
      expect(res.body.name).toBe('E2E Project Updated');
    });
  });

  // ── Collection ─────────────────────────────────────────────────────────────
  describe('Collection', () => {
    let collId: number;
    let projId: number;

    it('POST /collections → 201', async () => {
      const pr = await post('/projects', { name: 'E2E Proj For Coll' }).expect(201);
      projId = pr.body.id as number;
      ids.project.push(projId);

      const res = await post('/collections', {
        name: 'E2E Collection',
        projectIds: [projId],
      }).expect(201);

      expect(res.body.name).toBe('E2E Collection');
      expect(res.body.projects).toHaveLength(1);
      expect(res.body.projects[0].id).toBe(projId);
      collId = res.body.id as number;
      ids.collection.push(collId);
    });

    it('PATCH /collections/:id → full-replace projectIds', async () => {
      const res = await patch(`/collections/${collId}`, { projectIds: [] }).expect(200);
      expect(res.body.projects).toHaveLength(0);
    });
  });

  // ── Article ────────────────────────────────────────────────────────────────
  describe('Article', () => {
    let articleId: number;

    it('POST /articles → 201', async () => {
      const res = await post('/articles', {
        name: 'E2E Article',
        description: 'Test garment',
        modeltypesSexId: modeltypeSexId,
      }).expect(201);

      expect(res.body.name).toBe('E2E Article');
      expect(res.body.displayName).toBe('E2E Article - Test garment');
      expect(res.body.modeltypesSex.id).toBe(modeltypeSexId);
      articleId = res.body.id as number;
      ids.article.push(articleId);
    });

    it('GET /articles/:id → 200', () => get(`/articles/${articleId}`).expect(200));

    it('POST /articles → bad modeltypesSexId → 400', () =>
      post('/articles', { name: 'Bad', modeltypesSexId: 9999999 }).expect(400));

    it('GET /articles/:id/image → 404 (no image)', () =>
      get(`/articles/${articleId}/image`).expect(404));

    it('POST /articles/:id/image → uploads JPEG', async () => {
      // Minimal valid 1×1 JPEG
      const jpegBytes = Buffer.from(
        'ffd8ffe000104a46494600010100000100010000ffdb00430008060607080605080707070909080a0c140d0c0b0b0c1912130f141d1a1f1e1d1a1c1c20242e2720222c231c1c2837292c30313434341f27393d38323c2e333432ffc0000b08000100010101110003ffc4001f0000010501010101010100000000000000000102030405060708090a0bffda00080101000005021bdb8000003f00ffd9',
        'hex',
      );
      const res = await request(app.getHttpServer())
        .post(`/articles/${articleId}/image`)
        .set(auth())
        .attach('image', jpegBytes, { filename: 'test.jpg', contentType: 'image/jpeg' })
        .expect(201);
      expect(res.body.message).toContain('updated');
    });

    it('GET /articles/:id/image → 200 (image served publicly)', async () => {
      const res = await request(app.getHttpServer())
        .get(`/articles/${articleId}/image`)
        .expect(200);
      expect(res.headers['content-type']).toContain('image/jpeg');
    });
  });

  // ── Fabric ─────────────────────────────────────────────────────────────────
  describe('Fabric', () => {
    let articleId: number;
    let fabricId: number;

    beforeAll(async () => {
      const art = await post('/articles', {
        name: 'E2E Art Fabric',
        modeltypesSexId: modeltypeSexId,
      }).expect(201);
      articleId = art.body.id as number;
      ids.article.push(articleId);
    });

    it('POST /fabrics → 201', async () => {
      const res = await post('/fabrics', {
        code: 'E2E_F01',
        description: 'Red',
        price: 24.99,
        articleId,
      }).expect(201);

      expect(res.body.code).toBe('E2E_F01');
      expect(res.body.price).toBe(24.99);
      expect(res.body.displayName).toBe('E2E_F01 - Red');
      expect(res.body.article.id).toBe(articleId);
      fabricId = res.body.id as number;
      ids.fabric.push(fabricId);
    });

    it('GET /fabrics/:id → 200', () => get(`/fabrics/${fabricId}`).expect(200));

    it('PATCH /fabrics/:id → 200', async () => {
      const res = await patch(`/fabrics/${fabricId}`, { price: 29.99 }).expect(200);
      expect(res.body.price).toBe(29.99);
    });

    it('DELETE /fabrics/:id → 204', () =>
      del(`/fabrics/${fabricId}`).expect(204).then(() => {
        ids.fabric.splice(ids.fabric.indexOf(fabricId), 1);
      }));
  });
});
