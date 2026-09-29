import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CrudPage, type Column } from '@/components/app/CrudPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';
import { useCollection, useSeasonScopedParams } from '@/lib/collection';
import type { Project, Collection, Paginated } from '@/types/api';

const schema = z.object({
  name: z.string().min(1, 'Obbligatorio'),
  collectionId: z.coerce.number().positive().optional().nullable(),
});
type F = z.infer<typeof schema>;

function ProjectForm({ item, onSuccess, onCancel }: { item?: Project; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { collections, collectionId: currentCollectionId } = useCollection();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item?.name ?? '',
      // Prefill with the currently selected season on create.
      collectionId: item?.collectionId ?? currentCollectionId ?? null,
    },
  });
  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/projects/${item.id}`, d) : api.post('/projects', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['projects'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } }).response?.data?.message;
      toast.error(msg ?? 'Errore nel salvataggio');
    },
  });
  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
      <div className="space-y-1">
        <Label>Nome</Label>
        <Input {...register('name')} autoFocus />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-1">
        <Label>Stagione</Label>
        <Select value={watch('collectionId') ? String(watch('collectionId')) : ''} onValueChange={(v) => setValue('collectionId', Number(v))}>
          <SelectTrigger><SelectValue placeholder="Seleziona stagione..." /></SelectTrigger>
          <SelectContent>{collections.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.displayName}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      {item && (
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>{item.articles.length}</strong> articoli</p>
        </div>
      )}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button type="submit" disabled={m.isPending}>Salva</Button>
      </div>
    </form>
  );
}

const columns: Column<Project>[] = [
  { header: 'Nome', cell: (p) => p.name },
  { header: 'Stagione', cell: (p) => p.collection ? <Badge variant="secondary">{p.collection.displayName}</Badge> : '—' },
  { header: 'Articoli', cell: (p) => <Badge variant="secondary">{p.articles.length}</Badge> },
];

export default function ProjectsPage() {
  const scoped = useSeasonScopedParams();
  return (
    <CrudPage<Project>
      title="Progetti"
      endpoint="/projects"
      queryKey="projects"
      columns={columns}
      extraParams={scoped}
      FormComponent={ProjectForm}
      createLabel="Nuovo progetto"
    />
  );
}
