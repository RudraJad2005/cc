import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, GitBranch, Clock, ArrowRight, FolderOpen, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

function getRelativeTime(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

const getSafeIconUrl = (url: string | null | undefined) => {
  if (!url) return 'https://api.iconify.design/simple-icons:github.svg?color=white';
  if (url.includes('cdn.simpleicons.org')) {
    const parts = url.split('/');
    const color = parts.pop();
    const icon = parts.pop();
    const hexColor = color?.toLowerCase() === 'white' ? 'white' : `%23${color}`;
    return `https://api.iconify.design/simple-icons:${icon}.svg?color=${hexColor}`;
  }
  return url;
};

export function Dashboard() {
  const { user } = useAuth();
  const userName = user?.email?.split('@')[0] || 'Developer';

  const [projects, setProjects] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      
      const [projectsRes, activityRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(4),
        supabase.from('activity').select('*').order('created_at', { ascending: false }).limit(5)
      ]);

      if (projectsRes.data) setProjects(projectsRes.data);
      if (activityRes.data) setActivity(activityRes.data);
      setLoading(false);
    }
    
    fetchData();
  }, [user]);

  return (
    <div className="flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
         </div>
         <div className="flex items-center gap-3">
            <Link to="/dashboard/new" className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
               <Plus className="w-4 h-4" /> Add New...
            </Link>
         </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
           <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Left Column: Projects */}
           <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-sm font-medium text-gray-400">Recent Projects</h2>
                 <Link to="/dashboard/projects" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                    View All <ArrowRight className="w-3 h-3" />
                 </Link>
              </div>
              
              {projects.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-16 px-6 border border-white/[0.08] border-dashed rounded-xl bg-[#020202]">
                    <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center mb-4">
                       <FolderOpen className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No projects yet</h3>
                    <p className="text-sm text-gray-400 text-center max-w-sm mb-6">Get started by creating your first project or importing an existing repository.</p>
                    <Link to="/dashboard/new" className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                       Create Project
                    </Link>
                 </div>
              ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                      <Link key={project.id} to={`/dashboard/projects/${project.name}`} className="group p-5 rounded-xl border border-white/[0.1] bg-[#050505] hover:border-white/[0.2] hover:bg-[#0a0a0a] transition-all flex flex-col gap-4">
                         <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full border border-white/[0.1] bg-[#0A0A0A] flex items-center justify-center shrink-0">
                                  <img src={getSafeIconUrl(project.icon)} alt={project.framework} className="w-3.5 h-3.5 object-contain" />
                               </div>
                               <div>
                                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{project.name}</h3>
                                  <p className="text-xs text-gray-500 font-mono">{project.url}</p>
                               </div>
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                            <div className="flex items-center gap-1.5">
                               <GitBranch className="w-3.5 h-3.5" /> {project.branch}
                            </div>
                            <div className="flex items-center gap-1.5">
                               <Clock className="w-3.5 h-3.5" /> {getRelativeTime(project.created_at)}
                            </div>
                         </div>
                      </Link>
                    ))}
                    
                    <Link to="/dashboard/new" className="p-5 rounded-xl border border-white/[0.05] border-dashed bg-transparent hover:border-white/[0.2] hover:bg-white/[0.02] transition-all flex flex-col items-center justify-center gap-2 min-h-[140px] text-gray-500 hover:text-white group">
                       <div className="w-10 h-10 rounded-full border border-white/[0.1] bg-[#050505] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Plus className="w-5 h-5" />
                       </div>
                       <span className="text-sm font-medium">Import Project</span>
                    </Link>
                 </div>
              )}
           </div>

           {/* Right Column: Activity */}
           <div className="flex flex-col gap-6">
              <h2 className="text-sm font-medium text-gray-400">Activity</h2>
              
              <div className="rounded-xl border border-white/[0.1] bg-[#050505] flex flex-col overflow-hidden">
                 {activity.length === 0 ? (
                    <div className="p-8 text-center text-sm text-gray-500">
                       No recent activity.
                    </div>
                 ) : (
                    activity.map((event) => (
                       <div key={event.id} className="flex items-start gap-4 p-4 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shrink-0 border border-white/[0.1]"></div>
                          <div className="flex-1 min-w-0">
                             <p className="text-sm text-gray-300">
                                <span className="font-medium text-white">{userName}</span> {event.action} <span className="font-mono text-xs bg-white/[0.1] px-1 py-0.5 rounded text-white">{event.target}</span>
                             </p>
                             <p className="text-xs text-gray-500 mt-1">{getRelativeTime(event.created_at)} ago</p>
                          </div>
                          {event.status === 'success' && <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shadow-[0_0_8px_#10b981]"></div>}
                          {event.status === 'building' && <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 animate-pulse shadow-[0_0_8px_#f59e0b]"></div>}
                       </div>
                    ))
                 )}
              </div>
           </div>

        </div>
      )}

    </div>
  );
}
