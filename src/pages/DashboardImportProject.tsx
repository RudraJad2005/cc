import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { FolderPlus, Rocket, Upload, Terminal, Database, HardDrive, Cpu, Activity, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  
  // New State for Analysis
  const [analysisPhase, setAnalysisPhase] = useState<'idle' | 'scanning' | 'complete'>('idle');

  // Scroll to bottom of logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !file) {
      setErrorMsg('Please provide a project name and upload a ZIP file.');
      return;
    }
    
    setErrorMsg('');
    setAnalysisPhase('scanning');
    
    // Simulate 2.5 second scan
    setTimeout(() => {
      setAnalysisPhase('complete');
    }, 2500);
  };

  const handleDeploy = async () => {
    if (!user || !file) return;

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

      let finalStatus = 'Ready';
      if (deployStatus === 'error') {
        finalStatus = 'Error';
      } else {
        // Force update the project status to Ready so it doesn't stay stuck on Building
        await supabase.from('projects').update({ status: 'Ready' }).eq('name', name).eq('user_id', user.id);
      }

      await supabase.from('activity').insert({
        user_id: user.id,
        action: 'deployed project',
        target: name,
        status: finalStatus.toLowerCase()
      });

      if (finalStatus !== 'Error') {
        setTimeout(() => navigate('/dashboard/projects'), 2000);
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
         <p className="text-gray-400">Upload your source code to detect infrastructure and deploy instantly.</p>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-8">

         {/* Phase 1: Details & Upload */}
         {analysisPhase === 'idle' && (
           <form onSubmit={handleAnalyze} className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              <h2 className="text-lg font-medium text-white mb-2">Select Source</h2>
              
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

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={!name || !file} className="bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50">
                  <Activity className="w-4 h-4" /> Analyze Repository
                </button>
              </div>
           </form>
         )}

         {/* Phase 2: Scanning Animation */}
         {analysisPhase === 'scanning' && (
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#050505] border border-white/[0.08] rounded-2xl p-16 flex flex-col items-center justify-center gap-6">
             <div className="relative">
               <div className="w-16 h-16 rounded-full border border-blue-500/30 flex items-center justify-center animate-[spin_3s_linear_infinite]">
                 <div className="w-full h-1/2 absolute top-0 rounded-t-full bg-gradient-to-b from-blue-500/40 to-transparent blur-md" />
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <Activity className="w-6 h-6 text-blue-400" />
               </div>
             </div>
             <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-white mb-2">Analyzing Architecture</h3>
                <p className="text-gray-400 text-sm font-mono text-center max-w-xs">Scanning AST... Detecting framework... Identifying infrastructure dependencies...</p>
             </div>
           </motion.div>
         )}

         {/* Phase 3: Infrastructure Detection Graph */}
         {analysisPhase === 'complete' && deployStatus === 'idle' && (
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
              <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-8 overflow-hidden relative">
                 <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                 
                 <div className="relative z-10 flex flex-col items-center">
                    <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-1.5 rounded-full text-sm font-medium mb-12">
                       <CheckCircle2 className="w-4 h-4" /> Infrastructure Identified
                    </div>

                    {/* Node Graph */}
                    <div className="flex items-center justify-center w-full relative h-[300px]">
                       
                       {/* SVG Lines connecting nodes */}
                       <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 300">
                          {/* Top line to Postgres */}
                          <motion.path d="M 300 150 C 400 150, 450 70, 550 70" stroke="url(#gradient-green)" strokeWidth="2" fill="none" strokeDasharray="6 6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                          <circle cx="550" cy="70" r="4" fill="#4ade80" />
                          
                          {/* Bottom line to S3 */}
                          <motion.path d="M 300 150 C 400 150, 450 230, 550 230" stroke="url(#gradient-blue)" strokeWidth="2" fill="none" strokeDasharray="6 6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
                          <circle cx="550" cy="230" r="4" fill="#60a5fa" />

                          {/* Data packets traveling on lines */}
                          <motion.circle r="3" fill="#fff" filter="blur(2px)">
                             <animateMotion dur="2s" repeatCount="indefinite" path="M 300 150 C 400 150, 450 70, 550 70" />
                          </motion.circle>
                          <motion.circle r="3" fill="#fff" filter="blur(2px)">
                             <animateMotion dur="2.5s" repeatCount="indefinite" path="M 300 150 C 400 150, 450 230, 550 230" />
                          </motion.circle>

                          <defs>
                             <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                <stop offset="100%" stopColor="#4ade80" />
                             </linearGradient>
                             <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                <stop offset="100%" stopColor="#60a5fa" />
                             </linearGradient>
                          </defs>
                       </svg>

                       {/* Central Compute Node */}
                       <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="absolute left-[260px] top-[110px] w-20 h-20 rounded-2xl border border-white/20 bg-[#111] shadow-[0_0_40px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center z-10">
                          <Cpu className="w-8 h-8 text-white mb-1" />
                          <span className="text-[10px] font-mono font-bold text-gray-400">COMPUTE</span>
                       </motion.div>

                       {/* Output Node 1 (Postgres) */}
                       <motion.div initial={{ scale: 0, x: -20 }} animate={{ scale: 1, x: 0 }} transition={{ delay: 0.8 }} className="absolute left-[560px] top-[40px] w-[180px] bg-[#0A0A0A] border border-green-500/30 rounded-xl p-3 flex items-center gap-3 shadow-[0_0_20px_rgba(74,222,128,0.1)]">
                          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                             <Database className="w-5 h-5 text-green-400" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-white text-sm font-medium">PostgreSQL</span>
                             <span className="text-gray-500 text-xs font-mono">Auto-provisioned</span>
                          </div>
                       </motion.div>

                       {/* Output Node 2 (Storage) */}
                       <motion.div initial={{ scale: 0, x: -20 }} animate={{ scale: 1, x: 0 }} transition={{ delay: 1 }} className="absolute left-[560px] top-[200px] w-[180px] bg-[#0A0A0A] border border-blue-500/30 rounded-xl p-3 flex items-center gap-3 shadow-[0_0_20px_rgba(96,165,250,0.1)]">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                             <HardDrive className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-white text-sm font-medium">Blob Storage</span>
                             <span className="text-gray-500 text-xs font-mono">Auto-provisioned</span>
                          </div>
                       </motion.div>

                    </div>
                 </div>
              </div>

              <div className="flex justify-end pt-2">
                 <button onClick={handleDeploy} className="bg-white text-black px-8 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-black" /> Provision & Deploy
                 </button>
              </div>
           </motion.div>
         )}

         {/* Phase 4: Terminal Logs (Deploying) */}
         {deployStatus !== 'idle' && (
           <div className="bg-black border border-white/[0.1] rounded-xl overflow-hidden flex flex-col shadow-2xl">
             <div className="bg-[#111] border-b border-white/[0.05] px-4 py-3 flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <Terminal className="w-4 h-4 text-gray-400" />
                 <span className="text-xs font-mono text-gray-400">Live Infrastructure Provisioning & Build ({deployStatus})</span>
               </div>
               {loading && <div className="w-3 h-3 rounded-full border-2 border-white/20 border-t-white animate-spin" />}
             </div>
             <div className="p-4 font-mono text-sm h-80 overflow-y-auto custom-scrollbar flex flex-col gap-1.5">
               {logs.map((log, i) => (
                 <div key={i} className={log.includes('ERROR') ? 'text-red-400 font-medium' : log.includes('SUCCESS') ? 'text-green-400 font-medium' : 'text-gray-300'}>
                   {log}
                 </div>
               ))}
               <div ref={logsEndRef} />
             </div>
           </div>
         )}

      </div>
    </div>
  );
}
