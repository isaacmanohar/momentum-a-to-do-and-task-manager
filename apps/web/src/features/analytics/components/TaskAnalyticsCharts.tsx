import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TaskAnalyticsChartsProps {
  data: any[];
}

export function TaskAnalyticsCharts({ data }: TaskAnalyticsChartsProps) {
  const [timeRange, setTimeRange] = useState('Month'); // Week, Month, Year

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-full"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold">Task Analytics</h3>
          <p className="text-sm text-muted-foreground">Completion vs Pending vs Overdue</p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg">
          {['Week', 'Month', 'Year'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timeRange === range ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickMargin={10} stroke="currentColor" className="opacity-50" />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} stroke="currentColor" className="opacity-50" />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', color: 'hsl(var(--foreground))' }} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
            <Bar dataKey="completed" name="Completed" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
            <Bar dataKey="pending" name="Pending" stackId="a" fill="#3b82f6" />
            <Bar dataKey="overdue" name="Overdue" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
