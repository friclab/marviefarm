import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowLeft, Trash2, Plus, ChevronDown, ChevronRight, Pencil, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import api from '@/lib/api';
import type { Article, Fabric, Material, Paginated } from '@/types/api';

// Next variant code from the article name plus an incremental, zero-padded
// suffix (e.g. "ABC-03"), given the codes already taken. Used both for the
// single-variant dialog and to seed each row of the batch dialog.
function nextFabricCode(articleName: string, takenCodes: string[]): string {
  const prefix = `${articleName.trim()}-`;
  let max = 0;
  for (const code of takenCodes) {
    if (code.startsWith(prefix)) {
      const n = parseInt(code.slice(prefix.length), 10);
      if (Number.isFinite(n) && n > max) max = n;
    }
  }
  return `${prefix}${String(max + 1).padStart(2, '0')}`;
}

function suggestFabricCode(articleName: string, fabrics: Fabric[]): string {
  return nextFabricCode(articleName, fabrics.map(f => f.code));
}

// ── Composition material grid (shared by FC and DC) ──────────────────────────
//
// Replaces the old "pick from dropdown + type qty + click +" flow with a grid
// listing every material, each with a checkbox and a consumption field. The
// user ticks the materials they want, fills the consumption, then saves once;
// the grid diffs against the server state and fires the needed create/update/
// delete calls.

type CurrentMaterial = { id: number; materialId: number; quantity: number };

interface CommitChanges {
  creates: Array<{ materialId: number; quantity: number }>;
  updates: Array<{ id: number; quantity: number }>;
  deletes: number[];
}

type DraftRow = { checked: boolean; qty: string };
type Draft = Record<number, DraftRow>;

