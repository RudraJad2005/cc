import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Gitlab } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleOAuthLogin = async (provider: 'github' | 'gitlab' | 'bitbucket') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) setError(error.message);
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      
      <div className="text-center mb-8">
         <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">Log in to Collab Code</h1>
         <p className="text-gray-400 text-sm">Welcome back! Please enter your details.</p>
      </div>

      <div className="w-full bg-[#050505] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl">
         
         {error && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
               {error}
            </div>
         )}

          <div className="flex flex-col gap-3 mb-6">
            <button onClick={() => handleOAuthLogin('github')} className="w-full flex items-center justify-center gap-3 bg-[#0A0A0A] hover:bg-[#111] border border-white/[0.1] hover:border-white/[0.2] transition-colors text-white py-2.5 rounded-lg text-sm font-medium">
               <Github className="w-4 h-4" />
               Continue with GitHub
            </button>
            <button onClick={() => handleOAuthLogin('gitlab')} className="w-full flex items-center justify-center gap-3 bg-[#0A0A0A] hover:bg-[#111] border border-white/[0.1] hover:border-white/[0.2] transition-colors text-white py-2.5 rounded-lg text-sm font-medium">
               <Gitlab className="w-4 h-4 text-[#FC6D26]" />
               Continue with GitLab
            </button>
            <button onClick={() => handleOAuthLogin('bitbucket')} className="w-full flex items-center justify-center gap-3 bg-[#0A0A0A] hover:bg-[#111] border border-white/[0.1] hover:border-white/[0.2] transition-colors text-white py-2.5 rounded-lg text-sm font-medium">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#0052CC]">
                  <path d="M.766 2.376A.925.925 0 000 3.253v17.494a.925.925 0 00.902.925h22.196a.925.925 0 00.902-.925V3.253a.925.925 0 00-.766-.877L.766 2.376zm3.344 14.394h15.78l-2.09-10.02H6.2l-2.09 10.02z"/>
               </svg>
               Continue with Bitbucket
            </button>
         </div>

         <div className="flex items-center gap-3 mb-6 text-gray-500 text-xs uppercase tracking-wider font-medium">
            <div className="flex-1 h-px bg-white/[0.08]"></div>
            or
            <div className="flex-1 h-px bg-white/[0.08]"></div>
         </div>

         <form className="flex flex-col gap-4" onSubmit={handleEmailLogin}>
            <div className="flex flex-col gap-1.5">
               <label htmlFor="email" className="text-sm text-gray-300 font-medium">Email Address</label>
               <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" 
                  required
                  className="w-full bg-[#020202] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/[0.3] transition-colors placeholder:text-[#444]"
               />
            </div>
            <div className="flex flex-col gap-1.5">
               <label htmlFor="password" className="text-sm text-gray-300 font-medium">Password</label>
               <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  className="w-full bg-[#020202] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/[0.3] transition-colors placeholder:text-[#444]"
               />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-white text-black py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors mt-2 shadow-[0_0_15px_rgba(255,255,255,0.1)] disabled:opacity-50">
               {loading ? 'Logging in...' : 'Continue with Email'}
            </button>
         </form>

      </div>

      <div className="mt-8 text-sm text-gray-400">
         Don't have an account? <Link to="/signup" className="text-white hover:underline font-medium">Sign Up</Link>
      </div>

    </div>
  );
}
