import { motion } from 'motion/react';
import { Calendar, Trophy, GitPullRequest, Code2, Users2, Sparkles, MapPin } from 'lucide-react';

export function CommunityBento() {
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
    <section className="flex flex-col border-b border-white/[0.08] relative bg-[#000]">
      <div className="py-24 md:py-32 px-6 md:px-12 text-center relative z-10 border-b border-white/[0.08] bg-transparent">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-white mb-6 leading-[1.1]">
            A new kind of <br />
            <span className="text-[#888]">developer network.</span>
          </h2>
          <p className="text-lg text-[#888] leading-relaxed tracking-normal">
            Whether you're building your first project or scaling a massive startup, you'll find your people here.
          </p>
        </motion.div>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 w-full bg-transparent"
      >
        {/* Feature 1 */}
        <motion.div 
          variants={fadeUp}
          className="col-span-1 lg:col-span-2 p-8 md:p-12 lg:p-16 xl:p-[80px] border-b border-white/[0.08] md:border-r hover:bg-white/[0.02] transition-colors relative overflow-hidden group flex flex-col justify-between min-h-[400px]"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
          <div className="absolute bottom-8 right-8 flex gap-2 overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity">
             <div className="flex -space-x-4">
                <img className="w-12 h-12 rounded-full border-2 border-[#050505] inline-block" src="https://i.pravatar.cc/100?img=1" alt=""/>
                <img className="w-12 h-12 rounded-full border-2 border-[#050505] inline-block" src="https://i.pravatar.cc/100?img=2" alt=""/>
                <img className="w-12 h-12 rounded-full border-2 border-[#050505] inline-block" src="https://i.pravatar.cc/100?img=3" alt=""/>
                <img className="w-12 h-12 rounded-full border-2 border-[#050505] inline-block" src="https://i.pravatar.cc/100?img=4" alt=""/>
             </div>
          </div>
          <div>
            <div className="mb-6">
              <Trophy className="w-8 h-8 text-white/50" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-4 tracking-tight max-w-[300px]">Weekly Hackathons & Bounties</h3>
            <p className="text-[#a1a1aa] leading-relaxed max-w-[340px]">
              Join our weekend sprints to build new features, fix high-priority bugs, and compete for exclusive community bounties and swag.
            </p>
          </div>
        </motion.div>

        {/* Feature 2 */}
        <motion.div 
          variants={fadeUp}
          className="col-span-1 lg:col-span-1 p-8 md:p-12 lg:p-16 xl:p-[80px] border-b border-white/[0.08] hover:bg-white/[0.02] transition-colors relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-white/10 transition-colors">
            <GitPullRequest className="w-32 h-32" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center">
             <div>
                <Code2 className="w-8 h-8 text-white/50 mb-6" />
                <h3 className="text-xl font-medium text-white tracking-tight mb-4">Open Source First</h3>
                <p className="text-[#a1a1aa] leading-relaxed text-sm lg:text-base">
                   Contribute directly to our core repositories. We actively merge community PRs every single day.
                </p>
             </div>
          </div>
        </motion.div>

        {/* Feature 3 */}
        <motion.div 
          variants={fadeUp}
          className="col-span-1 md:col-span-1 p-8 md:p-12 lg:p-16 xl:p-[80px] border-b md:border-b-0 border-white/[0.08] md:border-r hover:bg-white/[0.02] transition-colors flex flex-col justify-center"
        >
          <div>
             <Calendar className="w-8 h-8 text-white/50 mb-6" />
             <h3 className="text-xl font-medium text-white tracking-tight mb-4">Office Hours</h3>
             <p className="text-[#a1a1aa] leading-relaxed text-sm lg:text-base">
                Book 1-on-1 time with our core engineering team for architecture reviews.
             </p>
          </div>
        </motion.div>

        {/* Feature 4 */}
        <motion.div 
          variants={fadeUp}
          className="col-span-1 md:col-span-1 p-8 md:p-12 lg:p-16 xl:p-[80px] border-b md:border-b-0 border-white/[0.08] md:border-r hover:bg-white/[0.02] transition-colors flex flex-col justify-center"
        >
          <div>
             <Sparkles className="w-8 h-8 text-white/50 mb-6" />
             <h3 className="text-xl font-medium text-white tracking-tight mb-4">Showcase</h3>
             <p className="text-[#a1a1aa] leading-relaxed text-sm lg:text-base">
                Demo your side projects to thousands of developers on our monthly community streams.
             </p>
          </div>
        </motion.div>

        {/* Feature 5 */}
        <motion.div 
          variants={fadeUp}
          className="col-span-1 md:col-span-2 lg:col-span-1 p-8 md:p-12 lg:p-16 xl:p-[80px] hover:bg-white/[0.02] transition-colors flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03),_transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left">
             <MapPin className="w-8 h-8 text-white/50 mb-6" />
             <h3 className="text-xl font-medium text-white tracking-tight mb-4">React Meetups</h3>
             <p className="text-[#a1a1aa] leading-relaxed text-sm lg:text-base">
                Connect with developers in your city. We sponsor local chapter meetups globally.
             </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
