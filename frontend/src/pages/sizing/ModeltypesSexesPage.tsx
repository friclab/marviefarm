import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import api from '@/lib/api';
import type { Modeltype, Sex, ModeltypeSex, Paginated } from '@/types/api';

export default function ModeltypesSexesPage() {
  const qc = useQueryClient();
  const [pending, setPending] = useState<Set<string>>(new Set());

  const { data: modeltypesData, isLoading: loadingMt } = useQuery({
    queryKey: ['modeltypes', 'all'],
    queryFn: () => api.get<Paginated<Modeltype>>('/modeltypes', { params: { limit: 200 } }).then(r => r.data),
  });
  const { data: sexesData, isLoading: loadingSx } = useQuery({
    queryKey: ['sexes', 'all'],
    queryFn: () => api.get<Paginated<Sex>>('/sexes', { params: { limit: 200 } }).then(r => r.data),
  });
  const { data: combos, isLoading: loadingCombos } = useQuery({
    queryKey: ['modeltypes-sexes'],
    queryFn: () => api.get<Paginated<ModeltypeSex>>('/modeltypes-sexes', { params: { limit: 500 } }).then(r => r.data),
  });

  const lookup = new Map<string, ModeltypeSex>();
  combos?.data.forEach(c => lookup.set(`${c.modeltypeId}_${c.sexId}`, c));

  async function toggle(modeltypeId: number, sexId: number) {
    const key = `${modeltypeId}_${sexId}`;
    if (pending.has(key)) return;
    const existing = lookup.get(key);
    setPending(p => new Set(p).add(key));
    try {
      if (existing) {
        await api.delete(`/modeltypes-sexes/${existing.id}`);
        qc.setQueryData<Paginated<ModeltypeSex>>(['modeltypes-sexes'], old =>
          old ? { ...old, data: old.data.filter(c => c.id !== existing.id), total: old.total - 1 } : old
        );
      } else {
        const { data: created } = await api.post<ModeltypeSex>('/modeltypes-sexes', { modeltypeId, sexId });
        qc.setQueryData<Paginated<ModeltypeSex>>(['modeltypes-sexes'], old =>
          old ? { ...old, data: [...old.data, created], total: old.total + 1 } : old
        );
      }
    } catch {
      toast.error('Errore nel salvataggio');
    } finally {
      setPending(p => { const n = new Set(p); n.delete(key); return n; });
    }
  }

  const mts = modeltypesData?.data ?? [];
  const sxs = sexesData?.data ?? [];

  if (loadingMt || loadingSx || loadingCombos) {
    return (
      <div className="p-6 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Caricamento...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Modeltipi × Sessi</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Spunta le combinazioni attive. Ogni click crea o rimuove automaticamente la relazione.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left pr-8 pb-3 font-medium text-muted-foreground">Modeltipo</th>
              {sxs.map(s => (
                <th key={s.id} className="px-5 pb-3 font-semibold text-center">{s.code}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mts.map(mt => (
              <tr key={mt.id} className="border-t">
                <td className="py-3 pr-8 font-medium">
                  {mt.code}
                  {mt.description && (
                    <span className="ml-2 text-xs text-muted-foreground font-normal">{mt.description}</span>
                  )}
                </td>
                {sxs.map(s => {
                  const key = `${mt.id}_${s.id}`;
                  const isPending = pending.has(key);
                  return (
                    <td key={s.id} className="px-5 py-3 text-center">
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
        {combos?.total ?? 0} combinazioni attive
      </p>
    </div>
  );
}
