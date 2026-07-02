import { motion } from 'framer-motion';
import { Brain, LayoutGrid, BellRing, Users } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-6 h-6 text-purple-400" />,
    title: "Smart prioritization",
    description: "Our AI-driven engine automatically surfaces what matters most, so you always know what to work on next."
  },
  {
    icon: <LayoutGrid className="w-6 h-6 text-purple-400" />,
    title: "Visual kanban",
    description: "Drag and drop your tasks across stages. Keep your entire project flow organized and instantly readable."
  },
  {
    icon: <BellRing className="w-6 h-6 text-purple-400" />,
    title: "Deadline reminders",
    description: "Set it and forget it. Momentum ensures you never miss a critical deadline with smart, timely notifications."
  },
  {
    icon: <Users className="w-6 h-6 text-purple-400" />,
    title: "Team collaboration",
    description: "Assign tasks, share context, and move projects forward together without leaving your workspace."
  }
];

export function FeatureShowcase() {
  return (
    <section id="features" className="relative w-full py-32 px-6 bg-[#090b11]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Everything you need. <br />
            <span className="text-slate-500">Nothing you don't.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-purple-500/30 transition-all duration-500"
            >
              <div className="h-full bg-[#0a0c14] rounded-[22px] p-8 md:p-12 border border-white/5 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-all duration-500" />
                
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner">
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
