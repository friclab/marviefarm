import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, LogOut, Ruler, Layers, BookOpen, Users, ShoppingBag, BarChart3, Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';
import api from '@/lib/api';

interface NavItem { label: string; to: string }
interface NavGroup { label: string; icon: React.ReactNode; items: NavItem[] }

const navGroups: NavGroup[] = [
  {
    label: 'Taglie',
    icon: <Ruler className="w-4 h-4" />,
    items: [
      { label: 'Sessi', to: '/sizing/sexes' },
      { label: 'Modeltipi', to: '/sizing/modeltypes' },
      { label: 'Taglie', to: '/sizing/sizes' },
      { label: 'Modeltipi × Sessi', to: '/sizing/modeltypes-sexes' },
      { label: 'Combinazioni', to: '/sizing/modeltypes-sex-sizes' },
    ],
  },
  {
    label: 'Materiali',
    icon: <Layers className="w-4 h-4" />,
    items: [
      { label: 'Fornitori', to: '/materials/suppliers' },
      { label: 'Unità di Misura', to: '/materials/unit-measurements' },
      { label: 'Tipi Materiale', to: '/materials/material-types' },
      { label: 'Materiali', to: '/materials/materials' },
    ],
  },
  {
    label: 'Composizioni',
    icon: <Scissors className="w-4 h-4" />,
    items: [
      { label: 'Fisse', to: '/compositions/fixed' },
      { label: 'Dinamiche', to: '/compositions/dynamic' },
    ],
  },
  {
    label: 'Catalogo',
    icon: <BookOpen className="w-4 h-4" />,
    items: [
      { label: 'Progetti', to: '/catalog/projects' },
      { label: 'Collezioni', to: '/catalog/collections' },
      { label: 'Articoli', to: '/catalog/articles' },
      { label: 'Tessuti', to: '/catalog/fabrics' },
    ],
  },
];

const standalone = [
  { label: 'Clienti', to: '/customers', icon: <Users className="w-4 h-4" /> },
  { label: 'Ordini', to: '/orders', icon: <ShoppingBag className="w-4 h-4" /> },
  { label: 'Report', to: '/reports', icon: <BarChart3 className="w-4 h-4" /> },
];

function NavGroup({ group }: { group: NavGroup }) {
  const isActive = group.items.some((i) => window.location.pathname.startsWith(i.to));
  const [open, setOpen] = useState(isActive);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
      >
        {group.icon}
        <span className="flex-1 text-left">{group.label}</span>
        {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>
      {open && (
        <div className="ml-6 mt-0.5 space-y-0.5">
          {group.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'block px-3 py-1.5 text-sm rounded-md',
                  isActive
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    api.post('/auth/logout').catch(() => {});
    logout();
    navigate('/login');
  }

  return (
    <aside className="w-56 flex-shrink-0 border-r bg-card flex flex-col h-screen">
      <div className="px-4 py-4 border-b">
        <span className="font-bold text-lg">MarvieFarm</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {navGroups.map((g) => (
          <NavGroup key={g.label} group={g} />
        ))}

        <div className="pt-2 border-t mt-2 space-y-0.5">
          {standalone.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-3 py-2 text-sm rounded-md',
                  isActive
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                )
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-3 border-t">
        <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground mb-1">
          <span className="truncate">{user?.username}</span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md"
        >
          <LogOut className="w-4 h-4" />
          Esci
        </button>
      </div>
    </aside>
  );
}
