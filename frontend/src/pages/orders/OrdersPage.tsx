import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DeleteDialog from '@/components/app/DeleteDialog';
import Pagination from '@/components/app/Pagination';
import api from '@/lib/api';
import { fmtEur } from '@/lib/utils';
import type { OrderHeader, Customer, Paginated } from '@/types/api';

const schema = z.object({
  customerId: z.coerce.number().positive('Obbligatorio'),
  orderNumber: z.string().optional(),
  date: z.string().optional(),
  discount: z.coerce.number().min(0).max(100).optional().nullable(),
  notes: z.string().optional(),
});
type F = z.infer<typeof schema>;

function OrderForm({ item, onSuccess, onCancel }: { item?: OrderHeader; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { data: customers } = useQuery({ queryKey: ['customers', 'all'], queryFn: () => api.get<Paginated<Customer>>('/customers', { params: { limit: 500 } }).then(r => r.data) });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: {
      customerId: item?.customerId ?? 0,
      orderNumber: item?.orderNumber ?? '',
      date: item?.date ?? '',
      discount: item?.discount ?? null,
      notes: item?.notes ?? '',
    },
  });

  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/order-headers/${item.id}`, d) : api.post('/order-headers', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['order-headers'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } }).response?.data?.message;
      toast.error(msg ?? 'Errore nel salvataggio');
    },
  });

  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
      <div className="space-y-1">
        <Label>Cliente</Label>
        <Select value={String(watch('customerId') || '')} onValueChange={(v) => setValue('customerId', Number(v))}>
          <SelectTrigger><SelectValue placeholder="Seleziona cliente..." /></SelectTrigger>
          <SelectContent>{customers?.data.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.displayName}</SelectItem>)}</SelectContent>
        </Select>
        {errors.customerId && <p className="text-xs text-destructive">{errors.customerId.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>N° Ordine</Label>
          <Input {...register('orderNumber')} />
        </div>
        <div className="space-y-1">
          <Label>Data</Label>
          <Input {...register('date')} type="date" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Sconto (%)</Label>
          <Input {...register('discount')} type="number" step="0.01" min="0" max="100" />
        </div>
      </div>
      <div className="space-y-1">
        <Label>Note</Label>
        <Input {...register('notes')} />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button type="submit" disabled={m.isPending}>Salva</Button>
      </div>
    </form>
  );
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState<OrderHeader | null | 'new'>(null);
  const [deleteItem, setDeleteItem] = useState<OrderHeader | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['order-headers', page],
    queryFn: () => api.get<Paginated<OrderHeader>>('/order-headers', { params: { page, limit: 20 } }).then(r => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/order-headers/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['order-headers'] }); setDeleteItem(null); toast.success('Eliminato'); },
    onError: () => toast.error('Impossibile eliminare'),
  });

  return (
    <div className="p-6 max-w-screen-xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Ordini</h1>
        <Button onClick={() => setDialog('new')}>
          <Plus className="w-4 h-4" /> Nuovo ordine
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium">N° Ordine</th>
              <th className="text-left p-3 font-medium">Cliente</th>
              <th className="text-left p-3 font-medium">Data</th>
              <th className="text-right p-3 font-medium">Totale</th>
              <th className="text-right p-3 font-medium w-36">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={5} className="text-center p-8 text-muted-foreground">Caricamento...</td></tr>}
            {!isLoading && data?.data.length === 0 && <tr><td colSpan={5} className="text-center p-8 text-muted-foreground">Nessun ordine</td></tr>}
            {data?.data.map(oh => (
              <tr key={oh.id} className="border-b last:border-0 hover:bg-muted/30 cursor-pointer" onClick={() => navigate(`/orders/${oh.id}`)}>
                <td className="p-3 font-medium">{oh.orderNumber ?? `#${oh.id}`}</td>
                <td className="p-3">{oh.customer.displayName}</td>
                <td className="p-3">{oh.date ?? '—'}</td>
                <td className="p-3 text-right">{fmtEur(oh.totals.grandTotal)}</td>
                <td className="p-3">
                  <div className="flex gap-2 justify-end" onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" onClick={() => navigate(`/orders/${oh.id}`)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setDialog(oh)}>Modifica</Button>
                    <Button variant="destructive" size="sm" onClick={() => setDeleteItem(oh)}>Elimina</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data && data.total > 20 && <Pagination page={page} total={data.total} limit={20} onChange={setPage} />}

      <Dialog open={dialog !== null} onOpenChange={(o) => !o && setDialog(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{dialog === 'new' ? 'Nuovo ordine' : 'Modifica ordine'}</DialogTitle></DialogHeader>
          {dialog !== null && (
            <OrderForm
              item={dialog === 'new' ? undefined : dialog as OrderHeader}
              onSuccess={() => { qc.invalidateQueries({ queryKey: ['order-headers'] }); setDialog(null); }}
              onCancel={() => setDialog(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={deleteItem !== null}
        itemName={deleteItem?.orderNumber ?? `Ordine #${deleteItem?.id}`}
        loading={deleteMutation.isPending}
        onConfirm={() => deleteItem && deleteMutation.mutate(deleteItem.id)}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
