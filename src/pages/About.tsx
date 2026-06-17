import { motion } from 'motion/react';
import { Rocket, Code2, Globe, Zap, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000]">
       {/* Hero Section */}
       <section className="flex flex-col border-b border-white/[0.08] relative text-center items-center justify-center py-32 md:py-48 px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50" />
          
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-5xl lg:text-[6.5rem] tracking-tighter font-semibold text-white mb-8 leading-[1.05] relative z-10 max-w-4xl"
          >
             Building the <br/>
             <span className="text-[#888]">internet's native IDE.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10"
          >
             Collab Code was founded on a simple premise: developer tools should be multiplayer, instantaneous, and accessible from anywhere.
          </motion.p>
       </section>

       {/* Story/Mission Section */}
       <section className="flex flex-col lg:flex-row border-b border-white/[0.08] relative bg-[#000]">
          <div className="w-full lg:w-[50%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08] relative">
             <div className="max-w-md w-full relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6">
                   <Rocket className="w-5 h-5 text-white/50" />
                </div>
                <h2 className="text-2xl md:text-3xl font-medium text-white mb-4 tracking-tight">Our Mission</h2>
                <p className="text-[#888] leading-relaxed text-base md:text-lg">
                   To lower the barrier to entry for software creation by removing the friction of local environments and supercharging collaboration. We believe the next billion developers will write code in the cloud.
                </p>
             </div>
          </div>
          <div className="w-full lg:w-[50%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex items-center justify-center relative bg-[#020202]">
             <div className="max-w-md w-full relative z-10">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                   <Code2 className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-medium text-white mb-4 tracking-tight">Our Story</h2>
                <p className="text-[#888] leading-relaxed text-base md:text-lg">
                   Born out of the frustration of handling complex local setups and "it works on my machine" bugs, our founders set out to build an editor that just works. Instantly. For everyone.
                </p>
             </div>
          </div>
       </section>

       {/* Values Section */}
       <section className="grid grid-cols-1 md:grid-cols-3 border-b border-white/[0.08] bg-[#000]">
         <ValueCard 
            icon={<Globe className="w-8 h-8 text-white mb-6" />}
            title="Global First"
            desc="We build for a distributed world. Your physical location shouldn't dictate your access to world-class development environments."
            borderRight
         />
         <ValueCard 
            icon={<Zap className="w-8 h-8 text-white mb-6" />}
            title="Zero Latency"
            desc="Speed is a feature. We obsess over milliseconds to ensure every keystroke feels exactly like it's running locally."
            borderRight
         />
         <ValueCard 
            icon={<Shield className="w-8 h-8 text-white mb-6" />}
            title="Built on Trust"
            desc="Your intellectual property is sacred. We employ enterprise-grade security to ensure your codebase remains completely yours."
         />
       </section>

       {/* Timeline Section */}
       <section className="py-24 md:py-32 px-6 md:px-12 border-b border-white/[0.08] bg-[#000]">
          <div className="max-w-[800px] mx-auto">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-white mb-4">
                  The Journey So Far
                </h2>
                <p className="text-[#888] text-lg">A brief history of Collab Code.</p>
             </div>

             <div className="flex flex-col gap-12 relative">
                <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-white/[0.08] md:-translate-x-1/2" />
                
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
                      className={`flex flex-col md:flex-row gap-6 md:gap-12 relative z-10 ${i % 2 === 0 ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'}`}
                   >
                      <div className="md:w-1/2 pt-2 pl-12 md:pl-0 flex flex-col justify-start">
                         <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                         <p className="text-[#888] text-sm leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-[#000] border border-white/[0.2] flex items-center justify-center md:-translate-x-1/2 md:translate-y-2">
                         <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <div className="md:w-1/2 pt-2 pl-12 md:pl-0 flex flex-col justify-start">
                         <span className="text-3xl font-bold tracking-tighter text-white/[0.2] md:px-8">{item.year}</span>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
       </section>

       {/* Team Section */}
       <section className="flex flex-col border-b border-white/[0.08] relative items-center justify-center py-32 px-6 bg-[#020202]">
          <div className="text-center mb-24 relative z-10">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-sm text-[#ccc] mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                The Team
             </div>
             <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-white mb-4">
               Meet the creators
             </h2>
             <p className="text-[#888] text-lg max-w-xl mx-auto">
               The engineers, designers, and thinkers building the future of collaborative software development.
             </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 lg:gap-x-16 gap-y-16 max-w-[1200px] w-full relative z-10">
             <TeamMember name="Alice Chen" role="Co-founder & CEO" img="11" />
             <TeamMember name="Marcus Johnson" role="Co-founder & CTO" img="12" />
             <TeamMember name="Sarah Williams" role="Head of Product" img="33" />
             <TeamMember name="David Kim" role="Lead Engineer" img="47" />
          </div>
       </section>

       {/* Investors Section */}
       <section className="flex flex-col border-b border-white/[0.08] relative items-center justify-center py-24 px-6 bg-[#000]">
          <p className="text-[#666] text-sm uppercase tracking-widest font-medium mb-12">Backed by the best in the industry</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-1000">
             <div className="text-xl md:text-2xl font-bold tracking-tighter text-white">Sequoia</div>
             <div className="text-xl md:text-2xl font-bold tracking-tight text-white">a16z</div>
             <div className="text-xl md:text-2xl font-bold tracking-widest uppercase text-white">Y Combinator</div>
             <div className="text-xl md:text-2xl font-serif italic text-white">Lightspeed</div>
          </div>
       </section>

       {/* CTA Section */}
       <section className="flex flex-col items-center py-32 px-6 text-center bg-[#000]">
          <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-white mb-6">Come build with us</h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto mb-10">
             We are always looking for exceptional engineers, designers, and thinkers to join our mission.
          </p>
          <Link to="/careers" className="bg-white text-black px-8 py-3.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]">
             View Open Roles
          </Link>
       </section>
    </main>
  );
}

function ValueCard({ icon, title, desc, borderRight }: { icon: React.ReactNode, title: string, desc: string, borderRight?: boolean }) {
   return (
      <div className={`p-8 md:p-12 lg:p-16 xl:p-[80px] hover:bg-white/[0.02] transition-colors ${borderRight ? 'md:border-r md:border-white/[0.08]' : ''} border-b md:border-b-0 border-white/[0.08] bg-[#000]`}>
         {icon}
         <h3 className="text-xl md:text-2xl font-medium text-white mb-4 tracking-tight">{title}</h3>
         <p className="text-[#888] leading-relaxed text-sm md:text-base">{desc}</p>
      </div>
   )
}

function TeamMember({ name, role, img }: { name: string, role: string, img: string }) {
   return (
      <div className="flex flex-col items-center group cursor-pointer">
         <div className="relative mb-6">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
               src={`https://i.pravatar.cc/150?img=${img}`} 
               className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/[0.1] grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:border-white/[0.3] transition-all duration-500" 
               alt={name} 
            />
         </div>
         <h4 className="text-white font-medium text-[15px] md:text-lg tracking-tight group-hover:text-indigo-400 transition-colors">{name}</h4>
         <p className="text-[#888] text-[13px] md:text-sm mt-1">{role}</p>
      </div>
   );
}
