import { motion } from 'framer-motion';
import { Target, TrendingUp, Sparkles } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ProductivityScoreCircularProps {
  score: number;
}

export function ProductivityScoreCircular({ score }: ProductivityScoreCircularProps) {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const getStatusText = (s: number) => {
    if (s >= 90) return 'Excellent';
    if (s >= 75) return 'Good';
    if (s >= 50) return 'Average';
    return 'Needs Improvement';
  };

  const getStatusColor = (s: number) => {
    if (s >= 90) return '#10b981'; // emerald
    if (s >= 75) return '#3b82f6'; // blue
    if (s >= 50) return '#f59e0b'; // amber
    return '#f43f5e'; // rose
  };

  const color = getStatusColor(score);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-xl border bg-card p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center h-full"
    >
      <div className="relative h-64 w-64 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              cornerRadius={10}
            >
              <Cell fill={color} />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-5xl font-extrabold tracking-tighter" style={{ color }}>{score}%</span>
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mt-1">Score</span>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Target className="text-primary" /> {getStatusText(score)}
          </h3>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Your productivity score is calculated based on tasks completed, focus hours logged, and streak consistency. 
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4 border">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Weekly Imp.</div>
            <div className="text-lg font-bold text-emerald-500 flex items-center gap-1">
              <TrendingUp size={16} /> +12%
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 border">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Monthly Imp.</div>
            <div className="text-lg font-bold text-emerald-500 flex items-center gap-1">
              <TrendingUp size={16} /> +24%
            </div>
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 flex gap-3">
          <Sparkles className="text-primary mt-0.5 flex-shrink-0" size={20} />
          <p className="text-sm text-primary/90 font-medium">
            AI Insight: You're showing strong momentum this week. If you maintain this pace, you'll reach your highest monthly score ever by Friday.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
