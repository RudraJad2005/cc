import { useState, useEffect, useRef } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database, Plus, Search, Folder, Image as ImageIcon, File as FileIcon, Download, MoreVertical, Trash2, UploadCloud, RefreshCw, ChevronRight, HardDrive, Unplug, Loader2, Link as LinkIcon, ShieldAlert, ChevronDown, Check } from 'lucide-react';
import { getSupabaseInstances, getActiveInstance, setActiveInstanceId, addSupabaseInstance, removeSupabaseInstance, migrateLegacyInstance, SupabaseInstance } from '../utils/supabaseInstances';

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function DashboardStorage() {
  const [instances, setInstances] = useState<SupabaseInstance[]>([]);
  const [activeInstance, setActiveInstance] = useState<SupabaseInstance | null>(null);
  const [showInstanceDropdown, setShowInstanceDropdown] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newInstanceName, setNewInstanceName] = useState('');

  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [buckets, setBuckets] = useState<any[]>([]);
  const [activeBucket, setActiveBucket] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  
  const [loadingBuckets, setLoadingBuckets] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowInstanceDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load instances on mount
  useEffect(() => {
    migrateLegacyInstance();
    const loadedInstances = getSupabaseInstances();
    setInstances(loadedInstances);
    const active = getActiveInstance();
    setActiveInstance(active);
    if (!active && loadedInstances.length > 0) {
       setActiveInstanceId(loadedInstances[0].id);
       setActiveInstance(loadedInstances[0]);
    }
  }, []);

  useEffect(() => {
    if (activeInstance) {
      try {
        const payload = JSON.parse(atob(activeInstance.key.split('.')[1]));
        if (payload.role !== 'service_role') {
           setErrorMsg(`Access Denied: The key for ${activeInstance.name} is a '${payload.role}' key. Please use a 'service_role' key.`);
           setClient(null);
           return;
        }

        const supabase = createClient(activeInstance.url, activeInstance.key, {
           auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
        });
        setClient(supabase);
        setErrorMsg('');
        fetchBuckets(supabase);
      } catch (err) {
        setErrorMsg('Invalid Supabase credentials or key format.');
        setClient(null);
      }
    } else {
       setClient(null);
       setBuckets([]);
       setFiles([]);
       setActiveBucket('');
    }
  }, [activeInstance]);

  useEffect(() => {
    if (client && activeBucket) {
      fetchFiles(client, activeBucket);
    }
  }, [activeBucket, client]);

  const fetchBuckets = async (supabase: SupabaseClient) => {
    setLoadingBuckets(true);
    setErrorMsg('');
    const { data, error } = await supabase.storage.listBuckets();
    setLoadingBuckets(false);
    
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    
    setBuckets(data || []);
    if (data && data.length > 0) {
      setActiveBucket(data[0].name);
    } else {
      setActiveBucket('');
      setFiles([]);
    }
  };

  const fetchFiles = async (supabase: SupabaseClient, bucketName: string) => {
    setLoadingFiles(true);
    const { data, error } = await supabase.storage.from(bucketName).list('', {
       limit: 100,
       offset: 0,
       sortBy: { column: 'created_at', order: 'desc' }
    });
    setLoadingFiles(false);
    
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    
    setFiles(data?.filter(f => f.name !== '.emptyFolderPlaceholder') || []);
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
    
    const newInst = addSupabaseInstance(newInstanceName, cleanUrl, cleanKey);
    setInstances(getSupabaseInstances());
    setActiveInstanceId(newInst.id);
    setActiveInstance(newInst);
    
    setSupabaseUrl('');
    setSupabaseKey('');
    setNewInstanceName('');
    setErrorMsg('');
    setIsAddingNew(false);
  };

  const handleSwitchInstance = (inst: SupabaseInstance) => {
    setActiveInstanceId(inst.id);
    setActiveInstance(inst);
    setShowInstanceDropdown(false);
    setIsAddingNew(false);
  };

  const handleRemoveInstance = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeSupabaseInstance(id);
    const updated = getSupabaseInstances();
    setInstances(updated);
    if (activeInstance?.id === id) {
       if (updated.length > 0) {
          setActiveInstanceId(updated[0].id);
          setActiveInstance(updated[0]);
       } else {
          setActiveInstanceId(null);
          setActiveInstance(null);
       }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !client || !activeBucket) return;
    
    const file = e.target.files[0];
    setUploading(true);
    
    const { error } = await client.storage.from(activeBucket).upload(file.name, file, {
       cacheControl: '3600',
       upsert: true
    });
    
    setUploading(false);
    if (error) {
       setErrorMsg(`Upload failed: ${error.message}`);
    } else {
       fetchFiles(client, activeBucket);
    }
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (fileName: string) => {
    if (!client || !activeBucket) return;
    if (!confirm(`Are you sure you want to delete ${fileName}?`)) return;
    
    const { error } = await client.storage.from(activeBucket).remove([fileName]);
    if (error) {
       setErrorMsg(`Delete failed: ${error.message}`);
    } else {
       fetchFiles(client, activeBucket);
    }
  };

  const handleCreateBucket = async () => {
    if (!client) return;
    const bucketName = prompt('Enter a name for the new bucket (lowercase, no spaces):');
    if (!bucketName) return;

    // Optional: Ask if it should be public
    const isPublic = confirm('Should this bucket be public? (OK for Yes, Cancel for No)');

    setLoadingBuckets(true);
    const { error } = await client.storage.createBucket(bucketName.toLowerCase().replace(/\s+/g, '-'), {
       public: isPublic
    });

    if (error) {
       setErrorMsg(`Create bucket failed: ${error.message}`);
       setLoadingBuckets(false);
    } else {
       await fetchBuckets(client);
       setActiveBucket(bucketName);
    }
  };

  // Unconnected State (Onboarding)
  // Unconnected State (Onboarding)
  if (!activeInstance || isAddingNew) {
    return (
      <div className="flex flex-col gap-6 h-full pb-20 items-center justify-center max-w-xl mx-auto px-4 sm:px-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2">
           <Database className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">Connect Supabase Storage</h1>
        <p className="text-gray-400 text-center mb-6">
           Provide your Supabase Project URL and <strong>service_role</strong> API key to manage your storage buckets directly from this dashboard.
        </p>

        {errorMsg && (
           <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm mb-4">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              {errorMsg}
           </div>
        )}

        <div className="w-full p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex flex-col gap-2 text-blue-400 text-sm mb-4">
           <strong>Why the service_role key?</strong>
           <p className="text-blue-400/80">By default, Supabase hides all buckets from the public <code>anon</code> key using Row Level Security (RLS). Using your <code>service_role</code> secret key allows this dashboard to bypass RLS so you can see and manage all your buckets and files.</p>
        </div>

        <form onSubmit={handleConnect} className="w-full bg-[#050505] border border-white/[0.1] rounded-xl p-5 sm:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white">Connection Name</label>
              <input 
                 type="text" 
                 required
                 value={newInstanceName}
                 onChange={e => setNewInstanceName(e.target.value)}
                 placeholder="e.g. Production Storage" 
                 className="bg-[#000] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
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
                 className="bg-[#000] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
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
                 className="bg-[#000] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 font-mono"
              />
           </div>
           <div className="flex items-center gap-3 mt-2">
              {instances.length > 0 && (
                 <button type="button" onClick={() => setIsAddingNew(false)} className="px-6 py-3 bg-[#111] border border-white/[0.1] text-white font-medium rounded-lg hover:bg-[#222] transition-colors">
                    Cancel
                 </button>
              )}
              <button type="submit" className="flex-1 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                 Connect Storage
              </button>
           </div>
        </form>
      </div>
    );
  }

  // Connected State (File Browser)
  return (
    <div className="flex flex-1 h-screen overflow-hidden bg-[#000]">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

      {/* Inner Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-white/[0.08] bg-[#020202] flex-col shrink-0">
        <div className="p-3 border-b border-white/[0.08]">
           <button onClick={() => window.location.href = '/dashboard/backend'} className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-white/[0.05]">
                 <Database className="w-3 h-3" />
              </div>
              Back to Projects
           </button>
        </div>
        <div className="h-14 flex items-center px-4 border-b border-white/[0.08] relative" ref={dropdownRef}>
           <button 
              onClick={() => setShowInstanceDropdown(!showInstanceDropdown)}
              className="flex items-center justify-between w-full hover:bg-white/[0.02] p-1.5 -ml-1.5 rounded-md transition-colors"
           >
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center">
                    <Database className="w-3 h-3 text-emerald-400" />
                 </div>
                 <span className="text-sm font-semibold tracking-tight text-white">{activeInstance.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
           </button>

           {showInstanceDropdown && (
              <div className="absolute top-full left-4 right-4 mt-1 bg-[#0a0a0a] border border-white/[0.08] rounded-lg shadow-xl overflow-hidden z-50">
                 <div className="max-h-64 overflow-y-auto">
                    {instances.map(inst => (
                       <div key={inst.id} className="flex items-center group">
                          <button 
                             onClick={() => handleSwitchInstance(inst)}
                             className="flex-1 flex items-center gap-2 px-3 py-2 hover:bg-white/[0.04] transition-colors text-left"
                          >
                             {inst.id === activeInstance.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3.5 h-3.5" />}
                             <span className="text-sm text-white truncate">{inst.name}</span>
                          </button>
                          {instances.length > 1 && (
                             <button 
                                onClick={(e) => handleRemoveInstance(inst.id, e)}
                                className="px-3 py-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                                <Unplug className="w-3.5 h-3.5" />
                             </button>
                          )}
                       </div>
                    ))}
                 </div>
                 <div className="border-t border-white/[0.08] p-1">
                    <button 
                       onClick={() => { setShowInstanceDropdown(false); setIsAddingNew(true); }}
                       className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-white/[0.04] transition-colors rounded text-sm text-gray-300"
                    >
                       <Plus className="w-3.5 h-3.5" /> Add new instance
                    </button>
                 </div>
              </div>
           )}
        </div>

        {/* Navigation */}
        <div className="p-3 flex flex-col gap-1 border-b border-white/[0.08]">
           <button onClick={() => window.location.href = '/dashboard/backend/editor'} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-md transition-colors text-left">
              Table Editor
           </button>
           <button onClick={() => window.location.href = '/dashboard/backend/editor/auth'} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-md transition-colors text-left">
              Authentication
           </button>
           <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white bg-white/[0.08] rounded-md transition-colors text-left font-medium">
              Storage
           </button>
        </div>

        <div className="p-3 border-b border-white/[0.08]">
           <button onClick={handleCreateBucket} className="w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-white text-black hover:bg-gray-100 rounded-md text-xs font-medium transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <Plus className="w-3 h-3" /> New bucket
           </button>
        </div>
        <div className="p-3 relative">
           <Search className="w-3 h-3 absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
           <input type="text" placeholder="Search buckets..." className="w-full bg-[#050505] border border-white/[0.08] rounded-md pl-8 pr-2 py-1.5 text-xs text-white focus:outline-none focus:border-white/[0.2] placeholder:text-gray-600" />
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar pb-4 flex flex-col">
           {loadingBuckets ? (
              <div className="flex items-center justify-center p-4"><Loader2 className="w-4 h-4 animate-spin text-gray-500" /></div>
           ) : buckets.map(bucket => (
              <button 
                 key={bucket.id}
                 onClick={() => setActiveBucket(bucket.name)}
                 className={`flex items-center justify-between px-4 py-2 text-sm transition-colors group ${activeBucket === bucket.name ? 'bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-500' : 'text-gray-400 hover:text-white hover:bg-white/[0.02] border-r-2 border-transparent'}`}
              >
                 <div className="flex items-center gap-2">
                    <HardDrive className={`w-4 h-4 ${activeBucket === bucket.name ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-400'}`} />
                    <span className="truncate">{bucket.name}</span>
                 </div>
              </button>
           ))}
        </div>
      </aside>

      {/* Main Content - File Browser Grid */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#000]">
         {/* Top Tabs */}
         <div className="h-12 border-b border-white/[0.08] flex items-center bg-[#020202] px-2 overflow-x-auto no-scrollbar shrink-0">
            {activeBucket && (
               <div className="h-full flex items-center px-4 border-b-2 border-indigo-500 text-sm font-medium text-white bg-white/[0.02]">
                  {activeBucket}
               </div>
            )}
         </div>

         {/* Toolbar */}
         <div className="h-auto min-h-[48px] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-[#050505] shrink-0">
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                  <Search className="w-3.5 h-3.5" /> Search files...
               </button>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={() => activeBucket && client && fetchFiles(client, activeBucket)} disabled={!activeBucket || loadingFiles} className="flex items-center gap-2 text-xs text-white hover:bg-white/[0.08] px-2 py-1.5 rounded-md transition-colors disabled:opacity-50">
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingFiles ? 'animate-spin' : ''}`} /> Refresh
               </button>
               <button className="flex items-center gap-2 text-xs text-white hover:bg-white/[0.08] px-2 py-1.5 rounded-md transition-colors">
                  <ShieldAlert className="w-3.5 h-3.5" /> Policies
               </button>
               <button onClick={handleUploadClick} disabled={!activeBucket || uploading} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors shadow-sm ml-2 disabled:opacity-50">
                  {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
                  {uploading ? 'Uploading...' : 'Upload file'}
               </button>
            </div>
         </div>

         {/* Data Grid */}
         <div className="flex-1 overflow-auto bg-[#000]">
            {!activeBucket ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                  <HardDrive className="w-12 h-12 text-[#111]" />
                  <span className="text-sm">Select a bucket to view files</span>
               </div>
            ) : files.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                  <FileIcon className="w-12 h-12 text-[#111]" />
                  <span className="text-sm">No files in this bucket</span>
               </div>
            ) : (
               <table className="min-w-full divide-y divide-white/[0.08] border-b border-white/[0.08]">
                 <thead className="bg-[#020202] sticky top-0 z-10 shadow-[0_1px_0_rgba(255,255,255,0.08)]">
                   <tr>
                     <th className="w-10 px-4 py-2 border-r border-white/[0.08]">
                        <input type="checkbox" className="rounded border-white/[0.2] bg-[#050505] checked:bg-indigo-500" />
                     </th>
                     <th className="px-4 py-2.5 text-left border-r border-white/[0.08] text-[13px] font-medium text-white tracking-wide">Name</th>
                     <th className="px-4 py-2.5 text-left border-r border-white/[0.08] text-[13px] font-medium text-white tracking-wide w-32">Size</th>
                     <th className="px-4 py-2.5 text-left border-r border-white/[0.08] text-[13px] font-medium text-white tracking-wide w-32">Type</th>
                     <th className="px-4 py-2.5 text-left border-r border-white/[0.08] text-[13px] font-medium text-white tracking-wide w-48">Last Modified</th>
                     <th className="px-4 py-2 w-16"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/[0.04] bg-[#000]">
                   {files.map(file => {
                      const isImage = file.metadata?.mimetype?.startsWith('image/');
                      const isFolder = file.id === null;
                      return (
                        <tr key={file.id || file.name} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="w-10 px-4 py-2 border-r border-white/[0.04]">
                             <input type="checkbox" className="rounded border-white/[0.2] bg-[#050505] opacity-0 group-hover:opacity-100 transition-opacity checked:bg-indigo-500 checked:opacity-100" />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-[13px] text-gray-300 border-r border-white/[0.04]">
                             <div className="flex items-center gap-2">
                               {isFolder ? <Folder className="w-4 h-4 text-blue-400" /> : isImage ? <ImageIcon className="w-4 h-4 text-emerald-400" /> : <FileIcon className="w-4 h-4 text-gray-500" />}
                               {file.name}
                             </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-[13px] text-gray-500 border-r border-white/[0.04] font-mono">
                             {isFolder ? '--' : formatBytes(file.metadata?.size || 0)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-[13px] text-gray-500 border-r border-white/[0.04] font-mono">
                             {isFolder ? 'folder' : (file.metadata?.mimetype || 'unknown')}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-[13px] text-gray-500 border-r border-white/[0.04] font-mono">
                             {isFolder ? '--' : new Date(file.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-right text-transparent">
                             {!isFolder && (
                                <button onClick={() => handleDelete(file.name)} className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-white/[0.04] rounded">
                                   <Trash2 className="w-3.5 h-3.5" />
                                </button>
                             )}
                          </td>
                        </tr>
                      );
                   })}
                 </tbody>
               </table>
            )}
         </div>
      </div>
    </div>
  );
}
