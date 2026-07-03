import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ComparisonViewProps {
  data: any[];
}

export function ComparisonView({ data }: ComparisonViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="col-span-full md:col-span-1 rounded-xl border bg-card p-6 shadow-sm flex flex-col h-full"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Comparisons</h3>
        <p className="text-sm text-muted-foreground">Current vs Previous periods</p>
      </div>

      <div className="space-y-4 flex-1">
        {data.map((item, index) => {
          const isPositive = item.current >= item.previous;
          const percentage = item.previous === 0 ? 100 : Math.round(((item.current - item.previous) / item.previous) * 100);
          
          return (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
              <div>
                <p className="text-sm font-medium">{item.metric}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="font-bold">{item.current}</span>
                  <span className="text-muted-foreground text-xs">vs {item.previous}</span>
                </div>
                <div className={`flex items-center justify-end gap-1 text-xs font-semibold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {Math.abs(percentage)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
