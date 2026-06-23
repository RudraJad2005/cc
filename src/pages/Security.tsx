import { motion } from 'framer-motion';
import { Shield, Lock, FileKey, CheckCircle2, Plus } from 'lucide-react';

const fadeUp = {
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

export function Security() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-emerald-500/30 selection:text-white font-sans">
      
      {/* ───────────────── Hero Section ───────────────── */}
      <section className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 xl:p-[100px] text-center border-b border-white/[0.1] relative overflow-hidden min-h-[40vh] bg-[#000]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]" />
          
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-5xl lg:text-[6.5rem] tracking-tighter font-semibold text-white mb-6 leading-[1.05] relative z-10 max-w-4xl"
          >
             Secure by default. <br/>
             <span className="text-[#888]">Enterprise ready.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10"
          >
             Every Collab Code workspace runs in deeply isolated microVMs with end-to-end encryption. Your code never leaks.
          </motion.p>
      </section>

      {/* ───────────────── Features Grid ───────────────── */}
      <section className="bg-[#000] relative w-full border-b border-white/[0.1]">
        <motion.div 
           variants={staggerContainer}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           className="max-w-[1400px] mx-auto border-x border-white/[0.1] relative grid grid-cols-1 md:grid-cols-2"
        >
          <Crosshair className="-top-1.5 -left-1.5" />
          <Crosshair className="-top-1.5 -right-1.5" />

          {/* Feature 1 */}
          <motion.div variants={fadeUp} className="p-12 md:p-16 border-b md:border-r border-white/[0.1] flex flex-col hover:bg-[#050505] transition-colors">
            <div className="w-12 h-12 border border-emerald-500/30 flex items-center justify-center mb-8 bg-emerald-500/5">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-4 text-white">SOC2 Type II Compliant</h3>
            <p className="text-[#888] text-lg leading-relaxed flex-1">
              Collab Code undergoes regular third-party audits to ensure our security posture meets the highest industry standards for availability and confidentiality.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={fadeUp} className="p-12 md:p-16 border-b border-white/[0.1] flex flex-col hover:bg-[#050505] transition-colors">
            <div className="w-12 h-12 border border-emerald-500/30 flex items-center justify-center mb-8 bg-emerald-500/5">
              <Lock className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-4 text-white">End-to-End Encryption</h3>
            <p className="text-[#888] text-lg leading-relaxed flex-1">
              All traffic between your local browser and the cloud environment is encrypted using TLS 1.3. Code at rest is encrypted using AES-256 block-level encryption.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={fadeUp} className="p-12 md:p-16 md:border-r border-b md:border-b-0 border-white/[0.1] flex flex-col hover:bg-[#050505] transition-colors">
            <div className="w-12 h-12 border border-emerald-500/30 flex items-center justify-center mb-8 bg-emerald-500/5">
              <FileKey className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-4 text-white">SSO & Directory Sync</h3>
            <p className="text-[#888] text-lg leading-relaxed flex-1">
              Enforce organization-wide access policies with SAML SSO. We natively support Okta, Azure AD, Google Workspace, and automatic SCIM provisioning.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div variants={fadeUp} className="p-12 md:p-16 flex flex-col hover:bg-[#050505] transition-colors bg-emerald-500/5">
            <h3 className="text-xl font-mono uppercase tracking-widest text-emerald-400 mb-8 border-b border-emerald-500/20 pb-4">Security Checklist</h3>
            <ul className="flex flex-col gap-4">
               {['DDoS Protection via Cloudflare', 'Automated vulnerability scanning', 'Role-Based Access Control (RBAC)', 'Detailed Audit Logs'].map((item, i) => (
                 <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-white text-[15px]">{item}</span>
                 </li>
               ))}
            </ul>
          </motion.div>

        </motion.div>
      </section>

    </main>
  );
}
