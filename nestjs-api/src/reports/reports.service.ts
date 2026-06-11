import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { joinDisplay, fullPersonName } from '../common/display-name';
import { renderOrderExport } from './templates/order-export.template';
import { renderChooseQuantity, ChooseQuantityData, SizeGrid } from './templates/choose-quantity.template';
import { renderArticlesList, ArticlesListData } from './templates/articles-list.template';
import { computeOrderTotals } from '../orders/order-totals';

interface CostRow {
  art_name: string;
  art_desc: string | null;
  var_code: string;
  var_desc: string | null;
  compo_type: string;   // 'F' (fixed) | 'D' (dynamic)
  compo_id: number;     // id of the composition-material row
  mat_code: string;
  mat_desc: string | null;
  qty: unknown;   // MySQL DECIMAL comes back as string via $queryRaw
  price: unknown;
  um: string;
}

// ── Cost preview (interactive JSON view) ──────────────────────────────────────

export interface CostPreviewMaterial {
  compoType: 'F' | 'D';   // F = fixed composition, D = dynamic (variant) composition
  compoId: number;
  code: string;
  description: string | null;
  unit: string;
  quantity: number;
  price: number;
  cost: number;           // price × quantity
}

export interface CostPreviewVariant {
  code: string;
  description: string | null;
  materials: CostPreviewMaterial[];
  total: number;            // sum of material costs (single unit)
  totalWithMultiplier: number;
}

export interface CostPreviewArticle {
  name: string;
  description: string | null;
  variants: CostPreviewVariant[];
}

export interface CostPreview {
  multiplier: number;
  articles: CostPreviewArticle[];
}

// ── Material consumption (requirements from orders) ───────────────────────────

interface ConsumptionRaw {
  material_id: number;
  mat_code: string;
  mat_desc: string | null;
  um: string | null;
  price: unknown;
  total_qty: unknown;
}

export interface MaterialConsumptionRow {
  materialId: number;
  code: string;
  description: string | null;
  unit: string | null;
  quantity: number;       // total consumption across the selected orders
  price: number | null;
  cost: number | null;    // quantity × price (null when the material has no price)
}

