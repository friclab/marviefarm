import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Image } from 'lucide-react';
import { CrudPage, type Column } from '@/components/app/CrudPage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { useCollection, useSeasonScopedParams } from '@/lib/collection';
import type { Article, ModeltypeSex, Project, Paginated } from '@/types/api';

const schema = z.object({
  name: z.string().min(1, 'Obbligatorio'),
  description: z.string().optional(),
  modeltypesSexId: z.coerce.number().positive('Obbligatorio'),
  projectId: z.coerce.number().positive().optional().nullable(),
});
type F = z.infer<typeof schema>;

function ArticleForm({ item, onSuccess, onCancel }: { item?: Article; onSuccess: () => void; onCancel: () => void }) {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const { collectionId } = useCollection();
  const { data: mts } = useQuery({ queryKey: ['modeltypes-sexes', 'all'], queryFn: () => api.get<Paginated<ModeltypeSex>>('/modeltypes-sexes', { params: { limit: 200 } }).then(r => r.data) });
  // Projects shown in the picker are scoped to the current season (backend filters
  // when collectionId is passed; otherwise all projects are returned).
  const projectParams = collectionId !== null ? { collectionId } : {};
  const { data: projects } = useQuery({ queryKey: ['projects', 'picker', collectionId], queryFn: () => api.get<Paginated<Project>>('/projects', { params: { limit: 200, ...projectParams } }).then(r => r.data) });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item?.name ?? '',
      description: item?.description ?? '',
      modeltypesSexId: item?.modeltypesSexId ?? 0,
      projectId: item?.projectId ?? null,
    },
  });

  const m = useMutation({
    mutationFn: (d: F) => item ? api.patch(`/articles/${item.id}`, d) : api.post('/articles', d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['articles'] }); toast.success(item ? 'Aggiornato' : 'Creato'); onSuccess(); },
    onError: (e: unknown) => {
      const msg = (e as { response?: { data?: { message?: string } } }).response?.data?.message;
      toast.error(msg ?? 'Errore nel salvataggio');
    },
  });

  const uploadImage = useMutation({
    mutationFn: (file: File) => {
      const fd = new FormData();
      fd.append('image', file);
      return api.post(`/articles/${item!.id}/image`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    onSuccess: () => toast.success('Immagine caricata'),
    onError: () => toast.error('Errore nel caricamento immagine'),
  });

  return (
    <form onSubmit={handleSubmit((d) => m.mutate(d))} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Nome</Label>
          <Input {...register('name')} autoFocus />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>Descrizione</Label>
          <Input {...register('description')} />
        </div>
      </div>
      <div className="space-y-1">
        <Label>Modeltipo × Sesso</Label>
        <Select value={String(watch('modeltypesSexId') || '')} onValueChange={(v) => setValue('modeltypesSexId', Number(v))}>
          <SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger>
          <SelectContent>{mts?.data.map(m => <SelectItem key={m.id} value={String(m.id)}>{m.displayName}</SelectItem>)}</SelectContent>
        </Select>
        {errors.modeltypesSexId && <p className="text-xs text-destructive">{errors.modeltypesSexId.message}</p>}
      </div>
      <div className="space-y-1">
        <Label>Progetto</Label>
        <Select value={watch('projectId') ? String(watch('projectId')) : ''} onValueChange={(v) => setValue('projectId', Number(v))}>
          <SelectTrigger><SelectValue placeholder="Seleziona progetto..." /></SelectTrigger>
          <SelectContent>{projects?.data.map(p => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      {item && (
        <div className="space-y-1">
          <Label>Immagine</Label>
          <div className="flex items-center gap-2">
            <img
              src={`/api/articles/${item.id}/image`}
              alt=""
              className="h-16 w-16 object-cover rounded border"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <input ref={fileRef} type="file" accept="image/jpeg" className="hidden" onChange={e => { if (e.target.files?.[0]) uploadImage.mutate(e.target.files[0]); }} />
            <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
              <Image className="w-4 h-4 mr-1" /> Cambia
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Annulla</Button>
        <Button type="submit" disabled={m.isPending}>Salva</Button>
      </div>
    </form>
  );
}

const columns: Column<Article>[] = [
  { header: 'Nome', cell: (a) => a.name },
  { header: 'Descrizione', cell: (a) => a.description ?? '—' },
  { header: 'Tipo × Sesso', cell: (a) => (
    <div className="flex gap-1">
      <Badge variant="outline">{a.modeltypesSex.modeltype.description ?? a.modeltypesSex.modeltype.code}</Badge>
      <Badge variant="secondary">{a.modeltypesSex.sex.description ?? a.modeltypesSex.sex.code}</Badge>
    </div>
  )},
  { header: 'Progetto', cell: (a) => a.project?.name ?? '—' },
  { header: 'Stagione', cell: (a) => a.collection ? <Badge variant="secondary">{a.collection.displayName}</Badge> : '—' },
];

export default function ArticlesPage() {
  const navigate = useNavigate();
  const scoped = useSeasonScopedParams();
  return (
    <CrudPage<Article>
      title="Articoli"
      endpoint="/articles"
      queryKey="articles"
      columns={columns}
      extraParams={scoped}
      FormComponent={ArticleForm}
      createLabel="Nuovo articolo"
      onDetail={(a) => navigate(`/catalog/articles/${a.id}`)}
      detailLabel="Varianti"
    />
  );
}
