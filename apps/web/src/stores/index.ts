// =============================================================
// Life OS — Zustand Stores
// Global client-side state management
// =============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ---- Theme Store ----

interface ThemeStore {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      resolvedTheme: 'dark',
      setTheme: (theme) => {
        let resolved: 'light' | 'dark' = theme === 'system'
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme;

        document.documentElement.classList.toggle('dark', resolved === 'dark');
        set({ theme, resolvedTheme: resolved });
      },
    }),
    { name: 'lifeos-theme' },
  ),
);

// ---- UI Store ----

interface UIStore {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  taskDetailId: string | null;
  aiPanelOpen: boolean;
  projectModalOpen: boolean;
  taskModalOpen: boolean;
  taskToEdit: any | null;
  toggleSidebar: () => void;
  toggleSidebarCollapse: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setTaskDetailId: (id: string | null) => void;
  setAiPanelOpen: (open: boolean) => void;
  setProjectModalOpen: (open: boolean) => void;
  setTaskModalOpen: (open: boolean) => void;
  setTaskToEdit: (task: any | null) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  sidebarOpen: true,
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  taskDetailId: null,
  aiPanelOpen: false,
  projectModalOpen: false,
  taskModalOpen: false,
  taskToEdit: null,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleSidebarCollapse: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setTaskDetailId: (id) => set({ taskDetailId: id }),
  setAiPanelOpen: (open) => set({ aiPanelOpen: open }),
  setProjectModalOpen: (open) => set({ projectModalOpen: open }),
  setTaskModalOpen: (open) => set({ taskModalOpen: open }),
  setTaskToEdit: (task) => set({ taskToEdit: task }),
}));

// ---- Auth Store ----

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  timezone: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: (user, accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, isAuthenticated: false });
  },
}));
