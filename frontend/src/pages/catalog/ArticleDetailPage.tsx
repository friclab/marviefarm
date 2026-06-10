import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ArrowLeft, Trash2, Plus, ChevronDown, ChevronRight, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import api from '@/lib/api';
import type { Article, Fabric, Material, Paginated } from '@/types/api';
import { fmtEur } from '@/lib/utils';

// ── BOM row components (reused for both FC and DC grids) ─────────────────────

function BomRow({
  item,
  onDelete,
}: {
  item: { id: number; quantity: number; material: { displayName: string; unitmeasurement: { code: string } | null } };
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-2 text-sm py-1 border-b last:border-0">
      <span className="flex-1">{item.material.displayName}</span>
      <span className="w-16 text-right tabular-nums">{item.quantity}</span>
      <span className="w-10 text-muted-foreground text-xs">{item.material.unitmeasurement?.code ?? '—'}</span>
      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={onDelete}>
        <Trash2 className="w-3 h-3 text-destructive" />
      </Button>
    </div>
  );
}

function AddBomRow({ onAdd }: { onAdd: (materialId: number, qty: number) => Promise<void> }) {
  const [matId, setMatId] = useState('');
  const [qty, setQty] = useState('');
  const { data: materials } = useQuery({
    queryKey: ['materials', 'all'],
    queryFn: () => api.get<Paginated<Material>>('/materials', { params: { limit: 500 } }).then(r => r.data),
  });
  const m = useMutation({
    mutationFn: () => onAdd(Number(matId), Number(qty)),
    onSuccess: () => { setMatId(''); setQty(''); },
    onError: () => toast.error('Errore'),
  });
  return (
    <div className="flex gap-2 mt-2">
      <Select value={matId} onValueChange={setMatId}>
        <SelectTrigger className="flex-1 h-8 text-xs"><SelectValue placeholder="Materiale..." /></SelectTrigger>
        <SelectContent>
          {materials?.data.map(mat => (
            <SelectItem key={mat.id} value={String(mat.id)}>{mat.displayName}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className="w-20 h-8 text-xs"
        type="number" step="0.001" min="0.001"
        placeholder="Qtà"
        value={qty}
        onChange={e => setQty(e.target.value)}
      />
      <Button size="sm" className="h-8" disabled={!matId || !qty || m.isPending} onClick={() => m.mutate()}>
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
}

// ── Fixed composition section (article-level BOM) ────────────────────────────

function FixedCompositionSection({ article }: { article: Article }) {
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

  const deleteMaterial = async (fcmId: number) => {
    await api.delete(`/fixed-composition-materials/${fcmId}`);
    invalidate();
  };

  const addMaterial = async (materialId: number, quantity: number) => {
    await api.post('/fixed-composition-materials', { fixedCompositionId: fc.id, materialId, quantity });
    invalidate();
    toast.success('Materiale aggiunto');
  };

  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm font-medium mb-3">
        Composizione Fissa
        <span className="ml-2 text-xs text-muted-foreground font-normal">(condivisa da tutte le varianti)</span>
      </p>
      {fc.materials.length === 0 && (
        <p className="text-xs text-muted-foreground mb-2">Nessun materiale ancora</p>
      )}
      {fc.materials.map(row => (
        <BomRow
          key={row.id}
          item={row}
          onDelete={() => deleteMaterial(row.id)}
        />
      ))}
      <AddBomRow onAdd={addMaterial} />
    </div>
  );
}

// ── Fabric card with inline DC BOM grid ──────────────────────────────────────

const fabricSchema = z.object({
  code: z.string().min(1, 'Obbligatorio'),
  description: z.string().optional(),
  price: z.coerce.number().min(0).optional(),
});
type FabricF = z.infer<typeof fabricSchema>;

function FabricCard({ fabric, articleId }: { fabric: Fabric; articleId: number }) {
  const qc = useQueryClient();
  const [expanded, setExpanded] = useState(true);
  const [editing, setEditing] = useState(false);
  const invalidate = () => qc.invalidateQueries({ queryKey: ['fabrics', 'article', articleId] });

  const { register, handleSubmit, formState: { errors } } = useForm<FabricF>({
    resolver: zodResolver(fabricSchema),
    defaultValues: { code: fabric.code, description: fabric.description ?? '', price: fabric.price ?? 0 },
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

  const deleteDcMaterial = async (dcmId: number) => {
    await api.delete(`/dynamic-composition-materials/${dcmId}`);
    invalidate();
  };

  const addDcMaterial = async (materialId: number, quantity: number) => {
    const dcId = fabric.dynamicCompositionId;
    await api.post('/dynamic-composition-materials', { dynamicCompositionId: dcId, materialId, quantity });
    invalidate();
    toast.success('Materiale aggiunto');
  };

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
          {!editing && (
            <span className="ml-auto text-sm text-muted-foreground">{fmtEur(fabric.price)}</span>
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
            <div className="space-y-1 w-24">
              <Label className="text-xs">Prezzo (€)</Label>
              <Input className="h-8 text-xs" type="number" step="0.01" {...register('price')} />
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
            <>
              {fabric.dynamicComposition.materials.length === 0 && (
                <p className="text-xs text-muted-foreground mb-1">Nessun materiale ancora</p>
              )}
              {fabric.dynamicComposition.materials.map(row => (
                <BomRow
                  key={row.id}
                  item={row}
                  onDelete={() => deleteDcMaterial(row.id)}
                />
              ))}
              <AddBomRow onAdd={addDcMaterial} />
            </>
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
  price: z.coerce.number().min(0).optional(),
});
type NewFabricF = z.infer<typeof newFabricSchema>;

function NewFabricDialog({ articleId, open, onClose }: { articleId: number; open: boolean; onClose: () => void }) {
  const qc = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewFabricF>({
    resolver: zodResolver(newFabricSchema),
  });

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
          <div className="space-y-1">
            <Label>Prezzo (€)</Label>
            <Input type="number" step="0.01" min="0" {...register('price')} />
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

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articleId = Number(id);
  const [newFabricOpen, setNewFabricOpen] = useState(false);

  const { data: article, isLoading: loadingArticle } = useQuery({
    queryKey: ['articles', articleId],
    queryFn: () => api.get<Article>(`/articles/${articleId}`).then(r => r.data),
  });

  const { data: fabricsData, isLoading: loadingFabrics } = useQuery({
    queryKey: ['fabrics', 'article', articleId],
    queryFn: () => api.get<Paginated<Fabric>>('/fabrics', { params: { articleId, limit: 200 } }).then(r => r.data),
  });

  if (loadingArticle || loadingFabrics) {
    return <div className="p-6 text-sm text-muted-foreground">Caricamento...</div>;
  }

  if (!article) {
    return <div className="p-6 text-sm text-destructive">Articolo non trovato</div>;
  }

  const fabrics = fabricsData?.data ?? [];

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

      <FixedCompositionSection article={article} />

      <Separator className="my-6" />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Varianti ({fabrics.length})</h2>
        <Button size="sm" onClick={() => setNewFabricOpen(true)}>
          <Plus className="w-3 h-3 mr-1" /> Nuova variante
        </Button>
      </div>

      {fabrics.length === 0 && (
        <p className="text-sm text-muted-foreground">Nessuna variante ancora. Crea la prima variante per questo articolo.</p>
      )}

      <div className="space-y-3">
        {fabrics.map(fabric => (
          <FabricCard key={fabric.id} fabric={fabric} articleId={articleId} />
        ))}
      </div>

      <NewFabricDialog articleId={articleId} open={newFabricOpen} onClose={() => setNewFabricOpen(false)} />
    </div>
  );
}