export interface MaterialConsumption {
  orderId: number | null;   // applied filter; null = all orders
  rows: MaterialConsumptionRow[];
  totalCost: number;        // sum of row.cost (materials without a price count as 0)
}

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  // ── PDF helpers ────────────────────────────────────────────────────────────

  private async renderPdf(html: string): Promise<Buffer> {
    // Dynamic import so startup isn't blocked if Chrome is not installed
    const puppeteer = await import('puppeteer');
    const browser = await puppeteer.default.launch({
      headless: true,
      executablePath: process.env.CHROMIUM_PATH || undefined,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      const pdf = await page.pdf({ format: 'A4', printBackground: true });
      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }

  // ── Cost calculation (CSV) ─────────────────────────────────────────────────

  // Raw UNION query backing both the CSV export and the interactive preview.
  // No user input is interpolated; the multiplier is applied in TypeScript.
  // NB: fixed composition now lives on the article (art.fixedcomposition_id),
  // whereas the legacy schema kept it on the fabric.
  private async loadCostRows(): Promise<CostRow[]> {
    return this.prisma.$queryRaw<CostRow[]>`
      SELECT
        art.name AS art_name, art.description AS art_desc,
        fab.code AS var_code, fab.description AS var_desc,
        'F' AS compo_type, fcm.id AS compo_id,
        mat.code AS mat_code, mat.description AS mat_desc,
        fcm.qta AS qty, mat.price AS price, um.code AS um
      FROM articles art
      JOIN fabrics fab ON fab.article_id = art.id
      JOIN fixedcompositions_materials fcm ON fcm.fixedcomposition_id = art.fixedcomposition_id
      JOIN materials mat ON mat.id = fcm.material_id
      JOIN unitmeasurements um ON um.id = mat.unitmeasurement_id
      WHERE art.fixedcomposition_id IS NOT NULL

      UNION ALL

      SELECT
        art.name, art.description,
        fab.code, fab.description,
        'D', dcm.id,
        mat.code, mat.description,
        dcm.qta, mat.price, um.code
      FROM articles art
      JOIN fabrics fab ON fab.article_id = art.id
      JOIN dynamiccompositions_materials dcm ON dcm.dynamiccomposition_id = fab.dynamiccomposition_id
      JOIN materials mat ON mat.id = dcm.material_id
      JOIN unitmeasurements um ON um.id = mat.unitmeasurement_id
      WHERE fab.dynamiccomposition_id IS NOT NULL

      ORDER BY art_name, var_code, compo_type DESC, compo_id
    `;
  }

  // Interactive cost view: structured JSON of article → variant → materials with
  // per-material and per-variant cost totals. Same data source as the CSV export.
  async getCostPreview(multiplier = 1): Promise<CostPreview> {
    const rows = await this.loadCostRows();

    // Group into article → variant → materials, preserving query order.
    const articles = new Map<string, CostPreviewArticle>();

    for (const r of rows) {
      const artKey = `${r.art_name} - ${r.art_desc ?? ''}`;
      let art = articles.get(artKey);
      if (!art) {
        art = { name: r.art_name, description: r.art_desc, variants: [] };
        articles.set(artKey, art);
      }

      let variant = art.variants.find(v => v.code === r.var_code && v.description === r.var_desc);
      if (!variant) {
        variant = { code: r.var_code, description: r.var_desc, materials: [], total: 0, totalWithMultiplier: 0 };
        art.variants.push(variant);
      }

      const price = r.price !== null ? parseFloat(String(r.price)) : 0;
      const quantity = parseFloat(String(r.qty));
      const cost = price * quantity;
      variant.materials.push({
        compoType: r.compo_type === 'F' ? 'F' : 'D',
        compoId: r.compo_id,
        code: r.mat_code,
        description: r.mat_desc,
        unit: r.um,
        quantity,
        price,
        cost,
      });
      variant.total += cost;
    }

    for (const art of articles.values()) {
      for (const v of art.variants) v.totalWithMultiplier = v.total * multiplier;
    }

    return { multiplier, articles: Array.from(articles.values()) };
  }

  // Material requirements driven by the orders placed: for each order line
  // (quantity Q on article A / fabric F) every material in A's fixed composition
  // and F's dynamic composition is consumed Q × its per-piece quantity. Results
  // are aggregated per material. Pass an orderId to scope to a single order.
  async getMaterialConsumption(orderId?: number): Promise<MaterialConsumption> {
    const orderFilter = orderId ? Prisma.sql`AND od.orderheader_id = ${orderId}` : Prisma.empty;

    const rows = await this.prisma.$queryRaw<ConsumptionRaw[]>(Prisma.sql`
      SELECT
        m.id AS material_id, m.code AS mat_code, m.description AS mat_desc,
        um.code AS um, m.price AS price,
        SUM(c.consumption) AS total_qty
      FROM (
        SELECT fcm.material_id AS material_id, (od.qta * fcm.qta) AS consumption
        FROM orderdetails od
        JOIN articles art ON art.id = od.article_id
        JOIN fixedcompositions_materials fcm ON fcm.fixedcomposition_id = art.fixedcomposition_id
        WHERE art.fixedcomposition_id IS NOT NULL AND od.qta IS NOT NULL ${orderFilter}

        UNION ALL

        SELECT dcm.material_id, (od.qta * dcm.qta) AS consumption
        FROM orderdetails od
        JOIN fabrics fab ON fab.id = od.fabric_id
        JOIN dynamiccompositions_materials dcm ON dcm.dynamiccomposition_id = fab.dynamiccomposition_id
        WHERE fab.dynamiccomposition_id IS NOT NULL AND od.qta IS NOT NULL ${orderFilter}
      ) c
      JOIN materials m ON m.id = c.material_id
      LEFT JOIN unitmeasurements um ON um.id = m.unitmeasurement_id
      GROUP BY m.id, m.code, m.description, um.code, m.price
      ORDER BY mat_code
    `);

    const mapped: MaterialConsumptionRow[] = rows.map(r => {
      const quantity = parseFloat(String(r.total_qty));
      const price = r.price !== null ? parseFloat(String(r.price)) : null;
      const cost = price !== null ? price * quantity : null;
      return {
        materialId: r.material_id,
        code: r.mat_code,
        description: r.mat_desc,
        unit: r.um,
        quantity,
        price,
        cost,
      };
    });

    const totalCost = mapped.reduce((s, r) => s + (r.cost ?? 0), 0);
    return { orderId: orderId ?? null, rows: mapped, totalCost };
  }

  async generateCostCsv(multiplier = 1, detailed = false): Promise<Buffer> {
    // Faithful port of the legacy FabricsController::calculateCost() report.
    const rows = await this.loadCostRows();

    // Group into article → variant → material rows, preserving query order.
    const articles = new Map<string, Map<string, CostRow[]>>();
    for (const r of rows) {
      const artKey = `${r.art_name} - ${r.art_desc ?? ''}`;
      const varKey = `${r.var_code} - ${r.var_desc ?? ''}`;
      let vars = articles.get(artKey);
      if (!vars) {
        vars = new Map<string, CostRow[]>();
        articles.set(artKey, vars);
      }
      let mats = vars.get(varKey);
      if (!mats) {
        mats = [];
        vars.set(varKey, mats);
      }
      mats.push(r);
    }

    const SEP = 'XXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\tXXXXXXXXX\t';
    let out = '';

    for (const [artKey, vars] of articles) {
      let detail = artKey + '\n';
      detail += 'Variante\tID\tMateriale\tPrice\tQta\tUMI\tTotale\n';

      for (const [varKey, mats] of vars) {
        let totVariante = 0;
        if (detailed) detail += varKey + '\n';

        for (const m of mats) {
          const price = m.price !== null ? parseFloat(String(m.price)) : 0;
          const qta = parseFloat(String(m.qty));
          const cost = price * qta;
          totVariante += cost;
          if (detailed) {
            detail +=
              '\t' + m.compo_type + '-' + m.compo_id + '\t' +
              m.mat_code + ' - ' + (m.mat_desc ?? '') + '\t' +
              itNum(price) + '\t' + itNum(qta) + '\t' + m.um + '\t' +
              itNum(cost) + '\t\n';
          }
        }

        const summary =
          artKey + '\t' + varKey + '\t' + itNum(totVariante) +
          '\tX' + multiplier + '\t' + itNum(totVariante * multiplier);

        if (detailed) {
          detail += '\t\t\t\t\t\t\t' + summary + '\n\n';
        } else {
          out += summary + '\n';
        }
      }

      if (detailed) {
        out += detail + '\n' + SEP + '\n\n\n\n';
      } else {
        out += '\n' + SEP + '\n\n';
      }
    }

    return Buffer.from(out, 'utf-8');
  }

  // ── Articles list (PDF) ────────────────────────────────────────────────────

  async generateArticlesListPdf(): Promise<Buffer> {
    const projects = await this.prisma.project.findMany({
      include: {
        articles: {
          include: { article: { include: { fabrics: true } } },
          orderBy: { article: { name: 'asc' } },
        },
      },
      orderBy: { name: 'asc' },
    });

    const allArticleIds = projects.flatMap(p => p.articles.map(a => a.articleId));

    // Articles not assigned to any project
    const unassignedArticles = await this.prisma.article.findMany({
      where: { id: { notIn: allArticleIds.length > 0 ? allArticleIds : [-1] } },
      include: { fabrics: true },
      orderBy: { name: 'asc' },
    });

    const toEntry = (a: { name: string; description: string | null; fabrics: Array<{ code: string; description: string | null; price: import('@prisma/client').Prisma.Decimal | null }> }) => ({
      name: a.name,
      description: a.description,
      fabrics: a.fabrics.map(f => ({
        code: f.code,
        description: f.description,
        price: f.price !== null ? Number(f.price) : null,
      })),
    });

    const data: ArticlesListData = {
      generatedAt: new Date().toLocaleString('it-IT'),
      projects: projects.map(p => ({
        projectName: p.name,
        articles: p.articles.map(ap => toEntry(ap.article)),
      })),
      unassigned: unassignedArticles.map(toEntry),
    };

    return this.renderPdf(renderArticlesList(data));
  }

  // ── Order export PDF ───────────────────────────────────────────────────────

  async generateOrderExportPdf(orderId: number): Promise<Buffer> {
    const order = await this.loadOrderForReport(orderId);
    const c = order.customer;
    const vatApplied = c.vatApplied !== null ? Number(c.vatApplied) : null;

    const details = order.orderDetails.map(d => ({
      qty: d.quantity,
      sizeCode: d.modeltypeSexSize?.size.code ?? '—',
      sexCode: d.modeltypeSexSize?.modeltypeSex.sex.code ?? '—',
      articleName: d.article.name,
      fabricCode: d.fabric?.code ?? '—',
      fabricDescription: d.fabric?.description ?? null,
      price: d.fabric?.price !== null && d.fabric?.price !== undefined ? Number(d.fabric.price) : null,
      note: d.note,
    }));

    const partialTotal = details.reduce(
      (s, d) => s + (d.qty ?? 0) * (d.price ?? 0),
      0,
    );
    const discountPct = order.discount !== null ? Number(order.discount) : 0;
    const discountAmount = partialTotal * discountPct / 100;
    const subtotal = partialTotal - discountAmount;
    const vat = (vatApplied ?? 0) * subtotal / 100;
    const grandTotal = subtotal + vat;

    const html = renderOrderExport({
      orderNumber: order.orderNumber,
      date: order.date ? order.date.toISOString().split('T')[0] : null,
      description: order.description,
      payment: order.payment,
      note: order.note,
      customer: {
        company: c.company,
        name: c.name,
        surname: c.surname,
        email: c.email,
        address: c.address,
        zipCode: c.zipCode,
        city: c.city,
        country: c.country,
        vat: c.vat,
        vatApplied,
      },
      discount: discountPct || null,
      details,
      totals: { partialTotal, discountAmount, subtotal, vat, grandTotal },
    });

    return this.renderPdf(html);
  }

  // ── Choose quantity PDF (retail / wholesale) ───────────────────────────────

  async generateChooseQuantityPdf(orderId: number, isWholesale = false): Promise<Buffer> {
    const order = await this.loadOrderForReport(orderId);
    const c = order.customer;
    const customerName = joinDisplay([c.company, fullPersonName(c.name, c.surname)]);

    // Group details into size grids per article/fabric
    const gridMap = new Map<string, SizeGrid>();

    for (const d of order.orderDetails) {
      const key = `${d.articleId}_${d.fabricId ?? 'null'}`;
      if (!gridMap.has(key)) {
        gridMap.set(key, {
          sexCode: d.modeltypeSexSize?.modeltypeSex.sex.code ?? '—',
          articleName: d.article.name,
          articleDescription: d.article.description,
          fabricCode: d.fabric?.code ?? '—',
          fabricDescription: d.fabric?.description ?? null,
          price: d.fabric?.price !== null && d.fabric?.price !== undefined ? Number(d.fabric.price) : null,
          sizes: [],
        });
      }
      const grid = gridMap.get(key)!;
      grid.sizes.push({
        sizeCode: d.modeltypeSexSize?.size.code ?? '?',
        modeltypeSexSizeId: d.modeltypeSexSizeId ?? 0,
        quantity: d.quantity,
      });
    }

    const data: ChooseQuantityData = {
      orderNumber: order.orderNumber,
      customerName,
      date: order.date ? order.date.toISOString().split('T')[0] : null,
      isWholesale,
      grids: Array.from(gridMap.values()),
    };

    return this.renderPdf(renderChooseQuantity(data));
  }

  // ── Order form PDF (blank) ─────────────────────────────────────────────────

  async generateOrderFormPdf(): Promise<Buffer> {
    const articles = await this.prisma.article.findMany({
      include: {
        fabrics: { orderBy: { code: 'asc' } },
        modeltypesSex: {
          include: {
            sizes: { include: { size: true }, orderBy: { size: { code: 'asc' } } },
            sex: true,
            modeltype: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    const rows = articles
      .flatMap(a =>
        a.fabrics.map(f => {
          const sizes = a.modeltypesSex.sizes.map(s => s.size.code).join(' | ');
          return `<tr>
            <td>${esc(a.modeltypesSex.sex.code)}</td>
            <td>${esc(a.name)}${a.description ? ' - ' + esc(a.description) : ''}</td>
            <td>${esc(f.code)}${f.description ? ' - ' + esc(f.description) : ''}</td>
            <td class="num">${f.price !== null ? '€ ' + Number(f.price).toFixed(2) : '—'}</td>
            <td class="sizes">${esc(sizes)}</td>
            <td class="qty-box"></td>
          </tr>`;
        }),
      )
      .join('');

    const html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; font-size: 10px; margin: 15px; }
  h1 { font-size: 16px; }
  .meta { display: flex; gap: 40px; margin-bottom: 16px; }
  .meta-field { border-bottom: 1px solid #333; min-width: 150px; height: 16px; }
  table { width: 100%; border-collapse: collapse; }
  th { background: #444; color: #fff; padding: 4px 6px; text-align: left; font-size: 9px; }
  td { padding: 3px 6px; border-bottom: 1px solid #ddd; }
  .num { text-align: right; }
  .sizes { color: #555; font-size: 9px; }
  .qty-box { border: 1px solid #999; min-width: 60px; height: 14px; }
</style>
</head>
<body>
<h1>Modulo Ordine</h1>
<div class="meta">
  <div>Cliente: <div class="meta-field"></div></div>
  <div>Data: <div class="meta-field"></div></div>
  <div>N. Ordine: <div class="meta-field"></div></div>
</div>
<table>
  <thead>
    <tr>
      <th>Sesso</th><th>Articolo</th><th>Variante</th>
      <th class="num">Prezzo</th><th>Taglie disponibili</th><th>Qta</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>
</body>
</html>`;

    return this.renderPdf(html);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private async loadOrderForReport(orderId: number) {
    const order = await this.prisma.orderHeader.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        collection: true,
        orderDetails: {
          include: {
            article: true,
            fabric: true,
            modeltypeSexSize: {
              include: {
                size: true,
                modeltypeSex: { include: { modeltype: true, sex: true } },
              },
            },
          },
          orderBy: [
            { article: { name: 'asc' } },
            { fabric: { code: 'asc' } },
          ],
        },
      },
    });
    if (!order) throw new NotFoundException(`OrderHeader ${orderId} not found`);
    return order;
  }
}

// Replicates PHP number_format($n, $dec, ',', '.') — Italian formatting:
// '.' thousands separator, ',' decimal separator.
function itNum(n: number, dec = 3): string {
  const fixed = n.toFixed(dec);
  const neg = fixed.startsWith('-');
  const [intPart, decPart] = (neg ? fixed.slice(1) : fixed).split('.');
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (neg ? '-' : '') + withThousands + (dec > 0 ? ',' + decPart : '');
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