function CompositionGrid({
  materials,
  current,
  kind,
  onCommit,
}: {
  materials: Material[];
  current: CurrentMaterial[];
  kind: 'fixed' | 'dynamic';
  onCommit: (changes: CommitChanges) => Promise<void>;
}) {
  // Server state expressed as a draft (checked + qty string per materialId).
  const serverDraft = useMemo<Draft>(() => {
    const d: Draft = {};
    for (const c of current) d[c.materialId] = { checked: true, qty: String(c.quantity) };
    return d;
  }, [current]);

  const [draft, setDraft] = useState<Draft>(serverDraft);

  // Reset local edits whenever the server state actually changes (e.g. after a
  // successful save). React Query's structural sharing keeps `current` stable
  // between unrelated re-renders, so in-progress edits are not clobbered.
  useEffect(() => setDraft(serverDraft), [serverDraft]);

  const [showAll, setShowAll] = useState(false);

  // Filter materials by the composition's usage. Materials already in the
  // composition are always shown (even if off-filter) so they remain visible
  // and removable — and so the diff below can still process them.
  const target = kind === 'fixed' ? 'FIXED' : 'DYNAMIC';
  const visibleMaterials = useMemo(() => {
    const currentIds = new Set(current.map(c => c.materialId));
    return materials.filter(
      m => showAll || m.usage === target || m.usage === 'BOTH' || currentIds.has(m.id),
    );
  }, [materials, current, target, showAll]);

  const hiddenCount = materials.length - visibleMaterials.length;

  const rowOf = (matId: number): DraftRow => draft[matId] ?? { checked: false, qty: '' };

  const setRow = (matId: number, patch: Partial<DraftRow>) =>
    setDraft(prev => ({ ...prev, [matId]: { ...rowOf(matId), ...patch } }));

  const toggle = (matId: number, checked: boolean) =>
    setRow(matId, checked ? { checked: true } : { checked: false, qty: '' });

  const changeQty = (matId: number, value: string) =>
    setRow(matId, { qty: value, checked: value.trim() !== '' ? true : rowOf(matId).checked });

  // Classify each material into create / update / delete / invalid. Iterates the
  // visible set, which always includes the currently-selected materials.
  const { creates, updates, deletes, invalid, dirty } = useMemo(() => {
    const byMat = new Map(current.map(c => [c.materialId, c]));
    const creates: CommitChanges['creates'] = [];
    const updates: CommitChanges['updates'] = [];
    const deletes: number[] = [];
    const invalid: Material[] = [];

    for (const mat of visibleMaterials) {
      const row = draft[mat.id] ?? { checked: false, qty: '' };
      const existing = byMat.get(mat.id);
      const qtyNum = Number(row.qty);
      const valid = row.qty.trim() !== '' && Number.isFinite(qtyNum) && qtyNum > 0;

      if (row.checked) {
        if (!valid) invalid.push(mat);
        else if (!existing) creates.push({ materialId: mat.id, quantity: qtyNum });
        else if (existing.quantity !== qtyNum) updates.push({ id: existing.id, quantity: qtyNum });
      } else if (existing) {
        deletes.push(existing.id);
      }
    }

    const dirty = creates.length + updates.length + deletes.length + invalid.length > 0;
    return { creates, updates, deletes, invalid, dirty };
  }, [visibleMaterials, current, draft]);

  const save = useMutation({
    mutationFn: () => onCommit({ creates, updates, deletes }),
    onSuccess: () => toast.success('Composizione salvata'),
    onError: () => toast.error('Errore nel salvataggio'),
  });

  const onSave = () => {
    if (invalid.length) {
      toast.error(`Inserisci una quantità valida per: ${invalid.map(m => m.code).join(', ')}`);
      return;
    }
    save.mutate();
  };

  const offFilter = (mat: Material) =>
    !showAll && mat.usage !== target && mat.usage !== 'BOTH';

  return (
    <div>
      {visibleMaterials.length === 0 ? (
        <div className="rounded-md border border-dashed p-4 text-center text-xs text-muted-foreground">
          Nessun materiale {kind === 'fixed' ? 'fisso' : 'dinamico'}. Classifica i materiali
          nella pagina Materiali, oppure mostra l'intero catalogo.
        </div>
      ) : (
        <div className="rounded-md border max-h-80 overflow-y-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground border-b bg-muted/40 sticky top-0">
            <span className="w-4" />
            <span className="flex-1">Materiale</span>
            <span className="w-24 text-right">Consumo</span>
            <span className="w-10">UM</span>
          </div>
          {visibleMaterials.map(mat => {
            const row = rowOf(mat.id);
            return (
              <label
                key={mat.id}
                className="flex items-center gap-2 px-3 py-1.5 text-sm border-b last:border-0 hover:bg-muted/30 cursor-pointer"
              >
                <Checkbox
                  checked={row.checked}
                  onCheckedChange={v => toggle(mat.id, v === true)}
                />
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate">{mat.code}</span>
                    {offFilter(mat) && (
                      <Badge variant="outline" className="font-normal text-[10px] px-1 py-0">
                        {mat.usage === 'FIXED' ? 'fisso' : 'dinamico'}
                      </Badge>
                    )}
                  </span>
                  {mat.description && (
                    <span className="block text-xs text-muted-foreground truncate">{mat.description}</span>
                  )}
                </span>
                <Input
                  className="w-24 h-8 text-xs text-right"
                  type="number" step="0.001" min="0"
                  placeholder="0"
                  value={row.qty}
                  onChange={e => changeQty(mat.id, e.target.value)}
                />
                <span className="w-10 text-xs text-muted-foreground">
                  {mat.unitmeasurement?.code ?? '—'}
                </span>
              </label>
            );
          })}
        </div>
      )}
      <div className="flex items-center gap-3 mt-2">
        <Button size="sm" className="h-8" onClick={onSave} disabled={!dirty || save.isPending}>
          {save.isPending ? 'Salvataggio…' : 'Salva composizione'}
        </Button>
        {dirty && !save.isPending && (
          <span className="text-xs text-muted-foreground">Modifiche non salvate</span>
        )}
        {(showAll || hiddenCount > 0) && (
          <label className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
            <Checkbox checked={showAll} onCheckedChange={v => setShowAll(v === true)} />
            Mostra tutti i materiali{!showAll && hiddenCount > 0 ? ` (+${hiddenCount})` : ''}
          </label>
        )}
      </div>
    </div>
  );
}

// ── Fixed composition section (article-level BOM) ────────────────────────────

