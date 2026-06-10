interface FabricRow {
  qty: number | null;
  sizeCode: string;
  sexCode: string;
  articleName: string;
  fabricCode: string;
  fabricDescription: string | null;
  price: number | null;
  note: string | null;
}

interface OrderData {
  orderNumber: string | null;
  date: string | null;
  description: string | null;
  payment: string | null;
  note: string | null;
  customer: {
    company: string | null;
    name: string | null;
    surname: string | null;
    email: string | null;
    address: string | null;
    zipCode: string | null;
    city: string | null;
    country: string | null;
    vat: string | null;
    vatApplied: number | null;
  };
  discount: number | null;
  details: FabricRow[];
  totals: {
    partialTotal: number;
    discountAmount: number;
    subtotal: number;
    vat: number;
    grandTotal: number;
  };
}

function fmt(n: number | null): string {
  if (n === null) return '—';
  return n.toFixed(2);
}

export function renderOrderExport(data: OrderData): string {
  const c = data.customer;
  const customerName = [c.company, [c.name, c.surname].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(' — ');

  const detailRows = data.details
    .map(
      d => `
      <tr>
        <td>${escHtml(d.sexCode)}</td>
        <td>${escHtml(d.articleName)}</td>
        <td>${escHtml(d.fabricCode)}${d.fabricDescription ? ' - ' + escHtml(d.fabricDescription) : ''}</td>
        <td>${escHtml(d.sizeCode)}</td>
        <td class="num">${d.qty ?? 0}</td>
        <td class="num">${fmt(d.price)}</td>
        <td class="num">${fmt(d.price !== null && d.qty !== null ? d.price * d.qty : null)}</td>
      </tr>`,
    )
    .join('');

  const { totals: t, discount } = data;

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; font-size: 11px; margin: 20px; }
  h1 { font-size: 16px; }
  .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
  th { background: #333; color: #fff; padding: 4px 8px; text-align: left; }
  td { padding: 3px 8px; border-bottom: 1px solid #ddd; }
  .num { text-align: right; }
  .totals td { font-weight: bold; }
  .totals .num { border-top: 2px solid #333; }
</style>
</head>
<body>
<h1>Ordine ${escHtml(data.orderNumber ?? '—')}</h1>
<div class="header">
  <div>
    <strong>Cliente:</strong> ${escHtml(customerName)}<br>
    ${c.address ? escHtml(c.address) + '<br>' : ''}
    ${c.zipCode || c.city ? [c.zipCode, c.city].filter(Boolean).join(' ') + '<br>' : ''}
    ${c.country ? escHtml(c.country) + '<br>' : ''}
    ${c.vat ? 'P.IVA: ' + escHtml(c.vat) + '<br>' : ''}
  </div>
  <div>
    <strong>Data:</strong> ${escHtml(data.date ?? '—')}<br>
    ${data.payment ? '<strong>Pagamento:</strong> ' + escHtml(data.payment) + '<br>' : ''}
    ${discount ? '<strong>Sconto:</strong> ' + discount + '%<br>' : ''}
    ${c.vatApplied ? '<strong>IVA:</strong> ' + c.vatApplied + '%<br>' : ''}
  </div>
</div>

${data.description ? '<p>' + escHtml(data.description) + '</p>' : ''}

<table>
  <thead>
    <tr>
      <th>Sesso</th><th>Articolo</th><th>Variante</th><th>Taglia</th>
      <th class="num">Qta</th><th class="num">Prezzo</th><th class="num">Subtotale</th>
    </tr>
  </thead>
  <tbody>${detailRows}</tbody>
  <tfoot class="totals">
    <tr><td colspan="6">Totale parziale</td><td class="num">€ ${fmt(t.partialTotal)}</td></tr>
    ${t.discountAmount > 0 ? `<tr><td colspan="6">Sconto ${discount}%</td><td class="num">- € ${fmt(t.discountAmount)}</td></tr>` : ''}
    <tr><td colspan="6">Subtotale</td><td class="num">€ ${fmt(t.subtotal)}</td></tr>
    ${t.vat > 0 ? `<tr><td colspan="6">IVA ${c.vatApplied}%</td><td class="num">€ ${fmt(t.vat)}</td></tr>` : ''}
    <tr><td colspan="6"><strong>Totale</strong></td><td class="num"><strong>€ ${fmt(t.grandTotal)}</strong></td></tr>
  </tfoot>
</table>

${data.note ? '<p><em>Note: ' + escHtml(data.note) + '</em></p>' : ''}
</body>
</html>`;
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
