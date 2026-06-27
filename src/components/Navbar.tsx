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
  Sparkles,
  Menu,
  X
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

// Mobile accordion section
function MobileAccordion({ title, children, onLinkClick }: { title: string, children: React.ReactNode, onLinkClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-white/[0.08]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-6 py-4 text-[15px] font-medium text-white"
      >
        {title}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4" onClick={onLinkClick}>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 xl:px-12 w-full bg-black/70 backdrop-blur-xl border-b border-white/[0.07] supports-[backdrop-filter]:bg-black/60">
        <div className="flex items-center gap-3">
           <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-300">
                 <Terminal className="w-4 h-4" />
              </div>
              <span className="font-semibold text-white tracking-tight text-sm">Collab Code</span>
           </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center rounded-full border border-white/[0.08] bg-white/[0.02] p-1.5 backdrop-blur-md">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hidden xl:flex w-9 h-9 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors">
             <Github className="w-4 h-4" />
          </a>
          <div className="hidden xl:block w-px h-4 bg-white/10 mx-1" />
          <Link to="/login" className="hidden sm:block px-4 py-2 text-[13px] font-medium text-gray-300 hover:text-white transition-colors">
            Log In
          </Link>
          <Link to="/signup" className="bg-white text-black hover:bg-gray-200 rounded-full px-4 sm:px-5 py-2 text-[12px] sm:text-[13px] font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
            Start for free
          </Link>
          
          {/* Hamburger Button (Mobile/Tablet) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
              onClick={closeMobile}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-[#0a0a0a] border-l border-white/[0.08] z-[70] lg:hidden flex flex-col overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
                <Link to="/" onClick={closeMobile} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                     <Terminal className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold text-white tracking-tight text-sm">Collab Code</span>
                </Link>
                <button onClick={closeMobile} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1">
                <Link to="/" onClick={closeMobile} className="block px-6 py-4 text-[15px] font-medium text-white border-b border-white/[0.08] hover:bg-white/[0.03] transition-colors">
                  Home
                </Link>

                <MobileAccordion title="Product" onLinkClick={closeMobile}>
                  <DropdownLink to="/features" icon={Sparkles} title="Features" desc="Explore everything you can build." onClick={closeMobile} />
                  <DropdownLink to="/compute" icon={Cpu} title="Compute" desc="Serverless execution at the edge." onClick={closeMobile} />
                  <DropdownLink to="/integrations" icon={Boxes} title="Integrations" desc="Connect with your favorite tools." onClick={closeMobile} />
                </MobileAccordion>

                <MobileAccordion title="Resources" onLinkClick={closeMobile}>
                  <DropdownLink to="/templates" icon={LayoutTemplate} title="Templates" desc="Jumpstart your next project." onClick={closeMobile} />
                  <DropdownLink to="/community" icon={Users} title="Community" desc="Join 42,000+ developers." onClick={closeMobile} />
                  <DropdownLink to="/blog" icon={FileText} title="Blog" desc="Latest news and tutorials." onClick={closeMobile} />
                </MobileAccordion>

                <MobileAccordion title="Company" onLinkClick={closeMobile}>
                  <DropdownLink to="/about" icon={Info} title="About Us" desc="Our mission and the team." onClick={closeMobile} />
                  <DropdownLink to="/pricing" icon={CircleDollarSign} title="Pricing" desc="Simple, transparent plans." onClick={closeMobile} />
                </MobileAccordion>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-white/[0.08] flex flex-col gap-3">
                <Link to="/login" onClick={closeMobile} className="w-full py-3 text-center text-[14px] font-medium text-white border border-white/[0.15] rounded-full hover:bg-white/[0.05] transition-colors">
                  Log In
                </Link>
                <Link to="/signup" onClick={closeMobile} className="w-full py-3 text-center text-[14px] font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-colors">
                  Start for free
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
