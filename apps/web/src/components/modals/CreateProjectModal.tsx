import { useState } from 'react';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUIStore } from '@/stores';
import api from '@/lib/api-client';
import toast from 'react-hot-toast';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  color: z.string().optional(),
  icon: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export function CreateProjectModal() {
  const { projectModalOpen, setProjectModalOpen } = useUIStore();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      color: '#6366f1',
      icon: '📁',
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const res = await api.post('/projects', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully');
      setProjectModalOpen(false);
      reset();
    },
    onError: () => {
      toast.error('Failed to create project');
    }
  });

  if (!projectModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-lg animate-in zoom-in-95 fade-in-0 duration-200">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold">Create Project</h2>
          <button 
            onClick={() => setProjectModalOpen(false)}
            className="rounded-md p-1 hover:bg-muted"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input 
              {...register('name')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="e.g. Work, Personal"
              autoFocus
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Color</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color"
                  {...register('color')}
                  className="h-10 w-16 p-1 bg-transparent rounded-md cursor-pointer"
                />
                <span className="text-sm text-muted-foreground">Select color</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Icon (Emoji)</label>
              <input 
                {...register('icon')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="📁"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <button 
              type="button" 
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setProjectModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
