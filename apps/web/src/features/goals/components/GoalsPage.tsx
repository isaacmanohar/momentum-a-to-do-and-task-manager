import { Plus, Target, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../../../lib/utils';

const mockGoals = [
  { 
    id: '1', 
    title: 'Launch Life OS v1.0', 
    progress: 35, 
    color: '#6366f1',
    milestones: [
      { title: 'Complete backend API', done: true },
      { title: 'Build frontend UI', done: false },
      { title: 'Testing & QA', done: false },
    ]
  },
  { 
    id: '2', 
    title: 'Run a Half Marathon', 
    progress: 60, 
    color: '#10b981',
    milestones: [
      { title: 'Run 5k', done: true },
      { title: 'Run 10k', done: true },
      { title: 'Run 15k', done: false },
    ]
  },
];

export function GoalsPage() {
  return (
    <div className="flex h-full flex-col animate-fade-in">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-8 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Goals</h2>
          <p className="text-sm text-muted-foreground">Set your sights high and track milestones.</p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
          <Plus size={16} />
          <span>New Goal</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {mockGoals.map((goal) => (
            <div key={goal.id} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${goal.color}20`, color: goal.color }}>
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Target Date: Dec 31, 2026</p>
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

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-sm mb-4">Milestones</h4>
                <div className="space-y-3">
                  {goal.milestones.map((m, i) => (
                    <div key={i} className={cn("flex items-center gap-3 text-sm", m.done ? "text-muted-foreground" : "text-foreground font-medium")}>
                      {m.done ? <CheckCircle2 size={18} className="text-primary" /> : <Circle size={18} className="text-muted-foreground/50" />}
                      <span className={cn(m.done && "line-through decoration-muted-foreground/50")}>{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
