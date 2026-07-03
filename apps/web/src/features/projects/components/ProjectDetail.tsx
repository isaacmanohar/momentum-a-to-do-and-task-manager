import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api-client';
import { useUIStore } from '@/stores';
import { Trash2, Edit2, CheckCircle2, Circle, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { setTaskModalOpen, setTaskToEdit, setDefaultProjectId } = useUIStore();
  const queryClient = useQueryClient();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const res = await api.get(`/projects/${id}`);
      return res.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId: string) => {
      await api.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted');
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string, status: string }) => {
      await api.patch(`/tasks/${taskId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  if (isLoading) {
    return <div className="p-8 animate-pulse flex flex-col gap-6"><div className="h-10 w-48 bg-muted rounded"></div><div className="h-32 w-full bg-muted rounded"></div></div>;
  }

  if (!project) {
    return <div className="p-8">Project not found</div>;
  }

  return (
    <div className="flex-1 space-y-6 p-8 animate-fade-in flex flex-col h-full">
      <div className="flex items-center gap-3 border-b pb-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-xl" style={{ backgroundColor: `${project.color}20` }}>
          {project.icon || '📁'}
        </span>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
          {project.description && (
            <p className="text-muted-foreground mt-1">{project.description}</p>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-3 mt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Tasks</h3>
          {project.tasks && project.tasks.length > 0 && (
            <button 
              onClick={() => {
                setDefaultProjectId(id || null);
                setTaskModalOpen(true);
              }}
              className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Plus size={14} /> Add Task
            </button>
          )}
        </div>
        {project.tasks && project.tasks.length > 0 ? (
          project.tasks.map((task: any) => {
            const isDone = task.status === 'DONE';
            return (
              <div key={task.id} className={`group flex items-start justify-between gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 bg-card ${isDone ? 'opacity-60' : ''}`}>
                <div className="flex items-start gap-3 flex-1">
                  <button 
                    onClick={() => toggleStatusMutation.mutate({ taskId: task.id, status: isDone ? 'TODO' : 'DONE' })}
                    className={`mt-0.5 transition-colors ${isDone ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    {isDone ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>
                  <div className="flex-1 space-y-1">
                    <p className={`text-sm font-medium leading-none ${isDone ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                    {task.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                      {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
                      {task.priority !== 'NONE' && (
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold">{task.priority}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button 
                    onClick={() => {
                      setTaskToEdit(task);
                      setTaskModalOpen(true);
                    }}
                    className="p-1.5 text-muted-foreground hover:text-primary rounded-md hover:bg-muted"
                    title="Edit Task"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this task?')) {
                        deleteMutation.mutate(task.id);
                      }
                    }}
                    className="p-1.5 text-muted-foreground hover:text-destructive rounded-md hover:bg-muted"
                    title="Delete Task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 border border-dashed rounded-xl bg-card/50">
            <p className="text-muted-foreground mb-4">No tasks in this project yet.</p>
            <button 
              onClick={() => {
                setDefaultProjectId(id || null);
                setTaskModalOpen(true);
              }}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              + Add Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
