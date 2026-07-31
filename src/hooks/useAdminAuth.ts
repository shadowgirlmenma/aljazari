'use client';

import { useCallback, useEffect, useState } from 'react';
import { admin, adminAuth, type UserOut } from '@/lib/api';

export function useAdminAuth() {
  const [user, setUser] = useState<UserOut | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = adminAuth.getToken();
    if (!token) { setLoading(false); return; }
    try {
      const me = await admin.me();
      if (me.role !== 'admin') { adminAuth.clearToken(); setUser(null); }
      else setUser(me);
    } catch {
      adminAuth.clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const logout = useCallback(() => {
    adminAuth.clearToken();
    setUser(null);
  }, []);

  return { user, loading, logout, refresh: checkAuth };
}