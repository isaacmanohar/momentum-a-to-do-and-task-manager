import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface LifeBalanceRadarProps {
  data: any[];
}

export function LifeBalanceRadar({ data }: LifeBalanceRadarProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-full"
    >
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Life Balance</h3>
        <p className="text-sm text-muted-foreground">Distribution of effort across categories</p>
      </div>
      
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="currentColor" className="opacity-20" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 12, className: 'opacity-70' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Balance Score"
              dataKey="A"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.4}
              strokeWidth={2}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', color: 'hsl(var(--foreground))' }}
              itemStyle={{ color: '#6366f1' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
