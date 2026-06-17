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
  
  const frameworks = [
    { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
    { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Astro', icon: 'https://cdn.simpleicons.org/astro/white' },
    { name: 'Express', icon: 'https://cdn.simpleicons.org/express/white' },
    { name: 'Svelte', icon: 'https://cdn.simpleicons.org/svelte/FF3E00' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setErrorMsg('');

    const selectedIcon = frameworks.find(f => f.name === framework)?.icon;

    const { error } = await supabase.from('projects').insert({
      user_id: user.id,
      name,
      framework,
      url: url || `${name}.collabcode.app`,
      icon: selectedIcon,
      status: 'Ready',
      branch: 'main'
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
         
         {/* Framework Selection */}
         <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-medium text-white mb-6">Select Framework</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
               {frameworks.map(f => (
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
