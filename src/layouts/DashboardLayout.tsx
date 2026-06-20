import { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Folder, Settings, Search, Bell, User, Server, Blocks, Plug, LogOut, Code2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { NotificationInbox } from '../components/NotificationInbox';

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Projects', path: '/dashboard/projects', icon: <Folder className="w-4 h-4" /> },
    { name: 'Sandboxes', path: '/dashboard/sandboxes', icon: <Code2 className="w-4 h-4" /> },
    { name: 'Templates', path: '/dashboard/templates', icon: <Blocks className="w-4 h-4" /> },
    { name: 'Integrations', path: '/dashboard/integrations', icon: <Plug className="w-4 h-4" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#000] text-white flex font-sans selection:bg-white/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/[0.08] flex flex-col bg-[#020202] shrink-0 sticky top-0 h-screen hidden md:flex">
        <Link to="/" className="p-6 border-b border-white/[0.08] flex items-center gap-3 active:scale-95 transition-transform hover:opacity-80">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
             <div className="w-4 h-4 bg-black rounded-sm"></div>
          </div>
          <span className="font-semibold tracking-tight text-white">Collab Code</span>
        </Link>
        
        <div className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto no-scrollbar">
          {navItems.map(item => {
            const isActive = item.path === '/dashboard' 
              ? location.pathname === '/dashboard'
              : location.pathname.startsWith(item.path);
            
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-white/[0.08] text-white font-medium' : 'text-[#888] hover:text-white hover:bg-white/[0.03]'}`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-white/[0.08] bg-[#020202]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/[0.03] cursor-pointer transition-colors border border-transparent hover:border-white/[0.05]">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden border border-white/[0.1] shrink-0">
                   <User className="w-4 h-4 text-white" />
                 </div>
                 <div className="flex flex-col min-w-0">
                   <span className="text-sm font-medium text-white leading-tight truncate">{user?.email?.split('@')[0] || 'Developer'}</span>
                   <span className="text-[10px] text-gray-500 font-mono truncate">{user?.email || 'HOBBY'}</span>
                 </div>
              </div>
            </div>
            <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full text-left">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#000]">
        <header className="h-16 border-b border-white/[0.08] flex items-center justify-between px-4 lg:px-10 bg-[#000] sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
             <div className="text-sm text-gray-500 font-medium">
                {user?.email?.split('@')[0] || 'Developer'} <span className="mx-2 text-gray-700">/</span> <span className="text-white">Dashboard</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors bg-[#050505] hover:bg-white/[0.05] border border-white/[0.1] rounded-md px-3 py-1.5 w-64">
               <Search className="w-4 h-4 text-gray-500" />
               <span className="flex-1 text-left">Search...</span>
               <div className="flex items-center gap-1">
                 <span className="text-[10px] font-mono border border-white/[0.2] rounded px-1 py-0.5 bg-black">Ctrl</span>
                 <span className="text-[10px] font-mono border border-white/[0.2] rounded px-1 py-0.5 bg-black">K</span>
               </div>
            </button>
            <NotificationInbox />
          </div>
        </header>

        {/* Mobile Nav Links (visible only on small screens) */}
        <div className="md:hidden flex items-center gap-4 px-4 h-12 border-b border-white/[0.05] overflow-x-auto no-scrollbar bg-[#020202]">
           {navItems.map(item => {
             const isActive = item.path === '/dashboard' 
               ? location.pathname === '/dashboard'
               : location.pathname.startsWith(item.path);
             
             return (
               <Link 
                 key={item.path} 
                 to={item.path}
                 className={`text-sm transition-colors whitespace-nowrap h-full flex items-center border-b-2 px-1 ${isActive ? 'text-white font-medium border-white' : 'text-[#888] hover:text-white border-transparent'}`}
               >
                 {item.name}
               </Link>
             );
           })}
        </div>

        <div className="flex-1 overflow-auto bg-[#000] p-4 lg:p-10">
          <div className="max-w-[1200px] mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
