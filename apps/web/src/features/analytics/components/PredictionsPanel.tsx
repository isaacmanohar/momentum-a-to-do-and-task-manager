import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export function PredictionsPanel() {
  const forecastData = Array.from({ length: 14 }).map((_, i) => ({
    day: i,
    value: Math.floor(Math.random() * 20) + 40 + i * 2, // Upward trend
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1.1 }}
      className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-full"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Future Predictions</h3>
        <p className="text-sm text-muted-foreground">Forecasts based on current velocity</p>
      </div>

      <div className="space-y-6 flex-1">
        <div className="bg-muted/30 border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium flex items-center gap-2"><TrendingUp size={16} className="text-primary"/> Productivity Forecast</span>
            <span className="text-xs font-bold text-emerald-500">+15% expected</span>
          </div>
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 text-center">
            <AlertTriangle className="mx-auto text-rose-500 mb-2" size={24} />
            <p className="text-xs font-semibold text-rose-500 uppercase tracking-wider mb-1">Risk Level</p>
            <p className="text-lg font-bold text-rose-600 dark:text-rose-400">Medium</p>
            <p className="text-[10px] text-muted-foreground mt-1">2 deadlines approaching</p>
          </div>
          
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 text-center">
            <ShieldCheck className="mx-auto text-emerald-500 mb-2" size={24} />
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">Goal Success</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">85%</p>
            <p className="text-[10px] text-muted-foreground mt-1">On track for Q4</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
