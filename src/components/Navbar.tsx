import { Terminal, Github } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path: string) => 
    `px-4 py-2 text-[13px] font-medium rounded-full transition-all duration-300 ${
      isActive(path) 
        ? 'text-white bg-white/[0.08]' 
        : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
    }`;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 xl:px-12 w-full bg-[#080808]/70 backdrop-blur-xl border-b border-white/[0.07] supports-[backdrop-filter]:bg-[#080808]/60">
      <div className="flex items-center gap-3">
         <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-300">
               <Terminal className="w-4 h-4" />
            </div>
            <span className="font-semibold text-white tracking-tight text-sm">Collab Code</span>
         </Link>
      </div>

      <div className="hidden md:flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] p-1.5 backdrop-blur-md">
        <Link to="/" className={navLinkClass('/')}>Product</Link>
        <Link to="/templates" className={navLinkClass('/templates')}>Templates</Link>
        <Link to="/compute" className={navLinkClass('/compute')}>Compute</Link>
        <Link to="/pricing" className={navLinkClass('/pricing')}>Pricing</Link>
        <Link to="/community" className={navLinkClass('/community')}>Community</Link>
        <Link to="/blog" className={navLinkClass('/blog')}>Blog</Link>
        <Link to="/about" className={navLinkClass('/about')}>Company</Link>
      </div>

      <div className="flex items-center gap-3">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hidden lg:flex w-9 h-9 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors">
           <Github className="w-4 h-4" />
        </a>
        <div className="hidden lg:block w-px h-4 bg-white/10 mx-1" />
        <Link to="/auth/login" className="px-4 py-2 text-[13px] font-medium text-gray-300 hover:text-white transition-colors">
          Log In
        </Link>
        <Link to="/auth/signup" className="bg-white text-black hover:bg-gray-200 rounded-full px-5 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
          Start for free
        </Link>
      </div>
    </nav>
  );
}
