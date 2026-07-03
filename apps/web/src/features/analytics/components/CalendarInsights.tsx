import { motion } from 'framer-motion';

export function CalendarInsights() {
  const daysInMonth = 31;
  const firstDay = 3; // Wednesday
  
  const generateDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        status: Math.random() > 0.8 ? 'perfect' : Math.random() > 0.7 ? 'missed' : Math.random() > 0.4 ? 'productive' : 'average'
      });
    }
    return days;
  };

  const days = generateDays();

  const getColor = (status: string) => {
    switch (status) {
      case 'perfect': return 'bg-emerald-500 text-white font-bold ring-2 ring-emerald-500 ring-offset-2 ring-offset-background';
      case 'missed': return 'bg-rose-500/20 text-rose-500';
      case 'productive': return 'bg-primary/20 text-primary';
      default: return 'bg-muted/50 text-foreground';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="col-span-full md:col-span-1 rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Calendar Insights</h3>
        <p className="text-sm text-muted-foreground">Monthly snapshot</p>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-muted-foreground mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm">
        {days.map((day, i) => (
          <div 
            key={i} 
            className={`flex items-center justify-center aspect-square rounded-md ${day ? getColor(day.status) : ''}`}
            title={day ? `Status: ${day.status}` : ''}
          >
            {day?.date}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"/> Perfect Day</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary/40"/> Productive</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500/40"/> Missed</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-muted"/> Average</div>
      </div>
    </motion.div>
  );
}
