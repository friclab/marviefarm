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
import type { Customer } from '@/types/api';

const schema = z.object({
  company: z.string().optional(),
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z.string().email('Email non valida').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  vatApplied: z.coerce.number().min(0).max(100).optional().nullable(),
});
type F = z.infer<typeof schema>;

function CustomerForm({ item, onSuccess, onCancel }: { item?: Customer; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: item?.company ?? '',
      name: item?.name ?? '',
      surname: item?.surname ?? '',
      email: item?.email ?? '',
      phone: item?.phone ?? '',
      address: item?.address ?? '',
      city: item?.city ?? '',
      country: item?.country ?? '',
      vatApplied: item?.vatApplied ?? null,
    },
  });
  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/customers/${item.id}`, d) : api.post('/customers', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['customers'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
    onError: () => toast.error('Errore nel salvataggio'),
  });
  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-1">
          <Label>Ragione Sociale</Label>
          <Input {...register('company')} autoFocus />
        </div>
        <div className="space-y-1">
          <Label>Nome</Label>
          <Input {...register('name')} />
        </div>
        <div className="space-y-1">
          <Label>Cognome</Label>
          <Input {...register('surname')} />
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input {...register('email')} type="email" />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>Telefono</Label>
          <Input {...register('phone')} />
        </div>
        <div className="col-span-2 space-y-1">
          <Label>Indirizzo</Label>
          <Input {...register('address')} />
        </div>
        <div className="space-y-1">
          <Label>Città</Label>
          <Input {...register('city')} />
        </div>
        <div className="space-y-1">
          <Label>Paese</Label>
          <Input {...register('country')} />
        </div>
        <div className="space-y-1">
          <Label>IVA applicata (%)</Label>
          <Input {...register('vatApplied')} type="number" step="0.01" min="0" max="100" />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button type="submit" disabled={m.isPending}>Salva</Button>
      </div>
    </form>
  );
}

const columns: Column<Customer>[] = [
  { header: 'Ragione Sociale', cell: (c) => c.company ?? '—' },
  { header: 'Nominativo', cell: (c) => [c.name, c.surname].filter(Boolean).join(' ') || '—' },
  { header: 'Email', cell: (c) => c.email ?? '—' },
  { header: 'Città', cell: (c) => c.city ?? '—' },
  { header: 'IVA%', cell: (c) => c.vatApplied != null ? `${c.vatApplied}%` : '—' },
];

export default function CustomersPage() {
  return (
    <CrudPage<Customer>
      title="Clienti"
      endpoint="/customers"
      queryKey="customers"
      columns={columns}
      FormComponent={CustomerForm}
      createLabel="Nuovo cliente"
    />
  );
}
