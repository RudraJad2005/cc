import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreVertical, Database, Globe, X, ShieldAlert, Server } from 'lucide-react';
import { getSupabaseInstances, setActiveInstanceId, addSupabaseInstance, removeSupabaseInstance, migrateLegacyInstance, SupabaseInstance } from '../utils/supabaseInstances';

export function DashboardProjects() {
  const navigate = useNavigate();
  const [instances, setInstances] = useState<SupabaseInstance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  
  // New Instance Form State
  const [newInstanceName, setNewInstanceName] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    migrateLegacyInstance();
    setInstances(getSupabaseInstances());
  }, []);

  const handleProjectClick = (instance: SupabaseInstance) => {
    setActiveInstanceId(instance.id);
    navigate('/dashboard/backend/editor');
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrl || !supabaseKey || !newInstanceName) return;
    
    const cleanKey = supabaseKey.trim();
    try {
       const payload = JSON.parse(atob(cleanKey.split('.')[1]));
       if (payload.role !== 'service_role') {
           setErrorMsg(`Invalid Key: You entered an '${payload.role}' key. Please use the 'service_role' secret key.`);
           return;
       }
    } catch (err) {
       setErrorMsg('Invalid Key: Malformed JWT format.');
       return;
    }

    let cleanUrl = supabaseUrl.trim();
    if (!cleanUrl.startsWith('http')) cleanUrl = `https://${cleanUrl}`;
    cleanUrl = cleanUrl.replace(/\/+$/, '');
    if (cleanUrl.endsWith('/storage/v1')) cleanUrl = cleanUrl.replace(/\/storage\/v1$/, '');
    
    addSupabaseInstance(newInstanceName, cleanUrl, cleanKey);
    setInstances(getSupabaseInstances());
    
    setSupabaseUrl('');
    setSupabaseKey('');
    setNewInstanceName('');
    setErrorMsg('');
    setShowNewProjectModal(false);
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to disconnect this project?')) {
       removeSupabaseInstance(id);
       setInstances(getSupabaseInstances());
    }
  };

  const filteredInstances = instances.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex-1 bg-[#000] p-8 overflow-y-auto">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-8 tracking-tight">Projects</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
           <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                 <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                 <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a project" 
                    className="w-full sm:w-64 pl-9 pr-4 py-1.5 bg-[#0a0a0a] border border-white/[0.08] rounded-md text-sm text-white focus:outline-none focus:border-white/[0.2]"
                 />
              </div>
              <button className="hidden sm:flex px-3 py-1.5 bg-[#0a0a0a] border border-white/[0.08] rounded-md text-sm text-gray-300 hover:text-white transition-colors">
                 Status
              </button>
           </div>
           
           <button 
              onClick={() => setShowNewProjectModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-sm font-medium transition-colors"
           >
              <Plus className="w-4 h-4" /> New project
           </button>
        </div>

        {instances.length === 0 ? (
           <div className="w-full mt-12 py-20 bg-[#020202] border border-white/[0.05] border-dashed rounded-xl flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                 <Database className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-white font-medium text-lg">No projects connected</h3>
              <p className="text-gray-500 text-sm mt-1 mb-6 text-center max-w-sm">Connect your first Supabase instance to manage your database and storage directly from Collab Code.</p>
              <button onClick={() => setShowNewProjectModal(true)} className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-gray-100 transition-colors shadow-lg shadow-white/5">
                 Connect Project
              </button>
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredInstances.map(instance => {
                 const regionMatch = instance.url.match(/([a-z0-9-]+)\.supabase\.co/);
                 const hostRef = regionMatch ? regionMatch[1] : 'External DB';

                 return (
                    <div 
                       key={instance.id} 
                       onClick={() => handleProjectClick(instance)}
                       className="bg-[#050505] border border-white/[0.08] rounded-xl p-5 hover:border-white/[0.15] hover:bg-[#0a0a0a] transition-all cursor-pointer group relative shadow-xl shadow-black/50"
                    >
                       <div className="absolute top-4 right-4 z-10">
                          <button 
                             onClick={(e) => handleRemove(instance.id, e)}
                             className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                          >
                             <MoreVertical className="w-4 h-4" />
                          </button>
                       </div>
                       
                       <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center">
                             <Database className="w-5 h-5 text-indigo-400" />
                          </div>
                          <div>
                             <h3 className="text-white font-medium group-hover:text-indigo-400 transition-colors">{instance.name}</h3>
                             <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Globe className="w-3 h-3" /> {hostRef}</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono rounded tracking-wide border border-emerald-500/20">CONNECTED</span>
                          <span className="text-xs text-gray-600 font-mono">ID: {instance.id.split('-')[0]}</span>
                       </div>
                    </div>
                 );
              })}
           </div>
        )}
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-[#0a0a0a] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
               <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Server className="w-5 h-5 text-indigo-400" />
                     </div>
                     <div>
                        <h2 className="text-xl font-semibold text-white">Connect Database</h2>
                        <p className="text-sm text-gray-400">Add a new Supabase connection</p>
                     </div>
                  </div>
                  <button onClick={() => setShowNewProjectModal(false)} className="text-gray-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/[0.05]">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               
               <div className="p-6 overflow-y-auto">
                  {errorMsg && (
                     <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm mb-6">
                        <ShieldAlert className="w-5 h-5 shrink-0" />
                        {errorMsg}
                     </div>
                  )}

                  <div className="w-full p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex flex-col gap-2 text-blue-400 text-sm mb-6">
                     <strong>Why the service_role key?</strong>
                     <p className="text-blue-400/80">Using your <code>service_role</code> secret key allows this dashboard to bypass RLS so you can query all your tables and manage storage.</p>
                  </div>

                  <form id="new-project-form" onSubmit={handleConnect} className="flex flex-col gap-5">
                     <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white">Connection Name</label>
                        <input 
                           type="text" 
                           required
                           value={newInstanceName}
                           onChange={e => setNewInstanceName(e.target.value)}
                           placeholder="e.g. Production DB" 
                           className="bg-[#000] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white">Project URL</label>
                        <input 
                           type="url" 
                           required
                           value={supabaseUrl}
                           onChange={e => setSupabaseUrl(e.target.value)}
                           placeholder="https://xyzcompany.supabase.co" 
                           className="bg-[#000] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white">Project API Key (service_role secret)</label>
                        <input 
                           type="password" 
                           required
                           value={supabaseKey}
                           onChange={e => setSupabaseKey(e.target.value)}
                           placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                           className="bg-[#000] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 font-mono transition-colors"
                        />
                     </div>
                  </form>
               </div>
               
               <div className="p-6 border-t border-white/[0.08] bg-[#050505] flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setShowNewProjectModal(false)} className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                     Cancel
                  </button>
                  <button type="submit" form="new-project-form" className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
                     Connect Project
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
