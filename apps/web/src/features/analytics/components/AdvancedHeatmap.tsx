import { useState } from 'react';
import { motion } from 'framer-motion';

export function AdvancedHeatmap() {
  const [range, setRange] = useState('Year');

  // Generate mock data for the heatmap
  const generateData = (days: number) => {
    const data = [];
    const today = new Date();
    for (let i = days; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      // Randomly assign some weight to create a realistic heatmap
      const val = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0;
      data.push({ date: d.toISOString().split('T')[0], value: val });
    }
    return data;
  };

  const daysToShow = range === 'Year' ? 364 : range === 'Month' ? 29 : 6;
  const data = generateData(daysToShow);

  // Group into weeks
  const weeks = [];
  let currentWeek = [];
  
  const startDay = new Date(data[0].date).getDay();
  for (let i = 0; i < startDay; i++) {
    currentWeek.push(null);
  }

  data.forEach(day => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const getColor = (count: number) => {
    if (count === 0) return 'bg-secondary';
    if (count === 1) return 'bg-primary/40';
    if (count === 2) return 'bg-primary/60';
    if (count === 3) return 'bg-primary/80';
    return 'bg-primary shadow-[0_0_8px_rgba(99,102,241,0.5)]'; // Add glow for highest
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="col-span-full rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Activity Heatmap</h3>
          <p className="text-sm text-muted-foreground">Your contribution graph over time</p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg">
          {['Week', 'Month', 'Year'].map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${range === r ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex gap-1 min-w-max justify-end">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-1">
              {week.map((day: any, j: number) => {
                if (!day) return <div key={j} className="w-3.5 h-3.5 rounded-sm opacity-0" />;
                return (
                  <div 
                    key={day.date}
                    title={`${day.value} tasks on ${new Date(day.date).toLocaleDateString()}`}
                    className={`w-3.5 h-3.5 rounded-sm ${getColor(day.value)} hover:ring-1 hover:ring-foreground transition-all cursor-crosshair`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-secondary" />
          <div className="w-3 h-3 rounded-sm bg-primary/40" />
          <div className="w-3 h-3 rounded-sm bg-primary/60" />
          <div className="w-3 h-3 rounded-sm bg-primary/80" />
          <div className="w-3 h-3 rounded-sm bg-primary" />
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
}
