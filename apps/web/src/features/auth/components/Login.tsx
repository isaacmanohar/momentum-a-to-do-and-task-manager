import { useState } from 'react';
import { useAuthStore } from '@/stores';
import api from '@/lib/api-client';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Github, Eye } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('demo@lifeos.app');
  const [password, setPassword] = useState('Password123');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.tokens.accessToken, res.data.tokens.refreshToken);
      toast.success('Logged in successfully!');
      navigate('/app');
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#000000] p-4 md:p-8 font-sans selection:bg-white/20 text-white overflow-hidden">
      {/* Abstract Gradient Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top Right Blob */}
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[600px] rounded-[100%] bg-white/10 blur-[180px] opacity-25 rotate-12 transform-gpu"></div>
        {/* Bottom Left Blob */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[700px] h-[500px] rounded-[100%] bg-[#555555] blur-[180px] opacity-20 -rotate-12 transform-gpu"></div>
      </div>

      <div className="relative w-full max-w-[520px] z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="flex flex-col items-center text-center mb-12">
          {/* Logo */}
          <div className="w-12 h-12 rounded-[16px] bg-[#090909] border border-[#202020] flex items-center justify-center mb-10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12V20H8V12L12 16L16 12V20H20V12L16 8L12 12L8 8L4 12Z" fill="white"/>
            </svg>
          </div>
          
          <h2 className="text-[34px] md:text-[40px] lg:text-[48px] font-bold tracking-[-0.02em] text-white leading-[1.1] mb-4">
            Log in to Momentum
          </h2>
          <p className="text-[15px] text-[#9f9f9f]">
            Don't have an account?{' '}
            <Link to="/register" className="text-white font-semibold hover:underline transition-colors">
              Sign up.
            </Link>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <button type="button" className="flex flex-1 items-center justify-center gap-3 rounded-[16px] bg-[#111111] border border-[#292929] px-4 h-[54px] text-[15px] font-medium text-white transition-all duration-200 hover:bg-[#171717] hover:-translate-y-[1px] active:scale-[0.98]">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true"><path fill="currentColor" d="M12.0003 4.75C13.7703 4.75 15.3553 5.36 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86 8.87028 4.75 12.0003 4.75Z"></path><path fill="currentColor" d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"></path><path fill="currentColor" d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"></path><path fill="currentColor" d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"></path></svg>
            Log in with Google
          </button>
          <button type="button" className="flex flex-1 items-center justify-center gap-3 rounded-[16px] bg-[#111111] border border-[#292929] px-4 h-[54px] text-[15px] font-medium text-white transition-all duration-200 hover:bg-[#171717] hover:-translate-y-[1px] active:scale-[0.98]">
            <Github size={18} />
            Log in with GitHub
          </button>
        </div>

        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#242424]"></div>
          </div>
          <div className="relative flex justify-center text-[13px]">
            <span className="bg-[#000000] px-4 text-[#6d6d6d]">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[13px] font-medium text-[#787878] pl-1">Email</label>
            <input
              type="text"
              required
              className="w-full h-[56px] rounded-[16px] border border-[#2b2b2b] bg-[#111111] px-5 text-[15px] text-white placeholder:text-[#666] focus:border-[#666] focus:outline-none focus:ring-1 focus:ring-white/10 transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alan.turing@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[13px] font-medium text-[#787878] pl-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                className="w-full h-[56px] rounded-[16px] border border-[#2b2b2b] bg-[#111111] px-5 text-[15px] text-white placeholder:text-[#666] focus:border-[#666] focus:outline-none focus:ring-1 focus:ring-white/10 transition-all duration-200 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200">
                <Eye size={18} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="flex w-full justify-center items-center h-[56px] rounded-[16px] bg-[#191919] border border-[#2a2a2a] text-[15px] font-semibold text-white transition-all duration-200 hover:bg-[#222222] hover:-translate-y-[1px] active:scale-[0.98] focus-visible:outline-none disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-[#191919] disabled:hover:-translate-y-0 disabled:active:scale-100 mt-10"
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        
        <div className="text-center mt-12">
          <p className="text-[12px] text-[#787878] leading-relaxed">
            By logging in, you agree to our <br className="sm:hidden" />
            <a href="#" className="text-white hover:underline transition-colors mx-1">Terms</a>, 
            <a href="#" className="text-white hover:underline transition-colors mx-1">Acceptable Use</a>, and 
            <a href="#" className="text-white hover:underline transition-colors mx-1">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
