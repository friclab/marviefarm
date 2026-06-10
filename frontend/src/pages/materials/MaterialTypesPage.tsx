import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CrudPage, type Column } from '@/components/app/CrudPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import type { MaterialType } from '@/types/api';

const schema = z.object({
  code: z.string().min(1, 'Obbligatorio'),
  description: z.string().optional(),
});
type F = z.infer<typeof schema>;

function MaterialTypeForm({ item, onSuccess, onCancel }: { item?: MaterialType; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { code: item?.code ?? '', description: item?.description ?? '' },
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
