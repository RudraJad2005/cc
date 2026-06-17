import { motion } from 'motion/react';
import { MessageSquare, Users, Heart, Globe, ArrowRight, Github, Twitter } from 'lucide-react';
import { CommunityBento } from '../components/CommunityBento';

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

export function Community() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <main className="w-full flex-1 flex flex-col">
       {/* Hero Section */}
       <section className="flex flex-col border-b border-white/[0.08] relative text-center items-center justify-center py-32 md:py-48 px-6 overflow-hidden bg-[#000000]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50" />
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="relative z-10 flex gap-4 mb-8 text-white/50"
          >
             <div className="w-12 h-12 rounded-full border border-white/[0.1] bg-[#161616] flex items-center justify-center -ml-2 relative z-30 overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=33" alt="" className="w-full h-full object-cover" />
             </div>
             <div className="w-12 h-12 rounded-full border border-white/[0.1] bg-[#161616] flex items-center justify-center -ml-6 relative z-20 overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=12" alt="" className="w-full h-full object-cover" />
             </div>
             <div className="w-12 h-12 rounded-full border border-white/[0.1] bg-[#161616] flex items-center justify-center -ml-6 relative z-10 overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=60" alt="" className="w-full h-full object-cover" />
             </div>
             <div className="w-12 h-12 rounded-full border border-white/[0.1] bg-[#161616] flex items-center justify-center -ml-6 text-xs text-white">
                +2k
             </div>
          </motion.div>

          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-4xl md:text-5xl lg:text-[6rem] tracking-tighter font-semibold text-white mb-8 leading-[1.05] relative z-10 max-w-4xl"
          >
             Built by developers. <br/>
             <span className="text-[#888]">For developers.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10"
          >
             Join thousands of engineers from around the world. We share knowledge, help debug complex issues, and build the future of software together.
          </motion.p>
       </section>

       {/* Social Grid */}
       <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-white/[0.08]"
       >
          <SocialCard 
             icon={<DiscordIcon className="w-10 h-10 text-[#5865F2] mb-6" />}
             title="Discord Community"
             desc="Our core Hub. Chat with the core team, participate in showcase events, and get live help from peers."
             buttonText="Join Discord"
             borderRight
             variants={fadeUp}
          />
          <SocialCard 
             icon={<Github className="w-10 h-10 text-white mb-6" />}
             title="Open Source"
             desc="Contribute to plugins, themes, and extensions. See what we're working on next via our public roadmap."
             buttonText="View GitHub"
             borderRight
             variants={fadeUp}
          />
          <SocialCard 
             icon={<Twitter className="w-10 h-10 text-[#1DA1F2] mb-6" />}
             title="Twitter"
             desc="Get the latest product updates, community highlights, and tips for optimizing your workflow."
             buttonText="Follow us"
             variants={fadeUp}
          />
       </motion.section>

       <CommunityBento />

       {/* Values Section */}
       <section className="flex flex-col border-b border-white/[0.08] bg-[#000000]">
          <div className="py-24 md:py-32 px-6 md:px-12 items-center text-center border-b border-white/[0.08]">
             <h2 className="text-3xl md:text-5xl tracking-tight font-medium text-white mb-6">
               How we help each other
             </h2>
             <p className="text-lg text-[#71717a] max-w-2xl mx-auto">
               We believe the best tools are built together. Our community is founded on a culture of shared knowledge and mutual support.
             </p>
          </div>
          
          <motion.div 
             variants={staggerContainer}
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-50px" }}
             className="grid grid-cols-1 md:grid-cols-3 w-full bg-[#050505]"
          >
             <ValueItem 
                icon={<MessageSquare className="w-8 h-8 text-white/50" />}
                title="Pair Programming"
                desc="Jump into collaborative sessions with other community members to tackle hard bugs together in real-time."
                borderRight
                variants={fadeUp}
             />
             <ValueItem 
                icon={<Heart className="w-8 h-8 text-white/50" />}
                title="Mentorship"
                desc="Experienced engineers routinely host office hours to help newcomers learn best practices and architecture."
                borderRight
                variants={fadeUp}
             />
             <ValueItem 
                icon={<Globe className="w-8 h-8 text-white/50" />}
                title="Global Meetups"
                desc="We regularly host online and in-person hackathons around the world to build tools that matter."
                variants={fadeUp}
             />
          </motion.div>
       </section>

       {/* Open Source Section */}
       <section className="flex flex-col lg:flex-row border-b border-white/[0.08] bg-[#000000]">
          <div className="p-12 md:p-20 xl:p-[100px] flex-1 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08]">
             <h2 className="text-3xl md:text-5xl tracking-tight font-medium text-white mb-6">
                Powered by Open Source
             </h2>
             <p className="text-lg text-[#71717a] leading-relaxed mb-10 max-w-xl">
                We are proud to build in the open. Our core engine, compiler, and CLI are entirely open-source, maintained by hundreds of amazing contributors.
             </p>
             <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-black font-medium hover:bg-gray-200 transition-colors bg-white px-6 py-3 rounded-full">
                   <Github className="w-5 h-5" /> Star on GitHub
                </button>
             </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-12 lg:p-0 bg-[#050505] relative overflow-hidden min-h-[400px]">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03),_transparent_70%)] pointer-events-none" />
             <div className="grid grid-cols-4 md:grid-cols-6 gap-4 relative z-10 w-full max-w-[400px] md:max-w-md mx-auto opacity-70">
                {[12, 45, 67, 33, 11, 89, 44, 21, 9, 32, 65, 77, 88, 90, 54, 43, 8, 3, 22, 61, 71, 91, 14, 24].map((id, i) => (
                   <motion.div 
                      key={id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      viewport={{ once: true }}
                   >
                      <img 
                         src={`https://i.pravatar.cc/100?img=${id}`} 
                         alt="Contributor" 
                         className="w-full aspect-square rounded-full border border-white/[0.1] hover:border-white/50 transition-colors cursor-pointer"
                      />
                   </motion.div>
                ))}
             </div>
          </div>
       </section>
    </main>
  );
}

function SocialCard({ icon, title, desc, borderRight, buttonText, variants }: any) {
   return (
      <motion.div variants={variants} className={`p-8 md:p-12 lg:p-16 xl:p-[80px] flex flex-col items-start ${borderRight ? 'md:border-r border-white/[0.08]' : ''} border-b md:border-b-0 border-white/[0.08] bg-[#050505] hover:bg-white/[0.02] transition-colors`}>
         {icon}
         <h3 className="text-2xl font-medium text-[#f4f4f5] mb-4 tracking-tight">{title}</h3>
         <p className="text-[#a1a1aa] leading-relaxed text-base mb-8">{desc}</p>
         <button className="mt-auto flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors bg-white/[0.05] hover:bg-white/[0.1] px-6 py-3 rounded-full border border-white/[0.1]">
             {buttonText} <ArrowRight className="w-4 h-4" />
         </button>
      </motion.div>
   )
}

function ValueItem({ icon, title, desc, borderRight, variants }: any) {
  return (
    <motion.div variants={variants} className={`flex flex-col items-center text-center p-8 md:p-12 lg:p-16 hover:bg-white/[0.02] transition-colors border-b md:border-b-0 border-white/[0.08] ${borderRight ? 'md:border-r' : ''}`}>
       <div className="mb-6">
          {icon}
       </div>
       <h4 className="text-xl font-medium text-white mb-3 tracking-tight">{title}</h4>
       <p className="text-[#a1a1aa] leading-relaxed text-[15px] max-w-sm">{desc}</p>
    </motion.div>
  )
}
