import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from './App';
import { AppShell } from '../components/layout/AppShell';
import { Login } from '../features/auth/components/Login';
import { Dashboard } from '../features/dashboard/components/Dashboard';
import { TasksPage } from '../features/tasks/components/TasksPage';
import { CalendarPage } from '../features/calendar/components/CalendarPage';
import { NotesPage } from '../features/notes/components/NotesPage';
import { HabitsPage } from '../features/habits/components/HabitsPage';
import { GoalsPage } from '../features/goals/components/GoalsPage';
import { ProjectDetail } from '../features/projects/components/ProjectDetail';
import { SettingsPage as Settings } from '../features/settings/components/SettingsPage';
import { LandingPage } from '../features/landing/components/LandingPage';

import { Register } from '../features/auth/components/Register';

// Lazy load components (we'll implement these next)
import { AnalyticsPage as Analytics } from '../features/analytics/components/AnalyticsPage';
const NotFound = () => <div className="flex h-full items-center justify-center flex-col gap-4"><h2>404 - Page Not Found</h2><a href="/" className="text-primary hover:underline">Go Home</a></div>;


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'app',
        element: <AppShell />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'tasks',
            element: <TasksPage />,
          },
          {
            path: 'tasks/:id',
            element: <TasksPage />,
          },
          {
            path: 'calendar',
            element: <CalendarPage />,
          },
          {
            path: 'notes',
            element: <NotesPage />,
          },
          {
            path: 'notes/:id',
            element: <NotesPage />,
          },
          {
            path: 'projects/:id',
            element: <ProjectDetail />,
          },
          {
            path: 'habits',
            element: <HabitsPage />,
          },
          {
            path: 'goals',
            element: <GoalsPage />,
          },
          {
            path: 'analytics',
            element: <Analytics />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