function FixedCompositionSection({ article, materials }: { article: Article; materials: Material[] }) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ['articles', article.id] });

  const createFcAndLink = useMutation({
    mutationFn: async () => {
      const fc = await api.post('/fixed-compositions', { code: `FC-${article.name}` });
      await api.patch(`/articles/${article.id}`, { fixedCompositionId: fc.data.id });
    },
    onSuccess: invalidate,
    onError: () => toast.error('Errore nella creazione della composizione fissa'),
  });

  if (!article.fixedComposition) {
    return (
      <div className="rounded-lg border p-4">
        <p className="text-sm font-medium mb-3">Composizione Fissa</p>
        <p className="text-xs text-muted-foreground mb-3">
          Nessuna composizione fissa. Aggiungila per definire i materiali comuni a tutte le varianti.
        </p>
        <Button size="sm" variant="outline" onClick={() => createFcAndLink.mutate()} disabled={createFcAndLink.isPending}>
          <Plus className="w-3 h-3 mr-1" /> Inizializza composizione fissa
        </Button>
      </div>
    );
  }

  const fc = article.fixedComposition;

  const onCommit = async ({ creates, updates, deletes }: CommitChanges) => {
    await Promise.all([
      ...creates.map(c =>
        api.post('/fixed-composition-materials', {
          fixedCompositionId: fc.id,
          materialId: c.materialId,
          quantity: c.quantity,
        }),
      ),
      ...updates.map(u => api.patch(`/fixed-composition-materials/${u.id}`, { quantity: u.quantity })),
      ...deletes.map(id => api.delete(`/fixed-composition-materials/${id}`)),
    ]);
    invalidate();
  };

  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm font-medium mb-3">
        Composizione Fissa
        <span className="ml-2 text-xs text-muted-foreground font-normal">
          (condivisa da tutte le varianti · {fc.materials.length} materiali)
        </span>
      </p>
      <CompositionGrid materials={materials} current={fc.materials} kind="fixed" onCommit={onCommit} />
    </div>
  );
}

// ── Fabric card with inline DC material grid ─────────────────────────────────

const fabricSchema = z.object({
  code: z.string().min(1, 'Obbligatorio'),
  description: z.string().optional(),
});
type FabricF = z.infer<typeof fabricSchema>;

