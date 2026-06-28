import { motion } from 'motion/react';
import { Layers, Terminal, GitBranch } from 'lucide-react';

const features = [
  {
    title: "Multiplayer editing",
    desc: "Code together in real-time, share context instantly, and review pull requests live with your team.",
    icon: Layers,
  },
  {
    title: "Cloud compute",
    desc: "Every workspace is backed by dedicated cloud instances. Run heavily intensive tasks, servers, and databases.",
    icon: Terminal,
  },
  {
    title: "Git version control",
    desc: "Painless branching, merging, and conflict resolution baked right into the collaborative editor.",
    icon: GitBranch,
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function FeatureGrid() {
  return (
    <motion.section
       variants={staggerContainer}
       initial="hidden"
       whileInView="show"
       viewport={{ once: true, margin: "-100px" }}
       className="grid grid-cols-1 md:grid-cols-3 border-b border-white/[0.08] relative"
    >
      {/* center corner crosses */}
      <span className="corner-cross hidden md:block top-[-6px] left-1/3 -translate-x-1/2" />
      <span className="corner-cross hidden md:block top-[-6px] left-2/3 -translate-x-1/2" />

      {features.map((f, i) => {
        const Icon = f.icon;
        return (
          <motion.div
            variants={fadeUp}
            key={i}
            className={`group relative p-8 md:p-12 lg:p-16 xl:p-[80px] overflow-hidden ${i !== 2 ? 'md:border-r md:border-white/[0.08]' : ''} ${i !== 0 ? 'border-t md:border-t-0 border-white/[0.08]' : ''}`}
          >
            {/* hover spotlight */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.04),_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 mb-7 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/[0.04] transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-[#f4f4f5] mb-4 tracking-tight">{f.title}</h3>
              <p className="text-[#a1a1aa] leading-relaxed text-sm md:text-base max-w-sm">{f.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.section>
  );
}
