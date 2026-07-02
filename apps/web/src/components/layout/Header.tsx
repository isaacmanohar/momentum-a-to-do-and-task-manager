import { Menu, Search, Bell, Plus } from 'lucide-react';
import { useUIStore, useAuthStore } from '@/stores';

export function Header() {
  const { toggleSidebar, setCommandPaletteOpen, setTaskModalOpen } = useUIStore();
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <button 
        onClick={toggleSidebar}
        className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="relative inline-flex h-9 w-full items-center justify-start rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-64 lg:w-96"
        >
          <Search size={16} className="mr-2" />
          <span>Search or command...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button 
            className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90 shadow-sm transition-all hover:shadow-md"
            onClick={() => setTaskModalOpen(true)}
          >
            <Plus size={16} />
          </button>
          
          <button className="relative rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive"></span>
          </button>

          <div className="relative ml-2">
            <button 
              className="flex h-8 w-8 items-center justify-center rounded-full bg-muted border overflow-hidden cursor-pointer"
              onClick={() => logout()} // Temporarily attach logout here for testing
              title="Click to logout"
            >
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs font-semibold">{user?.name?.charAt(0) || 'U'}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
