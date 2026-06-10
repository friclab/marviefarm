import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { joinDisplay, fullPersonName } from '../common/display-name';
import { renderOrderExport } from './templates/order-export.template';
import { renderChooseQuantity, ChooseQuantityData, SizeGrid } from './templates/choose-quantity.template';
import { renderArticlesList, ArticlesListData } from './templates/articles-list.template';

interface CostRow {
  art_name: string;
  art_desc: string | null;
  var_code: string;
  var_desc: string | null;
  compo_type: string;
  mat_code: string;
  mat_desc: string | null;
  qty: unknown;   // MySQL DECIMAL comes back as string via $queryRaw
  price: unknown;
  um: string;
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

  async generateCostCsv(multiplier = 1): Promise<Buffer> {
    // Raw UNION query — no user input interpolated; multiplier applied in TypeScript
    const rows = await this.prisma.$queryRaw<CostRow[]>`
      SELECT
        art.name AS art_name, art.description AS art_desc,
        fab.code AS var_code, fab.description AS var_desc,
        'F' AS compo_type,
        mat.code AS mat_code, mat.description AS mat_desc,
        fcm.qta AS qty, mat.price AS price, um.code AS um
      FROM articles art
      JOIN fabrics fab ON fab.article_id = art.id
      JOIN fixedcompositions_materials fcm ON fcm.fixedcomposition_id = fab.fixedcomposition_id
      JOIN materials mat ON mat.id = fcm.material_id
      JOIN unitmeasurements um ON um.id = mat.unitmeasurement_id
      WHERE fab.fixedcomposition_id IS NOT NULL

      UNION ALL

      SELECT
        art.name, art.description,
        fab.code, fab.description,
        'D',
        mat.code, mat.description,
        dcm.qta, mat.price, um.code
      FROM articles art
      JOIN fabrics fab ON fab.article_id = art.id
      JOIN dynamiccompositions_materials dcm ON dcm.dynamiccomposition_id = fab.dynamiccomposition_id
      JOIN materials mat ON mat.id = dcm.material_id
      JOIN unitmeasurements um ON um.id = mat.unitmeasurement_id
      WHERE fab.dynamiccomposition_id IS NOT NULL

      ORDER BY art_name, var_code, compo_type DESC
    `;

    const header =
      'Articolo,Descrizione,Variante,Desc. Variante,Tipo Comp.,Materiale,Desc. Materiale,Qta,Prezzo,UM,Costo,Costo x N\n';

    const csvBody = rows
      .map(r => {
        const qty = parseFloat(String(r.qty));
        const price = r.price !== null ? parseFloat(String(r.price)) : 0;
        const cost = qty * price;
        const costN = cost * multiplier;
        return [
          csvEsc(r.art_name),
          csvEsc(r.art_desc ?? ''),
          csvEsc(r.var_code),
          csvEsc(r.var_desc ?? ''),
          r.compo_type,
          csvEsc(r.mat_code),
          csvEsc(r.mat_desc ?? ''),
          qty.toFixed(3),
          price.toFixed(2),
          r.um,
          cost.toFixed(2),
          costN.toFixed(2),
        ].join(',');
      })
      .join('\n');

    return Buffer.from(header + csvBody, 'utf-8');
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

function csvEsc(s: string): string {
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
