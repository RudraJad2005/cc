import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Startup() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-orange-500/30 selection:text-white font-sans">
      
      {/* ───────────────── Hero Section (Vercel Style) ───────────────── */}
      <section className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-32 text-center border-b border-white/[0.1] relative overflow-hidden bg-[#000] w-full">
         <div className="max-w-[1400px] w-full border-x border-white/[0.1] absolute inset-0 mx-auto pointer-events-none" />
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-5xl lg:text-[5rem] tracking-tighter font-semibold text-white mb-8 leading-[1.05] relative z-10"
          >
             Collab Code is the Home of Startups.
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-lg md:text-xl text-[#888] max-w-3xl leading-relaxed tracking-normal relative z-10"
          >
             When cutting-edge product development requires more than just a platform, Collab Code stands out, delivering unprecedented tools and performance.
          </motion.p>
      </section>

      {/* ───────────────── Vercel Quote Layout ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] w-full flex justify-center">
         <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-3 border-x border-white/[0.1]">
            
            {/* The Quote (Takes up 2 columns) */}
            <div className="p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/[0.1] lg:col-span-2 flex flex-col justify-center">
               <p className="text-2xl md:text-3xl lg:text-4xl text-[#fff] leading-relaxed font-normal tracking-tight">
                  "Speed of execution is important for companies like ours. We are able to ship faster with Collab Code. After migrating, build times went from 5-8 minutes to just 40 seconds."
               </p>
            </div>

            {/* The Author (Takes up 1 column) */}
            <div className="p-8 md:p-16 flex flex-col justify-center items-start lg:items-center text-left lg:text-center">
               <div className="text-[#888] text-sm font-medium mb-4">Sarah Jenkins, CTO</div>
               <div className="text-3xl font-bold tracking-tighter text-white">acme corp</div>
            </div>

         </div>
      </section>

      {/* ───────────────── Features Layout ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] w-full flex justify-center">
         <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 border-x border-white/[0.1]">
            
            <div className="p-12 md:p-20 border-b md:border-b-0 md:border-r border-white/[0.1] flex flex-col justify-center text-center items-center">
               <h3 className="text-4xl font-semibold tracking-tighter text-white mb-6">Build with our SDK today.</h3>
               <p className="text-[#888] text-lg leading-relaxed mb-8 max-w-md">The open source toolkit for building cloud-native environments directly from your frontend.</p>
               <div className="border border-white/[0.2] bg-black text-white font-mono px-6 py-3 rounded-full flex items-center gap-4">
                  <span className="text-[#888]">$</span> npm i collab-code
               </div>
            </div>

            <div className="p-12 md:p-20 flex flex-col justify-center">
               <h3 className="text-4xl font-semibold tracking-tighter text-white mb-6">Get started with integrations.</h3>
               <p className="text-[#888] text-lg leading-relaxed mb-8">From databases to caching, commence your next project with a running start using our pre-built templates.</p>
               <Link to="/templates" className="inline-flex items-center justify-center bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors w-max">
                  View all Templates
               </Link>
            </div>

         </div>
      </section>

      {/* ───────────────── Giant Split CTA ───────────────── */}
      <section className="w-full">
         <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
            {/* Left: Vibrant Orange */}
            <div className="bg-[#ea580c] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden group">

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="relative z-10 max-w-lg">
                  <h2 className="text-5xl md:text-6xl tracking-tighter font-bold text-white mb-6 leading-tight">Claim your<br/>$10k credits.</h2>
                  <p className="text-orange-100 text-lg md:text-xl mb-10 leading-relaxed font-medium">Get 1 year of unlimited compute and scale your product without worrying about infrastructure costs.</p>
                  
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold text-[15px] hover:bg-gray-100 transition-colors shadow-2xl">
                     Apply for Startup Program <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>

            {/* Right: Neon Cyan */}
            <div className="bg-[#06b6d4] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden group">

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="relative z-10 max-w-lg">
                  <h2 className="text-5xl md:text-6xl tracking-tighter font-bold text-white mb-6 leading-tight">Explore the<br/>Community.</h2>
                  <p className="text-cyan-100 text-lg md:text-xl mb-10 leading-relaxed font-medium">Join 10,000+ founders and engineers discussing cloud architecture, sharing templates, and helping each other scale.</p>
                  
                  <Link to="/community" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-[15px] hover:bg-[#111] transition-colors border border-white/[0.2] shadow-2xl">
                     Join Discord <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
