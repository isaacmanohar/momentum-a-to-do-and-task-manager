import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export function TimeTrackingTimeline() {
  const pieData = [
    { name: 'Work', value: 45, color: '#3b82f6' },
    { name: 'Study', value: 25, color: '#8b5cf6' },
    { name: 'Health', value: 15, color: '#10b981' },
    { name: 'Personal', value: 15, color: '#f59e0b' },
  ];

  const barData = Array.from({ length: 7 }).map((_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    Work: Math.floor(Math.random() * 4) + 2,
    Study: Math.floor(Math.random() * 3) + 1,
    Health: Math.floor(Math.random() * 2),
    Personal: Math.floor(Math.random() * 2),
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.3 }}
      className="col-span-full rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Time Tracking Analysis</h3>
        <p className="text-sm text-muted-foreground">Hours worked and category breakdown</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-2/3 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} stroke="currentColor" className="opacity-50" />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} stroke="currentColor" className="opacity-50" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', color: 'hsl(var(--foreground))' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
              <Bar dataKey="Work" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Study" stackId="a" fill="#8b5cf6" />
              <Bar dataKey="Health" stackId="a" fill="#10b981" />
              <Bar dataKey="Personal" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
