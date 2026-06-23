import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Copy,
  Terminal,
  Database,
  Globe,
  Plus,
  Cpu,
  Layers
} from 'lucide-react';
import { useState } from 'react';
import { SiNextdotjs, SiPython, SiRust, SiSvelte, SiVuedotjs, SiNodedotjs, SiGo, SiDjango, SiLaravel, SiSpringboot, SiRubyonrails, SiTailwindcss } from 'react-icons/si';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// Reusable Crosshair
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

const templates = [
  { 
    name: 'Next.js Full-Stack', 
    desc: 'Production-ready Next.js environment configured with Tailwind CSS, TypeScript, and ESLint. Ready for full-stack deployment.',
    tags: ['Next.js', 'React', 'TypeScript'],
    Icon: SiNextdotjs,
    color: 'text-white'
  },
  { 
    name: 'Python FastAPI', 
    desc: 'High-performance Python API server powered by FastAPI, Pre-configured with Uvicorn, SQLAlchemy, and Postgres drivers.',
    tags: ['Python', 'FastAPI', 'Backend'],
    Icon: SiPython,
    color: 'text-blue-400'
  },
  { 
    name: 'Rust Microservice', 
    desc: 'Extremely fast Rust environment using Actix-Web. Pre-configured with Cargo, Rustfmt, and optimized build targets.',
    tags: ['Rust', 'Actix', 'WASM'],
    Icon: SiRust,
    color: 'text-orange-400'
  },
  { 
    name: 'SvelteKit Starter', 
    desc: 'The official SvelteKit starter environment. Lightning fast HMR, pre-configured routing, and server-side rendering.',
    tags: ['Svelte', 'Frontend', 'Vite'],
    Icon: SiSvelte,
    color: 'text-orange-500'
  },
  { 
    name: 'Vue 3 + Vite', 
    desc: 'Modern Vue 3 setup powered by Vite. Includes Vue Router, Pinia for state management, and strict TypeScript support.',
    tags: ['Vue', 'Vite', 'Pinia'],
    Icon: SiVuedotjs,
    color: 'text-emerald-400'
  },
  { 
    name: 'Node.js Express API', 
    desc: 'Classic Node.js backend environment. Pre-configured with Express, Jest for testing, and Nodemon for hot-reloading.',
    tags: ['Node.js', 'Express', 'API'],
    Icon: SiNodedotjs,
    color: 'text-green-500'
  },
  { 
    name: 'Go Fiber Backend', 
    desc: 'Ultra-fast Go environment utilizing the Fiber web framework. Ready for high-concurrency microservices.',
    tags: ['Go', 'Fiber', 'API'],
    Icon: SiGo,
    color: 'text-cyan-400'
  },
  { 
    name: 'Django Monolith', 
    desc: 'The web framework for perfectionists with deadlines. Pre-configured with PostgreSQL and Redis for caching.',
    tags: ['Python', 'Django', 'Full-Stack'],
    Icon: SiDjango,
    color: 'text-emerald-600'
  },
  { 
    name: 'PHP Laravel', 
    desc: 'Elegant PHP framework for web artisans. Includes Eloquent ORM, Blade templating, and Laravel Mix.',
    tags: ['PHP', 'Laravel', 'Backend'],
    Icon: SiLaravel,
    color: 'text-red-500'
  },
  { 
    name: 'Spring Boot Server', 
    desc: 'Enterprise-grade Java environment. Pre-configured with Maven, Spring Web, and Spring Data JPA.',
    tags: ['Java', 'Spring', 'Enterprise'],
    Icon: SiSpringboot,
    color: 'text-green-400'
  },
  { 
    name: 'Ruby on Rails', 
    desc: 'Optimized for developer happiness. Pre-configured with Webpacker, Action Cable, and PostgreSQL.',
    tags: ['Ruby', 'Rails', 'Full-Stack'],
    Icon: SiRubyonrails,
    color: 'text-red-600'
  },
  { 
    name: 'Vanilla + Tailwind', 
    desc: 'A pure, lightweight HTML, JS, and Vite environment pre-configured with the Tailwind CSS compiler.',
    tags: ['HTML', 'Tailwind', 'Vite'],
    Icon: SiTailwindcss,
    color: 'text-sky-400'
  }
];

