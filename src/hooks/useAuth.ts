import { useState, useCallback, useEffect } from 'react';
import {
  type AuthUser,
  authenticateUser,
  getStoredUser,
  storeUser,
  clearStoredUser,
} from '../lib/mockAuth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    setUser(stored);
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string): AuthUser | null => {
    const found = authenticateUser(email, password);
    if (found) {
      storeUser(found);
      setUser(found);
    }
    return found;
  }, []);

  const logout = useCallback(() => {
    clearStoredUser();
    setUser(null);
  }, []);

  return { user, loading, login, logout };
}
