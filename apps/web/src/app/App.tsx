import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, useThemeStore } from '@/stores';
import api from '@/lib/api-client';

export function App() {
  const { user, isAuthenticated, setUser, logout } = useAuthStore();
  const { setTheme, resolvedTheme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initialize theme based on store/system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      const stored = localStorage.getItem('lifeos-theme');
      if (stored) {
        const { state } = JSON.parse(stored);
        setTheme(state.theme);
      }
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [setTheme]);

  useEffect(() => {
    // Check authentication status on mount
    const verifyAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token && !user) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch {
          logout();
          if (!['/login', '/register', '/'].includes(location.pathname)) {
            navigate('/login');
          }
        }
      } else if (!token && !['/login', '/register', '/'].includes(location.pathname)) {
        navigate('/login');
      }
    };

    verifyAuth();
  }, [user, setUser, logout, navigate, location.pathname]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${resolvedTheme}`}>
      <Outlet />
    </div>
  );
}
