import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import api from '@/lib/api';
import type { ModeltypeSex, Size, ModeltypeSexSize, Paginated } from '@/types/api';

export default function ModeltypesSexSizesPage() {
  const qc = useQueryClient();
  const [pending, setPending] = useState<Set<string>>(new Set());

  const { data: mtsData, isLoading: loadingMts } = useQuery({
    queryKey: ['modeltypes-sexes', 'all'],
    queryFn: () => api.get<Paginated<ModeltypeSex>>('/modeltypes-sexes', { params: { limit: 500 } }).then(r => r.data),
  });
  const { data: sizesData, isLoading: loadingSizes } = useQuery({
    queryKey: ['sizes', 'all'],
    queryFn: () => api.get<Paginated<Size>>('/sizes', { params: { limit: 200 } }).then(r => r.data),
  });
  const { data: combos, isLoading: loadingCombos } = useQuery({
    queryKey: ['modeltypes-sex-sizes'],
    queryFn: () => api.get<Paginated<ModeltypeSexSize>>('/modeltypes-sex-sizes', { params: { limit: 1000 } }).then(r => r.data),
  });

  const lookup = new Map<string, ModeltypeSexSize>();
  combos?.data.forEach(c => lookup.set(`${c.modeltypeSexId}_${c.sizeId}`, c));

  async function toggle(modeltypeSexId: number, sizeId: number) {
    const key = `${modeltypeSexId}_${sizeId}`;
    if (pending.has(key)) return;
    const existing = lookup.get(key);
    setPending(p => new Set(p).add(key));
    try {
      if (existing) {
        await api.delete(`/modeltypes-sex-sizes/${existing.id}`);
        qc.setQueryData<Paginated<ModeltypeSexSize>>(['modeltypes-sex-sizes'], old =>
          old ? { ...old, data: old.data.filter(c => c.id !== existing.id), total: old.total - 1 } : old
        );
      } else {
        const { data: created } = await api.post<ModeltypeSexSize>('/modeltypes-sex-sizes', { modeltypeSexId, sizeId });
        qc.setQueryData<Paginated<ModeltypeSexSize>>(['modeltypes-sex-sizes'], old =>
          old ? { ...old, data: [...old.data, created], total: old.total + 1 } : old
        );
      }
    } catch {
      toast.error('Errore nel salvataggio');
    } finally {
      setPending(p => { const n = new Set(p); n.delete(key); return n; });
    }
  }

  const mts = mtsData?.data ?? [];
  const sizes = sizesData?.data ?? [];

  if (loadingMts || loadingSizes || loadingCombos) {
    return (
      <div className="p-6 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Caricamento...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Combinazioni Taglie</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Seleziona le taglie valide per ogni combinazione Modeltipo × Sesso.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left pr-8 pb-3 font-medium text-muted-foreground">Combinazione</th>
              {sizes.map(s => (
                <th key={s.id} className="px-4 pb-3 font-semibold text-center">{s.code}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mts.map(mt => (
              <tr key={mt.id} className="border-t">
                <td className="py-3 pr-8 font-medium">{mt.displayName}</td>
                {sizes.map(s => {
                  const key = `${mt.id}_${s.id}`;
                  const isPending = pending.has(key);
                  return (
                    <td key={s.id} className="px-4 py-3 text-center">
                      {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin mx-auto text-muted-foreground" />
                      ) : (
                        <Checkbox
                          checked={lookup.has(key)}
                          onCheckedChange={() => toggle(mt.id, s.id)}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">
        {combos?.total ?? 0} assegnazioni taglie attive
      </p>
    </div>
  );
}
