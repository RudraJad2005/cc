import { motion } from 'motion/react';

export function TestimonialSection() {
  return (
    <section className="flex flex-col border-b border-white/[0.08] relative">
      <div className="p-8 md:p-12 lg:p-20 xl:p-[100px]">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
           className="mb-16"
        >
           <h2 className="text-3xl md:text-4xl tracking-tight font-medium text-gradient mb-4">
             Loved by engineers.
           </h2>
           <p className="text-[#a1a1aa] text-lg">
             The IDE of choice for high-performance scale-ups.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <TestimonialCard 
              quote="Collab Code is the only web IDE I've used that actually makes pairing faster. The instant compute is an absolute joy."
              author="Guillermo Rauch"
              role="CEO, Vercel"
              avatar="https://i.pravatar.cc/150?u=rauchg"
              delay={0.1}
           />
           <TestimonialCard 
              quote="We evaluated every cloud editor. Collab Code's speed, keyboard shortcuts, and deep Git integrations made it the clear winner."
              author="David Cramer"
              role="CTO, Sentry"
              avatar="https://i.pravatar.cc/150?u=zeeg"
              delay={0.2}
           />
           <TestimonialCard 
              quote="Collab Code gave our engineering team their time back. Local setup is gone, so shipping features no longer feels like a chore."
              author="Vlad Magdalin"
              role="CEO, Webflow"
              avatar="https://i.pravatar.cc/150?u=callmevlad"
              delay={0.3}
           />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, author, role, avatar, delay }: { quote: string, author: string, role: string, avatar: string, delay: number }) {
  return (
     <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-col p-8 rounded-2xl border border-white/[0.08] bg-[#121212]/50 hover:bg-[#161616] transition-colors relative group overflow-hidden"
     >
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="mb-8 relative z-10">
           <svg className="w-6 h-6 text-white/10 mb-5" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
             <path d="M10 8c-4.4 0-8 3.6-8 8s3.6 8 8 8c1.5 0 3-.4 4.3-1.2l-1.3-3.8c-.8.5-1.9.8-3 .8-2.2 0-4-1.8-4-4s1.8-4 4-4c1.1 0 2.2.4 3 1.1l2.5-3C14.3 8.6 12.2 8 10 8zm14 0c-4.4 0-8 3.6-8 8s3.6 8 8 8c1.5 0 3-.4 4.3-1.2l-1.3-3.8c-.8.5-1.9.8-3 .8-2.2 0-4-1.8-4-4s1.8-4 4-4c1.1 0 2.2.4 3 1.1l2.5-3c-1.2-1.3-3.3-1.9-5.5-1.9z" />
           </svg>
           <p className="text-[#e4e4e7] text-[15px] leading-relaxed tracking-wide">"{quote}"</p>
        </div>
        
        <div className="flex items-center gap-3 mt-auto relative z-10">
           <img src={avatar} alt={author} className="w-10 h-10 rounded-full border border-white/[0.1] grayscale group-hover:grayscale-0 transition-all duration-500" />
           <div className="flex flex-col">
              <span className="text-white text-[13px] font-medium tracking-wide">{author}</span>
              <span className="text-[#a1a1aa] text-[12px]">{role}</span>
           </div>
        </div>
     </motion.div>
  );
}
