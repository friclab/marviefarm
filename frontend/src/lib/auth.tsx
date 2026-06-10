import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthUser {
  id: number;
  username: string;
}

interface AuthCtx {
  user: AuthUser | null;
  token: string | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('mf_token'));
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem('mf_user');
    return raw ? JSON.parse(raw) : null;
  });

  function login(t: string, u: AuthUser) {
    localStorage.setItem('mf_token', t);
    localStorage.setItem('mf_user', JSON.stringify(u));
    setToken(t);
    setUser(u);
  }

  function logout() {
    localStorage.removeItem('mf_token');
    localStorage.removeItem('mf_user');
    setToken(null);
    setUser(null);
  }

  return <Ctx.Provider value={{ user, token, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}
