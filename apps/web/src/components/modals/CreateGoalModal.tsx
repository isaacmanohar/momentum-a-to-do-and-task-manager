import { X, Target, Plus, Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUIStore } from '@/stores';
import api from '@/lib/api-client';
import toast from 'react-hot-toast';

const goalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  targetDate: z.string().optional(),
  color: z.string().default('#6366f1'),
  milestones: z.array(z.object({
    id: z.string().optional(),
    title: z.string()
  })).optional(),
});

type GoalFormData = z.input<typeof goalSchema>;

export function CreateGoalModal() {
  const { goalModalOpen, setGoalModalOpen, goalToEdit, setGoalToEdit } = useUIStore();
  const queryClient = useQueryClient();
  const isEditMode = !!goalToEdit;

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      color: '#6366f1',
      milestones: [{ title: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'milestones'
  });

  useEffect(() => {
    if (goalToEdit) {
      reset({
        title: goalToEdit.title,
        description: goalToEdit.description || '',
        targetDate: goalToEdit.targetDate ? new Date(goalToEdit.targetDate).toISOString().split('T')[0] : '',
        color: goalToEdit.color,
        milestones: goalToEdit.milestones?.length ? goalToEdit.milestones : [{ title: '' }]
      });
    } else {
      reset({ title: '', description: '', targetDate: '', color: '#6366f1', milestones: [{ title: '' }] });
    }
  }, [goalToEdit, reset]);

  const mutation = useMutation({
    mutationFn: async (data: GoalFormData) => {
      // API expects targetDate as ISO string if provided
      if (data.targetDate) {
        data.targetDate = new Date(data.targetDate).toISOString();
      } else {
        delete data.targetDate;
      }
      
      // Filter out empty milestones
      if (data.milestones) {
        data.milestones = data.milestones.filter(m => m.title && m.title.trim() !== '');
      }

      if (isEditMode) {
        const res = await api.patch(`/goals/${goalToEdit.id}`, data);
        return res.data;
      } else {
        const res = await api.post('/goals', data);
        return res.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.success(isEditMode ? 'Goal updated successfully' : 'Goal created successfully');
      handleClose();
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(err.response?.data?.error?.message || 'Failed to create goal');
    }
  });

  const handleClose = () => {
    setGoalModalOpen(false);
    setTimeout(() => {
      setGoalToEdit(null);
      reset({ title: '', description: '', targetDate: '', color: '#6366f1', milestones: [{ title: '' }] });
    }, 200);
  };

  if (!goalModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border bg-card text-card-foreground shadow-lg animate-in zoom-in-95 fade-in-0 duration-200">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Target size={18} className="text-indigo-500" /> {isEditMode ? 'Edit Goal' : 'Create Goal'}
          </h2>
          <button 
            onClick={handleClose}
            className="rounded-md p-1 hover:bg-muted"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-2">
            <input 
              {...register('title')}
              className="flex w-full rounded-md bg-transparent px-3 py-2 text-lg font-medium placeholder:text-muted-foreground focus-visible:outline-none"
              placeholder="Goal title (e.g. Launch product)"
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
              <label className="text-xs font-medium text-muted-foreground">Target Date</label>
              <input
                type="date"
                {...register('targetDate')}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Color Theme</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  {...register('color')}
                  className="h-9 w-12 cursor-pointer rounded border bg-transparent p-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t pt-4 mt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Milestones</label>
              <button 
                type="button"
                onClick={() => append({ title: '' })}
                className="text-xs flex items-center gap-1 text-primary hover:underline"
              >
                <Plus size={14} /> Add Milestone
              </button>
            </div>
            
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <input type="hidden" {...register(`milestones.${index}.id` as const)} />
                  <input
                    {...register(`milestones.${index}.title` as const)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder={`Milestone ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {errors.milestones && <p className="text-xs text-destructive">{errors.milestones.message}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6 border-t">
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
              {mutation.isPending ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