function FabricCard({ fabric, articleId, materials }: { fabric: Fabric; articleId: number; materials: Material[] }) {
  const qc = useQueryClient();
  const [expanded, setExpanded] = useState(true);
  const [editing, setEditing] = useState(false);
  const invalidate = () => qc.invalidateQueries({ queryKey: ['fabrics', 'article', articleId] });

  const { register, handleSubmit, formState: { errors } } = useForm<FabricF>({
    resolver: zodResolver(fabricSchema),
    defaultValues: { code: fabric.code, description: fabric.description ?? '' },
  });

  const updateFabric = useMutation({
    mutationFn: (d: FabricF) => api.patch(`/fabrics/${fabric.id}`, d),
    onSuccess: () => { invalidate(); setEditing(false); toast.success('Variante aggiornata'); },
    onError: () => toast.error('Errore'),
  });

  const deleteFabric = useMutation({
    mutationFn: () => api.delete(`/fabrics/${fabric.id}`),
    onSuccess: () => { invalidate(); toast.success('Variante eliminata'); },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } }).response?.data?.message;
      toast.error(msg ?? 'Impossibile eliminare');
    },
  });

  const createDcAndLink = useMutation({
    mutationFn: async () => {
      const dc = await api.post('/dynamic-compositions', { code: `DC-${fabric.code}` });
      await api.patch(`/fabrics/${fabric.id}`, { dynamicCompositionId: dc.data.id });
    },
    onSuccess: invalidate,
    onError: () => toast.error('Errore'),
  });

  const onCommitDc = async ({ creates, updates, deletes }: CommitChanges) => {
    const dcId = fabric.dynamicCompositionId;
    await Promise.all([
      ...creates.map(c =>
        api.post('/dynamic-composition-materials', {
          dynamicCompositionId: dcId,
          materialId: c.materialId,
          quantity: c.quantity,
        }),
      ),
      ...updates.map(u => api.patch(`/dynamic-composition-materials/${u.id}`, { quantity: u.quantity })),
      ...deletes.map(id => api.delete(`/dynamic-composition-materials/${id}`)),
    ]);
    invalidate();
  };

  const dcCount = fabric.dynamicComposition?.materials.length ?? 0;

  return (
    <div className="rounded-lg border">
      <div className="flex items-center gap-2 p-3">
        <button
          type="button"
          className="flex items-center gap-1 flex-1 text-left"
          onClick={() => setExpanded(e => !e)}
        >
          {expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          {editing ? null : (
            <span className="font-medium text-sm">{fabric.code}</span>
          )}
          {!editing && fabric.description && (
            <span className="text-sm text-muted-foreground">— {fabric.description}</span>
          )}
          {!editing && dcCount > 0 && (
            <span className="ml-auto flex items-center gap-2">
              <Badge variant="secondary" className="font-normal">{dcCount} materiali</Badge>
            </span>
          )}
        </button>
        {!editing && (
          <>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditing(true)}>
              <Pencil className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteFabric.mutate()} disabled={deleteFabric.isPending}>
              <Trash2 className="w-3 h-3 text-destructive" />
            </Button>
          </>
        )}
      </div>

      {editing && (
        <div className="px-3 pb-3">
          <form onSubmit={handleSubmit(d => updateFabric.mutate(d))} className="flex gap-2 items-end">
            <div className="space-y-1 flex-1">
              <Label className="text-xs">Codice</Label>
              <Input className="h-8 text-xs" {...register('code')} autoFocus />
              {errors.code && <p className="text-xs text-destructive">{errors.code.message}</p>}
            </div>
            <div className="space-y-1 flex-1">
              <Label className="text-xs">Descrizione</Label>
              <Input className="h-8 text-xs" {...register('description')} />
            </div>
            <Button size="sm" type="submit" className="h-8" disabled={updateFabric.isPending}>Salva</Button>
            <Button size="sm" type="button" variant="outline" className="h-8" onClick={() => setEditing(false)}>Annulla</Button>
          </form>
        </div>
      )}

      {expanded && (
        <div className="px-3 pb-3 border-t pt-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">MATERIALI VARIANTE</p>
          {!fabric.dynamicComposition ? (
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">Nessuna composizione dinamica.</p>
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => createDcAndLink.mutate()} disabled={createDcAndLink.isPending}>
                <Plus className="w-3 h-3 mr-1" /> Inizializza
              </Button>
            </div>
          ) : (
            <CompositionGrid
              materials={materials}
              current={fabric.dynamicComposition.materials}
              kind="dynamic"
              onCommit={onCommitDc}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ── New fabric dialog ─────────────────────────────────────────────────────────

const newFabricSchema = z.object({
  code: z.string().min(1, 'Obbligatorio'),
  description: z.string().optional(),
});
type NewFabricF = z.infer<typeof newFabricSchema>;

function NewFabricDialog({
  articleId, articleName, fabrics, open, onClose,
}: { articleId: number; articleName: string; fabrics: Fabric[]; open: boolean; onClose: () => void }) {
  const qc = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewFabricF>({
    resolver: zodResolver(newFabricSchema),
  });

  // Pre-fill the code with a suggestion each time the dialog opens. The user
  // is free to overwrite it before saving.
  useEffect(() => {
    if (open) reset({ code: suggestFabricCode(articleName, fabrics), description: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const m = useMutation({
    mutationFn: async (d: NewFabricF) => {
      const fabric = await api.post('/fabrics', { ...d, articleId });
      const dc = await api.post('/dynamic-compositions', { code: `DC-${d.code}` });
      await api.patch(`/fabrics/${fabric.data.id}`, { dynamicCompositionId: dc.data.id });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['fabrics', 'article', articleId] });
      toast.success('Variante creata');
      reset();
      onClose();
    },
    onError: () => toast.error('Errore nella creazione'),
  });

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent>
        <DialogHeader><DialogTitle>Nuova variante</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit(d => m.mutate(d))} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Codice</Label>
              <Input {...register('code')} autoFocus />
              {errors.code && <p className="text-xs text-destructive">{errors.code.message}</p>}
            </div>
            <div className="space-y-1">
              <Label>Descrizione</Label>
              <Input {...register('description')} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Annulla</Button>
            <Button type="submit" disabled={m.isPending}>Crea</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Batch new variants dialog ───────────────────────────────────────────────
//
// Creates N variants at once by picking fabrics (DYNAMIC materials) from the
// catalogue: every ticked fabric becomes one variant whose dynamic composition
// contains exactly that fabric, at a shared consumption quantity (overridable
// per row). Each variant gets its own DynamicComposition, so they stay
// independently editable afterwards.

// A selected fabric: its consumption quantity and whether it was edited away
// from the shared default.
type FabricPick = { qty: string; overridden: boolean };

function BatchVariantsDialog({
  articleId, articleName, fabrics, materials, open, onClose,
}: {
  articleId: number;
  articleName: string;
  fabrics: Fabric[];
  materials: Material[];
  open: boolean;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [sharedQty, setSharedQty] = useState('1');
  const [picks, setPicks] = useState<Record<number, FabricPick>>({});
  const [showAll, setShowAll] = useState(false);

  const existingCodes = useMemo(() => fabrics.map(f => f.code), [fabrics]);

  // Reset on open.
  useEffect(() => {
    if (!open) return;
    setSharedQty('1');
    setPicks({});
    setShowAll(false);
  }, [open]);

  // Fabrics = DYNAMIC (or BOTH) materials, unless the user asks to see all.
  const visibleMaterials = useMemo(
    () => materials.filter(m => showAll || m.usage === 'DYNAMIC' || m.usage === 'BOTH'),
    [materials, showAll],
  );
  const hiddenCount = materials.length - visibleMaterials.length;

  // Selected fabrics in catalogue order — each one becomes a variant.
  const selected = useMemo(() => materials.filter(m => picks[m.id]), [materials, picks]);

  // Assign incremental variant codes to the selected fabrics, in order.
  const codeFor = useMemo(() => {
    const map: Record<number, string> = {};
    const taken = [...existingCodes];
    for (const mat of selected) {
      const code = nextFabricCode(articleName, taken);
      map[mat.id] = code;
      taken.push(code);
    }
    return map;
  }, [selected, existingCodes, articleName]);

  const toggle = (matId: number, checked: boolean) =>
    setPicks(prev => {
      const next = { ...prev };
      if (checked) next[matId] = { qty: sharedQty, overridden: false };
      else delete next[matId];
      return next;
    });

  const changeSharedQty = (value: string) => {
    setSharedQty(value);
    // Propagate to every pick that still tracks the shared value.
    setPicks(prev => {
      const next: Record<number, FabricPick> = {};
      for (const [id, p] of Object.entries(prev)) {
        next[Number(id)] = p.overridden ? p : { ...p, qty: value };
      }
      return next;
    });
  };

  const changeRowQty = (matId: number, value: string) =>
    setPicks(prev => ({ ...prev, [matId]: { qty: value, overridden: true } }));

  const m = useMutation({
    mutationFn: async () => {
      const variants = selected.map(mat => ({
        code: codeFor[mat.id],
        description: mat.description ?? mat.code,
        materials: [{ materialId: mat.id, quantity: Number(picks[mat.id].qty) }],
      }));
      await api.post('/fabrics/batch', { articleId, variants });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['fabrics', 'article', articleId] });
      toast.success('Varianti create');
      onClose();
    },
    onError: () => toast.error('Errore nella creazione'),
  });

  const onSubmit = () => {
    if (selected.length === 0) return toast.error('Seleziona almeno un tessuto');
    const invalid = selected.some(mat => {
      const q = picks[mat.id].qty;
      return !(q.trim() !== '' && Number(q) > 0);
    });
    if (invalid) return toast.error('Inserisci una quantità valida per i tessuti selezionati');
    m.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>Crea varianti in blocco</DialogTitle></DialogHeader>

        <div className="space-y-4">
          <div className="flex items-end gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Consumo tessuto (default)</Label>
              <Input
                className="h-8 w-28 text-xs"
                type="number" step="0.001" min="0"
                value={sharedQty}
                onChange={e => changeSharedQty(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground pb-2">
              Spunta i tessuti: ognuno diventa una variante che consuma quel tessuto.
              La quantità è modificabile per riga.
            </p>
          </div>

          {visibleMaterials.length === 0 ? (
            <div className="rounded-md border border-dashed p-4 text-center text-xs text-muted-foreground">
              Nessun tessuto disponibile. Classifica i materiali come dinamici nella pagina Materiali.
            </div>
          ) : (
            <div className="rounded-md border max-h-72 overflow-y-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground border-b bg-muted/40 sticky top-0">
                <span className="w-4" />
                <span className="flex-1">Tessuto</span>
                <span className="w-24 text-right">Consumo</span>
                <span className="w-10">UM</span>
                <span className="w-24">Variante</span>
              </div>
              {visibleMaterials.map(mat => {
                const pick = picks[mat.id];
                return (
                  <label
                    key={mat.id}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm border-b last:border-0 hover:bg-muted/30 cursor-pointer"
                  >
                    <Checkbox
                      checked={!!pick}
                      onCheckedChange={v => toggle(mat.id, v === true)}
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block truncate">{mat.code}</span>
                      {mat.description && (
                        <span className="block text-xs text-muted-foreground truncate">{mat.description}</span>
                      )}
                    </span>
                    <Input
                      className="w-24 h-8 text-xs text-right"
                      type="number" step="0.001" min="0" placeholder="0"
                      disabled={!pick}
                      value={pick?.qty ?? ''}
                      onChange={e => changeRowQty(mat.id, e.target.value)}
                    />
                    <span className="w-10 text-xs text-muted-foreground">
                      {mat.unitmeasurement?.code ?? '—'}
                    </span>
                    <span className="w-24 text-xs text-muted-foreground truncate">
                      {pick ? codeFor[mat.id] : '—'}
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {(showAll || hiddenCount > 0) && (
            <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
              <Checkbox checked={showAll} onCheckedChange={v => setShowAll(v === true)} />
              Mostra tutti i materiali{!showAll && hiddenCount > 0 ? ` (+${hiddenCount})` : ''}
            </label>
          )}

          <div className="flex items-center justify-end gap-2">
            <span className="mr-auto text-xs text-muted-foreground">
              {selected.length} variant{selected.length === 1 ? 'e' : 'i'} da creare
            </span>
            <Button type="button" variant="outline" onClick={onClose}>Annulla</Button>
            <Button type="button" onClick={onSubmit} disabled={m.isPending || selected.length === 0}>
              {m.isPending ? 'Creazione…' : 'Crea varianti'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articleId = Number(id);
  const [newFabricOpen, setNewFabricOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);

  const { data: article, isLoading: loadingArticle } = useQuery({
    queryKey: ['articles', articleId],
    queryFn: () => api.get<Article>(`/articles/${articleId}`).then(r => r.data),
  });

  const { data: fabricsData, isLoading: loadingFabrics } = useQuery({
    queryKey: ['fabrics', 'article', articleId],
    queryFn: () => api.get<Paginated<Fabric>>('/fabrics', { params: { articleId, limit: 200 } }).then(r => r.data),
  });

  // All materials, fetched once and shared by every composition grid.
  const { data: materialsData, isLoading: loadingMaterials } = useQuery({
    queryKey: ['materials', 'all'],
    queryFn: () => api.get<Paginated<Material>>('/materials', { params: { limit: 500 } }).then(r => r.data),
  });

  if (loadingArticle || loadingFabrics || loadingMaterials) {
    return <div className="p-6 text-sm text-muted-foreground">Caricamento...</div>;
  }

  if (!article) {
    return <div className="p-6 text-sm text-destructive">Articolo non trovato</div>;
  }

  const fabrics = fabricsData?.data ?? [];
  const materials = materialsData?.data ?? [];

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/catalog/articles')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold">{article.name}</h1>
          {article.description && <p className="text-sm text-muted-foreground">{article.description}</p>}
          <p className="text-xs text-muted-foreground mt-0.5">{article.modeltypesSex.displayName}</p>
        </div>
      </div>

      <FixedCompositionSection article={article} materials={materials} />

      <Separator className="my-6" />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Varianti ({fabrics.length})</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setBatchOpen(true)}>
            <Layers className="w-3 h-3 mr-1" /> Crea in blocco
          </Button>
          <Button size="sm" onClick={() => setNewFabricOpen(true)}>
            <Plus className="w-3 h-3 mr-1" /> Nuova variante
          </Button>
        </div>
      </div>

      {fabrics.length === 0 && (
        <p className="text-sm text-muted-foreground">Nessuna variante ancora. Crea la prima variante per questo articolo.</p>
      )}

      <div className="space-y-3">
        {fabrics.map(fabric => (
          <FabricCard key={fabric.id} fabric={fabric} articleId={articleId} materials={materials} />
        ))}
      </div>

      <NewFabricDialog
        articleId={articleId}
        articleName={article.name}
        fabrics={fabrics}
        open={newFabricOpen}
        onClose={() => setNewFabricOpen(false)}
      />

      <BatchVariantsDialog
        articleId={articleId}
        articleName={article.name}
        fabrics={fabrics}
        materials={materials}
        open={batchOpen}
        onClose={() => setBatchOpen(false)}
      />
    </div>
  );
}
