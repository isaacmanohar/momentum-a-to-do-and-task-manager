import { Menu, Search, Bell, Plus, Settings, LogOut, User as UserIcon } from 'lucide-react';
import { useUIStore, useAuthStore } from '@/stores';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Header() {
  const { toggleSidebar, setCommandPaletteOpen, setTaskModalOpen } = useUIStore();
  const { user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          <div className="relative ml-2" ref={dropdownRef}>
            <button 
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full bg-muted border overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary/50",
                dropdownOpen && "ring-2 ring-primary"
              )}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs font-semibold">{user?.name?.charAt(0) || 'U'}</span>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg border bg-popover text-popover-foreground shadow-md animate-in fade-in zoom-in-95">
                <div className="p-3 border-b">
                  <p className="text-sm font-medium">{user?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
                <div className="p-1">
                  <button 
                    onClick={() => { setDropdownOpen(false); navigate('/app/settings'); }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <UserIcon size={16} />
                    Profile
                  </button>
                  <button 
                    onClick={() => { setDropdownOpen(false); navigate('/app/settings'); }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                </div>
                <div className="p-1 border-t">
                  <button 
                    onClick={() => { setDropdownOpen(false); logout(); }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
