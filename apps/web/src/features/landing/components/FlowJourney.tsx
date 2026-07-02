import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    num: "01",
    title: "Add a task",
    description: "Capture anything in seconds with quick-add and natural language dates.",
  },
  {
    num: "02",
    title: "Organize into projects",
    description: "Group work into pipelines, tags, and shared spaces that mirror how you think.",
  },
  {
    num: "03",
    title: "Set priority & deadline",
    description: "Let Momentum score urgency and impact, so the next best action is obvious.",
  },
  {
    num: "04",
    title: "Get reminded & complete",
    description: "Smart nudges, calendar sync, and satisfying done states — you ship, on time.",
  }
];

export function FlowJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate the path length for the line animation based on scroll progress
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how-it-works" className="relative w-full py-32 px-6 bg-[#090b11]">
      <div className="max-w-5xl mx-auto" ref={containerRef}>
        
        {/* Header Section */}
        <div className="mb-20">
          <p className="text-purple-500 font-semibold tracking-wider text-sm uppercase mb-4">
            How it works
          </p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-2xl leading-tight"
          >
            A flow that turns intention into done.
          </motion.h2>
        </div>

        <div className="relative flex">
          {/* Animated SVG Line Column */}
          <div className="w-16 md:w-32 flex-shrink-0 relative hidden sm:block">
            <svg 
              className="absolute left-0 top-0 h-full w-full" 
              viewBox="0 0 100 800" 
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Faint background path */}
              <path
                d="M 50 0 C 100 200, 0 400, 50 600 C 100 800, 50 800, 50 800"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="2"
              />
              {/* Animated foreground path */}
              <motion.path
                d="M 50 0 C 100 200, 0 400, 50 600 C 100 800, 50 800, 50 800"
                stroke="#a855f7"
                strokeWidth="2"
                style={{ pathLength }}
              />
            </svg>
          </div>

          {/* Cards Column */}
          <div className="flex-1 space-y-6">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="w-full p-8 md:p-10 rounded-[2rem] bg-[#12141a] border border-white/5 flex gap-6 md:gap-8 items-start"
              >
                <div className="text-4xl md:text-5xl font-bold text-purple-400 opacity-80 mt-1">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
