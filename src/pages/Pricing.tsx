import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';

export function Pricing() {
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
       <section className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 xl:p-[100px] text-center border-b border-white/[0.08] relative overflow-hidden min-h-[40vh] bg-[#000]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50" />
          
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-5xl lg:text-[6.5rem] tracking-tighter font-semibold text-white mb-8 leading-[1.05] relative z-10 max-w-4xl"
          >
             Simple pricing. <br/>
             <span className="text-[#888]">No surprises.</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10"
          >
             Start for free, scale when you need to. Choose the plan that fits your team's workflow.
          </motion.p>
       </section>

       {/* Pricing Cards */}
       <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 border-b border-white/[0.08]"
       >
          <PricingCard 
             name="Hobby"
             price="Free"
             desc="Perfect for side projects and learning."
             features={[
               "50 hours of compute / month",
               "2 vCPU, 4GB RAM per workspace",
               "Community support",
               "Public repositories only",
               "Standard cold starts"
             ]}
             notIncluded={[
               "Custom domains",
               "SSO & SAML",
               "SOC2 compliance reports"
             ]}
             buttonText="Start for free"
             borderRight
             variants={fadeUp}
          />
          <PricingCard 
             name="Pro"
             price="$20"
             interval="/mo"
             desc="For professional developers and small teams."
             features={[
               "Unlimited compute",
               "Up to 8 vCPU, 16GB RAM",
               "Priority email support",
               "Private repositories",
               "Instant cold starts (Pre-warmed)",
               "Custom domains"
             ]}
             notIncluded={[
               "SSO & SAML",
               "SOC2 compliance reports"
             ]}
             buttonText="Upgrade to Pro"
             active
             borderRight
             variants={fadeUp}
          />
          <PricingCard 
             name="Enterprise"
             price="Custom"
             desc="Advanced security and large-scale orchestration."
             features={[
               "Unlimited compute",
               "Up to 32 vCPU, 64GB RAM",
               "24/7 Phone & Slack support",
               "Private repositories",
               "Instant cold starts",
               "Custom domains",
               "SSO & SAML",
               "SOC2 compliance reports"
             ]}
             notIncluded={[]}
             buttonText="Contact Sales"
             variants={fadeUp}
          />
       </motion.section>

       {/* FAQ Section */}
       <section className="flex flex-col py-24 px-6 md:px-12 lg:px-20 xl:px-[100px] items-center relative border-b border-white/[0.08] bg-transparent">
          <h2 className="text-3xl font-medium text-white mb-16 tracking-tight">Frequently asked questions</h2>
          
          <div className="w-full max-w-3xl flex flex-col gap-8">
             <FaqItem 
                q="What counts as an hour of compute?" 
                a="Compute time is measured only while your workspace is actively running. If you close your browser tab or go idle for 15 minutes, the workspace automatically suspends and stops billing." 
             />
             <div className="w-full h-px bg-white/[0.08]"></div>
             <FaqItem 
                q="Can I switch plans anytime?" 
                a="Yes, you can upgrade or downgrade your plan at any time. Prorated charges will be applied to your account automatically upon upgrading." 
             />
             <div className="w-full h-px bg-white/[0.08]"></div>
             <FaqItem 
                q="Do you offer discounts for students or non-profits?" 
                a="We offer the Pro plan free of charge for students enrolled in accredited educational institutions, and a 50% discount for registered non-profits. Please contact support to apply." 
             />
             <div className="w-full h-px bg-white/[0.08]"></div>
             <FaqItem 
                q="What happens when I exceed my free tier limits?" 
                a="Your running workspaces will be safely persisted and suspended. You will not be charged automatically. You can either wait until the next billing cycle begins or upgrade to a Pro plan to resume work immediately." 
             />
          </div>
       </section>
    </main>
  );
}

function PricingCard({ name, price, interval, desc, features, notIncluded, buttonText, active, borderRight, variants }: any) {
  return (
    <motion.div variants={variants} className={`p-8 md:p-12 lg:p-16 xl:p-[80px] flex flex-col ${borderRight ? 'md:border-r border-white/[0.08]' : ''} border-b md:border-b-0 border-white/[0.08] relative ${active ? 'bg-white/[0.02]' : ''}`}>
       {active && (
         <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
       )}
       
       <h3 className="text-xl font-medium text-[#f4f4f5] mb-2 tracking-tight">{name}</h3>
       <div className="mb-4 flex items-end gap-1">
          <span className="text-4xl lg:text-5xl font-medium text-white tracking-tighter">{price}</span>
          {interval && <span className="text-[#a1a1aa] mb-1">{interval}</span>}
       </div>
       <p className="text-[#a1a1aa] leading-relaxed text-sm mb-8 min-h-[40px]">{desc}</p>
       
       <button className={`w-full py-3 px-6 rounded-full text-sm font-semibold transition-colors mb-10 ${active ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1]'}`}>
          {buttonText}
       </button>
       
       <div className="flex flex-col gap-4">
          <div className="text-[13px] font-medium tracking-wider text-white uppercase mb-2">Features</div>
          {features.map((f: string, i: number) => (
             <div key={i} className="flex gap-3 text-sm text-gray-300">
                <Check className="w-5 h-5 text-green-500 shrink-0" />
                <span>{f}</span>
             </div>
          ))}
          {notIncluded.map((f: string, i: number) => (
             <div key={i} className="flex gap-3 text-sm text-gray-600">
                <X className="w-5 h-5 opacity-50 shrink-0" />
                <span>{f}</span>
             </div>
          ))}
       </div>
    </motion.div>
  )
}

function FaqItem({ q, a }: { q: string, a: string }) {
  return (
    <div className="flex flex-col gap-3">
       <h4 className="text-lg font-medium text-white tracking-tight">{q}</h4>
       <p className="text-[#a1a1aa] leading-relaxed">{a}</p>
    </div>
  )
}
