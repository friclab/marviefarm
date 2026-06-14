import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Trash2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import DeleteDialog from '@/components/app/DeleteDialog';
import api from '@/lib/api';
import { fmtEur } from '@/lib/utils';
import type { OrderHeader, OrderDetail, Article, FabricOption, SizeOption, Paginated } from '@/types/api';

// ── Single detail form ────────────────────────────────────────────────────────
const detailSchema = z.object({
  articleId: z.coerce.number().positive('Obbligatorio'),
  fabricId: z.coerce.number().positive('Obbligatorio'),
  modeltypeSexSizeId: z.coerce.number().positive('Obbligatorio'),
  quantity: z.coerce.number().int().min(1, 'Min 1'),
  note: z.string().optional(),
});
type DF = z.infer<typeof detailSchema>;

function DetailForm({ orderHeaderId, item, onSuccess, onCancel }: { orderHeaderId: number; item?: OrderDetail; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { data: articles } = useQuery({ queryKey: ['articles', 'all'], queryFn: () => api.get<Paginated<Article>>('/articles', { params: { limit: 500 } }).then(r => r.data) });

  const { handleSubmit, setValue, watch, register, formState: { errors } } = useForm<DF>({
    resolver: zodResolver(detailSchema),
    defaultValues: {
      articleId: item?.articleId ?? 0,
      fabricId: item?.fabricId ?? 0,
      modeltypeSexSizeId: item?.modeltypeSexSizeId ?? 0,
      quantity: item?.quantity ?? 1,
      note: item?.note ?? '',
    },
  });

  const watchArticle = watch('articleId');
  const { data: fabrics } = useQuery({
    queryKey: ['fabric-options', watchArticle],
    queryFn: () => api.get<FabricOption[]>('/order-details/fabric-options', { params: { articleId: watchArticle } }).then(r => r.data),
    enabled: !!watchArticle,
  });
  const { data: sizes } = useQuery({
    queryKey: ['size-options', watchArticle],
    queryFn: () => api.get<SizeOption[]>('/order-details/size-options', { params: { articleId: watchArticle } }).then(r => r.data),
    enabled: !!watchArticle,
  });

  const m = useMutation({
    mutationFn: (d: DF) =>
      item
        ? api.patch(`/order-details/${item.id}`, d)
        : api.post('/order-details', { ...d, orderHeaderId }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['order-header', orderHeaderId] }); toast.success(item ? 'Aggiornato' : 'Aggiunto'); onSuccess(); },
    onError: () => toast.error('Errore nel salvataggio'),
  });

  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
      <div className="space-y-1">
        <Label>Articolo</Label>
        <Select value={String(watch('articleId') || '')} onValueChange={(v) => { setValue('articleId', Number(v)); setValue('fabricId', 0); setValue('modeltypeSexSizeId', 0); }}>
          <SelectTrigger><SelectValue placeholder="Seleziona articolo..." /></SelectTrigger>
          <SelectContent>{articles?.data.map(a => <SelectItem key={a.id} value={String(a.id)}>{a.displayName}</SelectItem>)}</SelectContent>
        </Select>
        {errors.articleId && <p className="text-xs text-destructive">{errors.articleId.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Tessuto</Label>
          <Select value={String(watch('fabricId') || '')} onValueChange={(v) => setValue('fabricId', Number(v))} disabled={!watchArticle}>
            <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
            <SelectContent>{fabrics?.map(f => <SelectItem key={f.id} value={String(f.id)}>{f.displayName}</SelectItem>)}</SelectContent>
          </Select>
          {errors.fabricId && <p className="text-xs text-destructive">{errors.fabricId.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>Taglia</Label>
          <Select value={String(watch('modeltypeSexSizeId') || '')} onValueChange={(v) => setValue('modeltypeSexSizeId', Number(v))} disabled={!watchArticle}>
            <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
            <SelectContent>{sizes?.map(s => <SelectItem key={s.modeltypeSexSizeId} value={String(s.modeltypeSexSizeId)}>{s.sizeCode}</SelectItem>)}</SelectContent>
          </Select>
          {errors.modeltypeSexSizeId && <p className="text-xs text-destructive">{errors.modeltypeSexSizeId.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Quantità</Label>
          <Input {...register('quantity')} type="number" min="1" />
          {errors.quantity && <p className="text-xs text-destructive">{errors.quantity.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>Note</Label>
          <Input {...register('note')} />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button type="submit" disabled={m.isPending}>Salva</Button>
      </div>
    </form>
  );
}

// ── Batch form ─────────────────────────────────────────────────────────────────
function BatchForm({ orderHeaderId, onSuccess, onCancel }: { orderHeaderId: number; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const [articleId, setArticleId] = useState('');
  const [fabricId, setFabricId] = useState('');
  const [note, setNote] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const { data: articles } = useQuery({ queryKey: ['articles', 'all'], queryFn: () => api.get<Paginated<Article>>('/articles', { params: { limit: 500 } }).then(r => r.data) });
  const { data: fabrics } = useQuery({ queryKey: ['fabric-options', articleId], queryFn: () => api.get<FabricOption[]>('/order-details/fabric-options', { params: { articleId } }).then(r => r.data), enabled: !!articleId });
  const { data: sizes } = useQuery({ queryKey: ['size-options', articleId], queryFn: () => api.get<SizeOption[]>('/order-details/size-options', { params: { articleId } }).then(r => r.data), enabled: !!articleId });

  const m = useMutation({
    mutationFn: () => api.post('/order-details/batch', {
      orderHeaderId,
      articleId: Number(articleId),
      fabricId: Number(fabricId),
      note: note || undefined,
      items: Object.entries(quantities).filter(([, qty]) => qty > 0).map(([sizeId, qty]) => ({ modeltypeSexSizeId: Number(sizeId), quantity: qty })),
    }),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ['order-header', orderHeaderId] });
      toast.success(`${(res.data as { created: number }).created} righe aggiunte`);
      onSuccess();
    },
    onError: () => toast.error('Errore nel salvataggio'),
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Articolo</Label>
          <Select value={articleId} onValueChange={(v) => { setArticleId(v); setFabricId(''); setQuantities({}); }}>
            <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
            <SelectContent>{articles?.data.map(a => <SelectItem key={a.id} value={String(a.id)}>{a.displayName}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Tessuto</Label>
          <Select value={fabricId} onValueChange={setFabricId} disabled={!articleId}>
            <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
            <SelectContent>{fabrics?.map(f => <SelectItem key={f.id} value={String(f.id)}>{f.displayName}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1">
        <Label>Note</Label>
        <Input value={note} onChange={e => setNote(e.target.value)} />
      </div>
      {sizes && sizes.length > 0 && (
        <div className="space-y-2">
          <Label>Quantità per taglia</Label>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map(s => (
              <div key={s.modeltypeSexSizeId} className="space-y-1">
                <p className="text-xs text-center text-muted-foreground">{s.sizeCode}</p>
                <Input
                  type="number" min="0" className="text-center"
                  value={quantities[s.modeltypeSexSizeId] ?? ''}
                  onChange={e => setQuantities(q => ({ ...q, [s.modeltypeSexSizeId]: Number(e.target.value) }))}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button disabled={!articleId || !fabricId || m.isPending} onClick={() => m.mutate()}>Aggiungi</Button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [dialog, setDialog] = useState<OrderDetail | null | 'new' | 'batch'>(null);
  const [deleteItem, setDeleteItem] = useState<OrderDetail | null>(null);

  const { data: order, isLoading } = useQuery({
    queryKey: ['order-header', Number(id)],
    queryFn: () => api.get<OrderHeader>(`/order-headers/${id}`).then(r => r.data),
    enabled: !!id,
  });

  const deleteDetail = useMutation({
    mutationFn: (did: number) => api.delete(`/order-details/${did}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['order-header', Number(id)] }); setDeleteItem(null); toast.success('Eliminato'); },
    onError: () => toast.error('Errore'),
  });

  if (isLoading) return <div className="p-6 text-muted-foreground">Caricamento...</div>;
  if (!order) return <div className="p-6 text-destructive">Ordine non trovato</div>;

  const t = order.totals;

  return (
    <div className="p-6 max-w-screen-lg">
      <button onClick={() => navigate('/orders')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Ordini
      </button>

      {/* Header info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Ordine {order.orderNumber ?? `#${order.id}`}</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><span className="text-muted-foreground">Cliente:</span> {order.customer.displayName}</p>
            <p><span className="text-muted-foreground">Data:</span> {order.date ?? '—'}</p>
            <p><span className="text-muted-foreground">Sconto:</span> {order.discount ?? 0}%</p>
            {order.notes && <p><span className="text-muted-foreground">Note:</span> {order.notes}</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Totali</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div className="flex justify-between"><span className="text-muted-foreground">Parziale</span><span>{fmtEur(t.partialTotal)}</span></div>
            {t.discountAmount > 0 && <div className="flex justify-between text-orange-600"><span>Sconto</span><span>- {fmtEur(t.discountAmount)}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Imponibile</span><span>{fmtEur(t.subtotal)}</span></div>
            {t.vat > 0 && <div className="flex justify-between"><span className="text-muted-foreground">IVA</span><span>{fmtEur(t.vat)}</span></div>}
            <Separator />
            <div className="flex justify-between font-semibold"><span>Totale</span><span>{fmtEur(t.grandTotal)}</span></div>
          </CardContent>
        </Card>
      </div>

      {/* Details table */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Righe d'ordine ({order.orderDetails?.length ?? 0})</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setDialog('batch')}>
            <Layers className="w-4 h-4" /> Batch
          </Button>
          <Button size="sm" onClick={() => setDialog('new')}>
            <Plus className="w-4 h-4" /> Aggiungi riga
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium">Articolo</th>
              <th className="text-left p-3 font-medium">Tessuto</th>
              <th className="text-left p-3 font-medium">Taglia</th>
              <th className="text-right p-3 font-medium">Qtà</th>
              <th className="text-right p-3 font-medium">Prezzo</th>
              <th className="text-left p-3 font-medium">Note</th>
              <th className="text-right p-3 font-medium w-24">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {(!order.orderDetails || order.orderDetails.length === 0) && (
              <tr><td colSpan={7} className="text-center p-8 text-muted-foreground">Nessuna riga</td></tr>
            )}
            {order.orderDetails?.map(d => (
              <tr key={d.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="p-3">{d.article?.name ?? '—'}</td>
                <td className="p-3">{d.fabric?.code ?? '—'}</td>
                <td className="p-3">{d.modeltypeSexSize?.size.code ?? '—'}</td>
                <td className="p-3 text-right font-medium">{d.quantity}</td>
                <td className="p-3 text-right">{d.unitPrice !== null ? fmtEur(d.unitPrice) : '—'}</td>
                <td className="p-3 text-muted-foreground">{d.note ?? ''}</td>
                <td className="p-3">
                  <div className="flex gap-1 justify-end">
                    <Button variant="outline" size="sm" onClick={() => setDialog(d)}>Edit</Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeleteItem(d)}>
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report buttons */}
      <div className="flex gap-2 mt-4">
        <Button variant="outline" size="sm" onClick={() => window.open(`/api/reports/orders/${id}/export`, '_blank')}>
          PDF Ordine
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.open(`/api/reports/orders/${id}/choose-quantity`, '_blank')}>
          Griglia taglie
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.open(`/api/reports/orders/${id}/choose-quantity-ws`, '_blank')}>
          Griglia ingrosso
        </Button>
      </div>

      {/* Dialogs */}
      <Dialog open={dialog !== null && dialog !== 'batch'} onOpenChange={(o) => !o && setDialog(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{dialog === 'new' ? 'Aggiungi riga' : 'Modifica riga'}</DialogTitle>
          </DialogHeader>
          {dialog !== null && dialog !== 'batch' && (
            <DetailForm
              orderHeaderId={order.id}
              item={dialog === 'new' ? undefined : (dialog as OrderDetail)}
              onSuccess={() => setDialog(null)}
              onCancel={() => setDialog(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={dialog === 'batch'} onOpenChange={(o) => !o && setDialog(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Inserimento batch</DialogTitle></DialogHeader>
          <BatchForm orderHeaderId={order.id} onSuccess={() => setDialog(null)} onCancel={() => setDialog(null)} />
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={deleteItem !== null}
        itemName={`riga #${deleteItem?.id}`}
        loading={deleteDetail.isPending}
        onConfirm={() => deleteItem && deleteDetail.mutate(deleteItem.id)}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
