import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Folder, Settings, Search, Bell, User, Server, Blocks, Plug, LogOut, Code2, Database, Globe, Activity, MoreHorizontal, Box, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { NotificationInbox } from '../components/NotificationInbox';

export const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Projects', path: '/dashboard/projects', icon: <Folder className="w-4 h-4" /> },
    { name: 'Activity', path: '/dashboard/activity', icon: <Clock className="w-4 h-4" /> },
    { name: 'Sandboxes', path: '/dashboard/sandboxes', icon: <Box className="w-4 h-4" /> },
    { name: 'Backend', path: '/dashboard/backend', icon: <Database className="w-4 h-4" /> },
    { name: 'Domains', path: '/dashboard/domains', icon: <Globe className="w-4 h-4" /> },
    { name: 'Usage', path: '/dashboard/usage', icon: <Activity className="w-4 h-4" /> },
    { name: 'Templates', path: '/dashboard/templates', icon: <Blocks className="w-4 h-4" /> },
    { name: 'Integrations', path: '/dashboard/integrations', icon: <Plug className="w-4 h-4" /> },
  ];

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  return (
    <>
      {/* Placeholder to reserve space in the layout */}
      <div className="w-[72px] shrink-0 hidden md:block"></div>
      
      {/* The actual sidebar that expands on hover */}
      <aside className="w-[72px] hover:w-64 border-r border-white/[0.08] flex flex-col bg-[#020202] shrink-0 fixed top-0 left-0 h-screen hidden md:flex transition-[width] duration-300 group z-50 overflow-hidden">
        <Link to="/" className="h-16 border-b border-white/[0.08] flex items-center px-5 gap-4 active:scale-95 transition-transform hover:opacity-80 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
             <div className="w-4 h-4 bg-black rounded-sm"></div>
          </div>
          <span className="font-semibold tracking-tight text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Collab Code</span>
        </Link>
        
        <div className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto overflow-x-hidden no-scrollbar">
          {navItems.map(item => {
            const isActive = item.path === '/dashboard' 
              ? location.pathname === '/dashboard'
              : location.pathname.startsWith(item.path);
            
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-4 mx-3 px-3 py-2.5 rounded-xl text-sm transition-colors shrink-0 ${isActive ? 'bg-white/[0.08] text-white font-medium' : 'text-[#888] hover:text-white hover:bg-white/[0.03]'}`}
              >
                <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                   {item.icon}
                </div>
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.name}</span>
              </Link>
            );
          })}
        </div>
        
        <div className="p-3 border-t border-white/[0.08] bg-[#020202] relative">
          <div 
             onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
             className="flex items-center justify-between gap-4 px-2 py-2 rounded-xl hover:bg-white/[0.05] cursor-pointer transition-colors border border-transparent hover:border-white/[0.05] relative w-full"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden border border-white/[0.1] shrink-0">
                 <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col min-w-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="text-sm font-medium text-white leading-tight truncate">{user?.email?.split('@')[0] || 'Developer'}</span>
                 <span className="text-[10px] text-gray-500 font-mono truncate">{user?.email || 'HOBBY'}</span>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Vercel-style Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute bottom-[110%] left-2 right-2 bg-[#0a0a0a] border border-white/[0.1] rounded-xl shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-100">
               <Link to="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/[0.05] hover:text-white transition-colors w-full text-left">
                 <Settings className="w-4 h-4" />
                 Account Settings
               </Link>
               <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full text-left">
                 <LogOut className="w-4 h-4" />
                 Log Out
               </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-[#000] text-white flex font-sans selection:bg-white/30">
      {/* Sidebar */}
      <DashboardSidebar />

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
