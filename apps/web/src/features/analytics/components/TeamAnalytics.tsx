import { motion } from 'framer-motion';
import { Users, Crown } from 'lucide-react';

interface TeamAnalyticsProps {
  team: any[];
}

export function TeamAnalytics({ team }: TeamAnalyticsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.6 }}
      className="col-span-full rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users size={18} className="text-primary"/> Team Analytics
          </h3>
          <p className="text-sm text-muted-foreground">Workspace leaderboard & activity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Leaderboard</h4>
          {team.map((member, index) => (
            <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${member.name === 'You' ? 'bg-primary/5 border-primary/20' : 'bg-muted/20'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                  {member.avatar}
                </div>
                <span className={`font-medium ${member.name === 'You' ? 'text-primary' : ''}`}>
                  {member.name} {index === 0 && <Crown size={14} className="inline text-amber-500 ml-1 mb-0.5" />}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Score</p>
                  <p className="font-bold">{member.score}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Tasks</p>
                  <p className="font-bold">{member.completed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-muted/30 rounded-lg border p-6 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <h4 className="font-semibold text-lg mb-2">Team Activity Distribution</h4>
          <p className="text-sm text-muted-foreground mb-6">Visual representation of workspace contribution and project distribution across members.</p>
          <div className="w-full h-4 bg-secondary rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-500" style={{ width: '40%' }} title="Sarah: 40%"></div>
            <div className="h-full bg-emerald-500" style={{ width: '30%' }} title="You: 30%"></div>
            <div className="h-full bg-orange-500" style={{ width: '20%' }} title="Mike: 20%"></div>
            <div className="h-full bg-purple-500" style={{ width: '10%' }} title="Alex: 10%"></div>
          </div>
          <div className="flex gap-4 mt-4 text-xs font-medium justify-center w-full flex-wrap">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"/> Sarah</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"/> You</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"/> Mike</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"/> Alex</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
