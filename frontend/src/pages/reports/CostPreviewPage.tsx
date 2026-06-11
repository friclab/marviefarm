import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import type { CostPreview, CostPreviewArticle, CostPreviewVariant } from '@/types/api';

// Italian currency / number formatting (',' decimals, '.' thousands).
const eur = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });
const qty = new Intl.NumberFormat('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 3 });

function VariantRow({ variant, multiplier }: { variant: CostPreviewVariant; multiplier: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-md">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted/40"
      >
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        <span className="font-medium text-sm">{variant.code}</span>
        {variant.description && <span className="text-sm text-muted-foreground">— {variant.description}</span>}
        <Badge variant="secondary" className="ml-auto font-normal">
          {variant.materials.length} materiali
        </Badge>
        <span className="w-28 text-right text-sm font-semibold tabular-nums">{eur.format(variant.total)}</span>
        {multiplier !== 1 && (
          <span className="w-28 text-right text-sm tabular-nums text-primary">
            {eur.format(variant.totalWithMultiplier)}
          </span>
        )}
      </button>

      {open && (
        <div className="border-t">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-muted-foreground bg-muted/40">
                <th className="text-left font-medium px-3 py-1.5">Materiale</th>
                <th className="text-left font-medium px-2 py-1.5 w-16">Tipo</th>
                <th className="text-right font-medium px-2 py-1.5 w-24">Consumo</th>
                <th className="text-right font-medium px-2 py-1.5 w-28">Prezzo</th>
                <th className="text-right font-medium px-3 py-1.5 w-28">Costo</th>
              </tr>
            </thead>
            <tbody>
              {variant.materials.map(m => (
                <tr key={`${m.compoType}-${m.compoId}`} className="border-t">
                  <td className="px-3 py-1.5">
                    <span className="font-medium">{m.code}</span>
                    {m.description && <span className="text-muted-foreground"> — {m.description}</span>}
                  </td>
                  <td className="px-2 py-1.5">
                    <Badge variant="outline" className="font-normal text-[10px] px-1 py-0">
                      {m.compoType === 'F' ? 'fisso' : 'dinamico'}
                    </Badge>
                  </td>
                  <td className="px-2 py-1.5 text-right tabular-nums">{qty.format(m.quantity)} {m.unit}</td>
                  <td className="px-2 py-1.5 text-right tabular-nums">{eur.format(m.price)}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums font-medium">{eur.format(m.cost)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t bg-muted/30 font-semibold">
                <td className="px-3 py-1.5" colSpan={4}>
                  Totale variante{multiplier !== 1 ? ` (×${multiplier})` : ''}
                </td>
                <td className="px-3 py-1.5 text-right tabular-nums">
                  {eur.format(multiplier !== 1 ? variant.totalWithMultiplier : variant.total)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

function ArticleCard({ article, multiplier }: { article: CostPreviewArticle; multiplier: number }) {
  const min = Math.min(...article.variants.map(v => v.total));
  const max = Math.max(...article.variants.map(v => v.total));

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-baseline gap-2">
        <h2 className="text-base font-semibold">{article.name}</h2>
        {article.description && <span className="text-sm text-muted-foreground">{article.description}</span>}
        <span className="ml-auto text-sm text-muted-foreground">
          {article.variants.length} variant{article.variants.length === 1 ? 'e' : 'i'} ·{' '}
          <span className="tabular-nums">
            {min === max ? eur.format(min) : `${eur.format(min)} – ${eur.format(max)}`}
          </span>
        </span>
      </div>
      <div className="space-y-2">
        {article.variants.map(v => (
          <VariantRow key={v.code} variant={v} multiplier={multiplier} />
        ))}
      </div>
    </div>
  );
}

export default function CostPreviewPage() {
  const navigate = useNavigate();
  const [multiplierInput, setMultiplierInput] = useState('1');
  const [search, setSearch] = useState('');

  const multiplier = Number(multiplierInput) || 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['reports', 'cost-preview', multiplier],
    queryFn: () =>
      api.get<CostPreview>('/reports/cost-preview', { params: { multiplier } }).then(r => r.data),
  });

  const articles = useMemo(() => {
    const all = data?.articles ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return all;
    return all
      .map(a => {
        const articleMatches =
          a.name.toLowerCase().includes(q) || (a.description ?? '').toLowerCase().includes(q);
        if (articleMatches) return a;
        const variants = a.variants.filter(
          v => v.code.toLowerCase().includes(q) || (v.description ?? '').toLowerCase().includes(q),
        );
        return variants.length ? { ...a, variants } : null;
      })
      .filter((a): a is CostPreviewArticle => a !== null);
  }, [data, search]);

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/reports')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Costo di Produzione</h1>
          <p className="text-sm text-muted-foreground">
            Costo di ogni articolo e variante in base alla composizione (materiali e consumi).
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3 mb-5">
        <div className="space-y-1 w-32">
          <Label>Moltiplicatore</Label>
          <Input
            type="number" step="0.1" min="0.1"
            value={multiplierInput}
            onChange={e => setMultiplierInput(e.target.value)}
          />
        </div>
        <div className="space-y-1 flex-1 min-w-48">
          <Label>Cerca</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-8"
              placeholder="Articolo o variante…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Caricamento…</p>}
      {isError && <p className="text-sm text-destructive">Errore nel caricamento dei dati.</p>}

      {!isLoading && !isError && articles.length === 0 && (
        <p className="text-sm text-muted-foreground">
          {search
            ? 'Nessun articolo o variante corrisponde alla ricerca.'
            : 'Nessun articolo con composizione e varianti da calcolare.'}
        </p>
      )}

      <div className="space-y-4">
        {articles.map(a => (
          <ArticleCard key={a.name + (a.description ?? '')} article={a} multiplier={multiplier} />
        ))}
      </div>
    </div>
  );
}
