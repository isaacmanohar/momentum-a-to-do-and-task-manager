import { useEffect } from 'react';
import Lenis from 'lenis';
import { HeroSection } from './HeroSection';
import { ProblemSolution } from './ProblemSolution';
import { FeatureShowcase } from './FeatureShowcase';
import { FlowJourney } from './FlowJourney';
import { ProductPreview } from './ProductPreview';
import { CTASection } from './CTASection';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores';

export function LandingPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Commented out so you can preview the landing page while logged in!
    // if (isAuthenticated) {
    //   navigate('/app', { replace: true });
    // }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#090b11] text-slate-50 min-h-screen selection:bg-purple-500/30 font-sans overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full w-[95%] max-w-6xl shadow-2xl">
        <div className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-purple-500/20"></div>
          Momentum
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#product" className="hover:text-white transition-colors">Product</a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/login')} className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Log in
          </button>
          <button onClick={() => navigate('/register')} className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full hover:brightness-110 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            Get Started
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        <HeroSection />
        <ProblemSolution />
        <FeatureShowcase />
        <FlowJourney />
        <ProductPreview />
        <CTASection />
      </main>

      <footer className="relative z-10 border-t border-white/10 py-12 px-6 md:px-12 text-center text-slate-400 text-sm bg-black/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2026 Momentum. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Company</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
