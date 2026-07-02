import { motion } from 'framer-motion';

export function ProductPreview() {
  return (
    <section id="product" className="relative w-full py-32 px-6 bg-[#090b11] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            See Momentum in motion.
          </motion.h2>
          <p className="text-xl text-slate-400">
            A workspace that gets out of your way.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-video md:aspect-[16/9] rounded-2xl md:rounded-[2.5rem] bg-white/5 border border-white/10 p-2 md:p-4 overflow-hidden shadow-2xl shadow-purple-500/10"
        >
          {/* Inner Dashboard Mockup Frame */}
          <div className="w-full h-full bg-[#0a0c14] rounded-xl md:rounded-[1.5rem] border border-white/5 overflow-hidden flex flex-col relative">
            {/* Mockup Header */}
            <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              </div>
              <div className="h-6 w-48 bg-white/5 rounded-md"></div>
            </div>
            
            {/* Mockup Content Layout */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-48 border-r border-white/5 p-4 hidden sm:block bg-white/[0.01]">
                <div className="space-y-3">
                  <div className="h-6 w-full bg-white/5 rounded-md"></div>
                  <div className="h-6 w-3/4 bg-white/5 rounded-md"></div>
                  <div className="h-6 w-5/6 bg-white/5 rounded-md"></div>
                </div>
                <div className="mt-8 space-y-3">
                  <div className="h-4 w-1/2 bg-white/5 rounded-md mb-2"></div>
                  <div className="h-6 w-full bg-white/5 rounded-md"></div>
                  <div className="h-6 w-3/4 bg-purple-500/20 border border-purple-500/30 rounded-md"></div>
                  <div className="h-6 w-full bg-white/5 rounded-md"></div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-4 md:p-8 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="h-8 w-48 bg-white/10 rounded-lg"></div>
                  <div className="h-8 w-24 bg-purple-500/30 rounded-lg"></div>
                </div>

                {/* Kanban Board Mockup */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Column 1 */}
                  <div className="bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                    <div className="h-5 w-20 bg-white/10 rounded-md mb-2"></div>
                    <div className="h-24 w-full bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col justify-between">
                      <div className="h-4 w-3/4 bg-white/10 rounded-sm"></div>
                      <div className="h-6 w-16 bg-purple-500/20 rounded-full"></div>
                    </div>
                    <div className="h-24 w-full bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col justify-between">
                      <div className="h-4 w-full bg-white/10 rounded-sm"></div>
                      <div className="h-6 w-20 bg-purple-500/20 rounded-full"></div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col gap-3 hidden sm:flex">
                    <div className="h-5 w-24 bg-white/10 rounded-md mb-2"></div>
                    <div className="h-24 w-full bg-white/5 rounded-lg border border-purple-500/20 p-3 flex flex-col justify-between shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                      <div className="h-4 w-5/6 bg-white/10 rounded-sm"></div>
                      <div className="h-6 w-16 bg-purple-500/20 rounded-full"></div>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col gap-3 hidden md:flex">
                    <div className="h-5 w-16 bg-white/10 rounded-md mb-2"></div>
                    <div className="h-24 w-full bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col justify-between opacity-50">
                      <div className="h-4 w-2/3 bg-white/10 rounded-sm"></div>
                      <div className="h-6 w-12 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rounded-[1.5rem]"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
