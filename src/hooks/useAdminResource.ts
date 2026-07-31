'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ApiError, type RequestStatus } from '@/lib/api';

export function useAdminResource<T extends { id: number; status: RequestStatus }>(
  fetcher: (status?: string) => Promise<T[]>,
  updater: (id: number, status: RequestStatus) => Promise<{ detail: string }>,
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<RequestStatus | 'all'>('all');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await fetcher(filter === 'all' ? undefined : filter));
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذّر تحميل البيانات');
    } finally {
      setLoading(false);
    }
  }, [fetcher, filter]);

  useEffect(() => { load(); }, [load]);

  const changeStatus = async (id: number, status: RequestStatus) => {
    setUpdatingId(id);
    try {
      await updater(id, status);
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, status } : it)));
      toast.success('تم تحديث الحالة');
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'تعذّر تحديث الحالة');
    } finally {
      setUpdatingId(null);
    }
  };

  return { items, loading, filter, setFilter, updatingId, changeStatus };
}