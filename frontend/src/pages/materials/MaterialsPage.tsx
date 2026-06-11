import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CrudPage, type Column } from '@/components/app/CrudPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import type { Material, MaterialUsage, UnitMeasurement, MaterialType, Supplier, Paginated } from '@/types/api';

const USAGE_LABELS: Record<MaterialUsage, string> = {
  FIXED: 'Fisso',
  DYNAMIC: 'Dinamico',
  BOTH: 'Entrambi',
};

const schema = z.object({
  code: z.string().min(1, 'Obbligatorio'),
  description: z.string().optional(),
  price: z.coerce.number().min(0).optional().nullable(),
  usage: z.enum(['FIXED', 'DYNAMIC', 'BOTH']),
  unitmeasurementId: z.coerce.number().positive('Obbligatorio'),
  supplierId: z.coerce.number().optional().nullable(),
  materialTypeIds: z.array(z.number()).optional(),
});
type F = z.infer<typeof schema>;

function MaterialForm({ item, onSuccess, onCancel }: { item?: Material; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { data: ums } = useQuery({ queryKey: ['unit-measurements', 'all'], queryFn: () => api.get<Paginated<UnitMeasurement>>('/unit-measurements', { params: { limit: 200 } }).then(r => r.data) });
  const { data: mts } = useQuery({ queryKey: ['material-types', 'all'], queryFn: () => api.get<Paginated<MaterialType>>('/material-types', { params: { limit: 200 } }).then(r => r.data) });
  const { data: sups } = useQuery({ queryKey: ['suppliers', 'all'], queryFn: () => api.get<Paginated<Supplier>>('/suppliers', { params: { limit: 200 } }).then(r => r.data) });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: item?.code ?? '',
      description: item?.description ?? '',
      price: item?.price ?? null,
      usage: item?.usage ?? 'BOTH',
      unitmeasurementId: item?.unitmeasurementId ?? 0,
      supplierId: item?.supplierId ?? null,
      materialTypeIds: item?.materialtypes.map(t => t.id) ?? [],
    },
  });

  const selectedTypes = watch('materialTypeIds') ?? [];

  function toggleType(id: number) {
    setValue('materialTypeIds', selectedTypes.includes(id) ? selectedTypes.filter(t => t !== id) : [...selectedTypes, id]);
  }

  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/materials/${item.id}`, d) : api.post('/materials', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['materials'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } }).response?.data?.message;
      toast.error(msg ?? 'Errore nel salvataggio');
    },
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Prezzo</Label>
          <Input {...register('price')} type="number" step="0.01" min="0" placeholder="0.00" />
          {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>Composizione</Label>
          <Select value={watch('usage')} onValueChange={(v) => setValue('usage', v as MaterialUsage)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {(['FIXED', 'DYNAMIC', 'BOTH'] as const).map(u => (
                <SelectItem key={u} value={u}>{USAGE_LABELS[u]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Determina in quale griglia compare il materiale</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Unità di Misura</Label>
          <Select value={String(watch('unitmeasurementId') || '')} onValueChange={(v) => setValue('unitmeasurementId', Number(v))}>
            <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
            <SelectContent>{ums?.data.map(u => <SelectItem key={u.id} value={String(u.id)}>{u.displayName}</SelectItem>)}</SelectContent>
          </Select>
          {errors.unitmeasurementId && <p className="text-xs text-destructive">{errors.unitmeasurementId.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>Fornitore</Label>
          <Select value={watch('supplierId') != null ? String(watch('supplierId')) : 'none'} onValueChange={(v) => setValue('supplierId', v === 'none' ? null : Number(v))}>
            <SelectTrigger><SelectValue placeholder="Nessuno" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Nessuno</SelectItem>
              {sups?.data.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.displayName}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1">
        <Label>Tipi Materiale</Label>
        <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
          {mts?.data.map(t => (
            <button key={t.id} type="button" onClick={() => toggleType(t.id)}>
              <Badge variant={selectedTypes.includes(t.id) ? 'default' : 'outline'}>{t.code}</Badge>
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button type="submit" disabled={m.isPending}>Salva</Button>
      </div>
    </form>
  );
}

const columns: Column<Material>[] = [
  { header: 'Codice', cell: (m) => m.code },
  { header: 'Descrizione', cell: (m) => m.description ?? '—' },
  { header: 'Prezzo', cell: (m) => m.price != null ? `€ ${m.price.toFixed(2)}` : '—' },
  { header: 'Composizione', cell: (m) => <Badge variant="outline">{USAGE_LABELS[m.usage]}</Badge> },
  { header: 'U.M.', cell: (m) => m.unitmeasurement?.code ?? '—' },
  { header: 'Tipi', cell: (m) => <div className="flex gap-1">{m.materialtypes.map(t => <Badge key={t.id} variant="secondary">{t.code}</Badge>)}</div> },
];

export default function MaterialsPage() {
  return (
    <CrudPage<Material>
      title="Materiali"
      endpoint="/materials"
      queryKey="materials"
      columns={columns}
      FormComponent={MaterialForm}
      createLabel="Nuovo materiale"
    />
  );
}