export function Templates() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('collab init --template nextjs');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-orange-500/30 selection:text-white font-sans">
      
      {/* ───────────────── Hero Section ───────────────── */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden border-b border-white/[0.1] bg-[#000]">
        {/* Strict Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]" />
        
        <motion.div 
          initial="hidden" 
          animate="show" 
          variants={stagger}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl"
        >
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-[80px] font-medium tracking-tighter leading-[1.05] mb-6 text-white">
            Kickstart your next project in <span className="inline-flex items-center justify-center border border-white/[0.2] bg-[#050505] px-4 py-1 text-4xl md:text-5xl translate-y-[-4px] font-mono tracking-widest text-[#888]">SECONDS</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-xl text-[#888] max-w-2xl leading-relaxed mb-10">
            Pre-configured, production-ready cloud environments. Skip the setup and start writing code immediately.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
            {/* Terminal command */}
            <button 
              onClick={handleCopy}
              className="flex items-center gap-4 bg-[#050505] border border-white/[0.2] text-white px-6 py-4 font-mono text-[14px] hover:bg-[#0a0a0a] transition-colors"
            >
              <span className="text-orange-500">$</span> 
              <span>collab init --template nextjs</span>
              {copied ? <Sparkles className="w-4 h-4 ml-2 text-emerald-400" /> : <Copy className="w-4 h-4 ml-2 text-[#666]" />}
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ───────────────── Strict Grid Container ───────────────── */}
      <section className="bg-[#000] relative w-full">
        <div className="max-w-[1200px] mx-auto border-x border-white/[0.1] relative flex flex-col">
          
          {/* Quote Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 border-b border-white/[0.1] relative">
            <Crosshair className="-top-1.5 -left-1.5" />
            <Crosshair className="-top-1.5 -right-1.5" />
            
            <div className="lg:col-span-2 p-12 md:p-24 lg:p-32 border-b lg:border-b-0 lg:border-r border-white/[0.1] flex flex-col justify-center bg-[#000]">
              <span className="text-[#444] text-4xl font-serif mb-6">"</span>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl tracking-tight text-white leading-[1.2] font-medium max-w-2xl">
                We used to spend days configuring local environments for new hires. With Collab Code templates, a new engineer pushes to production on day one.
              </blockquote>
              <span className="text-[#444] text-4xl font-serif mt-6 self-end">"</span>
            </div>
            
            <div className="lg:col-span-1 p-12 md:p-20 flex flex-col justify-center items-start lg:items-center bg-[#050505]">
               <div className="text-left">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#888] mb-2">Alex Mercer, CTO</p>
                  <div className="text-3xl font-bold tracking-tighter flex items-center gap-2 text-white">stripe <ArrowRight className="w-5 h-5 text-[#888]"/></div>
               </div>
            </div>
          </div>

          {/* Templates Title Bar */}
          <div className="p-12 md:p-24 border-b border-white/[0.1] text-center flex flex-col items-center bg-[#000]">
            <div className="flex items-center gap-3 px-4 py-1.5 border border-orange-500/30 bg-orange-500/5 mb-8">
               <div className="w-1.5 h-1.5 bg-orange-400 animate-pulse" />
               <span className="text-xs font-mono uppercase tracking-widest text-orange-400">Environment Gallery</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white mb-6">Production-ready environments.</h2>
            <p className="text-lg text-[#888] max-w-2xl">
              From robust full-stack frameworks to ultra-fast microservices, start with a perfectly configured environment running on high-performance cloud hardware.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative border-b border-white/[0.1] bg-[#000]">
            <Crosshair className="-top-1.5 -left-1.5" />
            <Crosshair className="-top-1.5 -right-1.5" />
            
            {templates.map((t, i) => (
              <div 
                key={t.name}
                className={`flex flex-col p-8 md:p-12 border-b border-white/[0.1] bg-[#000] hover:bg-[#050505] transition-colors cursor-pointer group
                  ${(i % 3 !== 2) ? 'lg:border-r' : ''} 
                  ${(i % 2 !== 1) ? 'md:border-r lg:border-r-0' : ''} 
                  ${(i % 3 !== 2 && i % 2 !== 1) ? 'lg:border-r md:border-r' : ''}
                `}
              >
                {/* Brutalist Mock UI preview */}
                <div className="w-full aspect-[4/3] border border-white/[0.1] bg-[#020202] mb-8 relative overflow-hidden flex flex-col">
                   {/* Strict background grid */}
                   <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                   <div className="flex-1 flex items-center justify-center relative z-10">
                      <t.Icon className={`w-20 h-20 opacity-30 group-hover:opacity-100 ${t.color} transition-all duration-500 transform group-hover:scale-110`} />
                   </div>
                   {/* Top chrome bar */}
                   <div className="absolute top-0 left-0 right-0 h-6 border-b border-white/[0.1] bg-[#050505] flex items-center px-3">
                      <div className="w-1.5 h-1.5 bg-white/[0.2]" />
                   </div>
                </div>

                <h3 className="text-xl font-medium tracking-tight text-white mb-3">{t.name}</h3>
                <p className="text-[#888] text-[14px] leading-relaxed mb-6 flex-1">{t.desc}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[12px] font-mono uppercase tracking-widest text-white group-hover:text-orange-400 transition-colors">Launch Environment <ArrowRight className="w-3 h-3 inline ml-1" /></span>
                  <div className="flex -space-x-2">
                    {t.tags.slice(0, 2).map((tag, j) => (
                      <div key={j} className="w-8 h-8 bg-[#000] border border-white/[0.2] flex items-center justify-center text-[10px] text-[#888] font-mono font-bold" title={tag}>{tag[0]}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ───────────────── Linear-Style Giant CTA Blocks ───────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 relative">
            <Crosshair className="-top-1.5 -left-1.5" />
            <Crosshair className="-top-1.5 -right-1.5" />

            {/* Block 1 (Deep Orange) */}
            <div className="h-[600px] lg:border-r border-b lg:border-b-0 border-white/[0.1] bg-[#ea580c] p-12 lg:p-16 flex flex-col relative overflow-hidden group">
               <div className="text-black text-5xl font-black italic tracking-tighter mix-blend-overlay opacity-30 absolute top-12 left-12">CLI</div>
               
               {/* Decorative terminal block */}
               <div className="flex-1 flex items-center justify-center relative z-10 w-full mb-8 mt-12">
                   <div className="w-full max-w-sm bg-[#000] border border-white/20 p-6 transform group-hover:scale-105 transition-transform duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                      <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                         <Terminal className="w-6 h-6 text-white" />
                         <span className="font-bold tracking-tight text-white">collab-cli</span>
                      </div>
                      <div className="text-white/70 font-mono text-sm leading-relaxed">
                        $ collab pull my-nextjs-app<br/>
                        <span className="text-emerald-400">✓ Workspace synced</span><br/>
                        $ collab serve<br/>
                        <span className="text-emerald-400">✓ Running on port 3000</span>
                      </div>
                   </div>
               </div>

               <div className="relative z-10 text-white mt-auto">
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 leading-[1.1]">The Terminal Native.</h3>
                  <p className="text-white/90 max-w-sm text-lg font-medium">Manage your entire remote environment directly from your local terminal. No context switching.</p>
               </div>
            </div>

            {/* Block 2 (Royal Blue) */}
            <div className="h-[600px] bg-[#2563eb] p-12 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden group">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-20" />
               <div className="absolute -right-10 -top-10 opacity-20 text-white mix-blend-overlay">
                  <Cpu className="w-80 h-80" />
               </div>
               
               <div className="relative z-10 flex-1 flex flex-col justify-end">
                 <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-md mb-6">
                   Need a custom environment?
                 </h3>

                 <div className="flex flex-col gap-6">
                    <p className="text-white/90 text-lg font-medium">Build your own Dockerfile and let Collab Code spin it up on our global edge network in seconds.</p>
                    <button className="bg-white text-black px-8 py-4 text-[14px] font-bold hover:bg-gray-200 transition-colors w-max flex items-center gap-2 shadow-xl">
                       Read the Docs <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
               </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
