import { Outlet, Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function MarketplaceLayout() {
  const location = useLocation();
  const { user } = useAuth();
  
  const categories = [
    'AI Agents & Services', 'AI', 'Analytics', 'Authentication', 
    'CMS', 'Commerce', 'Database', 'DevTools', 'Experimentation', 
    'Flags', 'Logging', 'Messaging', 'Monitoring', 'Observability', 
    'Payments', 'Productivity', 'Searching'
  ];

  return (
    <div className="min-h-screen bg-[#000] text-[#a1a1aa] flex font-sans selection:bg-white/30">
      
      {/* Marketplace Sidebar */}
      <aside className="w-[280px] border-r border-white/[0.08] flex flex-col bg-[#020202] shrink-0 sticky top-0 h-screen hidden md:flex">
        
        {/* Top Branding / Breadcrumb */}
        <div className="p-4 border-b border-white/[0.08] flex items-center gap-3">
           <Link to="/dashboard" className="flex items-center gap-2 hover:bg-white/[0.05] p-1.5 rounded-md transition-colors text-sm text-gray-300">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shrink-0"></div>
              {user?.email?.split('@')[0] || 'User'}'s...
           </Link>
        </div>

        {/* Search */}
        <div className="p-4">
           <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Find..." className="w-full bg-[#050505] border border-white/[0.1] rounded pl-9 pr-2 py-1.5 text-xs text-white focus:outline-none focus:border-white/[0.3] placeholder:text-[#666]" />
           </div>
        </div>

        {/* Back to Integrations */}
        <div className="px-2">
           <Link to="/dashboard/integrations" className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors">
              <ChevronLeft className="w-4 h-4" /> Integrations
           </Link>
        </div>

        <div className="flex-1 py-4 px-2 overflow-y-auto no-scrollbar flex flex-col gap-6">
           
           {/* Types */}
           <div className="flex flex-col gap-0.5">
              <Link to="#" className="px-3 py-1.5 rounded-md text-[13px] bg-white/[0.08] text-white font-medium flex items-center gap-2">
                 <div className="w-3.5 h-3.5 border border-white/[0.2] grid place-items-center rounded-sm grid-cols-2 grid-rows-2 gap-[1px] p-[1px]"><div className="bg-white rounded-[1px]"></div><div className="bg-white rounded-[1px]"></div><div className="bg-white rounded-[1px]"></div><div className="bg-white rounded-[1px]"></div></div>
                 Any Type
              </Link>
              <Link to="#" className="px-3 py-1.5 rounded-md text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors">Native</Link>
              <Link to="#" className="px-3 py-1.5 rounded-md text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors">External</Link>
              <Link to="#" className="px-3 py-1.5 rounded-md text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors">Recently Added</Link>
           </div>

           {/* Categories */}
           <div className="flex flex-col gap-0.5">
              <Link to="#" className="px-3 py-1.5 rounded-md text-[13px] text-white font-medium flex items-center gap-2">
                 <div className="w-3.5 h-3.5 border border-white/[0.2] flex flex-col gap-[2px] p-[2px] rounded-sm"><div className="h-px bg-white"></div><div className="h-px bg-white w-2/3"></div><div className="h-px bg-white w-1/2"></div></div>
                 Any Category
              </Link>
              {categories.map((cat, i) => (
                 <Link key={i} to="#" className="px-3 py-1.5 rounded-md text-[13px] text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center justify-between">
                    {cat}
                    {(cat === 'Authentication' || cat === 'Commerce') && <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded-[4px] text-[9px] font-medium leading-none">1 New</span>}
                 </Link>
              ))}
           </div>

        </div>
        
        {/* Bottom Profile */}
        <div className="p-4 border-t border-white/[0.08] bg-[#020202]">
          <Link to="/dashboard" className="flex items-center gap-3 hover:bg-white/[0.05] p-2 rounded-md transition-colors text-sm">
             <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shrink-0"></div>
             {user?.email?.split('@')[0] || 'User'}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#000]">
        
        {/* Header */}
        <header className="h-14 border-b border-white/[0.08] flex items-center px-4 lg:px-8 bg-[#000] sticky top-0 z-10 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
             <Link to="/dashboard/integrations" className="hover:text-white transition-colors">Integrations</Link>
             <span className="text-gray-600">/</span>
             <span className="text-white">Marketplace</span>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="flex-1 overflow-auto bg-[#000] p-4 lg:p-8">
          <div className="max-w-[1000px] mx-auto w-full">
            <Outlet />
          </div>
        </div>

      </main>
    </div>
  );
}
