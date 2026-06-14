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
import api from '@/lib/api';
import { useSeasonScopedParams } from '@/lib/collection';
import type { Fabric, Article, DynamicComposition, Paginated } from '@/types/api';
import { fmtEur } from '@/lib/utils';

const schema = z.object({
  code: z.string().min(1, 'Obbligatorio'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Obbligatorio'),
  articleId: z.coerce.number().positive('Obbligatorio'),
  dynamicCompositionId: z.coerce.number().optional().nullable(),
});
type F = z.infer<typeof schema>;

function FabricForm({ item, onSuccess, onCancel }: { item?: Fabric; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { data: articles } = useQuery({ queryKey: ['articles', 'all'], queryFn: () => api.get<Paginated<Article>>('/articles', { params: { limit: 500 } }).then(r => r.data) });
  const { data: dcs } = useQuery({ queryKey: ['dynamic-compositions', 'all'], queryFn: () => api.get<Paginated<DynamicComposition>>('/dynamic-compositions', { params: { limit: 200 } }).then(r => r.data) });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: item?.code ?? '',
      description: item?.description ?? '',
      price: item?.price ?? 0,
      articleId: item?.articleId ?? 0,
      dynamicCompositionId: item?.dynamicCompositionId ?? null,
    },
  });

  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/fabrics/${item.id}`, d) : api.post('/fabrics', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['fabrics'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
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
          <Label>Prezzo (€)</Label>
          <Input {...register('price')} type="number" step="0.01" min="0" />
          {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>Articolo</Label>
          <Select value={String(watch('articleId') || '')} onValueChange={(v) => setValue('articleId', Number(v))}>
            <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
            <SelectContent>{articles?.data.map(a => <SelectItem key={a.id} value={String(a.id)}>{a.displayName}</SelectItem>)}</SelectContent>
          </Select>
          {errors.articleId && <p className="text-xs text-destructive">{errors.articleId.message}</p>}
        </div>
      </div>
      <div className="space-y-1">
        <Label>Composizione Dinamica</Label>
        <Select value={String(watch('dynamicCompositionId') ?? '')} onValueChange={(v) => setValue('dynamicCompositionId', v ? Number(v) : null)}>
          <SelectTrigger><SelectValue placeholder="Nessuna" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="">Nessuna</SelectItem>
            {dcs?.data.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.displayName}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button type="submit" disabled={m.isPending}>Salva</Button>
      </div>
    </form>
  );
}

const columns: Column<Fabric>[] = [
  { header: 'Codice', cell: (f) => f.code },
  { header: 'Descrizione', cell: (f) => f.description ?? '—' },
  { header: 'Articolo', cell: (f) => f.article.name },
  { header: 'Prezzo', cell: (f) => fmtEur(f.price), className: 'text-right' },
];

export default function FabricsPage() {
  const scoped = useSeasonScopedParams();
  return (
    <CrudPage<Fabric>
      title="Tessuti"
      endpoint="/fabrics"
      queryKey="fabrics"
      columns={columns}
      extraParams={scoped}
      FormComponent={FabricForm}
      createLabel="Nuovo tessuto"
    />
  );
}
