import { motion } from 'framer-motion';
import { Target, Flag, Activity } from 'lucide-react';

interface GoalAnalyticsProps {
  goals: any[];
}

export function GoalAnalytics({ goals }: GoalAnalyticsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="col-span-full rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Goal Progress & Predictions</h3>
        <p className="text-sm text-muted-foreground">Long-term tracking and success probability</p>
      </div>

      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div key={goal.id} className="p-5 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${goal.color}20`, color: goal.color }}>
                  <Target size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{goal.title}</h4>
                  <p className="text-sm text-muted-foreground">Deadline: {goal.deadline}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium flex items-center gap-1 justify-end" style={{ color: goal.probability > 75 ? '#10b981' : '#f59e0b' }}>
                  <Activity size={14} />
                  {goal.probability}% Success Prediction
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Overall Progress</span>
                <span className="font-bold">{goal.progress}%</span>
              </div>
              <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${goal.progress}%`, backgroundColor: goal.color }} />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground bg-background rounded-md p-3 border">
              <div className="flex items-center gap-2">
                <Flag size={14} />
                <span>Milestones Completed</span>
              </div>
              <span className="font-semibold text-foreground">{goal.milestonesCompleted} / {goal.totalMilestones}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
