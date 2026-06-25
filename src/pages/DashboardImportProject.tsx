import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { FolderPlus, Rocket, Upload, Terminal } from 'lucide-react';

export function DashboardImportProject() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [deployStatus, setDeployStatus] = useState<'idle' | 'uploading' | 'queued' | 'building' | 'ready' | 'error'>('idle');

  // Scroll to bottom of logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (!file) {
      setErrorMsg('Please upload a ZIP file of your project code.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setLogs([]);
    setDeployStatus('uploading');

    // 1. Create Project in DB
    const { error: dbError } = await supabase.from('projects').insert({
      user_id: user.id,
      name,
      framework: 'Imported',
      url: `${name}.52.172.229.65.nip.io`,
      icon: 'https://api.iconify.design/simple-icons:github.svg?color=white',
      status: 'Building',
      branch: 'main'
    });

    if (dbError && !dbError.message.includes('duplicate key')) {
      setErrorMsg(dbError.message || 'Failed to create project record.');
      setLoading(false);
      setDeployStatus('error');
      return;
    }

    // 2. Fetch User Token
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    if (!token) {
      setErrorMsg('Not authenticated. Please log in again.');
      setLoading(false);
      setDeployStatus('error');
      return;
    }

    // 3. Prepare FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectName', name);

    // 4. Send to Azure VM API and Stream Logs
    try {
      const response = await fetch('https://api.52.172.229.65.nip.io/v1/deployments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.body) {
        throw new Error('ReadableStream not supported by browser.');
      }

      setDeployStatus('queued');
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        // Update states based on log content
        if (chunk.includes('Starting compilation')) setDeployStatus('building');
        if (chunk.includes('[RESULT] SUCCESS')) setDeployStatus('ready');
        if (chunk.includes('[RESULT] ERROR')) setDeployStatus('error');

        // Add logs
        setLogs(prev => {
          const newLogs = chunk.split('\n').filter(l => l.trim() !== '');
          return [...prev, ...newLogs];
        });
      }

      await supabase.from('activity').insert({
        user_id: user.id,
        action: 'deployed project',
        target: name,
        status: 'success'
      });

      if (deployStatus !== 'error') {
        setTimeout(() => navigate('/dashboard/deployments'), 2000);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Upload failed.');
      setDeployStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto w-full pb-20">
      
      <div className="mb-10">
         <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Import Project</h1>
         <p className="text-gray-400">Upload your source code (.zip) to deploy directly to your Azure VM.</p>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">

         {/* Details & Upload */}
         <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
            <h2 className="text-lg font-medium text-white mb-2">Deployment Settings</h2>
            
            <div className="flex flex-col gap-2">
               <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FolderPlus className="w-4 h-4" /> Project Name
               </label>
               <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="my-awesome-app"
                  required
                  className="bg-[#020202] border border-white/[0.1] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/[0.3] transition-colors"
               />
               <p className="text-xs text-gray-500 mt-1">This will be used as your production subdomain.</p>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Source Code (.zip)
               </label>
               <input 
                  type="file" 
                  accept=".zip"
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  required
                  className="bg-[#020202] border border-white/[0.1] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/[0.3] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20"
               />
            </div>
         </div>

         {/* Terminal Logs */}
         {logs.length > 0 && (
           <div className="bg-black border border-white/[0.1] rounded-xl overflow-hidden flex flex-col">
             <div className="bg-[#111] border-b border-white/[0.05] px-4 py-2 flex items-center gap-2">
               <Terminal className="w-4 h-4 text-gray-400" />
               <span className="text-xs font-mono text-gray-400">Live Build Logs ({deployStatus})</span>
             </div>
             <div className="p-4 font-mono text-sm h-64 overflow-y-auto custom-scrollbar flex flex-col gap-1">
               {logs.map((log, i) => (
                 <div key={i} className={log.includes('ERROR') ? 'text-red-400' : log.includes('SUCCESS') ? 'text-green-400' : 'text-gray-300'}>
                   {log}
                 </div>
               ))}
               <div ref={logsEndRef} />
             </div>
           </div>
         )}

         <div className="flex justify-end pt-4 border-t border-white/[0.08]">
            <button 
               type="submit" 
               disabled={loading || !name || !file}
               className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {loading ? 'Deploying...' : <><Rocket className="w-4 h-4" /> Deploy to Azure</>}
            </button>
         </div>

      </form>
    </div>
  );
}
