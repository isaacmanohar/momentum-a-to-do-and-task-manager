import { useState } from 'react';
import { Plus, List as ListIcon, LayoutGrid, Filter, ArrowUpDown, Clock, CheckCircle2, Circle, Edit2, Trash2 } from 'lucide-react';
import { cn } from '../../../lib/utils';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api-client';
import { useUIStore } from '@/stores';
import toast from 'react-hot-toast';

// Mock Tasks Data (Fallback)
const mockTasks = [
  { id: '1', title: 'Design the dashboard layout', status: 'IN_PROGRESS', priority: 'HIGH', project: 'Life OS', dueDate: 'Today', tags: ['work', 'design'] },
  { id: '2', title: 'Implement authentication flow', status: 'TODO', priority: 'URGENT', project: 'Life OS', dueDate: 'Tomorrow', tags: ['work', 'backend'] },
];

export function TasksPage() {
  const [view, setView] = useState<'list' | 'board'>('list');
  const { setTaskModalOpen, setTaskToEdit } = useUIStore();
  const queryClient = useQueryClient();

  const { data: tasksData, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await api.get('/tasks?limit=50');
      return res.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId: string) => {
      await api.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted');
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string, status: string }) => {
      await api.patch(`/tasks/${taskId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const tasks = tasksData?.data || [];

  return (
    <div className="flex h-full flex-col animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-8 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-sm text-muted-foreground">Manage and organize your work.</p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center rounded-md border bg-muted/50 p-1">
            <button
              onClick={() => setView('list')}
              className={cn("flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-all", view === 'list' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
            >
              <ListIcon size={16} />
              <span>List</span>
            </button>
            <button
              onClick={() => setView('board')}
              className={cn("flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-all", view === 'board' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
            >
              <LayoutGrid size={16} />
              <span>Board</span>
            </button>
          </div>

          <button className="flex items-center justify-center rounded-md border p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <Filter size={18} />
          </button>
          <button className="flex items-center justify-center rounded-md border p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <ArrowUpDown size={18} />
          </button>
          <button 
            onClick={() => setTaskModalOpen(true)}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        {view === 'list' ? (
          <div className="mx-auto max-w-4xl space-y-6">
            
            {/* Section: All Tasks */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-medium text-foreground">
                All Tasks <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{tasks.length}</span>
              </h3>
              <div className="space-y-2">
                {tasks.map((task: any) => (
                  <TaskRow 
                    key={task.id} 
                    task={task} 
                    onToggle={() => toggleStatusMutation.mutate({ taskId: task.id, status: task.status === 'DONE' ? 'TODO' : 'DONE' })}
                    onDelete={() => deleteMutation.mutate(task.id)}
                    onEdit={() => {
                      setTaskToEdit(task);
                      setTaskModalOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* Kanban Board Mock */
          <div className="flex h-full gap-6 pb-4">
            <KanbanColumn title="To Do" tasks={tasks.filter((t: any) => t.status === 'TODO')} count={tasks.filter((t: any) => t.status === 'TODO').length} />
            <KanbanColumn title="In Progress" tasks={tasks.filter((t: any) => t.status === 'IN_PROGRESS')} count={tasks.filter((t: any) => t.status === 'IN_PROGRESS').length} />
            <KanbanColumn title="Done" tasks={tasks.filter((t: any) => t.status === 'DONE')} count={tasks.filter((t: any) => t.status === 'DONE').length} />
          </div>
        )}
      </div>
    </div>
  );
}

function TaskRow({ task, onToggle, onDelete, onEdit }: { task: any, onToggle?: () => void, onDelete?: () => void, onEdit?: () => void }) {
  const isDone = task.status === 'DONE';
  return (
    <div className={cn(
      "group flex cursor-pointer items-center gap-4 rounded-lg border bg-card p-3 shadow-sm transition-all hover:border-primary/50 hover:shadow-md",
      isDone && "opacity-60"
    )}>
      <button 
        onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
        className={cn("mt-0.5 transition-colors", isDone ? "text-primary" : "text-muted-foreground hover:text-primary")}
      >
        {isDone ? <CheckCircle2 size={20} /> : <Circle size={20} />}
      </button>
      
      <div className="flex flex-1 items-center justify-between">
        <div className="space-y-1">
          <p className={cn("text-sm font-medium leading-none", isDone && "line-through text-muted-foreground")}>
            {task.title}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {task.dueDate && <span className="flex items-center gap-1"><Clock size={12} /> {new Date(task.dueDate).toLocaleDateString()}</span>}
            {task.project && <span className="flex items-center gap-1">• {task.project.name || task.project}</span>}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {task.tags?.map((tag: any) => (
              <span key={tag.id || tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wider">
                {tag.name || tag}
              </span>
            ))}
          </div>
          {task.priority !== 'NONE' && (
            <span className={cn(
              "rounded text-[10px] font-semibold px-1.5 py-0.5",
              task.priority === 'URGENT' ? 'bg-red-500/10 text-red-500' :
              task.priority === 'HIGH' ? 'bg-orange-500/10 text-orange-500' :
              task.priority === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-600' :
              'bg-green-500/10 text-green-500'
            )}>
              {task.priority}
            </span>
          )}
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 border-l pl-2 ml-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="p-1 text-muted-foreground hover:text-primary rounded hover:bg-muted"
              title="Edit Task"
            >
              <Edit2 size={14} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this task?')) {
                  onDelete?.();
                }
              }}
              className="p-1 text-muted-foreground hover:text-destructive rounded hover:bg-muted"
              title="Delete Task"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ title, tasks, count }: { title: string, tasks: any[], count: number }) {
  return (
    <div className="flex w-80 shrink-0 flex-col rounded-xl bg-muted/40 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-medium text-muted-foreground shadow-sm">
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {tasks.map(task => (
          <div key={task.id} className="group cursor-grab rounded-lg border bg-card p-4 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
            <div className="mb-2 flex items-start justify-between">
              {task.priority !== 'NONE' && (
                <span className={cn(
                  "rounded text-[10px] font-semibold px-1.5 py-0.5",
                  task.priority === 'URGENT' ? 'bg-red-500/10 text-red-500' :
                  task.priority === 'HIGH' ? 'bg-orange-500/10 text-orange-500' :
                  task.priority === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-600' :
                  'bg-green-500/10 text-green-500'
                )}>
                  {task.priority}
                </span>
              )}
            </div>
            <p className="text-sm font-medium leading-tight mb-3">{task.title}</p>
            <div className="flex items-center justify-between mt-auto">
              {task.project && <span className="text-xs text-muted-foreground truncate max-w-[140px]">{task.project.name || task.project}</span>}
              {task.dueDate && (
                <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                  <Clock size={10} /> {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
        <button className="flex w-full items-center gap-2 rounded-lg border border-dashed p-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors">
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
}
