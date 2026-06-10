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
import type { Supplier } from '@/types/api';

const schema = z.object({
  company: z.string().optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
}).refine(d => d.company || d.name || d.surname, {
  message: 'Inserire almeno ragione sociale o nome',
  path: ['company'],
});
type F = z.infer<typeof schema>;

function SupplierForm({ item, onSuccess, onCancel }: { item?: Supplier; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: item?.company ?? '',
      name: item?.name ?? '',
      surname: item?.surname ?? '',
    },
  });
  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/suppliers/${item.id}`, d) : api.post('/suppliers', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['suppliers'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
    onError: () => toast.error('Errore nel salvataggio'),
  });
  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
      <div className="space-y-1">
        <Label>Ragione sociale</Label>
        <Input {...register('company')} autoFocus placeholder="Es. Tessuti Rossi Srl" />
        {errors.company && <p className="text-xs text-destructive">{errors.company.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label>Nome</Label>
          <Input {...register('name')} placeholder="Mario" />
        </div>
        <div className="space-y-1">
          <Label>Cognome</Label>
          <Input {...register('surname')} placeholder="Rossi" />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button type="submit" disabled={m.isPending}>Salva</Button>
      </div>
    </form>
  );
}

const columns: Column<Supplier>[] = [
  { header: 'Fornitore', cell: (s) => s.displayName },
  { header: 'Ragione sociale', cell: (s) => s.company ?? '—' },
  { header: 'Nome', cell: (s) => [s.name, s.surname].filter(Boolean).join(' ') || '—' },
];

export default function SuppliersPage() {
  return (
    <CrudPage<Supplier>
      title="Fornitori"
      endpoint="/suppliers"
      queryKey="suppliers"
      columns={columns}
      FormComponent={SupplierForm}
      createLabel="Nuovo fornitore"
    />
  );
}
