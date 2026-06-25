import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, GitBranch, Globe, Clock, MoreVertical, ChevronDown, Github, FolderOpen, Loader2, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

function getRelativeTime(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
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

export function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      if (!user) return;
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, [user]);

  const handleDelete = async (e: React.MouseEvent, projectId: string) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this project?')) {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);
      if (!error) {
        setProjects(prev => prev.filter(p => p.id !== projectId));
      } else {
        alert('Failed to delete project: ' + error.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto pb-20">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
         <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
               type="text" 
               placeholder="Search projects..." 
               className="w-full bg-[#050505] border border-white/[0.1] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/[0.3] transition-colors placeholder:text-[#666]"
            />
         </div>
         <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-between gap-2 px-4 py-2.5 bg-[#050505] border border-white/[0.1] rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/[0.2] transition-colors font-medium">
               All Frameworks <ChevronDown className="w-4 h-4" />
            </button>
            <Link to="/dashboard/new" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
               <Plus className="w-4 h-4" /> Add New
            </Link>
         </div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-4">
         {loading ? (
           <div className="flex justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
           </div>
         ) : projects.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 px-6 border border-white/[0.08] border-dashed rounded-xl bg-[#020202]">
              <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mb-6">
                 <FolderOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No projects yet</h3>
              <p className="text-gray-400 text-center max-w-md mb-8">You haven't deployed any projects to Collab Code. Get started by importing a repository.</p>
              <Link to="/dashboard/new" className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                 Deploy your first Project
              </Link>
           </div>
         ) : (
           projects.map((project) => (
              <Link 
                 key={project.id} 
                 to={`/dashboard/projects/${project.name}`}
                 className="group p-5 sm:p-6 rounded-xl border border-white/[0.08] bg-[#020202] hover:border-white/[0.2] hover:bg-[#080808] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer shadow-sm hover:shadow-lg"
              >
                 
                 {/* Left: Info */}
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/[0.1] bg-[#0A0A0A] flex items-center justify-center shrink-0">
                       <img src={getSafeIconUrl(project.icon)} alt={project.framework} className="w-4 h-4 object-contain" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                       <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors leading-none tracking-tight">{project.name}</h3>
                       </div>
                       <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="hover:text-white transition-colors hover:underline flex items-center gap-1.5">
                             <Globe className="w-3.5 h-3.5" /> {project.url}
                          </span>
                       </div>
                    </div>
                 </div>

                 {/* Right: Meta & Status */}
                 <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 w-full sm:w-auto pl-14 sm:pl-0">
                    <div className="flex flex-col sm:items-end gap-2">
                       <div className="flex items-center gap-2 text-sm text-gray-300">
                          <GitBranch className="w-3.5 h-3.5 text-gray-500" />
                          <span className="font-mono bg-white/[0.05] border border-white/[0.05] px-1.5 py-0.5 rounded-md text-xs">{project.branch}</span>
                       </div>
                       <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3.5 h-3.5" /> {getRelativeTime(project.created_at)}
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                       {project.status === 'Ready' && <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div> Ready</div>}
                       {project.status === 'Building' && <div className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse"></div> Building</div>}
                       {project.status === 'Error' && <div className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></div> Error</div>}
                       
                       <div className="p-2 hover:bg-red-500/10 rounded-md transition-colors text-gray-400 hover:text-red-400" onClick={(e) => handleDelete(e, project.id)} title="Delete Project">
                          <Trash2 className="w-4 h-4" />
                       </div>
                    </div>
                 </div>

              </Link>
           ))
         )}
      </div>

    </div>
  );
}
