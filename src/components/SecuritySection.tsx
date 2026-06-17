import { motion } from 'motion/react';
import { ShieldCheck, Lock, Key, ServerOff } from 'lucide-react';

export function SecuritySection() {
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
    <section className="flex flex-col lg:flex-row border-b border-white/[0.08] relative">
      {/* grid intersection markers */}
      <span className="corner-cross hidden lg:block top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2" />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full lg:w-[45%] p-8 md:p-12 lg:p-20 xl:p-[100px] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08]"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-emerald-300/80 text-[11px] font-mono mb-6 uppercase tracking-widest w-fit">
          <ShieldCheck className="w-3.5 h-3.5" />
          Enterprise Security
        </div>
        <h2 className="text-3xl md:text-5xl tracking-tight font-medium mb-6 leading-[1.1]">
          <span className="text-gradient">Secure by default.</span><br />
          <span className="text-[#666]">Zero trust.</span>
        </h2>
        <p className="text-lg text-[#71717a] leading-relaxed tracking-wide">
          Your code never lives on unsecured local machines. Collab Code provides isolated, ephemeral environments that disappear when you're done.
        </p>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full lg:w-[55%] grid grid-cols-1 md:grid-cols-2"
      >
        <SecurityCard 
           icon={<ServerOff className="w-5 h-5 text-red-500" />}
           title="No local source code"
           desc="Source code is never downloaded to developer laptops."
           variants={fadeUp}
           borderRight borderBottom
        />
        <SecurityCard 
           icon={<Lock className="w-5 h-5 text-amber-500" />}
           title="Isolated MicroVMs"
           desc="Every workspace runs inside a hardened microVM."
           variants={fadeUp}
           borderBottom
        />
        <SecurityCard 
           icon={<Key className="w-5 h-5 text-blue-500" />}
           title="Secret management"
           desc="Inject env variables at runtime safely."
           variants={fadeUp}
           borderRight
        />
        <SecurityCard 
           icon={<ShieldCheck className="w-5 h-5 text-green-500" />}
           title="SOC2 & GDPR"
           desc="Compliant with global privacy regulations."
           variants={fadeUp}
        />
      </motion.div>
    </section>
  );
}

function SecurityCard({ icon, title, desc, variants, borderRight, borderBottom }: { icon: React.ReactNode, title: string, desc: string, variants: any, borderRight?: boolean, borderBottom?: boolean }) {
  return (
    <motion.div 
      variants={variants}
      className={`p-10 flex flex-col justify-center hover:bg-white/[0.02] transition-colors relative group ${borderRight ? 'md:border-r border-white/[0.08]' : ''} ${borderBottom ? 'border-b border-white/[0.08]' : ''}`}
    >
      <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center">
         {icon}
      </div>
      <h3 className="text-xl text-white font-medium mb-3 tracking-tight mt-6">{title}</h3>
      <p className="text-[#888] text-[15px] leading-relaxed">{desc}</p>
    </motion.div>
  )
}
