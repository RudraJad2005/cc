import { Outlet, Link, useLocation, useParams } from 'react-router-dom';
import { 
  LayoutDashboard, Server, FileText, BarChart3, Activity, 
  ShieldAlert, ShieldCheck, Globe, Database, Plug, 
  HardDrive, Flag, Bot, Cpu, Box, Workflow, 
  PieChart, LifeBuoy, Settings, ChevronRight, ChevronDown, Github, Search, Code2, Key, Users
} from 'lucide-react';
import { NotificationInbox } from '../components/NotificationInbox';
import { DashboardSidebar } from './DashboardLayout';

export function ProjectLayout() {
  const { projectId } = useParams();
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: `/dashboard/projects/${projectId}`, exact: true, icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Native IDE', path: `/dashboard/projects/${projectId}/editor`, icon: <Code2 className="w-4 h-4" /> },
    { type: 'divider' },
    { name: 'Deployments', path: `/dashboard/projects/${projectId}/deployments`, icon: <Server className="w-4 h-4" /> },
    { name: 'Logs', path: `/dashboard/projects/${projectId}/logs`, icon: <FileText className="w-4 h-4" /> },
    { name: 'Analytics', path: `/dashboard/projects/${projectId}/analytics`, icon: <Activity className="w-4 h-4" /> },
    { type: 'divider' },
    { name: 'Env Variables', path: `/dashboard/projects/${projectId}/env`, icon: <Key className="w-4 h-4" /> },
    { name: 'Collaborators', path: `/dashboard/projects/${projectId}/collaborators`, icon: <Users className="w-4 h-4" /> },
    { type: 'divider' },
    { name: 'Settings', path: `/dashboard/projects/${projectId}/settings`, icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#000] text-[#a1a1aa] flex font-sans selection:bg-white/30">
      
      {/* Global Dashboard Sidebar */}
      <DashboardSidebar />

      {/* Sidebar - Deep Project Context */}
      <aside className="w-64 border-r border-white/[0.08] flex flex-col bg-[#020202] shrink-0 sticky top-0 h-screen hidden md:flex">
        
        {/* Workspace Breadcrumb Context */}
        <div className="p-6 border-b border-white/[0.08] flex flex-col gap-4">
           <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shrink-0 border border-white/[0.1]"></div>
              <div className="flex flex-col min-w-0">
                 <span className="text-sm font-medium text-white leading-tight flex items-center gap-1">rudrajad2005 <ChevronDown className="w-3 h-3" /></span>
                 <span className="text-[10px] text-gray-500 font-mono truncate">{projectId}</span>
              </div>
           </Link>
           <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Search project..." className="w-full bg-[#050505] border border-white/[0.1] rounded-md pl-9 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-white/[0.3] placeholder:text-[#666]" />
           </div>
        </div>

        {/* Massive Nav List */}
        <div className="flex-1 py-6 px-3 overflow-y-auto no-scrollbar flex flex-col gap-1">
          {navItems.map((item, i) => {
            if (item.type === 'divider') {
               return <div key={i} className="h-px bg-white/[0.05] my-2 mx-3"></div>;
            }
            
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            
            return (
              <Link 
                key={item.path} 
                to={item.path!}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive ? 'bg-white/[0.08] text-white font-medium' : 'text-[#888] hover:text-white hover:bg-white/[0.03]'}`}
              >
                <div className="flex items-center gap-3">
                   {item.icon}
                   {item.name}
                </div>
                {item.badge && (
                   <span className="text-[9px] uppercase tracking-wider text-blue-400 font-medium">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#000]">
        
        {/* Project Header */}
        <header className="h-14 border-b border-white/[0.08] flex items-center px-4 lg:px-8 bg-[#000] sticky top-0 z-10 text-sm">
          <div className="flex items-center gap-2">
             <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-black rounded-[2px]"></div>
             </div>
             <span className="font-medium text-white">{projectId}</span>
             <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          
          <div className="ml-8 flex items-center gap-6 h-full flex-1">
             <div className="h-full flex items-center border-b-2 border-white text-white font-medium px-1">
                Overview
             </div>
          </div>
          
          <div className="flex items-center gap-4 border-l border-white/[0.08] pl-4 ml-4">
             <NotificationInbox />
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
