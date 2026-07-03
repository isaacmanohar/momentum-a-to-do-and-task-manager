import { useState } from 'react';
import { useAuthStore } from '@/stores';
import api from '@/lib/api-client';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';

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
    <div className="relative flex min-h-screen items-center justify-center bg-black p-4 overflow-hidden font-sans">
      {/* Subtle background mesh gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-white/5 blur-[150px]"></div>
      </div>

      <div className="relative w-full max-w-[380px] space-y-8 z-10">
        <div className="text-center">
          <div className="mx-auto w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-6">
            <span className="text-black font-bold text-xl leading-none pt-0.5">M</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Log in to Momentum</h2>
          <p className="text-sm text-[#888]">
            Don't have an account?{' '}
            <Link to="/register" className="text-white hover:underline font-medium">
              Sign up.
            </Link>
          </p>
        </div>

        <div className="flex gap-3">
          <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#111] border border-[#333] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#222]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="currentColor" d="M12.0003 4.75C13.7703 4.75 15.3553 5.36 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86 8.87028 4.75 12.0003 4.75Z"></path><path fill="currentColor" d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"></path><path fill="currentColor" d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"></path><path fill="currentColor" d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"></path></svg>
            Google
          </button>
          <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#111] border border-[#333] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#222]">
            <Github size={16} />
            GitHub
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#333]"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-black px-2 text-[#888]">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#888]">Email</label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-[#333] bg-[#111] px-3 py-2 text-sm text-white placeholder:text-[#555] focus:border-[#555] focus:outline-none transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alan.turing@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#888]">Password</label>
              <input
                type="password"
                required
                className="w-full rounded-lg border border-[#333] bg-[#111] px-3 py-2 text-sm text-white placeholder:text-[#555] focus:border-[#555] focus:outline-none transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="flex w-full justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-all hover:bg-gray-200 focus-visible:outline-none disabled:opacity-30 disabled:bg-[#222] disabled:text-[#555] disabled:hover:bg-[#222] mt-6"
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-[11px] text-[#666]">
            By logging in, you agree to our <a href="#" className="underline hover:text-white transition-colors">Terms</a>, <a href="#" className="underline hover:text-white transition-colors">Acceptable Use</a>, and <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
