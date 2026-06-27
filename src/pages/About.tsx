import { motion } from 'motion/react';
import { Rocket, Code2, Globe, Zap, Shield, Sparkles, Plus, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// Vercel-style Crosshair
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.15] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

export function About() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-white selection:text-black font-sans">
       
       {/* ───────────────── Hero Section (Vercel Style) ───────────────── */}
       <section className="relative flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden border-b border-white/[0.1]">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={stagger}
            className="relative z-10 flex flex-col items-center text-center max-w-4xl"
          >
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tighter leading-[1.1] mb-6">
              Building the internet's <br className="hidden md:block"/>
              native <span className="inline-flex items-center justify-center border border-white/[0.2] rounded-full px-4 py-1 text-4xl md:text-5xl translate-y-[-4px]">IDE</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-[#888] max-w-2xl leading-relaxed mb-10">
               Collab Code was founded on a simple premise: developer tools should be multiplayer, instantaneous, and accessible from anywhere.
            </motion.p>
          </motion.div>
       </section>

       {/* ───────────────── Strict Grid Container ───────────────── */}
       <section className="bg-[#000] relative w-full">
          <div className="max-w-[1200px] mx-auto border-x border-white/[0.1] relative flex flex-col">
             
             {/* ───────────────── Values / Mission Grid (Linear Style Blocks) ───────────────── */}
             <div className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
                <Crosshair className="-top-1.5 -left-1.5" />
                <Crosshair className="-top-1.5 -right-1.5" />

                {/* Block 1 (Light Purple - Mission) */}
                <div className="h-[400px] md:h-[500px] lg:border-r border-b lg:border-b-0 border-white/[0.1] bg-[#D7CAFF] p-8 md:p-12 lg:p-16 flex flex-col justify-between text-[#0a0a0a] relative overflow-hidden group">
                   <div className="absolute -right-10 -top-10 opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                     <Rocket className="w-80 h-80" />
                   </div>
                   
                   <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white mb-8">
                     <Globe className="w-6 h-6" />
                   </div>

                   <div className="relative z-10">
                      <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight max-w-md">Our Mission</h3>
                      <p className="text-[#0a0a0a]/70 text-lg leading-relaxed max-w-md font-medium">
                         To lower the barrier to entry for software creation by removing the friction of local environments and supercharging collaboration. We believe the next billion developers will write code in the cloud.
                      </p>
                   </div>
                </div>

                {/* Block 2 (Neon Green - Story) */}
                <div className="h-[400px] md:h-[500px] bg-[#D6FF00] p-8 md:p-12 lg:p-16 flex flex-col justify-between text-[#0a0a0a] relative overflow-hidden group">
                   <div className="absolute -left-10 -top-10 opacity-5 transform group-hover:-scale-y-110 group-hover:rotate-12 transition-all duration-700">
                     <Code2 className="w-80 h-80" />
                   </div>
                   
                   <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white mb-8">
                     <Zap className="w-6 h-6" />
                   </div>

                   <div className="relative z-10">
                      <h3 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 leading-tight max-w-md">Our Story</h3>
                      <p className="text-[#0a0a0a]/70 text-lg leading-relaxed max-w-md font-medium">
                         Born out of the frustration of handling complex local setups and "it works on my machine" bugs, our founders set out to build an editor that just works. Instantly. For everyone.
                      </p>
                   </div>
                </div>
             </div>

             {/* Values Row (Vercel Style Grid) */}
             <div className="grid grid-cols-1 md:grid-cols-3 relative border-b border-white/[0.1]">
                <Crosshair className="-top-1.5 -left-1.5" />
                <Crosshair className="-top-1.5 -right-1.5" />
                
                <ValueCard 
                   icon={<Globe className="w-6 h-6 text-white mb-6" />}
                   title="Global First"
                   desc="We build for a distributed world. Your physical location shouldn't dictate your access to world-class development environments."
                   borderRight
                />
                <ValueCard 
                   icon={<Zap className="w-6 h-6 text-white mb-6" />}
                   title="Zero Latency"
                   desc="Speed is a feature. We obsess over milliseconds to ensure every keystroke feels exactly like it's running locally."
                   borderRight
                />
                <ValueCard 
                   icon={<Shield className="w-6 h-6 text-white mb-6" />}
                   title="Built on Trust"
                   desc="Your intellectual property is sacred. We employ enterprise-grade security to ensure your codebase remains completely yours."
                />
             </div>

             {/* ───────────────── Timeline Section (Vercel Grid) ───────────────── */}
             <div className="relative border-b border-white/[0.1] py-24 md:py-32">
                <Crosshair className="-top-1.5 -left-1.5" />
                <Crosshair className="-top-1.5 -right-1.5" />
                
                <div className="text-center mb-24 px-6">
                   <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">The Journey So Far.</h2>
                   <p className="text-lg text-[#888] max-w-xl mx-auto">
                      A brief history of how we built Collab Code from an internal hackathon project to a global platform.
                   </p>
                </div>

                <div className="max-w-[800px] mx-auto relative px-6">
                   <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-white/[0.1] md:-translate-x-1/2" />
                   
                   {[
                      { year: "2021", title: "The Idea", desc: "Started as an internal tool to solve our own remote collaboration issues during the pandemic." },
                      { year: "2022", title: "Seed Funding", desc: "Raised $4M from Y Combinator and early angel investors to build the core engine." },
                      { year: "2023", title: "Public Beta", desc: "Launched to the public. Reached 100,000 developers in the first 3 months." },
                      { year: "2024", title: "Engine 2.0", desc: "Complete rewrite of our microVM architecture, achieving sub-10ms cold starts." }
                   ].map((item, i) => (
                      <motion.div 
                         key={i}
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6 }}
                         viewport={{ once: true, margin: "-50px" }}
                         className={`flex flex-col md:flex-row gap-6 md:gap-12 relative z-10 mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'}`}
                      >
                         <div className="md:w-1/2 pt-2 pl-12 md:pl-0 flex flex-col justify-start">
                            <h3 className="text-xl font-bold tracking-tight text-white mb-2">{item.title}</h3>
                            <p className="text-[#888] text-sm leading-relaxed">{item.desc}</p>
                         </div>
                         {/* Grid node dot */}
                         <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-black border border-white/[0.5] flex items-center justify-center md:-translate-x-1/2 md:translate-y-2">
                            <div className="w-1 h-1 bg-white"></div>
                         </div>
                         <div className="md:w-1/2 pt-2 pl-12 md:pl-0 flex flex-col justify-start">
                            <span className="text-4xl font-black tracking-tighter text-white/[0.1] md:px-8 font-mono">{item.year}</span>
                         </div>
                      </motion.div>
                   ))}
                </div>
             </div>

             {/* ───────────────── Team Section ───────────────── */}
             <div className="border-b border-white/[0.1] relative grid grid-cols-1 md:grid-cols-2">
                <Crosshair className="-top-1.5 -left-1.5" />
                <Crosshair className="-top-1.5 -right-1.5" />
                
                <div className="p-12 md:p-24 border-b md:border-b-0 md:border-r border-white/[0.1] flex flex-col justify-center">
                   <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">Meet the creators.</h2>
                   <p className="text-[#888] text-lg leading-relaxed max-w-md">
                     The engineers, designers, and thinkers building the future of collaborative software development.
                   </p>
                </div>
                
                <div className="grid grid-cols-2">
                   <TeamMember name="Alice Chen" role="CEO" img="6455" borderRight borderBottom />
                   <TeamMember name="Marcus J." role="CTO" img="3456" borderBottom />
                   <TeamMember name="Sarah W." role="Product" img="5345" borderRight />
                   <TeamMember name="David Kim" role="Engineering" img="8765" />
                </div>
             </div>

             {/* Investors Strip */}
             <div className="p-12 md:p-20 border-b border-white/[0.1] bg-[#000] flex flex-col items-center">
                <p className="text-[#555] text-[10px] uppercase tracking-[0.2em] font-mono mb-12">Backed by the best</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-1000">
                   <div className="text-xl md:text-3xl font-bold tracking-tighter text-white">Sequoia</div>
                   <div className="text-xl md:text-3xl font-bold tracking-tight text-white">a16z</div>
                   <div className="text-xl md:text-3xl font-bold tracking-widest uppercase text-white">Y Combinator</div>
                   <div className="text-xl md:text-3xl font-serif italic text-white">Lightspeed</div>
                </div>
             </div>

             {/* ───────────────── Final CTA (Linear Style Block) ───────────────── */}
             <div className="p-12 md:p-24 lg:p-32 bg-[#F26E4F] flex flex-col items-center text-center relative overflow-hidden">
                <Crosshair className="-top-1.5 -left-1.5 text-white" />
                <Crosshair className="-top-1.5 -right-1.5 text-white" />
                
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/[0.1] via-transparent to-transparent opacity-50 pointer-events-none" />

                <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-white mb-10 relative z-10 shadow-2xl">
                   <Terminal className="w-8 h-8" />
                </div>

                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0a0a0a] mb-6 relative z-10">Come build with us.</h2>
                <p className="text-[#0a0a0a]/70 text-xl max-w-xl mx-auto mb-10 font-medium relative z-10">
                   We are always looking for exceptional engineers, designers, and thinkers to join our mission.
                </p>
                <Link to="/careers" className="bg-black text-white px-8 py-4 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-black/80 transition-colors shadow-2xl relative z-10">
                   View Open Roles
                </Link>
             </div>

          </div>
       </section>
    </main>
  );
}

