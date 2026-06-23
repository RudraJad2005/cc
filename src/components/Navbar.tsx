import { useState } from 'react';
import { 
  Terminal, 
  Github, 
  ChevronDown, 
  LayoutTemplate, 
  Cpu, 
  Boxes, 
  Users, 
  FileText, 
  Info, 
  CircleDollarSign,
  Sparkles
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function DropdownLink({ to, icon: Icon, title, desc, onClick }: { to: string, icon: any, title: string, desc: string, onClick?: () => void }) {
  return (
    <Link to={to} onClick={onClick} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.04] transition-colors group">
       <div className="w-8 h-8 rounded-md bg-white/[0.05] border border-white/[0.05] flex items-center justify-center shrink-0 group-hover:bg-white/[0.1] transition-colors">
          <Icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
       </div>
       <div>
          <div className="text-[14px] font-medium text-white mb-0.5">{title}</div>
          <div className="text-[12px] text-gray-400 leading-snug">{desc}</div>
       </div>
    </Link>
  );
}

function NavItem({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium rounded-full text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-300">
        {title}
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
             initial={{ opacity: 0, y: 10, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 10, scale: 0.95 }}
             transition={{ duration: 0.2, ease: 'easeOut' }}
             className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[320px]"
          >
             {/* The invisible bridge pad to prevent hover loss */}
             <div className="absolute top-0 left-0 w-full h-4" />
             <div className="bg-[#050505] border border-white/[0.1] rounded-xl p-2 shadow-2xl backdrop-blur-xl">
               {children}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 xl:px-12 w-full bg-black/70 backdrop-blur-xl border-b border-white/[0.07] supports-[backdrop-filter]:bg-black/60">
      <div className="flex items-center gap-3">
         <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-300">
               <Terminal className="w-4 h-4" />
            </div>
            <span className="font-semibold text-white tracking-tight text-sm">Collab Code</span>
         </Link>
      </div>

      <div className="hidden md:flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] p-1.5 backdrop-blur-md">
        <Link to="/" className={navLinkClass('/')}>Home</Link>
        
        <NavItem title="Product">
          <div className="flex flex-col gap-1">
             <DropdownLink to="/features" icon={Sparkles} title="Features" desc="Explore everything you can build." />
             <DropdownLink to="/compute" icon={Cpu} title="Compute" desc="Serverless execution at the edge." />
             <DropdownLink to="/integrations" icon={Boxes} title="Integrations" desc="Connect with your favorite tools." />
          </div>
        </NavItem>

        <NavItem title="Resources">
          <div className="flex flex-col gap-1">
             <DropdownLink to="/templates" icon={LayoutTemplate} title="Templates" desc="Jumpstart your next project." />
             <DropdownLink to="/community" icon={Users} title="Community" desc="Join 42,000+ developers." />
             <DropdownLink to="/blog" icon={FileText} title="Blog" desc="Latest news and tutorials." />
          </div>
        </NavItem>

        <NavItem title="Company">
          <div className="flex flex-col gap-1">
             <DropdownLink to="/about" icon={Info} title="About Us" desc="Our mission and the team." />
             <DropdownLink to="/pricing" icon={CircleDollarSign} title="Pricing" desc="Simple, transparent plans." />
          </div>
        </NavItem>
      </div>

      <div className="flex items-center gap-3">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hidden lg:flex w-9 h-9 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors">
           <Github className="w-4 h-4" />
        </a>
        <div className="hidden lg:block w-px h-4 bg-white/10 mx-1" />
        <Link to="/login" className="px-4 py-2 text-[13px] font-medium text-gray-300 hover:text-white transition-colors">
          Log In
        </Link>
        <Link to="/signup" className="bg-white text-black hover:bg-gray-200 rounded-full px-5 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
          Start for free
        </Link>
      </div>
    </nav>
  );
}
