import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, GitBranch, Webhook, Database, Cloud, Search, Terminal, Boxes, Bell, BarChart3, Lock, Workflow, Plus } from 'lucide-react';
import { PageHero } from '../components/PageHero';

// Reusable Crosshair component
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

// Custom SVG Icons for Brands
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function GitlabIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.955 8.452l-2.288-7.042c-.22-.676-1.17-.676-1.39 0l-1.923 5.92H5.646l-1.923-5.92c-.22-.676-1.17-.676-1.39 0L.045 8.452a1.474 1.474 0 00.536 1.648l11.419 8.293L12 18.5l.001-.001.001.001 11.418-8.293a1.474 1.474 0 00.535-1.655z" />
    </svg>
  );
}

function VercelIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  );
}

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 122.8 122.8" fill="currentColor" className={className}>
      <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"/>
      <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"/>
      <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"/>
      <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"/>
    </svg>
  );
}

function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 57" fill="currentColor" className={className}>
      <path d="M19 28.5a9.5 9.5 0 1 1 0-19 9.5 9.5 0 0 1 0 19z" fill="#1abcfe"/>
      <path d="M0 28.5a9.5 9.5 0 1 1 19 0v9.5H9.5A9.5 9.5 0 0 1 0 28.5z" fill="#0acf83"/>
      <path d="M19 0h9.5A9.5 9.5 0 1 1 19 19V0z" fill="#ff7262"/>
      <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="#f24e1e"/>
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff"/>
    </svg>
  );
}

function LinearIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886zM7 4.908l10.244 7.092L7 19.092V4.908z" />
    </svg>
  );
}

