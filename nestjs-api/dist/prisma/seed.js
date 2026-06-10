"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getOrCreateUnit(code, description) {
    const existing = await prisma.unitmeasurement.findFirst({ where: { code } });
    if (existing)
        return existing;
    return prisma.unitmeasurement.create({ data: { code, description } });
}
async function main() {
    const unitMt = await getOrCreateUnit('mt', 'Metro');
    const unitPz = await getOrCreateUnit('pz', 'Pezzo');
    const tessuti = [
        { code: '1/717/1342/10', description: 'BIANCO 50%CO 50%SE', price: 12.38 },
        { code: '3/657/ATB0270/KING', description: 'BLU 90%CO 10%CA', price: 5.25 },
        { code: '8/402/549AQ/77690', description: 'BLU 100%CO', price: 3.90 },
        { code: '15/001/43606/314', description: 'ROSSO 100%SE', price: 9.98 },
        { code: '15/001/43481/900', description: 'NERO FUMO 100%SE', price: 11.90 },
        { code: '5/417/P84374/A9118', description: 'PANNA 100%SE', price: 21.13 },
        { code: '3/417/120874', description: 'BIANCO ROSSO QUADRETTI 100%SE', price: 12.38 },
        { code: 'TESSUTO-STOCK-5PB43', description: 'NERO 100%SE (A STOCK)', price: 16.13 },
    ];
    for (const t of tessuti) {
        const exists = await prisma.material.findFirst({ where: { code: t.code } });
        if (!exists) {
            await prisma.material.create({
                data: {
                    code: t.code,
                    description: t.description,
                    price: t.price,
                    unitmeasurementId: unitMt.id,
                },
            });
        }
    }
    const accessori = [
        { code: 'SBIECO-COTONE', description: 'Sbieco Cotone', price: 0.17, unitId: unitMt.id },
        { code: 'ELASTICO', description: 'Elastico', price: 1.00, unitId: unitMt.id },
        { code: 'BOTTONI-BORDINO35-L32', description: 'Bottoni M.P. BORDINO/35 L.32', price: 0.85, unitId: unitPz.id },
        { code: 'BOTTONI-BORDINO35-L28', description: 'Bottoni M.P. BORDINO/35 L.28', price: 0.57, unitId: unitPz.id },
        { code: 'BOTTONI-BORDINO35-L20', description: 'Bottoni M.P. BORDINO/35 L.20', price: 0.27, unitId: unitPz.id },
    ];
    for (const a of accessori) {
        const exists = await prisma.material.findFirst({ where: { code: a.code } });
        if (!exists) {
            await prisma.material.create({
                data: {
                    code: a.code,
                    description: a.description,
                    price: a.price,
                    unitmeasurementId: a.unitId,
                },
            });
        }
    }
    const modeltypes = [
        { code: 'V', description: 'Vestito' },
        { code: 'G', description: 'Gonna' },
        { code: 'T', description: 'T-Shirt' },
        { code: 'P', description: 'Pantalone' },
    ];
    for (const m of modeltypes) {
        const exists = await prisma.modeltype.findFirst({ where: { code: m.code } });
        if (!exists) {
            await prisma.modeltype.create({ data: m });
        }
    }
    const matCount = await prisma.material.count();
    const mtCount = await prisma.modeltype.count();
    console.log(`Seed SS27 completato: ${matCount} materiali, ${mtCount} modeltypes`);
}
main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map