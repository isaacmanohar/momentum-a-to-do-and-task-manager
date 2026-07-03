import { Plus, Target, CheckCircle2, Circle, Edit2, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cn } from '../../../lib/utils';
import { useUIStore } from '@/stores';
import api from '@/lib/api-client';
import toast from 'react-hot-toast';

export function GoalsPage() {
  const { setGoalModalOpen, setGoalToEdit } = useUIStore();
  const queryClient = useQueryClient();

  const { data: goals = [], isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const res = await api.get('/goals');
      return res.data;
    }
  });

  const toggleMilestone = useMutation({
    mutationFn: async ({ goalId, milestoneId }: { goalId: string, milestoneId: string }) => {
      const res = await api.patch(`/goals/${goalId}/milestones/${milestoneId}/toggle`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
    onError: () => {
      toast.error('Failed to update milestone');
    }
  });

  const deleteGoal = useMutation({
    mutationFn: async (goalId: string) => {
      await api.delete(`/goals/${goalId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.success('Goal deleted');
    },
    onError: () => {
      toast.error('Failed to delete goal');
    }
  });

  const handleEdit = (goal: any) => {
    setGoalToEdit(goal);
    setGoalModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col animate-fade-in">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-8 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Goals</h2>
          <p className="text-sm text-muted-foreground">Set your sights high and track milestones.</p>
        </div>
        <button 
          onClick={() => setGoalModalOpen(true)}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          <Plus size={16} />
          <span>New Goal</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {goals.length === 0 ? (
             <div className="text-center py-20">
               <Target size={48} className="mx-auto text-muted-foreground opacity-50 mb-4" />
               <h3 className="text-xl font-semibold mb-2">No goals yet</h3>
               <p className="text-muted-foreground mb-6">Create a goal and break it down into milestones.</p>
               <button 
                 onClick={() => setGoalModalOpen(true)}
                 className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
               >
                 <Plus size={16} />
                 <span>Create Goal</span>
               </button>
             </div>
          ) : (
            goals.map((goal: any) => (
              <div key={goal.id} className="group rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${goal.color}20`, color: goal.color }}>
                      <Target size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold">{goal.title}</h3>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(goal)}
                            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this goal?')) {
                                deleteGoal.mutate(goal.id);
                              }
                            }}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      {goal.targetDate && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: goal.color }}>{goal.progress}%</div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Progress</p>
                  </div>
                </div>

                <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-secondary">
                  <div 
                    className="h-full transition-all duration-1000 ease-out" 
                    style={{ width: `${goal.progress}%`, backgroundColor: goal.color }}
                  />
                </div>

                {goal.milestones && goal.milestones.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold text-sm mb-4">Milestones</h4>
                    <div className="space-y-3">
                      {goal.milestones.map((m: any) => (
                        <button 
                          key={m.id} 
                          onClick={() => toggleMilestone.mutate({ goalId: goal.id, milestoneId: m.id })}
                          disabled={toggleMilestone.isPending}
                          className={cn(
                            "flex w-full items-center gap-3 text-sm text-left hover:bg-muted/50 p-2 rounded-md transition-colors", 
                            m.isCompleted ? "text-muted-foreground" : "text-foreground font-medium",
                            toggleMilestone.isPending && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {m.isCompleted ? (
                            <CheckCircle2 size={18} className="text-primary shrink-0" />
                          ) : (
                            <Circle size={18} className="text-muted-foreground/50 shrink-0" />
                          )}
                          <span className={cn(m.isCompleted && "line-through decoration-muted-foreground/50")}>
                            {m.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
