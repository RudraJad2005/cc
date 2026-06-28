import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Enterprise() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-indigo-500/30 selection:text-white font-sans">
      
      {/* ───────────────── Hero Section (Vercel Style) ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] relative w-full flex justify-center">
         <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 border-x border-white/[0.1]">
            
            {/* Left: Text */}
            <div className="p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/[0.1] flex flex-col justify-center">
               <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-[4rem] tracking-tighter font-semibold text-white mb-8 leading-[1.05]"
               >
                  Introducing the latest Enterprise tools to power your workflow.
               </motion.h1>
               <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-lg md:text-xl text-[#888] leading-relaxed tracking-normal max-w-md"
               >
                  From the way teams collaborate on large codebases, to how apps get rendered—we're excited to announce these upcoming features.
               </motion.p>
            </div>

            {/* Right: Feature Blocks */}
            <div className="flex flex-col">
               {/* Feature 1 */}
               <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="p-8 md:p-16 border-b border-white/[0.1] flex flex-col justify-center">
                  <div className="text-white font-mono text-sm mb-4">⌘ Secure Compute</div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">Limit your exposure. <span className="text-[#888] font-normal">Your internal APIs and databases are secure from the public internet. Builds and runtime traffic are funnelled through fully dedicated IP addresses.</span></h3>
               </motion.div>

               {/* Feature 2 */}
               <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="p-8 md:p-16 flex flex-col justify-center">
                  <div className="text-white font-mono text-sm mb-4">◓ Rolling Release</div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">Manage the rollout. <span className="text-[#888] font-normal">Minimize the risk by shipping to a fraction of users and monitoring performance before completing the rollout.</span></h3>
               </motion.div>
            </div>

         </div>
      </section>

      {/* ───────────────── Infrastructure Grid ───────────────── */}
      <section className="bg-[#000] border-b border-white/[0.1] w-full flex justify-center">
         <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-3 border-x border-white/[0.1]">
            
            <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-white/[0.1]">
               <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">Infinite scalability, zero config.</h3>
               <p className="text-[#888] text-[15px] leading-relaxed">Enable code to run on-demand without needing to manage your own infrastructure, provision servers, or upgrade hardware.</p>
            </div>
            
            <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-white/[0.1]">
               <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">Real-time insights and controls.</h3>
               <p className="text-[#888] text-[15px] leading-relaxed">Get granular, first-party, real-user metrics on site performance per deployment, and controls to instantly update or revert.</p>
            </div>
            
            <div className="p-12 md:p-16">
               <h3 className="text-2xl font-semibold tracking-tight text-white mb-4">Efficient compute for high-demand workloads</h3>
               <p className="text-[#888] text-[15px] leading-relaxed">Fluid compute optimizes resources to deliver powerful performance while minimizing waste.</p>
            </div>

         </div>
      </section>

      {/* ───────────────── Giant Split CTA ───────────────── */}
      <section className="w-full">
         <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
            {/* Left: Indigo */}
            <div className="bg-[#4f46e5] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden group">

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="relative z-10 max-w-lg">
                  <h2 className="text-5xl md:text-6xl tracking-tighter font-bold text-white mb-6 leading-tight">Scale your team securely.</h2>
                  <p className="text-indigo-100 text-lg md:text-xl mb-10 leading-relaxed font-medium">Talk to our enterprise experts about VPC peering, SSO, and dedicated hardware.</p>
                  
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold text-[15px] hover:bg-gray-100 transition-colors shadow-2xl">
                     Contact Enterprise Sales <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>

            {/* Right: Royal Blue */}
            <div className="bg-[#2563eb] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden group">

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="relative z-10 max-w-lg">
                  <h2 className="text-5xl md:text-6xl tracking-tighter font-bold text-white mb-6 leading-tight">Orchestrate<br/>any workload.</h2>
                  <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed font-medium">Read the documentation on our advanced Kubernetes and Docker integrations.</p>
                  
                  <Link to="/features" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-[15px] hover:bg-[#111] transition-colors border border-white/[0.2] shadow-2xl">
                     Read the docs <Terminal className="w-4 h-4" />
                  </Link>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
