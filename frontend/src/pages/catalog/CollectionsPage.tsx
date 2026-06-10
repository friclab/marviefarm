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
import api from '@/lib/api';
import type { Collection, Project, Paginated } from '@/types/api';

const schema = z.object({
  name: z.string().min(1, 'Obbligatorio'),
  projectIds: z.array(z.number()).optional(),
});
type F = z.infer<typeof schema>;

function CollectionForm({ item, onSuccess, onCancel }: { item?: Collection; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { data: projects } = useQuery({ queryKey: ['projects', 'all'], queryFn: () => api.get<Paginated<Project>>('/projects', { params: { limit: 200 } }).then(r => r.data) });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { name: item?.name ?? '', projectIds: item?.projects.map(p => p.id) ?? [] },
  });

  const selected = watch('projectIds') ?? [];
  function toggle(id: number) {
    setValue('projectIds', selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  }

  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/collections/${item.id}`, d) : api.post('/collections', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['collections'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
    onError: () => toast.error('Errore nel salvataggio'),
  });

  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
      <div className="space-y-1">
        <Label>Nome</Label>
        <Input {...register('name')} autoFocus />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-1">
        <Label>Progetti</Label>
        <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
          {projects?.data.map(p => (
            <button key={p.id} type="button" onClick={() => toggle(p.id)}>
              <Badge variant={selected.includes(p.id) ? 'default' : 'outline'}>{p.name}</Badge>
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button type="submit" disabled={m.isPending}>Salva</Button>
      </div>
    </form>
  );
}

const columns: Column<Collection>[] = [
  { header: 'Nome', cell: (c) => c.name },
  { header: 'Progetti', cell: (c) => <div className="flex gap-1 flex-wrap">{c.projects.map(p => <Badge key={p.id} variant="secondary">{p.name}</Badge>)}</div> },
];

export default function CollectionsPage() {
  return (
    <CrudPage<Collection>
      title="Collezioni"
      endpoint="/collections"
      queryKey="collections"
      columns={columns}
      FormComponent={CollectionForm}
      createLabel="Nuova collezione"
    />
  );
}
