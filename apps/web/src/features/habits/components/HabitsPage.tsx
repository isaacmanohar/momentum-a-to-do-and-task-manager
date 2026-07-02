import { Flame, Plus, Check } from 'lucide-react';
import { cn } from '../../../lib/utils';

const mockHabits = [
  { id: '1', name: 'Meditation', icon: '🧘', streak: 12, completedToday: true },
  { id: '2', name: 'Read 30 minutes', icon: '📚', streak: 3, completedToday: false },
  { id: '3', name: 'Exercise', icon: '🏃', streak: 21, completedToday: true },
  { id: '4', name: 'Drink Water', icon: '💧', streak: 5, completedToday: false },
];

export function HabitsPage() {
  return (
    <div className="flex h-full flex-col animate-fade-in">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-8 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Habits</h2>
          <p className="text-sm text-muted-foreground">Build consistency and track your streaks.</p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
          <Plus size={16} />
          <span>New Habit</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockHabits.map((habit) => (
            <div key={habit.id} className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/50 text-2xl shadow-inner">
                  {habit.icon}
                </div>
                <button 
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
                    habit.completedToday 
                      ? "border-primary bg-primary text-primary-foreground" 
                      : "border-muted-foreground/30 hover:border-primary hover:text-primary text-transparent"
                  )}
                >
                  <Check size={16} />
                </button>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-lg">{habit.name}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-orange-500">
                  <Flame size={16} className={habit.streak > 5 ? "animate-pulse" : ""} />
                  <span>{habit.streak} day streak</span>
                </div>
              </div>

              <div className="mt-4 flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-8 flex-1 rounded-sm",
                      i < 5 || (i === 5 && habit.completedToday) 
                        ? "bg-primary/20 border border-primary/30" 
                        : "bg-muted border border-border"
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
