import { motion } from 'motion/react';
import { Gauge } from 'lucide-react';

export function PerformanceSection() {
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
    <section className="flex flex-col border-b border-white/[0.08] relative bg-[#080808]">
      <div className="flex flex-col lg:flex-row relative">
        {/* grid intersection markers */}
        <span className="corner-cross hidden lg:block top-[-6px] left-[45%] -translate-x-1/2" />
        <span className="corner-cross hidden md:block top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2" />
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-[45%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-indigo-300/80 text-[11px] font-mono mb-6 w-fit uppercase tracking-widest shadow-sm">
            <Gauge className="w-3.5 h-3.5" />
            Performance
          </div>
          <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold mb-6 leading-[1.1]">
            <span className="text-gradient">Faster than your</span> <br />
            <span className="text-[#666]">local machine.</span>
          </h2>
          <p className="text-lg text-[#888] leading-relaxed tracking-normal">
            Stop waiting for npm install, webpack builds, and local database seeding. Leverage the power of the cloud to do heavy lifting in milliseconds.
          </p>
        </motion.div>

        <motion.div 
           variants={staggerContainer}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-100px" }}
           className="w-full lg:w-[55%] grid grid-cols-1 md:grid-cols-2"
        >
           <MetricCard 
              value="<2s"
              label="Cold Start Time"
              desc="Proprietary snapshotting engine wakes your workspace instantly."
              borderBottom
              borderRight
              variants={fadeUp}
           />
           <MetricCard 
              value="64GB"
              label="Max RAM per Workspace"
              desc="Scale your instance up seamlessly when working with large monorepos."
              borderBottom
              variants={fadeUp}
           />
           <MetricCard 
              value="0ms"
              label="Local Overhead"
              desc="Development environments consume zero battery and CPU on your laptop."
              borderRight
              variants={fadeUp}
           />
           <MetricCard 
              value="15+"
              label="Global Regions"
              desc="Traffic is automatically routed to the closest compute region."
              variants={fadeUp}
           />
        </motion.div>
      </div>
    </section>
  );
}

function MetricCard({ value, label, desc, borderRight, borderBottom, variants }: { value: string, label: string, desc: string, borderRight?: boolean, borderBottom?: boolean, variants: any }) {
  return (
    <motion.div
      variants={variants}
      className={`group p-10 lg:p-14 flex flex-col justify-center hover:bg-white/[0.02] transition-colors relative overflow-hidden ${borderRight ? 'md:border-r border-white/[0.08]' : ''} ${borderBottom ? 'border-b border-white/[0.08]' : ''}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(99,102,241,0.06),_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 text-5xl lg:text-7xl font-semibold tracking-tighter text-gradient mb-4 font-sans">{value}</div>
      <div className="relative z-10 text-lg text-white font-medium mb-2 tracking-tight">{label}</div>
      <div className="relative z-10 text-[#888] text-sm leading-relaxed">{desc}</div>
    </motion.div>
  )
}

