import React from 'react';
import { motion } from 'motion/react';
import {
  Cpu, Zap, Server, Globe, Activity, Snowflake, Play, Moon, Check, Plus, Database, ActivityIcon, ArrowRight
} from 'lucide-react';
import { PageHero } from '../components/PageHero';

// Reusable Crosshair component
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

export function Compute() {
  return (
    <main className="w-full flex-1 flex flex-col bg-black text-white selection:bg-white selection:text-black">
      
      <div className="relative z-10 flex flex-col w-full">
         {/* Hero */}
         <PageHero
            layout="centered"
            bgPattern="grid-sm"
            glowColor="rgba(255, 255, 255, 0.05)"
            titleClassName="text-5xl md:text-[6rem] lg:text-[8rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 drop-shadow-sm pb-2"
            title="Boundless compute."
            description="Stop waiting for local builds. Every Collab Code workspace is backed by dedicated, high-performance cloud instances."
            primaryCta={{
              text: "Deploy Free Workspace",
              href: "#",
              icon: <span className="w-3 h-3 bg-black rounded-sm" />
            }}
            secondaryCta={{
              text: "View Instance Tiers",
              href: "#"
            }}
          />

          {/* Vercel Strict Grid Architecture Container */}
          <section className="bg-black border-y border-white/[0.08] relative">
             <div className="max-w-[1200px] mx-auto border-x border-white/[0.08] relative">

                {/* 1. VISUAL COMPUTE GRID */}
                <div className="flex flex-col border-b border-white/[0.08] relative">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />
                   
                   {/* Top Header Row */}
                   <div className="text-center py-24 px-6 relative">
                      <div className="inline-flex items-center justify-center gap-2 text-gray-400 mb-6 text-xs font-mono uppercase tracking-widest">
                         <Activity className="w-3 h-3" /> Infrastructure
                      </div>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6">Zero local overhead.</h2>
                      <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                         Spin up servers, databases, and heavy workloads in milliseconds.
                      </p>
                   </div>

                   {/* 3-Column Visual Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-3 relative border-t border-white/[0.08]">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />

                      {/* Col 1: Server Load */}
                      <div className="col-span-1 border-r border-white/[0.08] p-10 lg:p-16 flex items-center justify-center h-[300px]">
                         <div className="w-full h-full flex items-end justify-center gap-2">
                            {[40, 70, 50, 90, 60, 30].map((h, i) => (
                               <motion.div 
                                 key={i}
                                 initial={{ height: "10%" }}
                                 animate={{ height: `${h}%` }}
                                 transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: i * 0.2 }}
                                 className="w-8 bg-white/[0.05] border border-white/[0.08] rounded-t-sm"
                               />
                            ))}
                         </div>
                      </div>

                      {/* Col 2: Terminal */}
                      <div className="col-span-1 border-r border-white/[0.08] p-10 lg:p-16 flex items-center justify-center h-[300px]">
                         <div className="w-full max-w-[280px] rounded-lg border border-white/[0.08] bg-[#050505] p-4 font-mono text-[10px] text-gray-400">
                            <p className="text-white mb-2">~ collab up --tier pro</p>
                            <p className="mb-1 text-gray-500">Provisioning MicroVM...</p>
                            <div className="pl-2 border-l border-white/[0.08] flex flex-col gap-1 mb-2">
                               <span>CPU: 16 dedicated</span>
                               <span>RAM: 64GB DDR4</span>
                            </div>
                            <p className="text-emerald-400">✓ Hydrated in 124ms</p>
                         </div>
                      </div>

                      {/* Col 3: Datacenter Map */}
                      <div className="col-span-1 p-10 lg:p-16 flex items-center justify-center h-[300px] relative overflow-hidden">
                         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03),_transparent_70%)] pointer-events-none" />
                         <div className="relative w-full aspect-square flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full border border-white/[0.08] bg-[#050505] flex items-center justify-center z-20">
                               <Server className="w-5 h-5 text-white" />
                            </div>
                            {/* Ping Rings */}
                            {[1, 2, 3].map((i) => (
                               <motion.div
                                 key={i}
                                 initial={{ scale: 0.5, opacity: 0.5 }}
                                 animate={{ scale: 2.5, opacity: 0 }}
                                 transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                                 className="absolute inset-0 m-auto w-16 h-16 rounded-full border border-white/[0.08]"
                               />
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* 3-Column Text Grid */}
                   <div className="grid grid-cols-1 md:grid-cols-3 relative border-t border-white/[0.08]">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />

                      <div className="col-span-1 border-r border-white/[0.08] p-10 lg:p-12">
                         <h3 className="text-xl font-medium text-white mb-4">Dedicated Resources</h3>
                         <p className="text-gray-400 text-sm leading-relaxed">Underneath every workspace is a fleet of hardware-virtualized instances running on bare metal.</p>
                      </div>
                      <div className="col-span-1 border-r border-white/[0.08] p-10 lg:p-12">
                         <h3 className="text-xl font-medium text-white mb-4">Instant Boot</h3>
                         <p className="text-gray-400 text-sm leading-relaxed">A warm workspace restores from snapshot in under 150ms. Never wait for a build environment again.</p>
                      </div>
                      <div className="col-span-1 p-10 lg:p-12">
                         <h3 className="text-xl font-medium text-white mb-4">Global Network</h3>
                         <p className="text-gray-400 text-sm leading-relaxed">Traffic is routed automatically to the region closest to you, spanning 18 global edge locations.</p>
                      </div>
                   </div>
                </div>

                {/* 2. LIFECYCLE GRID */}
                <div className="flex flex-col relative border-b border-white/[0.08]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="col-span-2 border-r border-white/[0.08] p-16 md:py-32 md:px-24 flex items-center">
                         <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">From keystroke to deploy.</h2>
                      </div>
                      <div className="col-span-1 p-16 flex flex-col justify-center gap-4">
                         <p className="text-gray-400 text-sm leading-relaxed">Every workspace flows through four optimized stages — so you get instant boot times without paying for idle compute.</p>
                      </div>
                   </div>

                   {/* Lifecycle Features Row */}
                   <div className="grid grid-cols-1 md:grid-cols-4 relative border-t border-white/[0.08]">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 left-[25%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[50%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[75%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />

                      {[
                         { n: '01', icon: <Snowflake className="w-4 h-4 text-gray-500"/>, title: 'Snapshot', desc: 'Environment captured as a restorable snapshot.' },
                         { n: '02', icon: <Zap className="w-4 h-4 text-gray-500"/>, title: 'Hydrate', desc: 'Restored from snapshot in under 150ms.' },
                         { n: '03', icon: <Play className="w-4 h-4 text-gray-500"/>, title: 'Run', desc: 'Dedicated cores execute at bare-metal speed.' },
                         { n: '04', icon: <Moon className="w-4 h-4 text-gray-500"/>, title: 'Hibernate', desc: 'Compute billing drops to zero until you return.' },
                      ].map((item, i) => (
                         <div key={i} className={`col-span-1 p-10 lg:p-12 group hover:bg-white/[0.02] transition-colors ${i < 3 ? 'border-r border-white/[0.08]' : ''}`}>
                            <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/[0.08]">
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

                {/* 3. HARDWARE SPECS GRID */}
                <div className="flex flex-col relative border-b border-white/[0.08]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="col-span-2 border-r border-white/[0.08] p-16 md:py-32 md:px-24 flex items-center">
                         <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Built for scale.</h2>
                      </div>
                      <div className="col-span-1 p-16 flex items-center justify-center gap-6">
                         <div className="flex items-center gap-2 text-gray-400 font-mono text-sm border border-white/[0.08] px-4 py-2 rounded-full"><Cpu className="w-4 h-4"/> Hardware</div>
                      </div>
                   </div>

                   {/* Specs Row */}
                   <div className="grid grid-cols-1 md:grid-cols-3 relative border-t border-white/[0.08]">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />

                      {[
                         { title: 'Processor', desc: 'AMD EPYC™ 7R13 (Milan) or equivalent' },
                         { title: 'vCPUs', desc: 'Up to 16 dedicated threads per workspace' },
                         { title: 'Memory', desc: 'Up to 64GB DDR4 ECC Memory' },
                         { title: 'Storage', desc: '250GB distributed NVMe (Replicated 3x)' },
                         { title: 'Network', desc: '10 Gbps symmetrical bandwidth' },
                         { title: 'Virtualization', desc: 'Firecracker KVM-based microVMs' },
                      ].map((item, i) => (
                         <div key={i} className={`col-span-1 p-8 lg:p-10 border-b border-white/[0.08] ${i % 3 !== 2 ? 'border-r border-white/[0.08]' : ''}`}>
                            <div className="text-xs font-mono tracking-widest text-gray-500 uppercase mb-2">{item.title}</div>
                            <div className="text-[15px] text-white">{item.desc}</div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* 4. PRICING TIERS GRID */}
                <div className="flex flex-col relative border-b border-white/[0.08]">
                   <Crosshair className="-top-1.5 -left-1.5" />
                   <Crosshair className="-top-1.5 -right-1.5" />

                   <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="col-span-3 p-16 md:py-24 text-center">
                         <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Right-sized for every workload.</h2>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 relative border-t border-white/[0.08]">
                      <Crosshair className="-top-1.5 -left-1.5" />
                      <Crosshair className="-top-1.5 left-[33.33%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 left-[66.66%] -translate-x-1.5" />
                      <Crosshair className="-top-1.5 -right-1.5" />

                      {[
                         { name: 'Hobby', price: '$0', unit: '/mo', desc: 'For side projects and exploration.', specs: ['4 vCPU dedicated', '8GB RAM', '60h compute / month'], cta: 'Start free', glow: false },
                         { name: 'Pro', price: '$20', unit: '/mo', desc: 'For professional developers.', specs: ['8 vCPU dedicated', '16GB RAM', 'Unlimited compute'], cta: 'Start Pro trial', glow: true },
                         { name: 'Enterprise', price: 'Custom', unit: '', desc: 'For organizations at scale.', specs: ['16 vCPU + bare metal', '64GB RAM', 'SSO / SAML'], cta: 'Contact sales', glow: false },
                      ].map((t, i) => (
                         <div key={i} className={`col-span-1 p-10 lg:p-16 flex flex-col relative transition-colors ${i < 2 ? 'border-r border-white/[0.08]' : ''} ${t.glow ? 'bg-white/[0.02]' : 'hover:bg-white/[0.02]'}`}>
                            {t.glow && (
                               <div className="absolute inset-0 glow-ring pointer-events-none z-10" />
                            )}
                            <div className="text-white font-medium text-lg mb-1 flex justify-between items-center">
                               {t.name}
                               {t.glow && <span className="text-[10px] uppercase tracking-widest font-bold text-white bg-white/[0.1] px-2 py-1 rounded-full">Recommended</span>}
                            </div>
                            <p className="text-[#888] text-sm mb-6">{t.desc}</p>
                            <div className="flex items-baseline gap-1 mb-8">
                               <span className="text-4xl font-semibold tracking-tighter text-white">{t.price}</span>
                               <span className="text-[#888] text-sm">{t.unit}</span>
                            </div>
                            <button className={`w-full py-3 rounded-full text-[14px] font-medium transition-colors mb-8 ${t.glow ? 'bg-white text-black hover:bg-white/90' : 'border border-white/[0.2] text-white hover:bg-white hover:text-black'}`}>
                               {t.cta}
                            </button>
                            <div className="flex flex-col gap-3 mt-auto">
                               {t.specs.map((s, j) => (
                                  <div key={j} className="flex items-center gap-3 text-[14px] text-gray-400">
                                     <Check className={`w-4 h-4 ${t.glow ? 'text-white' : 'text-gray-500'}`} /> {s}
                                  </div>
                               ))}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

             </div>
          </section>
      </div>
    </main>
  );
}
