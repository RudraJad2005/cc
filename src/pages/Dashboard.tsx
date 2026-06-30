import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, GitBranch, Clock, ArrowRight, FolderOpen, Loader2, Github, Upload, X } from 'lucide-react';
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
  const [showImportModal, setShowImportModal] = useState(false);
  const userName = user?.email?.split('@')[0] || 'Developer';

  const [projects, setProjects] = useState<any[]>([]);
  const [sandboxes, setSandboxes] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      
      const [projectsRes, activityRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(4),
        supabase.from('activity').select('*').order('created_at', { ascending: false }).limit(5)
      ]);

      if (projectsRes.data) {
        setProjects(projectsRes.data.filter(p => p.branch !== 'sandbox'));
        setSandboxes(projectsRes.data.filter(p => p.branch === 'sandbox'));
      }
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
        <div className="flex flex-col gap-8">
           
           {/* Projects */}
           <div className="flex flex-col gap-6">
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
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
                       <Link to="/dashboard/new" className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-2">
                          <Plus className="w-4 h-4" /> Create Empty
                       </Link>
                       <button onClick={() => alert('GitHub import coming soon!')} className="bg-[#111] border border-white/[0.1] hover:bg-[#1a1a1a] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                          <Github className="w-4 h-4" /> Import GitHub
                       </button>
                       <Link to="/dashboard/import" className="bg-[#111] border border-white/[0.1] hover:bg-[#1a1a1a] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                          <Upload className="w-4 h-4" /> Import ZIP
                       </Link>
                    </div>
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
                            <div className="flex items-center gap-1.5 flex-1">
                               <GitBranch className="w-3.5 h-3.5" /> {project.branch}
                            </div>
                            <div className="flex items-center gap-1.5">
                               <Clock className="w-3.5 h-3.5" /> {getRelativeTime(project.created_at)}
                            </div>
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (confirm('Are you sure you want to delete this project?')) {
                                  supabase.from('projects').delete().eq('id', project.id).then(() => {
                                    setProjects(prev => prev.filter(p => p.id !== project.id));
                                  });
                                }
                              }}
                              className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors ml-auto"
                              title="Delete Project"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            </button>
                         </div>
                      </Link>
                    ))}
                    
                    <button onClick={() => setShowImportModal(true)} className="p-5 rounded-xl border border-white/[0.05] border-dashed bg-transparent hover:border-white/[0.2] hover:bg-white/[0.02] transition-all flex flex-col items-center justify-center gap-2 min-h-[140px] text-gray-500 hover:text-white group">
                       <div className="w-10 h-10 rounded-full border border-white/[0.1] bg-[#050505] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Plus className="w-5 h-5" />
                       </div>
                       <span className="text-sm font-medium">Import Project</span>
                    </button>
                 </div>
               )}

               {/* Sandboxes Section */}
               <div className="flex items-center justify-between mt-6">
                  <h2 className="text-sm font-medium text-gray-400">Your Sandboxes</h2>
                  <Link to="/dashboard/new" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1">
                     View All <ArrowRight className="w-3 h-3" />
                  </Link>
               </div>

               {sandboxes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 px-6 border border-white/[0.08] border-dashed rounded-xl bg-[#020202]">
                     <h3 className="text-base font-medium text-white mb-1">No sandboxes</h3>
                     <p className="text-xs text-gray-400 text-center mb-4">Create a lightweight coding environment for prototyping.</p>
                     <Link to="/dashboard/new" className="bg-[#111] border border-white/[0.1] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-white/[0.05] transition-colors">
                        New Sandbox
                     </Link>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {sandboxes.map((sandbox) => (
                       <Link key={sandbox.id} to={`/dashboard/projects/${sandbox.name}`} className="group p-5 rounded-xl border border-white/[0.1] bg-[#050505] hover:border-white/[0.2] hover:bg-[#0a0a0a] transition-all flex flex-col gap-4">
                          <div className="flex items-start justify-between">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border border-white/[0.1] bg-[#0A0A0A] flex items-center justify-center shrink-0">
                                   <img src={getSafeIconUrl(sandbox.icon)} alt={sandbox.framework} className="w-3.5 h-3.5 object-contain" />
                                </div>
                                <div>
                                   <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{sandbox.name}</h3>
                                   <p className="text-xs text-gray-500 font-mono">{sandbox.framework}</p>
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                             <div className="flex items-center gap-1.5 flex-1">
                                <Clock className="w-3.5 h-3.5" /> {getRelativeTime(sandbox.created_at)}
                             </div>
                             <button 
                               onClick={(e) => {
                                 e.preventDefault();
                                 e.stopPropagation();
                                 if (confirm('Are you sure you want to delete this sandbox?')) {
                                   supabase.from('projects').delete().eq('id', sandbox.id).then(() => {
                                     setSandboxes(prev => prev.filter(p => p.id !== sandbox.id));
                                   });
                                 }
                               }}
                               className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors ml-auto"
                               title="Delete Sandbox"
                             >
                               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                             </button>
                          </div>
                       </Link>
                     ))}
                  </div>
               )}
            </div>

        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
           <div className="bg-[#0a0a0a] border border-white/[0.1] rounded-2xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl">
              <div className="p-6 border-b border-white/[0.05] flex items-center justify-between">
                 <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Import Project</h3>
                    <p className="text-sm text-gray-400">Choose how you want to bring your code into Collab Code</p>
                 </div>
                 <button onClick={() => setShowImportModal(false)} className="text-gray-500 hover:text-white transition-colors p-1">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                 
                 {/* Import via GitHub */}
                 <Link to="/dashboard/import" className="group flex flex-col p-5 border border-white/[0.08] hover:border-white/[0.2] bg-[#050505] hover:bg-[#111] rounded-xl transition-all h-full">
                    <div className="w-12 h-12 rounded-full border border-white/[0.1] bg-[#111] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                       <Github className="w-6 h-6" />
                    </div>
                    <h4 className="text-white font-medium text-base mb-1">Import from GitHub</h4>
                    <p className="text-sm text-gray-400">Connect your GitHub account and select a repository to import.</p>
                 </Link>

                 {/* Import via Local Files */}
                 <Link to="/dashboard/import" className="group flex flex-col p-5 border border-white/[0.08] hover:border-white/[0.2] bg-[#050505] hover:bg-[#111] rounded-xl transition-all h-full">
                    <div className="w-12 h-12 rounded-full border border-white/[0.1] bg-[#111] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all text-gray-300">
                       <Upload className="w-6 h-6" />
                    </div>
                    <h4 className="text-white font-medium text-base mb-1">Upload Files</h4>
                    <p className="text-sm text-gray-400">Drag and drop your local project folder directly.</p>
                 </Link>

              </div>
           </div>
        </div>
      )}

    </div>
  );
}
