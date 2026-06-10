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
import type { Modeltype } from '@/types/api';

const schema = z.object({
  code: z.string().min(1, 'Obbligatorio'),
  description: z.string().optional(),
});
type F = z.infer<typeof schema>;

function ModeltypeForm({ item, onSuccess, onCancel }: { item?: Modeltype; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { code: item?.code ?? '', description: item?.description ?? '' },
  });
  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/modeltypes/${item.id}`, d) : api.post('/modeltypes', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['modeltypes'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
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

const columns: Column<Modeltype>[] = [
  { header: 'Codice', cell: (m) => m.code },
  { header: 'Descrizione', cell: (m) => m.description ?? '—' },
];

export default function ModeltypesPage() {
  return (
    <CrudPage<Modeltype>
      title="Modeltipi"
      endpoint="/modeltypes"
      queryKey="modeltypes"
      columns={columns}
      FormComponent={ModeltypeForm}
      createLabel="Nuovo modeltipo"
    />
  );
}
