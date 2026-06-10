"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderChooseQuantity = renderChooseQuantity;
function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function renderChooseQuantity(data) {
    const allSizes = [...new Set(data.grids.flatMap(g => g.sizes.map(s => s.sizeCode)))].sort();
    const rows = data.grids
        .map(grid => {
        const sizeCells = allSizes
            .map(sizeCode => {
            const s = grid.sizes.find(s => s.sizeCode === sizeCode);
            return `<td class="num">${s ? (s.quantity ?? '') : ''}</td>`;
        })
            .join('');
        return `
      <tr>
        <td>${escHtml(grid.sexCode)}</td>
        <td>${escHtml(grid.articleName)}${grid.articleDescription ? ' - ' + escHtml(grid.articleDescription) : ''}</td>
        <td>${escHtml(grid.fabricCode)}${grid.fabricDescription ? ' - ' + escHtml(grid.fabricDescription) : ''}</td>
        <td class="num">${grid.price !== null ? '€ ' + grid.price.toFixed(2) : '—'}</td>
        ${sizeCells}
        <td class="num total-col"></td>
      </tr>`;
    })
        .join('');
    const sizeHeaders = allSizes.map(s => `<th>${escHtml(s)}</th>`).join('');
    return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; font-size: 10px; margin: 15px; }
  h2 { font-size: 14px; margin-bottom: 4px; }
  .sub { font-size: 11px; color: #555; margin-bottom: 16px; }
  table { width: 100%; border-collapse: collapse; }
  th { background: #444; color: #fff; padding: 4px 6px; text-align: center; font-size: 9px; }
  th:nth-child(1), th:nth-child(2), th:nth-child(3), th:nth-child(4) { text-align: left; }
  td { padding: 3px 6px; border-bottom: 1px solid #eee; }
  .num { text-align: right; }
  .total-col { border-left: 2px solid #aaa; min-width: 40px; }
</style>
</head>
<body>
<h2>Scheda ${data.isWholesale ? 'Ingrosso' : 'Dettaglio'} — Ordine ${escHtml(data.orderNumber ?? '—')}</h2>
<div class="sub">Cliente: ${escHtml(data.customerName)} &nbsp;|&nbsp; Data: ${escHtml(data.date ?? '—')}</div>
<table>
  <thead>
    <tr>
      <th>Sesso</th>
      <th>Articolo</th>
      <th>Variante</th>
      <th>Prezzo</th>
      ${sizeHeaders}
      <th class="total-col">Totale</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>
</body>
</html>`;
}
//# sourceMappingURL=choose-quantity.template.js.map