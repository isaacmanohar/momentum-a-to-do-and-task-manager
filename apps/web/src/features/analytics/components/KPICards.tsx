import { motion } from 'framer-motion';
import { Target, CheckCircle2, Clock, Flame, BookOpen, Briefcase, AlertCircle, Calendar } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface KPICardsProps {
  data: any;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function KPICards({ data }: KPICardsProps) {
  const sparklineData = Array.from({ length: 7 }).map(() => ({ value: Math.random() * 10 + 5 }));

  const MiniSparkline = ({ color }: { color: string }) => (
    <div className="h-8 w-24 ml-auto">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sparklineData}>
          <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  const renderCard = (title: string, value: string | number, trend: string, icon: React.ReactNode, color: string, colorClass: string, isPositive: boolean) => (
    <motion.div variants={cardVariants} className="relative overflow-hidden rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center justify-between mb-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${colorClass}/10 text-${colorClass}`}>
          {icon}
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
          {trend}
        </div>
      </div>
      <p className="text-sm text-muted-foreground font-medium">{title}</p>
      <div className="flex items-end mt-1">
        <h3 className="text-2xl font-bold">{value}</h3>
        <MiniSparkline color={color} />
      </div>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {renderCard('Productivity Score', `${data.productivityScore}%`, data.scoreTrend, <Target size={20} />, '#6366f1', 'primary', true)}
      {renderCard('Tasks Completed', data.tasksCompleted, data.tasksTrend, <CheckCircle2 size={20} />, '#10b981', 'emerald-500', true)}
      {renderCard('Focus Hours', `${data.focusHours}h`, data.focusTrend, <Clock size={20} />, '#f59e0b', 'orange-500', true)}
      {renderCard('Current Streak', `${data.currentStreak} Days`, 'Keep going!', <Flame size={20} />, '#ef4444', 'red-500', true)}
      
      {renderCard('Habits Completed', data.habitsCompleted, data.habitsTrend, <BookOpen size={20} />, '#8b5cf6', 'purple-500', true)}
      {renderCard('Active Projects', data.projectsActive, 'Steady', <Briefcase size={20} />, '#3b82f6', 'blue-500', true)}
      {renderCard('Overdue Tasks', data.overdueTasks, data.overdueTrend, <AlertCircle size={20} />, '#f43f5e', 'rose-500', true)}
      {renderCard('Daily Average', data.avgDailyProductivity, '+1.2', <Calendar size={20} />, '#14b8a6', 'teal-500', true)}
    </div>
  );
}
