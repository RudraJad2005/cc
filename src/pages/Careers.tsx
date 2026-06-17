import { motion } from 'motion/react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

const JOBS = [
  {
    title: "Senior Software Engineer, Core Engine",
    department: "Engineering",
    location: "San Francisco, CA (or Remote)",
    type: "Full-time"
  },
  {
    title: "Frontend Developer, Editor",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time"
  },
  {
    title: "Developer Advocate",
    department: "DevRel",
    location: "New York, NY (or Remote)",
    type: "Full-time"
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "London, UK (or Remote)",
    type: "Full-time"
  },
  {
    title: "Engineering Manager, Infrastructure",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time"
  }
];

export function Careers() {
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
    <main className="w-full flex-1 flex flex-col bg-[#000]">
       {/* Hero Section */}
       <section className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 xl:p-[100px] text-center border-b border-white/[0.08] relative overflow-hidden min-h-[40vh]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50" />
          
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-5xl lg:text-[6.5rem] tracking-tighter font-semibold text-white mb-8 leading-[1.05] relative z-10 max-w-4xl"
          >
             Join our mission.
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10 mb-10"
          >
             We're building the future of cloud development. Come work with a global team of passionate engineers and designers.
          </motion.p>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative z-10"
          >
            <a href="#open-roles" className="bg-white text-black px-8 py-3.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              View Open Roles
            </a>
          </motion.div>
       </section>

       {/* Values Section */}
       <section className="border-b border-white/[0.08] bg-[#000]">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row">
             <div className="w-full lg:w-1/3 p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-center">
                <h2 className="text-3xl font-medium text-white mb-6 tracking-tight">Why work with us?</h2>
                <p className="text-[#888] leading-relaxed">
                   We believe in small, autonomous teams that take extreme ownership. We ship fast, iterate constantly, and focus purely on developer experience.
                </p>
             </div>
             <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2">
                <div className="p-12 border-b md:border-b border-white/[0.08] md:border-r flex flex-col justify-center">
                   <h3 className="text-xl font-medium text-white mb-4">Remote First</h3>
                   <p className="text-[#888] text-sm leading-relaxed">Work from anywhere. We provide co-working stipends and home office setups.</p>
                </div>
                <div className="p-12 border-b border-white/[0.08] flex flex-col justify-center">
                   <h3 className="text-xl font-medium text-white mb-4">Continuous Learning</h3>
                   <p className="text-[#888] text-sm leading-relaxed">$2,000 annual education budget for courses, conferences, and books.</p>
                </div>
                <div className="p-12 md:border-r border-white/[0.08] border-b md:border-b-0 flex flex-col justify-center">
                   <h3 className="text-xl font-medium text-white mb-4">Health & Wellness</h3>
                   <p className="text-[#888] text-sm leading-relaxed">Premium healthcare coverage and a monthly wellness stipend.</p>
                </div>
                <div className="p-12 flex flex-col justify-center">
                   <h3 className="text-xl font-medium text-white mb-4">Open Source</h3>
                   <p className="text-[#888] text-sm leading-relaxed">We sponsor your open source contributions and encourage giving back.</p>
                </div>
             </div>
          </div>
       </section>

       {/* Open Roles */}
       <section id="open-roles" className="border-b border-white/[0.08] bg-[#000]">
          <div className="max-w-[1000px] mx-auto p-6 md:p-12 lg:p-20">
             <h3 className="text-3xl font-medium text-white mb-12 tracking-tight text-center">Open Roles</h3>
             
             <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col border border-white/[0.08] rounded-2xl overflow-hidden"
             >
                {JOBS.map((job, i) => (
                   <motion.div 
                      key={i} 
                      variants={fadeUp} 
                      className={`group flex items-center justify-between p-6 md:p-8 hover:bg-white/[0.02] transition-colors cursor-pointer ${i !== JOBS.length - 1 ? 'border-b border-white/[0.08]' : ''}`}
                   >
                      <div className="flex flex-col gap-2">
                         <h4 className="text-xl font-medium text-white group-hover:text-blue-400 transition-colors">{job.title}</h4>
                         <div className="flex flex-wrap items-center gap-4 text-sm text-[#888]">
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.type}</span>
                            <span className="px-2 py-0.5 rounded-full border border-white/[0.1] text-xs uppercase tracking-widest">{job.department}</span>
                         </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-white/[0.05] transition-all -translate-x-4 group-hover:translate-x-0">
                         <ArrowRight className="w-5 h-5" />
                      </div>
                   </motion.div>
                ))}
             </motion.div>
          </div>
       </section>
    </main>
  );
}
