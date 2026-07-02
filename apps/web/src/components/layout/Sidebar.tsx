import { NavLink } from 'react-router-dom';
import { 
  CheckSquare, 
  Calendar as CalendarIcon, 
  FileText, 
  Target, 
  Activity, 
  BarChart2, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useUIStore } from '@/stores';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api-client';

export function Sidebar() {
  const { sidebarOpen, sidebarCollapsed, toggleSidebarCollapse, setProjectModalOpen } = useUIStore();
  
  const { data: response } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/projects');
      return res.data;
    }
  });

  const projects = response?.data || [];

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: Activity },
    { name: 'Tasks', path: '/app/tasks', icon: CheckSquare },
    { name: 'Calendar', path: '/app/calendar', icon: CalendarIcon },
    { name: 'Notes', path: '/app/notes', icon: FileText },
    { name: 'Habits', path: '/app/habits', icon: Target },
    { name: 'Goals', path: '/app/goals', icon: Target },
    { name: 'Analytics', path: '/app/analytics', icon: BarChart2 },
  ];

  if (!sidebarOpen) return null;

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 py-4">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-3 px-2 h-16 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none pt-0.5">M</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Momentum</span>
          </div>
        )}
        <button 
          onClick={toggleSidebarCollapse}
          className="rounded p-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ml-auto"
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground",
                sidebarCollapsed && "justify-center px-0"
              )}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <item.icon size={18} />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {!sidebarCollapsed && (
          <div className="mt-8 px-4">
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Projects
            </h3>
            <div className="grid gap-1">
              {projects.map((project: any) => (
                <NavLink
                  key={project.id}
                  to={`/app/projects/${project.id}`}
                  className={({ isActive }) => cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="flex h-4 w-4 items-center justify-center text-xs">{project.icon || '📁'}</span>
                  <span className="truncate">{project.name}</span>
                </NavLink>
              ))}
              <button 
                onClick={() => setProjectModalOpen(true)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Plus size={16} />
                <span>Add Project</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto border-t p-2">
        <NavLink
          to="/app/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={sidebarCollapsed ? "Settings" : undefined}
        >
          <Settings size={18} />
          {!sidebarCollapsed && <span>Settings</span>}
        </NavLink>
      </div>
    </aside>
  );
}
