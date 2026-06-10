import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Trash2, Plus } from 'lucide-react';
import { CrudPage, type Column } from '@/components/app/CrudPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import api from '@/lib/api';
import type { FixedComposition, Material, Paginated } from '@/types/api';

const schema = z.object({ code: z.string().min(1, 'Obbligatorio'), description: z.string().optional() });
type F = z.infer<typeof schema>;

function BomRow({ fcId, item, onDeleted }: { fcId: number; item: { id: number; material: Material; quantity: number }; onDeleted: () => void }) {
  const m = useMutation({
    mutationFn: () => api.delete(`/fixed-composition-materials/${item.id}`),
    onSuccess: () => { toast.success('Riga eliminata'); onDeleted(); },
    onError: () => toast.error('Errore'),
  });
  return (
    <div className="flex items-center gap-2 text-sm py-1">
      <span className="flex-1">{item.material.displayName}</span>
      <span className="w-16 text-right">{item.quantity}</span>
      <span className="w-12 text-muted-foreground">{item.material.unitmeasurement?.code ?? '—'}</span>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => m.mutate()} disabled={m.isPending}>
        <Trash2 className="w-3 h-3 text-destructive" />
      </Button>
    </div>
  );
}

function AddBomRow({ fcId, onAdded }: { fcId: number; onAdded: () => void }) {
  const [matId, setMatId] = useState('');
  const [qty, setQty] = useState('');
  const { data: materials } = useQuery({ queryKey: ['materials', 'all'], queryFn: () => api.get<Paginated<Material>>('/materials', { params: { limit: 500 } }).then(r => r.data) });
  const m = useMutation({
    mutationFn: () => api.post('/fixed-composition-materials', { fixedCompositionId: fcId, materialId: Number(matId), quantity: Number(qty) }),
    onSuccess: () => { toast.success('Aggiunto'); setMatId(''); setQty(''); onAdded(); },
    onError: () => toast.error('Errore'),
  });
  return (
    <div className="flex gap-2 mt-2">
      <Select value={matId} onValueChange={setMatId}>
        <SelectTrigger className="flex-1 h-8 text-xs"><SelectValue placeholder="Materiale..." /></SelectTrigger>
        <SelectContent>{materials?.data.map(mat => <SelectItem key={mat.id} value={String(mat.id)}>{mat.displayName}</SelectItem>)}</SelectContent>
      </Select>
      <Input className="w-20 h-8 text-xs" type="number" step="0.001" min="0.001" placeholder="Qtà" value={qty} onChange={e => setQty(e.target.value)} />
      <Button size="sm" className="h-8" disabled={!matId || !qty || m.isPending} onClick={() => m.mutate()}>
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
}

function FCForm({ item, onSuccess, onCancel }: { item?: FixedComposition; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { code: item?.code ?? '', description: item?.description ?? '' },
  });
  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/fixed-compositions/${item.id}`, d) : api.post('/fixed-compositions', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['fixed-compositions'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
    onError: () => toast.error('Errore nel salvataggio'),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ['fixed-compositions'] });

  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
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

      {item && (
        <>
          <Separator />
          <div>
            <p className="text-sm font-medium mb-2">Composizione (BOM)</p>
            {item.materials.length === 0 && <p className="text-xs text-muted-foreground">Nessun materiale</p>}
            {item.materials.map(row => (
              <BomRow key={row.id} fcId={item.id} item={row} onDeleted={invalidate} />
            ))}
            <AddBomRow fcId={item.id} onAdded={invalidate} />
          </div>
        </>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button type="submit" disabled={m.isPending}>Salva</Button>
      </div>
    </form>
  );
}

const columns: Column<FixedComposition>[] = [
  { header: 'Codice', cell: (c) => c.code },
  { header: 'Descrizione', cell: (c) => c.description ?? '—' },
  { header: 'Materiali', cell: (c) => `${c.materials.length} righe` },
];

export default function FixedCompositionsPage() {
  return (
    <CrudPage<FixedComposition>
      title="Composizioni Fisse"
      endpoint="/fixed-compositions"
      queryKey="fixed-compositions"
      columns={columns}
      FormComponent={FCForm}
      createLabel="Nuova composizione"
    />
  );
}