function ValueCard({ icon, title, desc, borderRight }: { icon: React.ReactNode, title: string, desc: string, borderRight?: boolean }) {
   return (
      <div className={`p-8 md:p-12 lg:p-16 hover:bg-white/[0.02] transition-colors ${borderRight ? 'md:border-r border-white/[0.1]' : ''} border-b md:border-b-0 border-white/[0.1] bg-[#000] group`}>
         <div className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">{icon}</div>
         <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">{title}</h3>
         <p className="text-[#888] leading-relaxed text-[15px]">{desc}</p>
      </div>
   )
}

function TeamMember({ name, role, img, borderRight, borderBottom }: { name: string, role: string, img: string, borderRight?: boolean, borderBottom?: boolean }) {
   return (
      <div className={`flex flex-col items-center justify-center p-8 group cursor-pointer hover:bg-white/[0.02] transition-colors bg-[#000]
         ${borderRight ? 'border-r border-white/[0.1]' : ''}
         ${borderBottom ? 'border-b border-white/[0.1]' : ''}
      `}>
         <div className="relative mb-4">
            <img 
               src={`https://avatars.githubusercontent.com/u/${parseInt(img) * 1024 + 10000}?v=4`} 
               className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/[0.1] grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
               alt={name} 
            />
         </div>
         <h4 className="text-white font-bold tracking-tight text-[15px] md:text-base group-hover:text-white transition-colors">{name}</h4>
         <p className="text-[#666] text-[12px] font-mono mt-1 uppercase tracking-widest">{role}</p>
      </div>
   );
}
