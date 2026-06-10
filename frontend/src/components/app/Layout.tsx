import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import Sidebar from './Sidebar';

export default function Layout() {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
}
