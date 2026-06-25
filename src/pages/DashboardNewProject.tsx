import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { FolderPlus, Globe, Rocket, Upload, Terminal } from 'lucide-react';

export function DashboardNewProject() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [name, setName] = useState('');
  const [framework, setFramework] = useState('Next.js');
  const [url, setUrl] = useState('');
  const [isSandbox, setIsSandbox] = useState(false);
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

  const categoriesData = [
    {
      id: 'web',
      name: 'Web Dev',
      frameworks: [
        { name: 'Next.js', icon: 'https://api.iconify.design/simple-icons:nextdotjs.svg?color=white' },
        { name: 'React', icon: 'https://api.iconify.design/simple-icons:react.svg?color=%2361DAFB' },
        { name: 'Astro', icon: 'https://api.iconify.design/simple-icons:astro.svg?color=white' },
        { name: 'Svelte', icon: 'https://api.iconify.design/simple-icons:svelte.svg?color=%23FF3E00' },
        { name: 'Vue', icon: 'https://api.iconify.design/simple-icons:vuedotjs.svg?color=%234FC08D' },
        { name: 'Angular', icon: 'https://api.iconify.design/simple-icons:angular.svg?color=%23DD0031' },
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      frameworks: [
        { name: 'Express', icon: 'https://api.iconify.design/simple-icons:express.svg?color=white' },
        { name: 'NestJS', icon: 'https://api.iconify.design/simple-icons:nestjs.svg?color=%23E0234E' },
        { name: 'FastAPI', icon: 'https://api.iconify.design/simple-icons:fastapi.svg?color=%23009688' },
        { name: 'Django', icon: 'https://api.iconify.design/simple-icons:django.svg?color=%23092E20' },
      ]
    },
    {
      id: 'ai',
      name: 'AI / Machine Learning',
      frameworks: [
        { name: 'LangChain', icon: 'https://api.iconify.design/simple-icons:langchain.svg?color=white' },
        { name: 'PyTorch', icon: 'https://api.iconify.design/simple-icons:pytorch.svg?color=%23EE4C2C' },
        { name: 'TensorFlow', icon: 'https://api.iconify.design/simple-icons:tensorflow.svg?color=%23FF6F00' },
      ]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0].id);
  const activeCategory = categoriesData.find(c => c.id === selectedCategory) || categoriesData[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setErrorMsg('');

    const selectedIcon = activeCategory.frameworks.find(f => f.name === framework)?.icon || 'https://api.iconify.design/simple-icons:github.svg?color=white';

    // Create Project in DB
    const { error: dbError } = await supabase.from('projects').insert({
      user_id: user.id,
      name,
      framework,
      url: url || `${name}.collabcode.app`,
      icon: selectedIcon,
      status: 'Ready',
      branch: 'sandbox'
    });

    if (dbError && !dbError.message.includes('duplicate key')) {
      setErrorMsg(dbError.message || 'Failed to create project record.');
      setLoading(false);
      return;
    }

    await supabase.from('activity').insert({
      user_id: user.id,
      action: 'created project',
      target: name,
      status: 'success'
    });

    // Redirect to native IDE
    navigate(`/dashboard/projects/${name}/editor`);
  };

  return (
    <div className="max-w-[800px] mx-auto w-full pb-20">
      
      <div className="mb-10">
         <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Create a new Project</h1>
         <p className="text-gray-400">Choose a framework to boot up instantly in the Native IDE.</p>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">

         {/* 1. Category Selection */}
         <div className="flex gap-4 border-b border-white/[0.08] pb-1 overflow-x-auto no-scrollbar">
            {categoriesData.map(cat => (
               <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                     setSelectedCategory(cat.id);
                     setFramework(cat.frameworks[0].name);
                  }}
                  className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${selectedCategory === cat.id ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
               >
                  {cat.name}
               </button>
            ))}
         </div>

         {/* 2. Framework Grid */}
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {activeCategory.frameworks.map((fw) => (
               <div 
                  key={fw.name}
                  onClick={() => setFramework(fw.name)}
                  className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center justify-center gap-3 transition-all ${framework === fw.name ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-white/[0.08] bg-[#050505] hover:border-white/[0.2] hover:bg-white/[0.02]'}`}
               >
                  <img src={fw.icon} alt={fw.name} className="w-8 h-8 object-contain" />
                  <span className={`text-sm font-medium ${framework === fw.name ? 'text-blue-400' : 'text-gray-300'}`}>{fw.name}</span>
               </div>
            ))}
         </div>
         
         {/* 3. Details & Upload */}
         <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 mt-4">
            <h2 className="text-lg font-medium text-white mb-2">Project Settings</h2>
            
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
               <p className="text-xs text-gray-500 mt-1">This will be used as your project identifier.</p>
            </div>
         </div>

         <div className="flex justify-end pt-4 border-t border-white/[0.08]">
            <button 
               type="submit" 
               disabled={loading || !name}
               className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {loading ? 'Creating...' : 'Create Project'}
            </button>
         </div>

      </form>

    </div>
  );
}
