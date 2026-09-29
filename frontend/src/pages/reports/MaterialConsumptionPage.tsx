import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';
import { useSeasonScopedParams } from '@/lib/collection';
import type { MaterialConsumption, OrderHeader, Paginated } from '@/types/api';

const eur = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });
const qty = new Intl.NumberFormat('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 3 });

const ALL = 'all';

function downloadCsv(filename: string, content: string) {
  const blob = new Blob(['﻿' + content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function MaterialConsumptionPage() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string>(ALL);
  const [search, setSearch] = useState('');
  const scoped = useSeasonScopedParams();

  const { data: orders } = useQuery({
    queryKey: ['order-headers', 'all', scoped],
    queryFn: () =>
      api.get<Paginated<OrderHeader>>('/order-headers', { params: { limit: 500, ...scoped } }).then(r => r.data),
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['reports', 'material-consumption', orderId, scoped],
    queryFn: () =>
      api
        .get<MaterialConsumption>('/reports/material-consumption', {
          // A specific order is already season-bound; the season scope only applies
          // to the "all orders" aggregate.
          params: orderId === ALL ? { ...scoped } : { orderId: Number(orderId) },
        })
        .then(r => r.data),
  });

  const rows = useMemo(() => {
    const all = data?.rows ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      r => r.code.toLowerCase().includes(q) || (r.description ?? '').toLowerCase().includes(q),
    );
  }, [data, search]);

  const shownCost = rows.reduce((s, r) => s + (r.cost ?? 0), 0);

  const orderLabel = (o: OrderHeader) =>
    o.orderNumber ? `${o.orderNumber} — ${o.customer.displayName}` : o.displayName;

  function exportCsv() {
    const header = ['Materiale', 'Descrizione', 'Consumo', 'UM', 'Prezzo', 'Costo'];
    const lines = rows.map(r =>
      [
        r.code,
        r.description ?? '',
        qty.format(r.quantity),
        r.unit ?? '',
        r.price !== null ? r.price.toFixed(2) : '',
        r.cost !== null ? r.cost.toFixed(2) : '',
      ]
        .map(v => `"${String(v).replace(/"/g, '""')}"`)
        .join(';'),
    );
    downloadCsv('consumo_materiali.csv', [header.join(';'), ...lines].join('\n'));
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/reports')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Consumo Materiali</h1>
          <p className="text-sm text-muted-foreground">
            Quantità totale di ogni materiale necessaria in base agli ordini inseriti
            (consumo per pezzo × quantità ordinata).
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3 mb-5">
        <div className="space-y-1 w-72">
          <Label>Ordine</Label>
          <Select value={orderId} onValueChange={setOrderId}>
            <SelectTrigger>
              <SelectValue placeholder="Tutti gli ordini" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Tutti gli ordini</SelectItem>
              {orders?.data.map(o => (
                <SelectItem key={o.id} value={String(o.id)}>
                  {orderLabel(o)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1 flex-1 min-w-48">
          <Label>Cerca materiale</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Codice o descrizione…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Button variant="outline" onClick={exportCsv} disabled={rows.length === 0}>
          <Download className="w-4 h-4 mr-1" /> CSV
        </Button>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Caricamento…</p>}
      {isError && <p className="text-sm text-destructive">Errore nel caricamento dei dati.</p>}

      {!isLoading && !isError && rows.length === 0 && (
        <p className="text-sm text-muted-foreground">
          {search
            ? 'Nessun materiale corrisponde alla ricerca.'
            : 'Nessun consumo: gli ordini selezionati non hanno articoli/varianti con composizione.'}
        </p>
      )}

      {rows.length > 0 && (
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-muted-foreground bg-muted/40">
                <th className="text-left font-medium px-3 py-2">Materiale</th>
                <th className="text-right font-medium px-3 py-2 w-32">Consumo</th>
                <th className="text-right font-medium px-3 py-2 w-28">Prezzo</th>
                <th className="text-right font-medium px-3 py-2 w-32">Costo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.materialId} className="border-t">
                  <td className="px-3 py-2">
                    <span className="font-medium">{r.code}</span>
                    {r.description && <span className="text-muted-foreground"> — {r.description}</span>}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums font-medium">
                    {qty.format(r.quantity)} <span className="text-muted-foreground font-normal">{r.unit ?? ''}</span>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {r.price !== null ? eur.format(r.price) : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {r.cost !== null ? eur.format(r.cost) : <span className="text-muted-foreground">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t bg-muted/30 font-semibold">
                <td className="px-3 py-2" colSpan={3}>
                  Totale ({rows.length} material{rows.length === 1 ? 'e' : 'i'})
                </td>
                <td className="px-3 py-2 text-right tabular-nums">{eur.format(shownCost)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
