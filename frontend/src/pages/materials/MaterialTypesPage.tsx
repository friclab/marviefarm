import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CrudPage, type Column } from '@/components/app/CrudPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import api from '@/lib/api';
import type { MaterialType } from '@/types/api';

const schema = z.object({
  code: z.string().min(1, 'Obbligatorio'),
  description: z.string().optional(),
  seasonal: z.boolean().optional(),
});
type F = z.infer<typeof schema>;

function MaterialTypeForm({ item, onSuccess, onCancel }: { item?: MaterialType; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { code: item?.code ?? '', description: item?.description ?? '', seasonal: item?.seasonal ?? false },
  });
  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/material-types/${item.id}`, d) : api.post('/material-types', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['material-types'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
    onError: () => toast.error('Errore nel salvataggio'),
  });
  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
      <div className="space-y-1">
        <Label>Codice</Label>
        <Input {...register('code')} autoFocus />
        {errors.code && <p className="text-xs text-destructive">{errors.code.message}</p>}
      </div>
      <div className="space-y-1">
        <Label>Descrizione</Label>
        <Input {...register('description')} />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="seasonal" checked={!!watch('seasonal')} onCheckedChange={(v) => setValue('seasonal', v === true)} />
        <Label htmlFor="seasonal" className="cursor-pointer">Stagionale (i materiali di questo tipo sono legati a una stagione)</Label>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button type="submit" disabled={m.isPending}>Salva</Button>
      </div>
    </form>
  );
}

const columns: Column<MaterialType>[] = [
  { header: 'Codice', cell: (t) => t.code },
  { header: 'Descrizione', cell: (t) => t.description ?? '—' },
  { header: 'Stagionale', cell: (t) => t.seasonal ? <Badge variant="secondary">Sì</Badge> : '—' },
];

export default function MaterialTypesPage() {
  return (
    <CrudPage<MaterialType>
      title="Tipi Materiale"
      endpoint="/material-types"
      queryKey="material-types"
      columns={columns}
      FormComponent={MaterialTypeForm}
      createLabel="Nuovo tipo"
    />
  );
}
