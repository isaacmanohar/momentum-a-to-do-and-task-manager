import { motion } from 'framer-motion';
import { Briefcase, Calendar, Clock, CheckSquare } from 'lucide-react';

interface ProjectAnalyticsCardsProps {
  projects: any[];
}

export function ProjectAnalyticsCards({ projects }: ProjectAnalyticsCardsProps) {
  return (
    <div className="col-span-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Project Analytics</h3>
        <p className="text-sm text-muted-foreground">Detailed view of active projects</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className="rounded-xl border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Briefcase size={18} style={{ color: project.color }} />
              </div>
              <h4 className="font-semibold text-lg">{project.name}</h4>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <CheckSquare size={14} />
                    <span className="text-xs font-medium">Remaining</span>
                  </div>
                  <p className="font-semibold">{project.remaining} tasks</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar size={14} />
                    <span className="text-xs font-medium">Est. Finish</span>
                  </div>
                  <p className="font-semibold text-sm">{project.estCompletion}</p>
                </div>
                <div className="col-span-2 bg-muted/50 rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={14} />
                    <span className="text-xs font-medium">Time Spent</span>
                  </div>
                  <p className="font-semibold">{project.timeSpent}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
