import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  let gradientColors = "rgba(162,178,255,0.9) 48%, rgba(215,202,255,0.9) 52%"; // Default (Integrations)
  if (location.pathname === '/') {
     gradientColors = "rgba(79,70,229,0.9) 48%, rgba(6,182,212,0.9) 52%"; // Indigo & Neon Cyan
  } else if (location.pathname === '/features') {
     gradientColors = "rgba(34,211,238,0.9) 48%, rgba(196,181,253,0.9) 52%"; // Cyan & Soft Purple
  } else if (location.pathname === '/templates') {
     gradientColors = "rgba(242,110,79,0.9) 48%, rgba(214,255,0,0.9) 52%"; // Orange & Neon Green
  } else if (location.pathname === '/community') {
     gradientColors = "rgba(236,72,153,0.9) 48%, rgba(251,191,36,0.9) 52%"; // Pink & Amber
  } else if (location.pathname === '/enterprise') {
     gradientColors = "rgba(79,70,229,0.9) 48%, rgba(37,99,235,0.9) 52%"; // Indigo & Blue
  } else if (location.pathname === '/startup') {
     gradientColors = "rgba(234,88,12,0.9) 48%, rgba(6,182,212,0.9) 52%"; // Orange & Cyan
  } else if (location.pathname === '/customers') {
     gradientColors = "rgba(16,185,129,0.9) 48%, rgba(124,58,237,0.9) 52%"; // Emerald & Purple
  } else if (location.pathname === '/oss') {
     gradientColors = "rgba(20,184,166,0.9) 48%, rgba(217,70,239,0.9) 52%"; // Teal & Fuchsia
  } else if (location.pathname === '/cicd') {
     gradientColors = "rgba(59,130,246,0.9) 48%, rgba(236,72,153,0.9) 52%"; // Blue & Pink
  } else if (location.pathname === '/events') {
     gradientColors = "rgba(245,158,11,0.9) 48%, rgba(239,68,68,0.9) 52%"; // Amber & Red
  } else if (location.pathname === '/storage-sdk') {
     gradientColors = "rgba(168,85,247,0.9) 48%, rgba(59,130,246,0.9) 52%"; // Purple & Blue
  } else if (location.pathname === '/ai') {
     gradientColors = "rgba(255,255,255,0.9) 48%, rgba(100,100,100,0.9) 52%"; // White & Gray
  } else if (location.pathname === '/observability') {
     gradientColors = "rgba(34,197,94,0.9) 48%, rgba(16,185,129,0.9) 52%"; // Emerald & Green
  } else if (location.pathname === '/docs') {
     gradientColors = "rgba(251,191,36,0.9) 48%, rgba(245,158,11,0.9) 52%"; // Gold & Amber
  }


  return (
    <footer ref={containerRef} className="w-full relative overflow-hidden bg-[#050505] border-t border-white/[0.1] font-sans">
      <div className="w-full relative">
         
         <div className="p-8 md:p-12 lg:p-20 xl:p-24 flex flex-col lg:flex-row justify-between gap-16 relative z-10 w-full">
            
            {/* Left side: Branding */}
            <div className="flex flex-col max-w-sm lg:w-1/3">
               <Link to="/" className="inline-block mb-8 w-fit">
               <div className="w-[32px] h-[32px] rounded-full border-2 border-transparent bg-white flex items-center justify-center overflow-hidden relative hover:scale-110 transition-transform" style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'}}>
                  <div className="absolute inset-x-0 bottom-0 top-[15%] bg-[#111] rounded-t-full rounded-b-full scale-[1.1] origin-top border-t-2 border-white/20"></div>
                  <div className="absolute inset-x-0 bottom-0 top-[35%] bg-[#111] rounded-t-full rounded-b-full scale-[1.1] origin-top border-t-2 border-white/20"></div>
                  <div className="absolute inset-x-0 bottom-0 top-[55%] bg-[#111] rounded-t-full rounded-b-full scale-[1.1] origin-top border-t-2 border-white/20"></div>
                  <div className="absolute inset-x-0 bottom-0 top-[75%] bg-[#111] rounded-t-full rounded-b-full scale-[1.1] origin-top border-t-2 border-white/20"></div>
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,1)]"></div>
               </div>
               </Link>
               <p className="text-[#888] text-[15px] leading-relaxed mb-8">Deploy AI at the speed of frontend. The next-generation collaborative IDE for the modern web.</p>
               <div className="flex items-center gap-6 text-[#888] text-[14px] font-medium">
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="hover:text-white transition-colors">GitHub</a>
                  <a href="#" className="hover:text-white transition-colors">Discord</a>
               </div>
            </div>
            
            {/* Right side: Strict Grid Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12 lg:w-2/3 lg:justify-items-end">
               <div className="flex flex-col gap-6">
                  <h5 className="text-white font-semibold text-[14px]">Product</h5>
                  <div className="flex flex-col gap-4 text-[#888] text-[14px]">
                     <Link to="/features" className="hover:text-white transition-colors">Features</Link>
                     <Link to="/templates" className="hover:text-white transition-colors">Templates</Link>
                     <Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link>
                     <Link to="/cicd" className="hover:text-white transition-colors">CI/CD</Link>
                     <Link to="/ai" className="hover:text-white transition-colors text-white font-medium flex items-center gap-1">AI <span className="bg-white/10 px-1.5 rounded text-[10px] uppercase font-bold text-white">New</span></Link>
                     <Link to="/observability" className="hover:text-white transition-colors text-white font-medium flex items-center gap-1">Observability <span className="bg-green-500/10 border border-green-500/20 px-1.5 rounded text-[10px] uppercase font-bold text-green-400">Beta</span></Link>
                     <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                     <Link to="/changelog" className="hover:text-white transition-colors">Changelog</Link>
                     <Link to="/security" className="hover:text-white transition-colors">Security</Link>
                  </div>
               </div>
               
               <div className="flex flex-col gap-6">
                  <h5 className="text-white font-semibold text-[14px]">Company</h5>
                  <div className="flex flex-col gap-4 text-[#888] text-[14px]">
                     <Link to="/about" className="hover:text-white transition-colors">About</Link>
                     <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                     <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
                     <Link to="/customers" className="hover:text-white transition-colors">Customers</Link>
                     <Link to="/events" className="hover:text-white transition-colors">Events</Link>
                  </div>
               </div>
               
               <div className="flex flex-col gap-6">
                  <h5 className="text-white font-semibold text-[14px]">Resources</h5>
                  <div className="flex flex-col gap-4 text-[#888] text-[14px]">
                     <Link to="/community" className="hover:text-white transition-colors">Community</Link>
                     <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                     <Link to="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
                     <Link to="/startup" className="hover:text-white transition-colors">Startup</Link>
                     <Link to="/dpa" className="hover:text-white transition-colors">DPA</Link>
                     <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  </div>
               </div>
               
               <div className="flex flex-col gap-6">
                  <h5 className="text-white font-semibold text-[14px]">Developers</h5>
                  <div className="flex flex-col gap-4 text-[#888] text-[14px]">
                     <Link to="/docs" className="hover:text-white transition-colors">Documentation</Link>
                     <Link to="/oss" className="hover:text-white transition-colors">Open Source</Link>
                     <Link to="/sdk" className="hover:text-white transition-colors">SDKs</Link>
                     <Link to="/storage-sdk" className="hover:text-white transition-colors">Storage SDK</Link>
                  </div>
               </div>
            </div>
         </div>
         
         {/* Massive Background Typography Watermark with LangChain-style Outline Shine */}
         <div className="relative w-full h-[120px] md:h-[180px] lg:h-[220px] overflow-hidden pointer-events-none flex items-end justify-center pb-8 lg:pb-16">
            
            {/* Outline base (LangChain style) */}
            <div 
               className="absolute text-[13vw] font-bold tracking-tighter leading-none select-none translate-y-[20%] w-full text-center flex justify-center"
               style={{ 
                  WebkitTextStroke: "2px rgba(255,255,255,0.1)",
                  color: "transparent",
               }}
            >
               CollabCode
            </div>

            {/* Shine overlay (infinite loop) */}
            <div 
               className="absolute text-[13vw] font-bold tracking-tighter leading-none select-none translate-y-[20%] w-full text-center flex justify-center animate-[shine_5s_linear_infinite]"
               style={{ 
                  color: "transparent",
                  backgroundImage: `linear-gradient(110deg, transparent 40%, ${gradientColors}, transparent 60%)`,
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextStroke: "2px transparent",
               }}
            >
               CollabCode
            </div>
            
            <style>{`
               @keyframes shine {
                  0% { background-position: 200% center; }
                  100% { background-position: -200% center; }
               }
            `}</style>
         </div>

      </div>
    </footer>
  );
}
