import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageSquare, MapPin, Plus } from 'lucide-react';

const fadeUp: any = {
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

// Reusable Crosshair
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

export function Contact() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-white selection:text-black font-sans">
      
      {/* ───────────────── Hero Section ───────────────── */}
      <section className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 xl:p-[100px] text-center border-b border-white/[0.1] relative overflow-hidden min-h-[40vh] bg-[#000]">
          {/* Strict Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]" />
          
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-5xl lg:text-[6.5rem] tracking-tighter font-semibold text-white mb-6 leading-[1.05] relative z-10 max-w-4xl"
          >
             Get in touch. <br/>
             <span className="text-[#888]">No friction.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10"
          >
             Whether you're exploring enterprise orchestration or need technical support, our team is ready to help you scale.
          </motion.p>
      </section>

      {/* ───────────────── 2-Column Section ───────────────── */}
      <section className="bg-[#000] relative w-full">
        <div className="max-w-[1400px] mx-auto border-x border-white/[0.1] relative grid grid-cols-1 lg:grid-cols-2">
          
          <Crosshair className="-top-1.5 -left-1.5" />
          <Crosshair className="-top-1.5 -right-1.5" />

          {/* Left Column: Form */}
          <motion.div 
             initial="hidden"
             whileInView="show"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="p-8 md:p-16 lg:border-r border-b lg:border-b-0 border-white/[0.1] relative"
          >
            <div className="mb-10">
               <h2 className="text-3xl font-bold tracking-tight mb-4">Send us a message</h2>
               <p className="text-[#888] text-[15px]">We'll get back to you within 24 hours.</p>
            </div>

            <form className="flex flex-col gap-6">
               <motion.div variants={fadeUp} className="flex flex-col gap-2">
                  <label className="text-[12px] font-mono uppercase tracking-widest text-[#888]">Reason for Contact</label>
                  <select className="w-full bg-[#050505] border border-white/[0.2] text-white p-4 outline-none focus:border-white transition-colors rounded-none appearance-none cursor-pointer">
                     <option>Enterprise Sales</option>
                     <option>Technical Support</option>
                     <option>Billing Inquiry</option>
                     <option>General Feedback</option>
                  </select>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={fadeUp} className="flex flex-col gap-2">
                     <label className="text-[12px] font-mono uppercase tracking-widest text-[#888]">Full Name</label>
                     <input type="text" placeholder="Jane Doe" className="w-full bg-[#050505] border border-white/[0.2] text-white p-4 outline-none focus:border-white transition-colors rounded-none placeholder:text-[#444]" />
                  </motion.div>
                  
                  <motion.div variants={fadeUp} className="flex flex-col gap-2">
                     <label className="text-[12px] font-mono uppercase tracking-widest text-[#888]">Work Email</label>
                     <input type="email" placeholder="jane@company.com" className="w-full bg-[#050505] border border-white/[0.2] text-white p-4 outline-none focus:border-white transition-colors rounded-none placeholder:text-[#444]" />
                  </motion.div>
               </div>

               <motion.div variants={fadeUp} className="flex flex-col gap-2">
                  <label className="text-[12px] font-mono uppercase tracking-widest text-[#888]">Message</label>
                  <textarea rows={5} placeholder="How can we help?" className="w-full bg-[#050505] border border-white/[0.2] text-white p-4 outline-none focus:border-white transition-colors rounded-none placeholder:text-[#444] resize-none" />
               </motion.div>

               <motion.button 
                  variants={fadeUp}
                  type="button"
                  className="w-full bg-white text-black py-4 mt-4 text-[14px] font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 rounded-none"
               >
                  Send Message <ArrowRight className="w-4 h-4" />
               </motion.button>
            </form>
          </motion.div>

          {/* Right Column: Info */}
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex flex-col border-b border-white/[0.1] lg:border-b-0"
          >
             {/* Sub-grid block 1 */}
             <div className="p-8 md:p-16 border-b border-white/[0.1] hover:bg-[#050505] transition-colors flex flex-col justify-center">
                <div className="w-10 h-10 border border-white/[0.2] flex items-center justify-center mb-6">
                   <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Direct Email</h3>
                <p className="text-[#888] text-[15px] mb-4">Skip the form and email us directly for general inquiries.</p>
                <a href="#" className="text-white font-mono text-sm hover:underline underline-offset-4">hello@collabcode.dev</a>
             </div>

             {/* Sub-grid block 2 */}
             <div className="p-8 md:p-16 border-b border-white/[0.1] hover:bg-[#050505] transition-colors flex flex-col justify-center">
                <div className="w-10 h-10 border border-white/[0.2] flex items-center justify-center mb-6">
                   <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Community Discord</h3>
                <p className="text-[#888] text-[15px] mb-4">Join 10,000+ developers talking about cloud environments.</p>
                <a href="#" className="text-white font-mono text-sm hover:underline underline-offset-4">discord.gg/collabcode</a>
             </div>

             {/* Sub-grid block 3 */}
             <div className="p-8 md:p-16 hover:bg-[#050505] transition-colors flex flex-col justify-center flex-1">
                <div className="w-10 h-10 border border-white/[0.2] flex items-center justify-center mb-6">
                   <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Global Headquarters</h3>
                <p className="text-[#888] text-[15px] leading-relaxed">
                   Collab Code Inc.<br/>
                   100 Cloud Native Way, Suite 400<br/>
                   San Francisco, CA 94105
                </p>
             </div>
          </motion.div>

        </div>
      </section>
      
    </main>
  );
}
