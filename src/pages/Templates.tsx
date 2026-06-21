import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers, Code2, Server, Sparkles, Smartphone, ArrowRight,
  Star, Zap, GitFork, Rocket, Terminal, Check, Plus
} from 'lucide-react';
import { PageHero } from '../components/PageHero';

type Category = 'All' | 'Full-stack' | 'Frontend' | 'Backend' | 'AI' | 'Mobile';

const categories: { label: Category; icon: any }[] = [
  { label: 'All', icon: Layers },
  { label: 'Full-stack', icon: Layers },
  { label: 'Frontend', icon: Code2 },
  { label: 'Backend', icon: Server },
  { label: 'AI', icon: Sparkles },
  { label: 'Mobile', icon: Smartphone },
];

const templates = [
  { name: 'Next.js SaaS Starter', desc: 'Auth, Stripe billing, and a dashboard — production-ready.', stack: ['Next.js', 'Stripe', 'Postgres'], category: 'Full-stack', glyph: '▲', accent: 'bg-[#0a0a0a]', uses: '12.4k' },
  { name: 'React + Vite SPA', desc: 'A lightning-fast single-page app with Tailwind preconfigured.', stack: ['React', 'Vite', 'Tailwind'], category: 'Frontend', glyph: '⚛', accent: 'bg-[#0a0a0a]', uses: '28.1k' },
  { name: 'AI Chatbot', desc: 'Streaming chat UI wired to Gemini with message history.', stack: ['Next.js', 'Gemini', 'Edge'], category: 'AI', glyph: '✦', accent: 'bg-[#0a0a0a]', uses: '9.7k' },
  { name: 'FastAPI Service', desc: 'Typed Python API with async routes and OpenAPI docs.', stack: ['Python', 'FastAPI', 'Pydantic'], category: 'Backend', glyph: '🐍', accent: 'bg-[#0a0a0a]', uses: '6.3k' },
  { name: 'SvelteKit Blog', desc: 'Markdown-powered blog with RSS and zero-JS pages.', stack: ['SvelteKit', 'MDsveX'], category: 'Frontend', glyph: '◆', accent: 'bg-[#0a0a0a]', uses: '4.1k' },
  { name: 'Expo Mobile App', desc: 'Cross-platform React Native starter with navigation.', stack: ['Expo', 'React Native'], category: 'Mobile', glyph: '◉', accent: 'bg-[#0a0a0a]', uses: '5.8k' },
  { name: 'RAG Pipeline', desc: 'Retrieval-augmented generation with a vector store.', stack: ['Python', 'LangChain', 'pgvector'], category: 'AI', glyph: '⌘', accent: 'bg-[#0a0a0a]', uses: '3.9k' },
  { name: 'Remix Commerce', desc: 'Full storefront with cart, checkout, and product pages.', stack: ['Remix', 'Stripe'], category: 'Full-stack', glyph: '◈', accent: 'bg-[#0a0a0a]', uses: '7.2k' },
  { name: 'Go Microservice', desc: 'Minimal gRPC + REST service with graceful shutdown.', stack: ['Go', 'gRPC', 'Docker'], category: 'Backend', glyph: '⟁', accent: 'bg-[#0a0a0a]', uses: '4.6k' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

// Reusable Crosshair component
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

export function Templates() {
  const [active, setActive] = useState<Category>('All');
  const filtered = active === 'All' ? templates : templates.filter((t) => t.category === active);

  return (
    <main className="w-full flex-1 flex flex-col bg-black text-white selection:bg-white selection:text-black">
      
      <div className="relative z-10 flex flex-col w-full">
         {/* Hero */}
         <PageHero
            layout="centered"
            bgPattern="none"
            glowColor="none"
            titleClassName="text-5xl md:text-[6rem] lg:text-[8rem] font-black tracking-tighter text-white"
            title="Start from a template."
            description="Pre-configured, production-ready starters that boot into a live cloud workspace in seconds. No installs, no config — just open and code."
            primaryCta={{
              text: "Browse templates",
              href: "#",
              icon: <span className="w-3 h-3 bg-black rounded-sm" />
            }}
            secondaryCta={{
              text: "Submit a template",
              href: "#"
            }}
          />

          {/* Vercel Strict Grid Architecture Container */}
          <section className="bg-black border-y border-white/[0.1] relative">
             <div className="max-w-[1200px] mx-auto border-x border-white/[0.1] relative">

                {/* Sticky filter bar perfectly aligned inside the grid */}
                <div className="sticky top-[64px] z-30 bg-black/80 backdrop-blur-xl border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   <div className="flex items-center gap-2 overflow-x-auto p-4 no-scrollbar">
                     {categories.map((c) => {
                       const Icon = c.icon;
                       const on = active === c.label;
                       return (
                         <button
                           key={c.label}
                           onClick={() => setActive(c.label)}
                           className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 border ${
                             on
                               ? 'bg-white text-black border-white'
                               : 'text-gray-400 border-transparent hover:text-white hover:border-white/20'
                           }`}
                         >
                           <Icon className="w-3.5 h-3.5" />
                           {c.label}
                         </button>
                       );
                     })}
                   </div>
                </div>

                {/* 1. TEMPLATES MATRIX */}
                <div className="flex flex-col relative border-b border-white/[0.1]">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {filtered.map((t, i) => (
                         <div 
                            key={t.name}
                            className={`group flex flex-col relative p-8 lg:p-10 hover:bg-white/[0.02] transition-colors border-b border-white/[0.1]
                            ${(i % 3 !== 2) ? 'lg:border-r border-white/[0.1]' : ''} 
                            ${(i % 2 !== 1) ? 'md:border-r border-white/[0.1] lg:border-r-0' : ''} 
                            ${(i % 3 !== 2 && i % 2 !== 1) ? 'lg:border-r md:border-r border-white/[0.1]' : ''}
                            `}
                         >
                            <Crosshair className="-top-1.5 -left-1.5" />
                            <Crosshair className="-top-1.5 -right-1.5" />
                            
                            {/* preview thumbnail */}
                            <div className="relative h-40 border border-white/[0.1] bg-[#050505] overflow-hidden mb-6 flex items-center justify-center">
                              <div className="text-5xl text-white group-hover:scale-110 transition-transform duration-500">
                                {t.glyph}
                              </div>
                              <span className="absolute bottom-3 right-3 text-[10px] font-mono uppercase tracking-widest text-gray-500 px-2 py-0.5 border border-white/[0.1] bg-black">
                                {t.category}
                              </span>
                            </div>

                            {/* body */}
                            <div className="flex flex-col flex-1">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <h3 className="text-xl font-medium text-white tracking-tight">{t.name}</h3>
                                <span className="shrink-0 inline-flex items-center gap-1 text-[11px] text-[#888]">
                                  <Star className="w-3 h-3 text-white" /> {t.uses}
                                </span>
                              </div>
                              <p className="text-gray-500 text-[14px] leading-relaxed mb-6 flex-1">{t.desc}</p>
                              
                              <div className="flex flex-wrap gap-1.5 mb-8">
                                {t.stack.map((s) => (
                                  <span key={s} className="px-2 py-1 border border-white/[0.1] text-[11px] font-mono text-gray-400">{s}</span>
                                ))}
                              </div>
                              
                              <div className="flex items-center gap-2 mt-auto">
                                <button className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 border border-white/[0.2] text-white hover:bg-white hover:text-black transition-colors text-[13px] font-medium">
                                  Deploy
                                </button>
                                <button className="w-10 h-10 shrink-0 border border-white/[0.2] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.1] transition-colors" title="Fork">
                                  <GitFork className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* 2. HOW IT WORKS GRID */}
                <div className="flex flex-col relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="col-span-2 border-r border-white/[0.1] p-16 md:py-32 md:px-24 flex flex-col justify-center">
                         <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-6">From template to running app.</h2>
                         <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                            Every template is more than source code — it’s a snapshot of a fully provisioned environment. Pick one and you’re instantly inside a live, dependency-installed workspace.
                         </p>
                      </div>
                      <div className="col-span-1 p-16 flex items-center justify-center gap-6">
                         <div className="flex items-center gap-2 text-gray-400 font-mono text-sm border border-white/[0.1] px-4 py-2 rounded-full"><Terminal className="w-4 h-4"/> Zero setup</div>
                      </div>
                   </div>

                   {/* Steps Row */}
                   <div className="grid grid-cols-1 md:grid-cols-4 relative border-t border-white/[0.1]">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 left-[25%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[75%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />

                      {[
                         { n: '01', icon: <Layers className="w-4 h-4 text-gray-500"/>, title: 'Pick a template', desc: 'Choose from full-stack apps, AI starters, APIs, and mobile.' },
                         { n: '02', icon: <Zap className="w-4 h-4 text-gray-500"/>, title: 'Instant Boot', desc: 'A cloud microVM hydrates from a snapshot with dependencies installed.' },
                         { n: '03', icon: <Code2 className="w-4 h-4 text-gray-500"/>, title: 'Start coding', desc: 'The dev server is already running with hot reload.' },
                         { n: '04', icon: <Rocket className="w-4 h-4 text-gray-500"/>, title: 'Deploy', desc: 'Ship to the edge straight from the workspace.' },
                      ].map((item, i) => (
                         <div key={i} className={`col-span-1 p-10 lg:p-12 group hover:bg-white/[0.02] transition-colors ${i < 3 ? 'border-r border-white/[0.1]' : ''}`}>
                            <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/[0.1]">
                               <h3 className="text-xl font-medium text-white">{item.title}</h3>
                               <span className="font-mono text-[10px] text-gray-500">{item.n}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400 font-mono mb-4">
                               {item.icon} {item.title}
                            </div>
                            <p className="text-gray-500 text-[15px] leading-relaxed">{item.desc}</p>
                         </div>
                      ))}
                   </div>
                </div>

                {/* 3. REASSURANCE STRIP GRID */}
                <div className="flex flex-col relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   <div className="grid grid-cols-2 md:grid-cols-4 relative">
                      {[
                         { v: '0s', l: 'Local setup' },
                         { v: '120+', l: 'Templates' },
                         { v: '1-click', l: 'Deploy' },
                         { v: 'Always', l: 'Up to date' },
                      ].map((s, i) => (
                         <div key={i} className={`col-span-1 p-8 md:p-12 text-center hover:bg-white/[0.02] transition-colors ${i < 3 ? 'border-r border-white/[0.1]' : ''}`}>
                            <div className="text-3xl md:text-5xl font-semibold tracking-tighter text-white mb-2">{s.v}</div>
                            <div className="text-gray-500 font-mono text-[11px] tracking-widest uppercase">{s.l}</div>
                         </div>
                      ))}
                   </div>
                </div>

             </div>
          </section>

          {/* Continue your AI journey CTA */}
          <section className="py-32 md:py-40 bg-black relative">
             <div className="max-w-4xl mx-auto px-6 text-center">
                <h3 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-10">
                   Your next project is one click away.
                </h3>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <button className="bg-white text-black px-8 py-3 rounded-full text-[15px] font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto text-center whitespace-nowrap">
                      Browse all templates
                   </button>
                   <button className="px-8 py-3 text-white text-[15px] font-medium border border-white/[0.2] hover:bg-white/[0.05] rounded-full transition-colors w-full sm:w-auto text-center whitespace-nowrap">
                      Read Documentation
                   </button>
                </div>
             </div>
          </section>
      </div>
    </main>
  );
}
