import { Search, ExternalLink, Github } from 'lucide-react';

export function DashboardTemplates() {
  const templates = [
    { name: 'Next.js Boilerplate', desc: 'The official Next.js starter with App Router, Tailwind CSS, and ESLint configured.', framework: 'Next.js', tag: 'Official', icon: 'https://api.iconify.design/simple-icons:nextdotjs.svg?color=white' },
    { name: 'Vite + React + TS', desc: 'A blazing fast Vite starter kit featuring React 18, TypeScript, and hot module replacement.', framework: 'React', tag: 'Popular', icon: 'https://api.iconify.design/simple-icons:vite.svg?color=%23646CFF' },
    { name: 'SvelteKit Starter', desc: 'Everything you need to build a Svelte project, powered by create-svelte.', framework: 'Svelte', tag: 'Official', icon: 'https://api.iconify.design/simple-icons:svelte.svg?color=%23FF3E00' },
    { name: 'Express API Base', desc: 'A minimal Node.js Express backend with CORS, body-parser, and basic routing.', framework: 'Express', tag: 'Backend', icon: 'https://api.iconify.design/simple-icons:express.svg?color=white' },
    { name: 'Astro Content Site', desc: 'Build faster websites with Astro. Includes markdown support and a responsive blog layout.', framework: 'Astro', tag: 'Popular', icon: 'https://api.iconify.design/simple-icons:astro.svg?color=white' },
    { name: 'Vue 3 Ecosystem', desc: 'Vue 3 setup with Vite, Pinia for state management, and Vue Router.', framework: 'Vue', tag: 'Official', icon: 'https://api.iconify.design/simple-icons:vuedotjs.svg?color=%234FC08D' },
  ];

  return (
    <div className="flex flex-col gap-10 w-full max-w-[1200px] mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
         <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Deploy a Template</h1>
            <p className="text-gray-400 text-sm">Jumpstart your next project with a pre-configured, production-ready template.</p>
         </div>
         <div className="relative w-full sm:w-80">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
               type="text" 
               placeholder="Search templates..." 
               className="w-full bg-[#050505] border border-white/[0.1] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/[0.3] transition-colors placeholder:text-[#666]"
            />
         </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {templates.map((template, i) => (
            <div key={i} className="group rounded-xl border border-white/[0.08] bg-[#020202] hover:border-white/[0.2] hover:bg-[#080808] transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl">
               
               {/* Visual Mockup Area (Mock Browser) */}
               <div className="h-32 bg-[#0A0A0A] border-b border-white/[0.05] relative overflow-hidden flex flex-col">
                  <div className="h-6 w-full flex items-center px-3 gap-1.5 border-b border-white/[0.05]">
                     <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                     <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                     <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity">
                     <img src={template.icon} alt={template.framework} className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                  </div>
               </div>

               {/* Content */}
               <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                     <span className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-gray-400">
                        {template.tag}
                     </span>
                     <Github className="w-4 h-4 text-gray-600 group-hover:text-gray-300 transition-colors" />
                  </div>
                  
                  <div className="flex-1">
                     <h3 className="font-semibold text-lg text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">{template.name}</h3>
                     <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{template.desc}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-6 mt-auto">
                     <button className="flex-1 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        Deploy
                     </button>
                     <button className="p-2.5 bg-[#050505] border border-white/[0.1] rounded-lg hover:bg-white/[0.1] transition-colors text-gray-400 hover:text-white">
                        <ExternalLink className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
