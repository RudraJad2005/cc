import { motion } from 'motion/react';
import { Cpu, Zap, Server, Globe, Activity, Snowflake, Play, Moon, Check, ArrowRight } from 'lucide-react';

export function Compute() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] selection:bg-white/30">
       {/* Hero Section */}
       <section className="flex flex-col lg:flex-row border-b border-white/[0.08] relative">
          <div className="w-full lg:w-[55%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08] relative min-h-[500px]">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-gray-400 text-[11px] font-mono mb-8 w-fit tracking-widest uppercase">
                <Activity className="w-3.5 h-3.5 text-white" />
                Infrastructure
             </div>
             <h1 className="text-4xl md:text-5xl lg:text-[5rem] tracking-tighter font-semibold text-white mb-6 leading-[1.05]">
                Boundless compute. <br/>
                <span className="text-[#888]">Zero local overhead.</span>
             </h1>
             <p className="text-lg md:text-xl text-[#888] max-w-xl leading-relaxed">
                Stop waiting for local builds. Every Collab Code workspace is backed by dedicated, high-performance cloud instances. Spin up servers, databases, and heavy workloads in milliseconds.
             </p>
          </div>

          {/* Terminal Graphic */}
          <div className="w-full lg:w-[45%] p-8 md:p-12 flex items-center justify-center relative overflow-hidden bg-[#020202]">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03),_transparent_70%)] pointer-events-none" />
             
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[420px] rounded-xl border border-white/[0.08] bg-[#000] overflow-hidden relative z-10 font-mono shadow-[0_0_50px_rgba(0,0,0,0.5)]"
             >
                <div className="flex h-10 border-b border-white/[0.05] bg-[#050505] items-center px-4 justify-between">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                     <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                     <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
                   </div>
                   <div className="text-[10px] text-[#666] tracking-widest uppercase">us-east-1 // active</div>
                </div>
                <div className="p-5 text-[13px] leading-relaxed flex flex-col text-gray-400">
                   <p className="flex items-center gap-2"><span className="text-white">~</span> <span className="text-white">collab up --region us-east --tier pro</span></p>
                   <p className="text-[#666] mt-2">Provisioning MicroVM...</p>
                   <div className="flex flex-col gap-1 text-[#888] mt-2 pl-3 border-l-2 border-white/[0.08]">
                      <span>CPU: 16 dedicated cores</span>
                      <span>RAM: 64GB DDR4</span>
                      <span>Disk: 250GB NVMe</span>
                   </div>
                   <p className="text-white mt-3">✓ Workspace hydrated in 124ms</p>
                   <p className="mt-2 text-[#666]">Starting development server...</p>
                   <p className="mt-2"><span className="text-white">~</span> <span className="animate-pulse w-2 h-4 bg-white/70 inline-block align-middle"></span></p>
                </div>
             </motion.div>
          </div>
       </section>


       {/* Metrics Grid */}
       <section className="border-b border-white/[0.08] bg-[#000] relative">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
             <MetricCell title="MicroVM Boot Time" value="150ms" icon={<Zap className="w-5 h-5" />} />
             <MetricCell title="Data Replication" value="3x" icon={<Server className="w-5 h-5" />} />
             <MetricCell title="Edge Locations" value="18" icon={<Globe className="w-5 h-5" />} />
          </div>
       </section>

       {/* Under the hood */}
       <section className="flex flex-col lg:flex-row border-b border-white/[0.08] bg-[#000] relative">
          <div className="w-full lg:w-[45%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.08]">
             <div className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white mb-8">
                <Cpu className="w-5 h-5" />
             </div>
             <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-white mb-6">Built for scale.</h2>
             <p className="text-[#888] leading-relaxed text-lg">
                Underneath every workspace is a fleet of hardware-virtualized instances running on bare metal. We allocate dedicated resources to ensure your builds never throttle.
             </p>
          </div>
          <div className="w-full lg:w-[55%] flex flex-col">
             <SpecRow label="Processor" value="AMD EPYC™ 7R13 (Milan) or equivalent" />
             <SpecRow label="vCPUs" value="Up to 16 dedicated threads per workspace" />
             <SpecRow label="Memory" value="Up to 64GB DDR4 ECC Memory" />
             <SpecRow label="Storage" value="250GB distributed NVMe (Replicated 3x)" />
             <SpecRow label="Network" value="10 Gbps symmetrical bandwidth" />
             <SpecRow label="Virtualization" value="Firecracker (KVM-based accelerated microVMs)" />
          </div>
       </section>

       {/* Scalability Section */}
       <section className="flex flex-col lg:flex-row-reverse border-b border-white/[0.08] bg-[#000] relative">
          <div className="w-full lg:w-[45%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex flex-col justify-center border-b lg:border-b-0 lg:border-l border-white/[0.08] relative min-h-[500px]">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-gray-400 text-[11px] font-mono mb-8 w-fit tracking-widest uppercase">
                <Globe className="w-3.5 h-3.5 text-white" />
                Scalability
             </div>
             <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-white mb-6">
                Scale globally, <br/>
                <span className="text-[#888]">effortlessly.</span>
             </h2>
             <p className="text-lg text-[#888] max-w-xl leading-relaxed mb-8">
                Your workspace scales across the globe seamlessly. From local caching to anycast routing, Collab Code handles traffic loads automatically without dropping a single frame.
             </p>
             <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-white">
                   <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#888] font-mono text-[11px] tracking-widest">01</div>
                   <div className="text-[15px] font-medium">Automatic Load Balancing</div>
                </div>
                <div className="flex items-center gap-4 text-white">
                   <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#888] font-mono text-[11px] tracking-widest">02</div>
                   <div className="text-[15px] font-medium">Edge Networking</div>
                </div>
                <div className="flex items-center gap-4 text-white">
                   <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#888] font-mono text-[11px] tracking-widest">03</div>
                   <div className="text-[15px] font-medium">Auto-Hibernate & Wake</div>
                </div>
             </div>
          </div>

          <div className="w-full lg:w-[55%] p-8 md:p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden bg-[#020202]">
             {/* Abstract Grid Visual */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
             
             <div className="relative z-10 w-full h-[300px] border border-white/[0.08] rounded-xl bg-[#000] overflow-hidden flex items-end justify-center gap-4 p-8">
                <motion.div 
                  initial={{ height: "40%" }}
                  whileInView={{ height: ["40%", "80%", "50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 bg-white/[0.05] border border-white/[0.1] rounded-t-lg relative"
                >
                   <div className="absolute top-0 w-full h-1 bg-white opacity-20 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </motion.div>
                <motion.div 
                  initial={{ height: "60%" }}
                  whileInView={{ height: ["60%", "30%", "70%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="w-16 bg-white/[0.05] border border-white/[0.1] rounded-t-lg relative"
                >
                   <div className="absolute top-0 w-full h-1 bg-white opacity-20 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </motion.div>
                <motion.div 
                   initial={{ height: "30%" }}
                   whileInView={{ height: ["30%", "90%", "40%"] }}
                   transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="w-16 bg-white/[0.05] border border-white/[0.1] rounded-t-lg relative overflow-hidden"
                >
                   <div className="absolute inset-0 bg-gradient-to-t from-transparent to-indigo-500/20" />
                   <div className="absolute top-0 w-full h-1 bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)]" />
                </motion.div>
                <motion.div 
                  initial={{ height: "50%" }}
                  whileInView={{ height: ["50%", "20%", "60%"] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="w-16 bg-white/[0.05] border border-white/[0.1] rounded-t-lg relative"
                >
                   <div className="absolute top-0 w-full h-1 bg-white opacity-20 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </motion.div>
             </div>
          </div>
       </section>

       {/* Lifecycle Pipeline */}
       <section className="border-b border-white/[0.08] bg-[#000] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid mask-fade opacity-40 pointer-events-none" />
          <div className="relative z-10 p-8 md:p-12 lg:p-20 xl:p-[100px]">
             <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-indigo-300/80 text-[11px] font-mono mb-6 tracking-widest uppercase">
                   <Activity className="w-3.5 h-3.5" /> Lifecycle
                </div>
                <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-gradient mb-5">From keystroke to deploy.</h2>
                <p className="text-[#888] text-lg">Every workspace flows through four optimized stages — so you get instant boot times without ever paying for idle compute.</p>
             </div>

             <motion.div
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/[0.08] rounded-2xl overflow-hidden bg-[#050505]"
             >
                {[
                   { n: '01', icon: Snowflake, title: 'Snapshot', desc: 'Your environment — deps, processes, memory — is captured as a restorable snapshot.', color: 'text-sky-400' },
                   { n: '02', icon: Zap, title: 'Hydrate', desc: 'Restored from snapshot in under 150ms on the closest edge node.', color: 'text-indigo-400' },
                   { n: '03', icon: Play, title: 'Run', desc: 'Dedicated cores execute builds, servers, and tests at full bare-metal speed.', color: 'text-emerald-400' },
                   { n: '04', icon: Moon, title: 'Hibernate', desc: 'Idle workspaces freeze instantly. Compute billing drops to zero until you return.', color: 'text-purple-400' },
                ].map((s, i) => {
                   const Icon = s.icon;
                   return (
                      <motion.div
                         key={i}
                         variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
                         className={`group relative p-8 lg:p-10 flex flex-col ${i !== 3 ? 'border-b lg:border-b-0 lg:border-r border-white/[0.08]' : ''} ${i === 1 ? 'md:border-r-0 lg:border-r' : ''} ${i >= 2 ? 'md:border-t lg:border-t-0' : ''} hover:bg-white/[0.02] transition-colors`}
                      >
                         <div className="flex items-center justify-between mb-8">
                            <div className={`w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center ${s.color} group-hover:scale-110 transition-transform duration-500`}>
                               <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-mono text-[11px] tracking-widest text-[#555]">{s.n}</span>
                         </div>
                         <h3 className="text-lg font-medium text-white mb-2 tracking-tight">{s.title}</h3>
                         <p className="text-[#888] text-[14px] leading-relaxed">{s.desc}</p>
                         {i !== 3 && (
                            <ArrowRight className="hidden lg:block absolute top-1/2 -right-[9px] -translate-y-1/2 w-4 h-4 text-white/20 bg-[#050505] z-20" />
                         )}
                      </motion.div>
                   );
                })}
             </motion.div>
          </div>
       </section>

       {/* Instance Tiers */}
       <section className="border-b border-white/[0.08] bg-[#000] relative">
          <div className="p-8 md:p-12 lg:p-20 xl:p-[100px]">
             <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-gray-400 text-[11px] font-mono mb-6 tracking-widest uppercase">
                   <Server className="w-3.5 h-3.5 text-white" /> Instance Tiers
                </div>
                <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-gradient mb-5">Right-sized for every workload.</h2>
                <p className="text-[#888] text-lg">Start free, scale to dedicated bare-metal. Switch tiers instantly — no migration, no downtime.</p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
                {[
                   { name: 'Hobby', price: '$0', unit: '/mo', desc: 'For side projects and exploration.', specs: ['4 vCPU dedicated', '8GB RAM', '60h compute / month', 'Community support'], cta: 'Start free', highlight: false },
                   { name: 'Pro', price: '$20', unit: '/mo', desc: 'For professional developers and teams.', specs: ['8 vCPU dedicated', '16GB RAM', 'Unlimited compute', 'Priority support', 'Custom domains'], cta: 'Start Pro trial', highlight: true },
                   { name: 'Enterprise', price: 'Custom', unit: '', desc: 'For organizations at scale.', specs: ['16 vCPU + bare metal', '64GB RAM', 'SSO / SAML', 'Dedicated support & SLA', 'Audit logs'], cta: 'Contact sales', highlight: false },
                ].map((t, i) => (
                   <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                      viewport={{ once: true, margin: '-80px' }}
                      className={`relative flex flex-col p-8 rounded-2xl border ${t.highlight ? 'border-white/20 bg-[#0c0c0c] glow-ring' : 'border-white/[0.08] bg-[#050505]'} overflow-hidden`}
                   >
                      {t.highlight && (
                         <>
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.1),_transparent_60%)] pointer-events-none" />
                            <span className="absolute top-5 right-5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">Popular</span>
                         </>
                      )}
                      <div className="relative z-10">
                         <div className="text-white font-medium text-lg mb-1">{t.name}</div>
                         <p className="text-[#888] text-sm mb-6 h-10">{t.desc}</p>
                         <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">{t.price}</span>
                            <span className="text-[#888] text-sm">{t.unit}</span>
                         </div>
                         <button className={`w-full py-3 rounded-full text-[14px] font-medium mb-8 transition-all duration-300 ${t.highlight ? 'bg-white text-black hover:bg-gray-100 shadow-[0_0_30px_-8px_rgba(255,255,255,0.5)]' : 'bg-white/[0.04] border border-white/[0.1] text-white hover:bg-white/[0.08]'}`}>
                            {t.cta}
                         </button>
                         <div className="flex flex-col gap-3">
                            {t.specs.map((s, j) => (
                               <div key={j} className="flex items-center gap-3 text-[14px] text-gray-300">
                                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> {s}
                               </div>
                            ))}
                         </div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
       </section>

       {/* FAQ */}
       <section className="border-b border-white/[0.08] bg-[#000] relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 p-8 md:p-12 lg:p-20 xl:p-[100px] gap-12">
             <div className="lg:col-span-1">
                <h2 className="text-3xl md:text-4xl tracking-tighter font-semibold text-gradient mb-4">Frequently asked.</h2>
                <p className="text-[#888] leading-relaxed">Everything you need to know about how Collab Code compute works under the hood.</p>
             </div>
             <div className="lg:col-span-2 flex flex-col">
                {[
                   { q: 'How fast do workspaces actually boot?', a: 'A warm workspace restores from snapshot in under 150ms. A completely cold environment provisions a fresh microVM in roughly 1–2 seconds.' },
                   { q: 'Do I pay while my workspace is idle?', a: 'No. Idle workspaces hibernate automatically and compute billing pauses. You only pay for active execution time.' },
                   { q: 'Can I run databases and background servers?', a: 'Yes. Each workspace is a full Linux microVM, so you can run Postgres, Redis, long-lived servers, and any process you would run locally.' },
                   { q: 'Where does my compute physically run?', a: 'On bare-metal hosts across 18 global edge regions. Traffic is routed automatically to the region closest to you.' },
                   { q: 'Is my data isolated from other users?', a: 'Completely. Every workspace runs in a hardware-virtualized microVM with no shared kernel and encryption at rest and in transit.' },
                ].map((f, i) => (
                   <details key={i} className="group border-b border-white/[0.08] py-6 first:pt-0">
                      <summary className="flex items-center justify-between cursor-pointer list-none text-white font-medium text-[16px] md:text-[17px] tracking-tight">
                         {f.q}
                         <span className="w-7 h-7 shrink-0 ml-4 rounded-full border border-white/[0.1] bg-white/[0.02] flex items-center justify-center text-gray-400 group-open:rotate-45 transition-transform duration-300">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                         </span>
                      </summary>
                      <p className="text-[#888] leading-relaxed mt-4 max-w-2xl text-[15px]">{f.a}</p>
                   </details>
                ))}
             </div>
          </div>
       </section>

       {/* Security Section */}
       <section className="flex flex-col border-b border-white/[0.08] bg-[#000] items-center text-center py-24 md:py-32 px-6">
          <div className="max-w-3xl">
             <div className="w-16 h-16 rounded-full border border-white/[0.08] bg-[#050505] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             </div>
             <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-white mb-6">Enterprise-grade isolation.</h2>
             <p className="text-lg text-[#888] leading-relaxed mb-12">
                We take security seriously. Every environment is completely separated through hardware virtualization. No shared kernels, no noisy neighbors, and complete data encryption at rest.
             </p>
             <div className="flex flex-wrap justify-center gap-4">
                <div className="px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.02] text-[13px] font-medium text-white tracking-wide">SOC 2 Type II</div>
                <div className="px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.02] text-[13px] font-medium text-white tracking-wide">ISO 27001</div>
                <div className="px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.02] text-[13px] font-medium text-white tracking-wide">GDPR Compliant</div>
             </div>
          </div>
       </section>

       {/* CTA Section */}
       <section className="py-24 md:py-32 px-6 flex flex-col items-center justify-center text-center bg-[#020202] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03),_transparent_60%)] pointer-events-none" />
          <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-white mb-6 relative z-10">Start building instantly.</h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto mb-10 relative z-10">
             Experience the speed of dedicated cloud compute. No credit card required.
          </p>
          <button className="bg-white text-black px-8 py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)] relative z-10">
             Deploy Free Workspace
          </button>
       </section>
    </main>
  );
}

function MetricCell({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
   return (
      <div className="p-8 md:p-12 lg:p-16 xl:p-[80px] flex flex-col relative group overflow-hidden bg-[#000] hover:bg-[#020202] transition-colors">
         <div className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500">
            {icon}
         </div>
         <div className="text-5xl md:text-6xl font-semibold tracking-tighter text-white mb-3">{value}</div>
         <div className="text-base text-[#888] tracking-wide">{title}</div>
      </div>
   );
}

function SpecRow({ label, value }: { label: string, value: string }) {
  return (
     <div className="flex flex-col sm:flex-row sm:items-center border-b border-white/[0.08] last:border-0 hover:bg-white/[0.02] transition-colors p-8 md:p-10 lg:p-12 xl:px-[80px] gap-4 sm:gap-8 min-h-[140px]">
        <div className="w-full sm:w-1/3 text-white font-medium text-[13px] tracking-widest uppercase">{label}</div>
        <div className="w-full sm:w-2/3 text-[#888] font-mono text-[14px]">{value}</div>
     </div>
  );
}
