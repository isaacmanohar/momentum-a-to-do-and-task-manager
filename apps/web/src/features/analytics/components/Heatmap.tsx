import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
// We don't have the Tooltip component from shadcn/ui readily available maybe? 
// Let's use simple HTML titles for the tooltip or custom tooltip component.
// Wait, I will use a simple implementation for now.

interface HeatmapProps {
  data: { date: string; count: number }[];
}

export function Heatmap({ data }: HeatmapProps) {
  // Generate last 365 days
  const today = new Date();
  const days = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }

  // Create lookup map
  const dataMap = new Map(data.map(d => [d.date, d.count]));

  // Calculate weeks (group by 7 days)
  const weeks = [];
  let currentWeek = [];
  
  // To align weeks properly, we might want to start from the correct day of week.
  // For simplicity, we just chunk by 7.
  const startDay = new Date(days[0]).getDay();
  // Pad the first week with nulls to align to Sunday
  for (let i = 0; i < startDay; i++) {
    currentWeek.push(null);
  }

  days.forEach(day => {
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
    if (count < 3) return 'bg-primary/40';
    if (count < 6) return 'bg-primary/60';
    if (count < 10) return 'bg-primary/80';
    return 'bg-primary';
  };

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Activity Heatmap</h3>
        <p className="text-sm text-muted-foreground">Tasks completed over the last year</p>
      </div>
      
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-1">
              {week.map((day, j) => {
                if (!day) return <div key={j} className="w-3 h-3 rounded-sm opacity-0" />;
                const count = dataMap.get(day) || 0;
                return (
                  <div 
                    key={day}
                    title={`${count} tasks on ${new Date(day).toLocaleDateString()}`}
                    className={`w-3 h-3 rounded-sm ${getColor(count)} hover:ring-1 hover:ring-foreground transition-all cursor-crosshair`}
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
    </div>
  );
}
