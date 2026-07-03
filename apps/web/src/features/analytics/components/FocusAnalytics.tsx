import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Timer, BrainCircuit, Maximize } from 'lucide-react';

interface FocusAnalyticsProps {
  data: any[];
}

export function FocusAnalytics({ data }: FocusAnalyticsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="col-span-full rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Focus Analytics</h3>
            <p className="text-sm text-muted-foreground">Pomodoro sessions & deep work stats</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 text-orange-500 rounded-md"><Timer size={18} /></div>
                <div>
                  <p className="text-sm font-medium">Average Session</p>
                  <p className="text-xs text-muted-foreground">Length per block</p>
                </div>
              </div>
              <p className="text-xl font-bold">45m</p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-md"><BrainCircuit size={18} /></div>
                <div>
                  <p className="text-sm font-medium">Deep Work</p>
                  <p className="text-xs text-muted-foreground">Total deep focus</p>
                </div>
              </div>
              <p className="text-xl font-bold">12h</p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-md"><Maximize size={18} /></div>
                <div>
                  <p className="text-sm font-medium">Longest Session</p>
                  <p className="text-xs text-muted-foreground">Marathon focus</p>
                </div>
              </div>
              <p className="text-xl font-bold">2.5h</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDeep" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} stroke="currentColor" className="opacity-50" />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} stroke="currentColor" className="opacity-50" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.5rem', color: 'hsl(var(--foreground))' }} />
              <Area type="monotone" dataKey="hours" name="Total Hours" stroke="#f59e0b" fillOpacity={1} fill="url(#colorFocus)" strokeWidth={2} />
              <Area type="monotone" dataKey="deepWork" name="Deep Work Hours" stroke="#6366f1" fillOpacity={1} fill="url(#colorDeep)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
