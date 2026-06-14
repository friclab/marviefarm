import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';
import type { Collection, Paginated } from '@/types/api';

const STORAGE_KEY = 'mf_collection';

interface CollectionCtx {
  // The currently selected season, or null when "all seasons" is active.
  collectionId: number | null;
  setCollectionId: (id: number | null) => void;
  collections: Collection[];
  current: Collection | null;
  isLoading: boolean;
}

const Ctx = createContext<CollectionCtx>(null!);

// Most recent season first: year desc, then id desc as a deterministic tie-break
// (also the fallback when year is null on every row).
function byMostRecent(a: Collection, b: Collection): number {
  const ya = a.year ?? -Infinity;
  const yb = b.year ?? -Infinity;
  if (ya !== yb) return yb - ya;
  return b.id - a.id;
}

export function CollectionProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [collectionId, setCollectionIdState] = useState<number | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? Number(raw) : null;
  });

  const { data, isLoading } = useQuery({
    queryKey: ['collections', 'selector'],
    enabled: !!token,
    queryFn: () =>
      api.get<Paginated<Collection>>('/collections', { params: { limit: 500 } }).then((r) => r.data),
  });

  const collections = useMemo(() => (data?.data ?? []).slice().sort(byMostRecent), [data]);

  function setCollectionId(id: number | null) {
    if (id === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, String(id));
    setCollectionIdState(id);
  }

  // Auto-select the latest season on first load, and recover gracefully if the
  // persisted selection points at a season that no longer exists.
  useEffect(() => {
    if (collections.length === 0) return;
    const exists = collectionId !== null && collections.some((c) => c.id === collectionId);
    if (!exists) setCollectionId(collections[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collections]);

  const current = useMemo(
    () => collections.find((c) => c.id === collectionId) ?? null,
    [collections, collectionId],
  );

  return (
    <Ctx.Provider value={{ collectionId, setCollectionId, collections, current, isLoading }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCollection() {
  return useContext(Ctx);
}

// Season scope for list queries: { collectionId } when a season is selected,
// otherwise {} (= show all, legacy behaviour). Spread into CrudPage extraParams.
export function useSeasonScopedParams(): { collectionId?: number } {
  const { collectionId } = useCollection();
  return collectionId !== null ? { collectionId } : {};
}
