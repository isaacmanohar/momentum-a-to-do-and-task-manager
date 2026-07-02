import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '!bg-card !text-foreground !border !border-border !shadow-lg',
          duration: 3000,
          style: {
            borderRadius: '8px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'white',
            },
          },
        }}
      />
    </>
  );
}
