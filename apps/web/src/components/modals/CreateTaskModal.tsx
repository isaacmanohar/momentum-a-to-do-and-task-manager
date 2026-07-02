import { useState, useEffect } from 'react';
import { X, Calendar, Flag, Folder } from 'lucide-react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUIStore } from '@/stores';
import api from '@/lib/api-client';
import toast from 'react-hot-toast';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['NONE', 'LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('NONE'),
  projectId: z.string().optional(),
  dueDate: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export function CreateTaskModal() {
  const { taskModalOpen, setTaskModalOpen, taskToEdit, setTaskToEdit } = useUIStore();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: 'NONE',
    }
  });

  // Populate form if editing
  useEffect(() => {
    if (taskModalOpen && taskToEdit) {
      reset({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        priority: taskToEdit.priority || 'NONE',
        projectId: taskToEdit.project?.id || taskToEdit.projectId || '',
        dueDate: taskToEdit.dueDate ? taskToEdit.dueDate.substring(0, 10) : '',
      });
    } else if (taskModalOpen && !taskToEdit) {
      reset({ title: '', description: '', priority: 'NONE', projectId: '', dueDate: '' });
    }
  }, [taskModalOpen, taskToEdit, reset]);

  const { data: projectsResponse } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/projects');
      return res.data;
    }
  });

  const projects = projectsResponse?.data || [];

  const mutation = useMutation({
    mutationFn: async (data: TaskFormData) => {
      const payload = {
        ...data,
        projectId: data.projectId || undefined,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
      };
      
      if (taskToEdit) {
        const res = await api.patch(`/tasks/${taskToEdit.id}`, payload);
        return res.data;
      } else {
        const res = await api.post('/tasks', payload);
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['project'] });
      toast.success(taskToEdit ? 'Task updated successfully' : 'Task created successfully');
      handleClose();
    },
    onError: () => {
      toast.error(taskToEdit ? 'Failed to update task' : 'Failed to create task');
    }
  });

  const handleClose = () => {
    setTaskModalOpen(false);
    setTimeout(() => {
      setTaskToEdit(null);
      reset({ title: '', description: '', priority: 'NONE', projectId: '', dueDate: '' });
    }, 200);
  };

  if (!taskModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border bg-card text-card-foreground shadow-lg animate-in zoom-in-95 fade-in-0 duration-200">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold">{taskToEdit ? 'Edit Task' : 'Create Task'}</h2>
          <button 
            onClick={handleClose}
            className="rounded-md p-1 hover:bg-muted"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="p-4 space-y-4">
          <div className="space-y-2">
            <input 
              {...register('title')}
              className="flex w-full rounded-md bg-transparent px-3 py-2 text-lg font-medium placeholder:text-muted-foreground focus-visible:outline-none"
              placeholder="Task name"
              autoFocus
            />
            {errors.title && <p className="text-xs text-destructive px-3">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <textarea 
              {...register('description')}
              className="flex min-h-[80px] w-full rounded-md border-0 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none resize-none"
              placeholder="Description (optional)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4 mt-2">
            <div className="space-y-2">
              <label className="text-xs font-medium flex items-center gap-2 text-muted-foreground">
                <Folder size={14} /> Project
              </label>
              <select
                {...register('projectId')}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Inbox</option>
                {projects.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium flex items-center gap-2 text-muted-foreground">
                <Flag size={14} /> Priority
              </label>
              <select
                {...register('priority')}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="NONE">None</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
            
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-medium flex items-center gap-2 text-muted-foreground">
                <Calendar size={14} /> Due Date
              </label>
              <input
                type="date"
                {...register('dueDate')}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6">
            <button 
              type="button" 
              className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : (taskToEdit ? 'Save Changes' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
