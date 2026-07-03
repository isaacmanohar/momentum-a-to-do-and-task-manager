import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuthStore, useUIStore, useWorkspaceStore } from '@/stores';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api-client';
// import { CommandPalette } from '../CommandPalette';
// import { AiAssistantPanel } from '../AiAssistantPanel';
import { CreateProjectModal } from '../modals/CreateProjectModal';
import { CreateTaskModal } from '../modals/CreateTaskModal';
import { CreateHabitModal } from '../modals/CreateHabitModal';
import { CreateGoalModal } from '../modals/CreateGoalModal';

export function AppShell() {
  const { isAuthenticated } = useAuthStore();
  const { sidebarOpen, sidebarCollapsed } = useUIStore();
  const { setWorkspaces } = useWorkspaceStore();

  useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const res = await api.get('/workspaces');
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.data) {
        setWorkspaces(data.data);
      }
    },
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      
      <div 
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out relative",
          sidebarOpen ? (sidebarCollapsed ? "ml-16" : "ml-64") : "ml-0"
        )}
      >
        <Header />
        
        <main className="flex-1 overflow-auto bg-muted/20">
          <Outlet />
        </main>
      </div>

      {/* <CommandPalette /> */}
      {/* <AiAssistantPanel /> */}
      <CreateTaskModal />
      <CreateProjectModal />
      <CreateHabitModal />
      <CreateGoalModal />
    </div>
  );
}