export function Integrations() {
  return (
    <main className="w-full flex-1 flex flex-col bg-black text-white selection:bg-white selection:text-black">
      
      <div className="relative z-10 flex flex-col w-full">
         {/* Hero */}
         <PageHero
            layout="centered"
            bgPattern="none"
            glowColor="none"
            titleClassName="text-5xl md:text-[6rem] lg:text-[8rem] font-black tracking-tighter text-white"
            title="Connect your toolchain."
            description="Collab Code integrates deeply with the tools you already use. From version control to deployment and issue tracking, keep your workflow uninterrupted."
            primaryCta={{
              text: "Browse Directory",
              href: "#",
              icon: <span className="w-3 h-3 bg-black rounded-sm" />
            }}
            secondaryCta={{
              text: "Build an App",
              href: "#"
            }}
          />

          {/* Vercel Strict Grid Architecture Container */}
          <section className="bg-black border-y border-white/[0.1] relative">
             <div className="max-w-[1200px] mx-auto border-x border-white/[0.1] relative">

                {/* 1. VISUAL INTEGRATIONS GRID */}
                <div className="flex flex-col border-b border-white/[0.1] relative">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   
                   {/* Top Header Row */}
                   <div className="text-center py-24 px-6 relative">
                      <div className="inline-flex items-center justify-center gap-2 text-gray-400 mb-6 text-xs font-mono uppercase tracking-widest">
                         <Workflow className="w-3 h-3" /> Extensibility
                      </div>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white mb-6">Seamless ecosystem.</h2>
                      <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                         Connect your codebase to your preferred services via webhooks, native OAuth integrations, and automated pipelines.
                      </p>
                   </div>

                   {/* 3-Column Visual Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-3 relative border-t border-white/[0.1]">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />

                      {/* Col 1: Webhook */}
                      <div className="col-span-1 border-r border-white/[0.1] p-10 lg:p-16 flex items-center justify-center h-[300px]">
                         <div className="w-full max-w-[280px] flex flex-col gap-3 font-mono text-[10px]">
                            <div className="p-3 border border-white/[0.1] bg-[#050505] rounded flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-emerald-400" />
                               <span className="text-gray-400">POST /api/webhooks/github 200 OK</span>
                            </div>
                            <div className="p-3 border border-white/[0.1] bg-[#050505] rounded flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-emerald-400" />
                               <span className="text-gray-400">POST /api/webhooks/slack 200 OK</span>
                            </div>
                            <div className="p-3 border border-white/[0.1] bg-[#050505] rounded flex items-center gap-2 opacity-50">
                               <div className="w-2 h-2 rounded-full bg-emerald-400" />
                               <span className="text-gray-400">POST /api/webhooks/linear 200 OK</span>
                            </div>
                         </div>
                      </div>

                      {/* Col 2: OAuth / PRs */}
                      <div className="col-span-1 border-r border-white/[0.1] p-10 lg:p-16 flex items-center justify-center h-[300px]">
                         <div className="w-full max-w-[280px] rounded-lg border border-white/[0.1] bg-[#050505] p-4 text-[12px]">
                            <div className="flex items-center gap-2 mb-4 text-white">
                               <GithubIcon className="w-4 h-4" /> fix/auth-flow
                            </div>
                            <div className="flex flex-col gap-2">
                               <div className="flex items-center gap-2 text-gray-400">
                                  <div className="w-2 h-2 rounded-full bg-emerald-400" /> Vercel build successful
                               </div>
                               <div className="flex items-center gap-2 text-gray-400">
                                  <div className="w-2 h-2 rounded-full bg-emerald-400" /> 1 approved review
                               </div>
                            </div>
                            <button className="mt-4 w-full py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                               Squash and Merge
                            </button>
                         </div>
                      </div>

                      {/* Col 3: Cloud Node */}
                      <div className="col-span-1 p-10 lg:p-16 flex items-center justify-center h-[300px] relative overflow-hidden">
                         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03),_transparent_70%)] pointer-events-none" />
                         <div className="relative w-full aspect-square flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full border border-white/[0.1] bg-[#050505] flex items-center justify-center z-20">
                               <Database className="w-5 h-5 text-white" />
                            </div>
                            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 200 200">
                               <path d="M 100 100 L 160 50" stroke="#fff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4" />
                               <path d="M 100 100 L 170 120" stroke="#fff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4" />
                               <path d="M 100 100 L 130 180" stroke="#fff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4" />
                            </svg>
                         </div>
                      </div>
                   </div>

                   {/* 3-Column Text Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-3 relative border-t border-white/[0.1]">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />

                      <div className="col-span-1 border-r border-white/[0.1] p-10 lg:p-12">
                         <h3 className="text-xl font-medium text-white mb-4">Event Streams</h3>
                         <p className="text-gray-400 text-sm leading-relaxed">Listen to repository events via native webhooks to trigger downstream CI/CD pipelines.</p>
                      </div>
                      <div className="col-span-1 border-r border-white/[0.1] p-10 lg:p-12">
                         <h3 className="text-xl font-medium text-white mb-4">Native Git</h3>
                         <p className="text-gray-400 text-sm leading-relaxed">Don't compromise your workflow. Rebasing, squashing, and PR reviews happen directly in the editor.</p>
                      </div>
                      <div className="col-span-1 p-10 lg:p-12">
                         <h3 className="text-xl font-medium text-white mb-4">Cloud Resources</h3>
                         <p className="text-gray-400 text-sm leading-relaxed">Provision isolated database branches natively connected to your development workspace.</p>
                      </div>
                   </div>
                </div>

                {/* 2. APP DIRECTORY GRID */}
                <div className="flex flex-col relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="col-span-3 p-16 md:py-24 text-center">
                         <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white">Integration Directory</h2>
                      </div>
                   </div>

                   {/* Grid Row 1 */}
                   <div className="grid grid-cols-1 md:grid-cols-3 relative border-t border-white/[0.1]">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />

                      {[
                         { icon: <GithubIcon className="w-8 h-8 text-white"/>, title: 'GitHub', desc: 'Sync repositories, manage pull requests, and resolve merge conflicts.' },
                         { icon: <GitlabIcon className="w-8 h-8 text-white"/>, title: 'GitLab', desc: 'Native support for GitLab repositories, CI/CD pipelines, and MR workflows.' },
                         { icon: <VercelIcon className="w-8 h-8 text-white"/>, title: 'Vercel', desc: 'Automatically deploy preview environments for every branch.' },
                      ].map((item, i) => (
                         <div key={i} className={`col-span-1 p-10 lg:p-12 hover:bg-white/[0.02] transition-colors ${i < 2 ? 'border-r border-white/[0.1]' : ''}`}>
                            <div className="mb-6">{item.icon}</div>
                            <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                            <p className="text-gray-500 text-[15px] leading-relaxed">{item.desc}</p>
                         </div>
                      ))}
                   </div>

                   {/* Grid Row 2 */}
                   <div className="grid grid-cols-1 md:grid-cols-3 relative border-t border-white/[0.1]">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />

                      {[
                         { icon: <SlackIcon className="w-8 h-8 text-white"/>, title: 'Slack', desc: 'Get notifications for build statuses, review requests, and workspace invites.' },
                         { icon: <FigmaIcon className="w-7 h-8 text-white"/>, title: 'Figma', desc: 'Embed live Figma designs directly next to your code to ensure pixel-perfect implementation.' },
                         { icon: <LinearIcon className="w-8 h-8 text-white"/>, title: 'Linear & Jira', desc: 'Link code changes to issues. Automatically update issue status on merge.' },
                      ].map((item, i) => (
                         <div key={i} className={`col-span-1 p-10 lg:p-12 hover:bg-white/[0.02] transition-colors ${i < 2 ? 'border-r border-white/[0.1]' : ''}`}>
                            <div className="mb-6">{item.icon}</div>
                            <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                            <p className="text-gray-500 text-[15px] leading-relaxed">{item.desc}</p>
                         </div>
                      ))}
                   </div>
                </div>

                {/* 3. FRAMEWORKS GRID */}
                <div className="flex flex-col relative border-b border-white/[0.1]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="col-span-2 border-r border-white/[0.1] p-16 md:py-32 md:px-24 flex items-center">
                         <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white">Native framework support.</h2>
                      </div>
                      <div className="col-span-1 p-16 flex items-center justify-center gap-6">
                         <div className="flex items-center gap-2 text-gray-400 font-mono text-sm border border-white/[0.1] px-4 py-2 rounded-full"><Boxes className="w-4 h-4"/> Zero Config</div>
                      </div>
                   </div>

                   {/* Frameworks Row */}
                   <div className="grid grid-cols-1 md:grid-cols-3 relative border-t border-white/[0.1]">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />

                      {[
                         { title: 'Frontend', list: ['React', 'Next.js', 'Vue.js', 'SvelteKit', 'Angular'] },
                         { title: 'Backend', list: ['Node.js', 'Python', 'Go', 'Rust', 'Ruby on Rails'] },
                         { title: 'Databases', list: ['Supabase', 'Neon', 'PlanetScale', 'MongoDB', 'Upstash'] },
                      ].map((item, i) => (
                         <div key={i} className={`col-span-1 p-10 lg:p-12 hover:bg-white/[0.02] transition-colors ${i < 2 ? 'border-r border-white/[0.1]' : ''}`}>
                            <div className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-8">{item.title}</div>
                            <div className="flex flex-col gap-4">
                               {item.list.map((fw, j) => (
                                  <div key={j} className="text-[15px] text-white flex items-center gap-2">
                                     <span className="w-1.5 h-1.5 bg-white/[0.2] rounded-full"></span> {fw}
                                  </div>
                               ))}
                            </div>
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
                   Start integrating today.
                </h3>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <button className="bg-white text-black px-8 py-3 rounded-full text-[15px] font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto text-center whitespace-nowrap">
                      Browse Directory
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
