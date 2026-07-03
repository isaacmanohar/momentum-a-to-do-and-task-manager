import { useState } from 'react';
import { useAuthStore } from '@/stores';
import api from '@/lib/api-client';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Github, Eye } from 'lucide-react';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await api.post('/auth/register', { name, email, password });
      login(res.data.user, res.data.tokens.accessToken, res.data.tokens.refreshToken);
      toast.success('Account created successfully!');
      navigate('/app');
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = name.trim() !== '' && email.trim() !== '' && password.trim() !== '';

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black p-4 font-sans selection:bg-white/30 text-white">
      {/* Background gradient image (simulated with CSS) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-white/[0.03] blur-[100px]"></div>
        <div className="absolute top-[40%] -right-[30%] w-[80%] h-[80%] rounded-full bg-white/[0.03] blur-[120px]"></div>
      </div>

      <div className="relative w-full max-w-[400px] z-10">
        <div className="text-center mb-10">
          <div className="mx-auto flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12V20H8V12L12 16L16 12V20H20V12L16 8L12 12L8 8L4 12Z" fill="white"/>
            </svg>
          </div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white mb-2">Create a Momentum account</h2>
          <p className="text-[14px] text-[#888]">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:underline font-medium transition-colors">
              Log in.
            </Link>
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <button type="button" className="flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-[#121212] border border-[#2a2a2a] px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#1a1a1a]">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true"><path fill="currentColor" d="M12.0003 4.75C13.7703 4.75 15.3553 5.36 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86 8.87028 4.75 12.0003 4.75Z"></path><path fill="currentColor" d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"></path><path fill="currentColor" d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"></path><path fill="currentColor" d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"></path></svg>
            Log in with Google
          </button>
          <button type="button" className="flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-[#121212] border border-[#2a2a2a] px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#1a1a1a]">
            <Github size={18} />
            Log in with GitHub
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2a2a2a]"></div>
          </div>
          <div className="relative flex justify-center text-[12px]">
            <span className="bg-black px-2 text-[#888]">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[13px] text-[#a1a1a1]">Name</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-[#2a2a2a] bg-[#121212] px-3 py-2.5 text-[14px] text-white placeholder:text-[#555] focus:border-[#555] focus:outline-none transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-[13px] text-[#a1a1a1]">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-lg border border-[#2a2a2a] bg-[#121212] px-3 py-2.5 text-[14px] text-white placeholder:text-[#555] focus:border-[#555] focus:outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-[13px] text-[#a1a1a1]">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                className="w-full rounded-lg border border-[#2a2a2a] bg-[#121212] px-3 py-2.5 text-[14px] text-white placeholder:text-[#555] focus:border-[#555] focus:outline-none transition-colors pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#888]">
                <Eye size={16} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="flex w-full justify-center rounded-lg bg-white px-4 py-2.5 text-[14px] font-medium text-black transition-all hover:bg-gray-200 focus-visible:outline-none disabled:opacity-100 disabled:bg-[#121212] disabled:text-[#444] disabled:cursor-not-allowed mt-8"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        
        <div className="text-center mt-8">
          <p className="text-[12px] text-[#888]">
            By signing up, you agree to our <a href="#" className="underline hover:text-[#a1a1a1] transition-colors">Terms</a>, <a href="#" className="underline hover:text-[#a1a1a1] transition-colors">Acceptable Use</a>, and <a href="#" className="underline hover:text-[#a1a1a1] transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
