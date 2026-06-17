import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Folder, Settings, Search, Bell, User } from 'lucide-react';

export function DashboardLayout() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Projects', path: '/dashboard/projects', icon: <Folder className="w-4 h-4" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#000] text-white flex font-sans selection:bg-white/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/[0.08] flex flex-col bg-[#020202]">
        <Link to="/" className="p-6 border-b border-white/[0.08] flex items-center gap-3 active:scale-95 transition-transform hover:opacity-80">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="black" className="w-5 h-5"><path d="M12 2L2 22h20L12 2z"/></svg>
          </div>
          <span className="font-semibold tracking-tight text-white">Collab Code</span>
        </Link>
        
        <div className="flex-1 py-6 px-3 flex flex-col gap-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-white/[0.08] text-white font-medium' : 'text-[#888] hover:text-white hover:bg-white/[0.03]'}`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.03] cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/[0.1] flex items-center justify-center overflow-hidden border border-white/[0.1]">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Alex Rivera</span>
              <span className="text-xs text-[#888]">Personal Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/[0.08] flex items-center justify-between px-6 bg-[#020202]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
              <input 
                type="text" 
                placeholder="Search projects or deployments..." 
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-white/[0.2] transition-colors placeholder:text-[#666]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#888] hover:text-white transition-colors relative p-2 rounded-md hover:bg-white/[0.05]">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#000]" />
            </button>
            <Link to="/" className="text-xs px-3 py-1.5 rounded-full border border-white/[0.08] hover:bg-white/[0.05] transition-colors text-[#888] hover:text-white font-medium">
              Exit Studio
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-[#000]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
