import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

const stories = [
  {
    company: 'Northwind',
    industry: 'Fintech',
    quote: 'We cut our environment setup from two days to two minutes. New engineers ship to production on day one.',
    author: 'Priya Nair',
    role: 'VP Engineering',
    metric: '92% less setup time'
  },
  {
    company: 'Halcyon',
    industry: 'Developer Tools',
    quote: 'The collaborative editor replaced three internal tools. Pairing across timezones finally feels native.',
    author: 'Marcus Lee',
    role: 'Staff Engineer',
    metric: '3 tools consolidated'
  },
  {
    company: 'Lumen Labs',
    industry: 'AI Research',
    quote: 'Running real Node containers in the browser changed how we prototype. No more "works on my machine".',
    author: 'Sofia Alvarez',
    role: 'Head of Platform',
    metric: '0 local dependencies'
  },
  {
    company: 'Driftwood',
    industry: 'E-commerce',
    quote: 'Our review cycles got dramatically faster. Reviewers open a live workspace instead of pulling branches.',
    author: 'Tom Becker',
    role: 'Engineering Manager',
    metric: '2.5x faster reviews'
  }
];

export function Customers() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-emerald-500/30 selection:text-white font-sans">
      
      {/* ───────────────── Hero Section (Vercel Style) ───────────────── */}
      <section className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-32 text-center border-b border-white/[0.1] relative overflow-hidden bg-[#000] w-full">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]" />
         <div className="max-w-[1400px] w-full border-x border-white/[0.1] absolute inset-0 mx-auto pointer-events-none" />
         
         <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-[#888] text-[12px] font-mono tracking-[0.2em] mb-6 uppercase relative z-10"
         >
             Customers
         </motion.p>
         <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-4xl md:text-5xl lg:text-[6.5rem] tracking-tighter font-semibold text-white mb-8 leading-[1.05] relative z-10"
          >
             Loved by the teams <br/>
             <span className="text-[#888]">building what's next.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10"
          >
             From seed-stage startups to public companies, engineering teams trust Collab Code to ship faster — without ever touching a local environment.
          </motion.p>
      </section>

      {/* ───────────────── Stats Marquee / Grid ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] w-full flex justify-center">
         <div className="max-w-[1400px] w-full grid grid-cols-2 md:grid-cols-4 border-x border-white/[0.1]">
            <div className="p-8 md:p-12 border-b md:border-b-0 border-r border-white/[0.1] flex flex-col justify-center items-center text-center">
               <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">40k+</div>
               <div className="text-[#888] text-sm">Teams shipping daily</div>
            </div>
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/[0.1] flex flex-col justify-center items-center text-center">
               <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">12M+</div>
               <div className="text-[#888] text-sm">Workspaces booted</div>
            </div>
            <div className="p-8 md:p-12 border-b md:border-b-0 border-r border-white/[0.1] flex flex-col justify-center items-center text-center">
               <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">99.99%</div>
               <div className="text-[#888] text-sm">Platform uptime</div>
            </div>
            <div className="p-8 md:p-12 border-b md:border-b-0 flex flex-col justify-center items-center text-center">
               <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">4.2x</div>
               <div className="text-[#888] text-sm">Faster onboarding</div>
            </div>
         </div>
      </section>

      {/* ───────────────── Customer Stories Grid ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] w-full flex justify-center">
         <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 border-x border-white/[0.1]"
         >
            {stories.map((story, i) => (
               <motion.div 
                  key={i} 
                  variants={fadeUp} 
                  className={`p-12 md:p-20 border-white/[0.1] flex flex-col relative
                     ${i % 2 === 0 ? 'md:border-r border-b' : 'border-b'}
                  `}
               >
                  <Crosshair className="-top-1.5 -left-1.5" />
                  <Crosshair className="-top-1.5 -right-1.5" />
                  
                  <div className="flex justify-between items-center mb-8">
                     <span className="text-xl font-bold tracking-tighter text-white">{story.company}</span>
                     <span className="text-[11px] font-mono uppercase tracking-widest text-[#888] border border-white/[0.2] px-2 py-1">{story.industry}</span>
                  </div>
                  <p className="text-2xl md:text-3xl text-white leading-relaxed font-normal tracking-tight mb-12 flex-1">
                     "{story.quote}"
                  </p>
                  
                  <div className="flex justify-between items-end">
                     <div className="flex flex-col">
                        <span className="font-bold text-white mb-1">{story.author}</span>
                        <span className="text-[#888] text-sm">{story.role}</span>
                     </div>
                     <div className="text-[#888] font-mono text-sm border-b border-[#888] pb-1">
                        {story.metric}
                     </div>
                  </div>
               </motion.div>
            ))}
         </motion.div>
      </section>

      {/* ───────────────── Giant Split CTA ───────────────── */}
      <section className="w-full">
         <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
            {/* Left: Emerald */}
            <div className="bg-[#10b981] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden group">

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="relative z-10 max-w-lg">
                  <h2 className="text-5xl md:text-6xl tracking-tighter font-bold text-white mb-6 leading-tight">Scale with<br/>confidence.</h2>
                  <p className="text-emerald-100 text-lg md:text-xl mb-10 leading-relaxed font-medium">Join the thousands of teams using Collab Code Enterprise to secure their infrastructure.</p>
                  
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold text-[15px] hover:bg-gray-100 transition-colors shadow-2xl">
                     Contact Enterprise Sales <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>

            {/* Right: Deep Purple */}
            <div className="bg-[#7c3aed] p-12 md:p-24 flex flex-col justify-center relative overflow-hidden group">

               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <div className="relative z-10 max-w-lg">
                  <h2 className="text-5xl md:text-6xl tracking-tighter font-bold text-white mb-6 leading-tight">Start building<br/>for free.</h2>
                  <p className="text-purple-100 text-lg md:text-xl mb-10 leading-relaxed font-medium">Deploy your first workspace in seconds. No credit card required.</p>
                  
                  <Link to="/signup" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-[15px] hover:bg-[#111] transition-colors border border-white/[0.2] shadow-2xl">
                     Sign Up <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
