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
import type { DynamicComposition, Material, Paginated } from '@/types/api';

const schema = z.object({ code: z.string().min(1, 'Obbligatorio'), description: z.string().optional() });
type F = z.infer<typeof schema>;

function DCForm({ item, onSuccess, onCancel }: { item?: DynamicComposition; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const [matId, setMatId] = useState('');
  const [qty, setQty] = useState('');
  const { data: materials } = useQuery({ queryKey: ['materials', 'all'], queryFn: () => api.get<Paginated<Material>>('/materials', { params: { limit: 500 } }).then(r => r.data) });

  const { register, handleSubmit, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { code: item?.code ?? '', description: item?.description ?? '' },
  });

  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/dynamic-compositions/${item.id}`, d) : api.post('/dynamic-compositions', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['dynamic-compositions'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
    onError: () => toast.error('Errore nel salvataggio'),
  });

  const addRow = useMutation({
    mutationFn: () => api.post('/dynamic-composition-materials', { dynamicCompositionId: item!.id, materialId: Number(matId), quantity: Number(qty) }),
    onSuccess: () => { toast.success('Aggiunto'); setMatId(''); setQty(''); qc.invalidateQueries({ queryKey: ['dynamic-compositions'] }); },
    onError: () => toast.error('Errore'),
  });

  const delRow = useMutation({
    mutationFn: (id: number) => api.delete(`/dynamic-composition-materials/${id}`),
    onSuccess: () => { toast.success('Eliminato'); qc.invalidateQueries({ queryKey: ['dynamic-compositions'] }); },
    onError: () => toast.error('Errore'),
  });

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
              <div key={row.id} className="flex items-center gap-2 text-sm py-1">
                <span className="flex-1">{row.material.displayName}</span>
                <span className="w-16 text-right">{row.quantity}</span>
                <span className="w-12 text-muted-foreground">{row.material.unitmeasurement?.code ?? '—'}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => delRow.mutate(row.id)} disabled={delRow.isPending}>
                  <Trash2 className="w-3 h-3 text-destructive" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <Select value={matId} onValueChange={setMatId}>
                <SelectTrigger className="flex-1 h-8 text-xs"><SelectValue placeholder="Materiale..." /></SelectTrigger>
                <SelectContent>{materials?.data.map(mat => <SelectItem key={mat.id} value={String(mat.id)}>{mat.displayName}</SelectItem>)}</SelectContent>
              </Select>
              <Input className="w-20 h-8 text-xs" type="number" step="0.001" min="0.001" placeholder="Qtà" value={qty} onChange={e => setQty(e.target.value)} />
              <Button size="sm" className="h-8" disabled={!matId || !qty || addRow.isPending} onClick={() => addRow.mutate()}>
                <Plus className="w-3 h-3" />
              </Button>
            </div>
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

const columns: Column<DynamicComposition>[] = [
  { header: 'Codice', cell: (c) => c.code },
  { header: 'Descrizione', cell: (c) => c.description ?? '—' },
  { header: 'Materiali', cell: (c) => `${c.materials.length} righe` },
];

export default function DynamicCompositionsPage() {
  return (
    <CrudPage<DynamicComposition>
      title="Composizioni Dinamiche"
      endpoint="/dynamic-compositions"
      queryKey="dynamic-compositions"
      columns={columns}
      FormComponent={DCForm}
      createLabel="Nuova composizione"
    />
  );
}
