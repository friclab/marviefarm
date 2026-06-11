import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function getOrCreate<T extends { id: number }>(
  finder: () => Promise<T | null>,
  creator: () => Promise<T>,
): Promise<T> {
  return (await finder()) ?? (await creator());
}

async function main() {
  // ── Units of measure ────────────────────────────────────────────────────────
  const unitMt = await getOrCreate(
    () => prisma.unitmeasurement.findFirst({ where: { code: 'mt' } }),
    () => prisma.unitmeasurement.create({ data: { code: 'mt', description: 'Metro' } }),
  );
  const unitPz = await getOrCreate(
    () => prisma.unitmeasurement.findFirst({ where: { code: 'pz' } }),
    () => prisma.unitmeasurement.create({ data: { code: 'pz', description: 'Pezzo' } }),
  );

  // ── Tessuti SS27 ─────────────────────────────────────────────────────────────
  const tessuti: Array<{ code: string; description: string; price: number }> = [
    { code: '1/717/1342/10',       description: 'BIANCO 50%CO 50%SE',            price: 12.38 },
    { code: '3/657/ATB0270/KING',  description: 'BLU 90%CO 10%CA',               price:  5.25 },
    { code: '8/402/549AQ/77690',   description: 'BLU 100%CO',                    price:  3.90 },
    { code: '15/001/43606/314',    description: 'ROSSO 100%SE',                  price:  9.98 },
    { code: '15/001/43481/900',    description: 'NERO FUMO 100%SE',              price: 11.90 },
    { code: '5/417/P84374/A9118',  description: 'PANNA 100%SE',                  price: 21.13 },
    { code: '3/417/120874',        description: 'BIANCO ROSSO QUADRETTI 100%SE', price: 12.38 },
    { code: 'TESSUTO-STOCK-5PB43', description: 'NERO 100%SE (A STOCK)',          price: 16.13 },
  ];
  for (const t of tessuti) {
    await getOrCreate(
      () => prisma.material.findFirst({ where: { code: t.code } }),
      () => prisma.material.create({ data: { ...t, unitmeasurementId: unitMt.id, usage: 'DYNAMIC' } }),
    );
  }

  // ── Accessori SS27 ───────────────────────────────────────────────────────────
  const accessori: Array<{ code: string; description: string; price: number; unitId: number }> = [
    { code: 'SBIECO-COTONE',         description: 'Sbieco Cotone',                 price: 0.17, unitId: unitMt.id },
    { code: 'ELASTICO',              description: 'Elastico',                      price: 1.00, unitId: unitMt.id },
    { code: 'BOTTONI-BORDINO35-L32', description: 'Bottoni M.P. BORDINO/35 L.32', price: 0.85, unitId: unitPz.id },
    { code: 'BOTTONI-BORDINO35-L28', description: 'Bottoni M.P. BORDINO/35 L.28', price: 0.57, unitId: unitPz.id },
    { code: 'BOTTONI-BORDINO35-L20', description: 'Bottoni M.P. BORDINO/35 L.20', price: 0.27, unitId: unitPz.id },
  ];
  for (const a of accessori) {
    const { unitId, ...data } = a;
    await getOrCreate(
      () => prisma.material.findFirst({ where: { code: a.code } }),
      () => prisma.material.create({ data: { ...data, unitmeasurementId: unitId, usage: 'FIXED' } }),
    );
  }

  // ── Modeltypes ───────────────────────────────────────────────────────────────
  const mtDefs: Array<{ code: string; description: string }> = [
    { code: 'V', description: 'Vestito' },
    { code: 'G', description: 'Gonna' },
    { code: 'T', description: 'T-Shirt' },
    { code: 'P', description: 'Pantalone' },
    { code: 'A', description: 'Abbigliamento' },
    { code: 'C', description: 'Camicia' },
  ];
  const modeltypeMap: Record<string, number> = {};
  for (const m of mtDefs) {
    const rec = await getOrCreate(
      () => prisma.modeltype.findFirst({ where: { code: m.code } }),
      () => prisma.modeltype.create({ data: m }),
    );
    modeltypeMap[m.code] = rec.id;
  }

  // ── Sex — Donna ──────────────────────────────────────────────────────────────
  const sexD = await getOrCreate(
    () => prisma.sex.findFirst({ where: { code: 'D' } }),
    () => prisma.sex.create({ data: { code: 'D' } }),
  );

  // ── ModeltypeSex — tutti i modeltype × Donna ────────────────────────────────
  const modeltypeSexMap: Record<string, number> = {};
  for (const code of ['V', 'G', 'T', 'P', 'A', 'C']) {
    const rec = await getOrCreate(
      () => prisma.modeltypeSex.findFirst({
        where: { modeltypeId: modeltypeMap[code], sexId: sexD.id },
      }),
      () => prisma.modeltypeSex.create({
        data: { modeltypeId: modeltypeMap[code], sexId: sexD.id },
      }),
    );
    modeltypeSexMap[code] = rec.id;
  }

  // ── Articles ─────────────────────────────────────────────────────────────────
  const articles: Array<{ name: string; mt: string }> = [
    // Gonne
    { name: 'G-CARDIGAN',           mt: 'G' },
    { name: 'G-REVER MEZZA MANICA', mt: 'G' },
    { name: 'G-CANNELLO',           mt: 'G' },
    { name: 'G-CAPPUCCIO',          mt: 'G' },
    { name: 'G-KILT',               mt: 'G' },
    { name: 'GONNA PANTA',          mt: 'G' },
    // Pantaloni
    { name: 'P-PIEGA CORTO',        mt: 'P' },
    { name: 'P-UOVO',               mt: 'P' },
    { name: 'P-TASCHE',             mt: 'P' },
    { name: 'P-BICI',               mt: 'P' },
    // T-Shirt / Top
    { name: 'T-ONEPIECE',           mt: 'T' },
    { name: 'T-RAGLAN MEZZA MANICA', mt: 'T' },
    { name: 'T-TONDA SMANICATA',    mt: 'T' },
    { name: 'T-POLO',               mt: 'T' },
    { name: 'T-FELPA',              mt: 'T' },
    { name: 'CANOTTA',              mt: 'T' },
    // Vestiti
    { name: 'V-3PIEGHE',           mt: 'V' },
    { name: 'V-FESTA',             mt: 'V' },
    { name: 'V-TOVAGLIA',          mt: 'V' },
    { name: 'V-CORTO',             mt: 'V' },
    { name: 'V-BOTTONI',           mt: 'V' },
    // Abbigliamento (A)
    { name: 'SINALE',              mt: 'A' },
    { name: 'GREMBIULE',           mt: 'A' },
    // Camicie (C)
    { name: 'CAMICIOLA',           mt: 'C' },
    { name: 'C-TASCHE',            mt: 'C' },
  ];

  let created = 0;
  for (const a of articles) {
    const msId = modeltypeSexMap[a.mt];
    const exists = await prisma.article.findFirst({ where: { name: a.name } });
    if (!exists) {
      await prisma.article.create({ data: { name: a.name, modeltypesSexId: msId } });
      created++;
    }
  }

  // ── Admin user ───────────────────────────────────────────────────────────────
  // Default login: admin / admin (bcrypt). Change the password after first login.
  const adminHash = await bcrypt.hash('admin', 12);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', password: adminHash },
  });

  // ── Summary ──────────────────────────────────────────────────────────────────
  const matCount = await prisma.material.count();
  const artCount = await prisma.article.count();
  console.log(`Seed SS27 completato:`);
  console.log(`  unitmeasurements : mt, pz`);
  console.log(`  materials        : ${matCount} (tessuti + accessori)`);
  console.log(`  modeltypes       : V, G, T, P`);
  console.log(`  sex              : D (Donna)`);
  console.log(`  articles creati  : ${created} (totale in DB: ${artCount})`);
  console.log(`  modeltypes       : V, G, T, P, A (Abbigliamento), C (Camicia)`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
