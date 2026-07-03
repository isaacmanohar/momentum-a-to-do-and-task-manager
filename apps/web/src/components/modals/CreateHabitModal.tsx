import { X, Flame } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUIStore } from '@/stores';
import api from '@/lib/api-client';
import toast from 'react-hot-toast';

const habitSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  icon: z.string().default('⭐'),
});

type HabitFormData = z.input<typeof habitSchema>;

export function CreateHabitModal() {
  const { habitModalOpen, setHabitModalOpen } = useUIStore();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<HabitFormData>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      icon: '⭐',
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: HabitFormData) => {
      const res = await api.post('/habits', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      toast.success('Habit created successfully');
      handleClose();
    },
    onError: () => {
      toast.error('Failed to create habit');
    }
  });

  const handleClose = () => {
    setHabitModalOpen(false);
    setTimeout(() => {
      reset({ name: '', description: '', icon: '⭐' });
    }, 200);
  };

  if (!habitModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border bg-card text-card-foreground shadow-lg animate-in zoom-in-95 fade-in-0 duration-200">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Flame size={18} className="text-orange-500" /> Create Habit</h2>
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
              {...register('name')}
              className="flex w-full rounded-md bg-transparent px-3 py-2 text-lg font-medium placeholder:text-muted-foreground focus-visible:outline-none"
              placeholder="Habit name (e.g. Meditate)"
              autoFocus
            />
            {errors.name && <p className="text-xs text-destructive px-3">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <textarea 
              {...register('description')}
              className="flex min-h-[80px] w-full rounded-md border-0 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none resize-none"
              placeholder="Description (optional)"
            />
          </div>

          <div className="space-y-2 border-t pt-4 mt-2">
            <label className="text-xs font-medium flex items-center gap-2 text-muted-foreground">
              Icon (Emoji)
            </label>
            <input
              {...register('icon')}
              className="flex h-9 w-20 rounded-md border border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
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
              {mutation.isPending ? 'Creating...' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
