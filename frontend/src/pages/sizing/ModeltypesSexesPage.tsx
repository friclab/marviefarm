import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import api from '@/lib/api';
import type {
  Modeltype, Sex, ModeltypeSex, ModeltypeSexDependents, Paginated,
} from '@/types/api';

function errMsg(e: unknown, fallback: string): string {
  const msg = (e as { response?: { data?: { message?: string } } }).response?.data?.message;
  if (Array.isArray(msg)) return msg.join(', ');
  return msg ?? fallback;
}

type ReassignTarget = { combo: ModeltypeSex; articles: { id: number; name: string }[] };

export default function ModeltypesSexesPage() {
  const qc = useQueryClient();
  const [pending, setPending] = useState<Set<string>>(new Set());
  const [reassign, setReassign] = useState<ReassignTarget | null>(null);

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
        // Before removing, ask the API what depends on this combination.
        const { data: dep } = await api.get<ModeltypeSexDependents>(`/modeltypes-sexes/${existing.id}/dependents`);
        if (dep.orderCount > 0) {
          toast.error(
            `Impossibile rimuovere: ${dep.orderCount} riga/e d'ordine sono collegate a questa combinazione.`,
          );
          return;
        }
        if (dep.canReassign) {
          // Articles block deletion but no orders → open the reassignment flow.
          setReassign({ combo: existing, articles: dep.articles });
          return;
        }
        // No orders, no articles → delete directly.
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
    } catch (e) {
      toast.error(errMsg(e, 'Errore nel salvataggio'));
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

      {reassign && (
        <ReassignDialog
          source={reassign}
          modeltypes={mts}
          sexes={sxs}
          onClose={() => setReassign(null)}
          onDone={() => {
            setReassign(null);
            qc.invalidateQueries({ queryKey: ['modeltypes-sexes'] });
            qc.invalidateQueries({ queryKey: ['articles'] });
          }}
        />
      )}
    </div>
  );
}

type RowChoice = { modeltypeId?: number; sexId?: number };

function ReassignDialog({
  source, modeltypes, sexes, onClose, onDone,
}: {
  source: ReassignTarget;
  modeltypes: Modeltype[];
  sexes: Sex[];
  onClose: () => void;
  onDone: () => void;
}) {
  const [choices, setChoices] = useState<Record<number, RowChoice>>({});
  const [saving, setSaving] = useState(false);

  const sourceLabel = source.combo.displayName;
  const allChosen = source.articles.every(a => {
    const c = choices[a.id];
    return c?.modeltypeId != null && c?.sexId != null;
  });

  function setChoice(articleId: number, patch: RowChoice) {
    setChoices(prev => ({ ...prev, [articleId]: { ...prev[articleId], ...patch } }));
  }

  async function confirm() {
    if (!allChosen || saving) return;
    setSaving(true);
    try {
      await api.post(`/modeltypes-sexes/${source.combo.id}/reassign`, {
        assignments: source.articles.map(a => ({
          articleId: a.id,
          modeltypeId: choices[a.id].modeltypeId,
          sexId: choices[a.id].sexId,
        })),
      });
      toast.success('Articoli riassegnati e combinazione rimossa.');
      onDone();
    } catch (e) {
      toast.error(errMsg(e, 'Errore nella riassegnazione'));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open onOpenChange={(o) => { if (!o && !saving) onClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Riassegna articoli prima di rimuovere «{sourceLabel}»</DialogTitle>
          <DialogDescription>
            La combinazione non può essere rimossa perché {source.articles.length} articolo/i la usano.
            Assegna ogni articolo a una nuova combinazione modeltipo × sesso. Se la combinazione scelta
            non è ancora attiva, verrà creata automaticamente. Al termine la combinazione attuale verrà
            eliminata.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[50vh] overflow-y-auto -mx-1 px-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left font-medium pb-2">Articolo</th>
                <th className="text-left font-medium pb-2 px-2">Modeltipo</th>
                <th className="text-left font-medium pb-2">Sesso</th>
              </tr>
            </thead>
            <tbody>
              {source.articles.map(a => (
                <tr key={a.id} className="border-t align-middle">
                  <td className="py-2 pr-2 font-medium">{a.name}</td>
                  <td className="py-2 px-2 w-[40%]">
                    <Select
                      value={choices[a.id]?.modeltypeId != null ? String(choices[a.id]!.modeltypeId) : undefined}
                      onValueChange={(v) => setChoice(a.id, { modeltypeId: Number(v) })}
                    >
                      <SelectTrigger><SelectValue placeholder="Scegli…" /></SelectTrigger>
                      <SelectContent>
                        {modeltypes.map(m => (
                          <SelectItem key={m.id} value={String(m.id)}>
                            {m.code}{m.description ? ` — ${m.description}` : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-2 w-[30%]">
                    <Select
                      value={choices[a.id]?.sexId != null ? String(choices[a.id]!.sexId) : undefined}
                      onValueChange={(v) => setChoice(a.id, { sexId: Number(v) })}
                    >
                      <SelectTrigger><SelectValue placeholder="Scegli…" /></SelectTrigger>
                      <SelectContent>
                        {sexes.map(s => (
                          <SelectItem key={s.id} value={String(s.id)}>
                            {s.code}{s.description ? ` — ${s.description}` : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>Annulla</Button>
          <Button onClick={confirm} disabled={!allChosen || saving}>
            {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Riassegna ed elimina
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
