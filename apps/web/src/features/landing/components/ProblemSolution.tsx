import { motion } from 'framer-motion';

export function ProblemSolution() {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center py-32 px-6 overflow-hidden bg-[#090b11]">
      <div className="max-w-4xl mx-auto text-center space-y-24">
        
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-medium text-slate-500 tracking-tight leading-snug">
            Too many tasks.<br />
            Too little clarity.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent mx-auto mb-16"></div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Meet Momentum.
          </h2>
        </motion.div>

      </div>
    </section>
  );
}
