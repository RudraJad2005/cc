import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { FolderPlus, Globe, Rocket } from 'lucide-react';

export function DashboardNewProject() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [name, setName] = useState('');
  const [framework, setFramework] = useState('Next.js');
  const [url, setUrl] = useState('');
  const [isSandbox, setIsSandbox] = useState(false);
  
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
      id: 'app',
      name: 'App Dev',
      frameworks: [
        { name: 'React Native', icon: 'https://api.iconify.design/simple-icons:react.svg?color=%2361DAFB' },
        { name: 'Flutter', icon: 'https://api.iconify.design/simple-icons:flutter.svg?color=%2302569B' },
        { name: 'Swift', icon: 'https://api.iconify.design/simple-icons:swift.svg?color=%23F05138' },
        { name: 'Kotlin', icon: 'https://api.iconify.design/simple-icons:kotlin.svg?color=%237F52FF' },
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      frameworks: [
        { name: 'Node.js', icon: 'https://api.iconify.design/simple-icons:nodedotjs.svg?color=%23339933' },
        { name: 'Express', icon: 'https://api.iconify.design/simple-icons:express.svg?color=white' },
        { name: 'Django', icon: 'https://api.iconify.design/simple-icons:django.svg?color=%23092E20' },
        { name: 'Flask', icon: 'https://api.iconify.design/simple-icons:flask.svg?color=white' },
        { name: 'Go', icon: 'https://api.iconify.design/simple-icons:go.svg?color=%2300ADD8' },
      ]
    },
    {
      id: 'ml',
      name: 'ML & AI',
      frameworks: [
        { name: 'TensorFlow', icon: 'https://api.iconify.design/simple-icons:tensorflow.svg?color=%23FF6F00' },
        { name: 'PyTorch', icon: 'https://api.iconify.design/simple-icons:pytorch.svg?color=%23EE4C2C' },
        { name: 'Scikit-learn', icon: 'https://api.iconify.design/simple-icons:scikitlearn.svg?color=%23F7931E' },
        { name: 'OpenAI', icon: 'https://api.iconify.design/simple-icons:openai.svg?color=white' },
      ]
    },
    {
      id: 'data',
      name: 'Data Science',
      frameworks: [
        { name: 'Python', icon: 'https://api.iconify.design/simple-icons:python.svg?color=%233776AB' },
        { name: 'Jupyter', icon: 'https://api.iconify.design/simple-icons:jupyter.svg?color=%23F37626' },
        { name: 'Pandas', icon: 'https://api.iconify.design/simple-icons:pandas.svg?color=%23150458' },
        { name: 'R', icon: 'https://api.iconify.design/simple-icons:r.svg?color=%23276DC3' },
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

    const { error } = await supabase.from('projects').insert({
      user_id: user.id,
      name,
      framework,
      url: url || `${name}.collabcode.app`,
      icon: selectedIcon,
      status: 'Ready',
      branch: isSandbox ? 'sandbox' : 'main'
    });

    if (!error) {
      await supabase.from('activity').insert({
        user_id: user.id,
        action: 'created project',
        target: name,
        status: 'success'
      });
      navigate('/dashboard');
    } else {
      console.error(error);
      setErrorMsg(error.message || 'Failed to create project.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto w-full pb-20">
      
      <div className="mb-10">
         <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Create a new Project</h1>
         <p className="text-gray-400">Import your repository and deploy to Collab Code instantly.</p>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm font-medium">
          {errorMsg}
          {errorMsg.includes('relation "projects" does not exist') && (
            <span className="block mt-1 text-red-300 font-normal">
              It looks like the database tables haven't been created yet! Please copy the SQL from the <b>schema.md</b> file and run it in your Supabase SQL Editor.
            </span>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
         
         {/* Sandbox Toggle */}
         <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex items-center justify-between">
            <div>
               <h2 className="text-lg font-medium text-white mb-1">Sandbox Mode</h2>
               <p className="text-sm text-gray-400">Create a lightweight environment for rapid prototyping and learning.</p>
            </div>
            <button
               type="button"
               onClick={() => setIsSandbox(!isSandbox)}
               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isSandbox ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
               <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isSandbox ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
         </div>

         {/* Category & Framework Selection */}
         <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
            
            <div>
               <h2 className="text-lg font-medium text-white mb-4">1. What are you building?</h2>
               <div className="flex flex-wrap gap-2">
                  {categoriesData.map(cat => (
                     <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                           setSelectedCategory(cat.id);
                           setFramework(cat.frameworks[0].name);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                           selectedCategory === cat.id 
                           ? 'bg-white text-black border-white' 
                           : 'bg-[#0A0A0A] text-gray-400 border-white/[0.1] hover:text-white hover:border-white/[0.2]'
                        }`}
                     >
                        {cat.name}
                     </button>
                  ))}
               </div>
            </div>

            <div className="h-px w-full bg-white/[0.05]"></div>

            <div>
               <h2 className="text-lg font-medium text-white mb-4">2. Select Framework</h2>
               <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {activeCategory.frameworks.map(f => (
                     <button 
                        key={f.name}
                        type="button"
                        onClick={() => setFramework(f.name)}
                        className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                           framework === f.name 
                           ? 'border-blue-500 bg-blue-500/10' 
                           : 'border-white/[0.1] bg-[#0A0A0A] hover:bg-white/[0.05]'
                        }`}
                     >
                        <img src={f.icon} alt={f.name} className="w-6 h-6 object-contain drop-shadow-md" />
                        <span className="text-sm font-medium text-white">{f.name}</span>
                     </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Details */}
         <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
            <h2 className="text-lg font-medium text-white mb-2">Project Details</h2>
            
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

            <div className="flex flex-col gap-2">
               <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Custom Domain (Optional)
               </label>
               <input 
                  type="text" 
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder={`${name ? name : 'app'}.collabcode.app`}
                  className="bg-[#020202] border border-white/[0.1] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/[0.3] transition-colors"
               />
            </div>
         </div>

         <div className="flex justify-end pt-4 border-t border-white/[0.08]">
            <button 
               type="submit" 
               disabled={loading || !name}
               className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {loading ? 'Creating...' : <><Rocket className="w-4 h-4" /> Deploy Project</>}
            </button>
         </div>

      </form>

    </div>
  );
}
