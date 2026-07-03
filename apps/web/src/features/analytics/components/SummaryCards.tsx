import { CheckCircle2, Target, Zap, Clock } from 'lucide-react';

interface SummaryCardsProps {
  stats: {
    productivityScore: number;
    currentStreak: number;
    focusMinutesToday: number;
    tasksCompleted: number;
  };
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Target size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Productivity Score</p>
            <h3 className="text-3xl font-bold">{stats.productivityScore}%</h3>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Current Streak</p>
            <h3 className="text-3xl font-bold">{stats.currentStreak} Days</h3>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Focus Time Today</p>
            <h3 className="text-3xl font-bold">{Math.floor(stats.focusMinutesToday / 60)}h {stats.focusMinutesToday % 60}m</h3>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Tasks Completed</p>
            <h3 className="text-3xl font-bold">{stats.tasksCompleted}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
