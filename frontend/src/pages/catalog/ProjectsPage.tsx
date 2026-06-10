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
import api from '@/lib/api';
import type { Project } from '@/types/api';

const schema = z.object({ name: z.string().min(1, 'Obbligatorio') });
type F = z.infer<typeof schema>;

function ProjectForm({ item, onSuccess, onCancel }: { item?: Project; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { name: item?.name ?? '' },
  });
  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/projects/${item.id}`, d) : api.post('/projects', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['projects'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
    onError: () => toast.error('Errore nel salvataggio'),
  });
  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
      <div className="space-y-1">
        <Label>Nome</Label>
        <Input {...register('name')} autoFocus />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      {item && (
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>{item.articles.length}</strong> articoli · <strong>{item.collections.length}</strong> collezioni</p>
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
  { header: 'Articoli', cell: (p) => <Badge variant="secondary">{p.articles.length}</Badge> },
  { header: 'Collezioni', cell: (p) => <Badge variant="secondary">{p.collections.length}</Badge> },
];

export default function ProjectsPage() {
  return (
    <CrudPage<Project>
      title="Progetti"
      endpoint="/projects"
      queryKey="projects"
      columns={columns}
      FormComponent={ProjectForm}
      createLabel="Nuovo progetto"
    />
  );
}
