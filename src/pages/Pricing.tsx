import { motion } from 'framer-motion';
import { Check, X, Plus } from 'lucide-react';

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

// Reusable Crosshair
const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.2] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

export function Pricing() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-white selection:text-black font-sans">
       {/* Hero Section */}
       <section className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 xl:p-[100px] text-center border-b border-white/[0.1] relative overflow-hidden min-h-[40vh] bg-[#000]">
          {/* Strict Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]" />
          
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
          className="grid grid-cols-1 md:grid-cols-3 border-b border-white/[0.1] relative max-w-[1400px] mx-auto w-full"
       >
          <Crosshair className="-top-1.5 -left-1.5" />
          <Crosshair className="-top-1.5 -right-1.5" />

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
          />
          <PricingCard 
             name="Enterprise"
             price="Custom"
             desc="Advanced security and large-scale orchestration."
             features={[
               "Unlimited compute",
               "Up to 32 vCPU, 64GB RAM",
               "24/7 Phone & Slack support",
               "Private cloud deployments",
               "Custom domain routing",
               "Dedicated success manager",
               "SSO & SAML",
               "SOC2 compliance reports"
             ]}
             notIncluded={[]}
             buttonText="Contact Sales"
          />
       </motion.section>

       {/* Enterprise CTA */}
       <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-20 max-w-[1400px] mx-auto w-full border-b border-white/[0.1] relative">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.02)_0,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_10px)] pointer-events-none" />
          <div className="relative z-10 mb-8 md:mb-0">
             <h2 className="text-3xl font-semibold tracking-tighter text-white mb-2">Need a custom plan?</h2>
             <p className="text-[#888] text-lg">Contact us for large teams and self-hosted options.</p>
          </div>
          <button className="relative z-10 px-8 py-3.5 bg-[#050505] border border-white/[0.2] text-white text-[14px] font-bold hover:bg-[#111] transition-colors flex items-center gap-2">
             Contact Sales
          </button>
       </section>
    </main>
  );
}

function PricingCard({ 
  name, 
  price, 
  interval = "", 
  desc, 
  features, 
  notIncluded, 
  buttonText, 
  active = false,
  borderRight = false
}: {
  name: string,
  price: string,
  interval?: string,
  desc: string,
  features: string[],
  notIncluded: string[],
  buttonText: string,
  active?: boolean,
  borderRight?: boolean
}) {
  return (
    <motion.div 
      variants={fadeUp}
      className={`p-8 md:p-12 flex flex-col relative
        ${borderRight ? 'md:border-r border-b md:border-b-0 border-white/[0.1]' : 'border-b md:border-b-0 border-white/[0.1]'}
        ${active ? 'bg-white text-black' : 'bg-[#000] text-white hover:bg-[#050505]'}
        transition-colors duration-300
      `}
    >
      <h3 className={`text-xl tracking-tight mb-2 font-medium ${active ? 'text-black' : 'text-white'}`}>{name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-5xl font-bold tracking-tighter">{price}</span>
        {interval && <span className={`text-lg ${active ? 'text-[#666]' : 'text-[#888]'}`}>{interval}</span>}
      </div>
      <p className={`text-[15px] mb-8 min-h-[48px] leading-relaxed ${active ? 'text-[#444]' : 'text-[#888]'}`}>{desc}</p>
      
      <button 
        className={`w-full py-4 text-[14px] font-bold transition-all mb-10 border
          ${active 
            ? 'bg-black text-white hover:bg-[#222] border-black' 
            : 'bg-[#050505] text-white border-white/[0.2] hover:bg-[#111]'
          }
        `}
      >
        {buttonText}
      </button>

      <div className="flex flex-col gap-4 flex-1">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
             <div className={`mt-0.5 shrink-0 ${active ? 'text-black' : 'text-white'}`}>
                <Check className="w-5 h-5" />
             </div>
             <span className={`text-[15px] leading-relaxed ${active ? 'text-black' : 'text-white'}`}>{f}</span>
          </div>
        ))}
        {notIncluded.map((f, i) => (
          <div key={i} className="flex items-start gap-3 opacity-50">
             <div className={`mt-0.5 shrink-0 ${active ? 'text-[#666]' : 'text-[#888]'}`}>
                <X className="w-5 h-5" />
             </div>
             <span className={`text-[15px] leading-relaxed ${active ? 'text-[#666]' : 'text-[#888]'}`}>{f}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
