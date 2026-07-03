import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface AchievementGalleryProps {
  achievements: any[];
}

export function AchievementGallery({ achievements }: AchievementGalleryProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="col-span-full rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Achievement Gallery</h3>
        <p className="text-sm text-muted-foreground">Badges unlocked and progress</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {achievements.map((ach, index) => (
          <motion.div
            key={ach.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3 + index * 0.1 }}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${ach.unlocked ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 hover:scale-105 hover:shadow-md border-amber-500/30' : 'bg-muted/50 grayscale opacity-60'}`}
          >
            <div className="text-4xl mb-2 filter drop-shadow-sm">{ach.icon}</div>
            <h4 className="text-xs font-bold leading-tight">{ach.title}</h4>
            
            {ach.unlocked ? (
              <p className="text-[10px] text-muted-foreground mt-2 font-medium">{ach.date}</p>
            ) : (
              <div className="absolute top-2 right-2 text-muted-foreground">
                <Lock size={12} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
