import { useState, type ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DeleteDialog from './DeleteDialog';
import Pagination from './Pagination';
import type { Paginated } from '@/types/api';

export interface Column<T> {
  header: string;
  cell: (item: T) => ReactNode;
  className?: string;
}

export interface CrudPageProps<T extends { id: number }> {
  title: string;
  description?: string;
  endpoint: string;
  queryKey: string | string[];
  columns: Column<T>[];
  FormComponent: React.ComponentType<{ item?: T; onSuccess: () => void; onCancel: () => void }>;
  createLabel?: string;
  itemLabel?: (item: T) => string;
  extraParams?: Record<string, string | number>;
  onDetail?: (item: T) => void;
  detailLabel?: string;
}

export function CrudPage<T extends { id: number; displayName?: string }>({
  title,
  description,
  endpoint,
  queryKey,
  columns,
  FormComponent,
  createLabel = 'Nuovo',
  itemLabel,
  extraParams,
  onDetail,
  detailLabel = 'Dettaglio',
}: CrudPageProps<T>) {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [dialogItem, setDialogItem] = useState<T | null | 'new'>(null);
  const [deleteItem, setDeleteItem] = useState<T | null>(null);

  const qk = Array.isArray(queryKey) ? queryKey : [queryKey];

  const { data, isLoading, error } = useQuery({
    queryKey: [...qk, page, extraParams],
    queryFn: () =>
      api
        .get<Paginated<T>>(endpoint, { params: { page, limit: 20, ...extraParams } })
        .then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`${endpoint}/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk });
      setDeleteItem(null);
      toast.success('Eliminato');
    },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } }).response?.data?.message;
      toast.error(msg ?? 'Impossibile eliminare');
    },
  });

  const getName = (item: T) =>
    itemLabel ? itemLabel(item) : (item as { displayName?: string }).displayName ?? `#${item.id}`;

  return (
    <div className="p-6 max-w-screen-xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        <Button onClick={() => setDialogItem('new')}>
          <Plus className="w-4 h-4" />
          {createLabel}
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((col, i) => (
                <th key={i} className={`text-left p-3 font-medium ${col.className ?? ''}`}>
                  {col.header}
                </th>
              ))}
              <th className="text-right p-3 font-medium w-32">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-8 text-muted-foreground">
                  Caricamento...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-8 text-destructive">
                  Errore nel caricamento
                </td>
              </tr>
            )}
            {!isLoading && data?.data.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-8 text-muted-foreground">
                  Nessun elemento
                </td>
              </tr>
            )}
            {data?.data.map((item) => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-muted/30">
                {columns.map((col, i) => (
                  <td key={i} className={`p-3 ${col.className ?? ''}`}>
                    {col.cell(item)}
                  </td>
                ))}
                <td className="p-3">
                  <div className="flex gap-2 justify-end">
                    {onDetail && (
                      <Button variant="outline" size="sm" onClick={() => onDetail(item)}>
                        {detailLabel}
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => setDialogItem(item)}>
                      Modifica
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteItem(item)}
                    >
                      Elimina
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data && data.total > 20 && (
        <Pagination page={page} total={data.total} limit={20} onChange={setPage} />
      )}

      <Dialog open={dialogItem !== null} onOpenChange={(open) => !open && setDialogItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{dialogItem === 'new' ? createLabel : 'Modifica'}</DialogTitle>
          </DialogHeader>
          {dialogItem !== null && (
            <FormComponent
              item={dialogItem === 'new' ? undefined : (dialogItem as T)}
              onSuccess={() => {
                qc.invalidateQueries({ queryKey: qk });
                setDialogItem(null);
              }}
              onCancel={() => setDialogItem(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <DeleteDialog
        open={deleteItem !== null}
        itemName={deleteItem ? getName(deleteItem) : ''}
        loading={deleteMutation.isPending}
        onConfirm={() => deleteItem && deleteMutation.mutate(deleteItem.id)}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
}
