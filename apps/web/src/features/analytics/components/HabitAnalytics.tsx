import { motion } from 'framer-motion';
import { Flame, Calendar, Trophy, Activity } from 'lucide-react';

interface HabitAnalyticsProps {
  habits: any[];
}

export function HabitAnalytics({ habits }: HabitAnalyticsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="col-span-full rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Habit Analytics</h3>
        <p className="text-sm text-muted-foreground">Streaks, consistency, and completion rates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {habits.map((habit, index) => (
          <div key={habit.id} className="p-5 border rounded-lg bg-card hover:bg-muted/30 transition-colors">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: habit.color }} />
              {habit.name}
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-muted/50 p-3 rounded-md text-center">
                <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                  <Flame size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Streak</span>
                </div>
                <p className="text-2xl font-bold">{habit.streak}</p>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-md text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                  <Trophy size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Longest</span>
                </div>
                <p className="text-2xl font-bold">{habit.longest}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1"><Calendar size={12}/> Completion</span>
                  <span className="font-bold">{habit.completion}%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${habit.completion}%`, backgroundColor: habit.color }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1"><Activity size={12}/> Consistency</span>
                  <span className="font-bold">{habit.consistency}%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${habit.consistency}%`, backgroundColor: habit.color }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
