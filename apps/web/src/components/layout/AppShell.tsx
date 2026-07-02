import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuthStore, useUIStore } from '@/stores';
import { cn } from '@/lib/utils';
// import { CommandPalette } from '../CommandPalette';
// import { AiAssistantPanel } from '../AiAssistantPanel';
import { CreateProjectModal } from '../modals/CreateProjectModal';
import { CreateTaskModal } from '../modals/CreateTaskModal';

export function AppShell() {
  const { isAuthenticated } = useAuthStore();
  const { sidebarOpen, sidebarCollapsed } = useUIStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
    </div>
  );
}
