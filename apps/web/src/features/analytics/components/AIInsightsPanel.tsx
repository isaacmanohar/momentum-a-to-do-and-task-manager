import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AIInsightsPanelProps {
  insights: string[];
}

export function AIInsightsPanel({ insights }: AIInsightsPanelProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1.0 }}
      className="rounded-xl border bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 shadow-sm flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
          <p className="text-sm text-muted-foreground">Pattern recognition & suggestions</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {insights.map((insight, index) => (
          <div key={index} className="flex gap-3 items-start bg-card p-4 rounded-lg border shadow-sm">
            <div className="mt-0.5 text-primary">
              <Sparkles size={16} />
            </div>
            <p className="text-sm leading-relaxed font-medium">{insight}</p>
          </div>
        ))}
      </div>
      
      <button className="mt-4 flex items-center justify-center gap-2 w-full py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-md transition-colors">
        Generate New Insights <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}
