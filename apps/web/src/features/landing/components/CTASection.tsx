import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const dots = Array.from({ length: 150 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 1,
  duration: Math.random() * 15 + 15,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.5 + 0.1,
}));

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-40 px-6 flex flex-col items-center justify-center overflow-hidden bg-[#0f1117]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Floating Dots Particle Field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-white"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, (Math.random() - 0.5) * 50, 0],
              opacity: [dot.opacity, dot.opacity * 2, dot.opacity],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: "linear",
              delay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          Start moving. <br className="hidden md:block" /> Stay in flow.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-medium"
        >
          Free forever for individuals. Try Momentum today — no credit card required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 bg-purple-500 rounded-full blur-[40px] opacity-40"></div>
          <button 
            onClick={() => navigate('/register')} 
            className="relative px-10 py-5 text-lg font-semibold bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-full transition-transform hover:scale-105"
          >
            Get started free
          </button>
        </motion.div>
      </div>
    </section>
  );
}
