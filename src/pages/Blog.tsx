import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const FEATURED_POST = {
  title: "Introducing Collab Code 2.0: The Future of Cloud Development",
  desc: "We've rebuilt our core engine from the ground up to provide sub-second cold starts, multiplayer collaboration, and seamless edge deployment.",
  date: "Oct 24, 2023",
  readTime: "8 min read",
  author: {
    name: "Alex Rivera",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=11"
  },
  cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
  category: "Product"
};

const POSTS = [
  {
    title: "How we achieved sub-second cold starts with Firecracker",
    desc: "A deep dive into our infrastructure architecture and how we leverage microVMs for instant environments.",
    date: "Oct 18, 2023",
    readTime: "12 min read",
    author: {
      name: "Sam Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=33"
    },
    category: "Engineering"
  },
  {
    title: "Best practices for managing secrets in serverless apps",
    desc: "Learn how to securely handle environment variables and API keys in ephemeral compute environments.",
    date: "Sep 28, 2023",
    readTime: "6 min read",
    author: {
      name: "Jamie Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=47"
    },
    category: "Security"
  },
  {
    title: "Migrating from Webpack to Vite: A migration guide",
    desc: "Why we made the switch and how you can progressively adopt modern frontend tooling.",
    date: "Sep 15, 2023",
    readTime: "10 min read",
    author: {
      name: "Alex Rivera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=11"
    },
    category: "Tutorial"
  },
  {
    title: "Building collaborative real-time editors with CRDTs",
    desc: "Explore the computer science behind our new multiplayer editing feature.",
    date: "Aug 30, 2023",
    readTime: "15 min read",
    author: {
      name: "Sarah Jenkins",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5"
    },
    category: "Engineering"
  },
  {
    title: "The State of Developer Experience 2023",
    desc: "We surveyed 10,000 developers about their tooling, pain points, and workflows.",
    date: "Aug 12, 2023",
    readTime: "8 min read",
    author: {
      name: "Michael Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=12"
    },
    category: "Community"
  },
  {
    title: "Introducing our new GitHub Integration",
    desc: "Automate your preview environments perfectly with our updated CI/CD pipeline integration.",
    date: "Jul 22, 2023",
    readTime: "5 min read",
    author: {
      name: "Sam Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=33"
    },
    category: "Product"
  }
];

export function Blog() {
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
       <section className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 xl:p-[100px] text-center border-b border-white/[0.08] relative overflow-hidden min-h-[40vh] bg-[#000000]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50" />
          
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-5xl lg:text-[6.5rem] tracking-tighter font-semibold text-white mb-8 leading-[1.05] relative z-10 max-w-4xl"
          >
             Our Blog
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed tracking-normal relative z-10"
          >
             Latest news, engineering deep-dives, and product updates from the Collab Code team.
          </motion.p>
       </section>

       {/* Featured Post */}
       <section className="border-b border-white/[0.08] bg-[#000000]">
          <div className="max-w-[1200px] mx-auto p-6 md:p-12 lg:p-20">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="group cursor-pointer flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
             >
                <div className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden border border-white/[0.08] relative">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                   <img src={FEATURED_POST.cover} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                   <div className="flex items-center gap-4 mb-6">
                     <span className="px-3 py-1 text-xs font-medium tracking-widest uppercase border border-white/[0.1] rounded-full text-white">{FEATURED_POST.category}</span>
                      <div className="flex items-center gap-2 text-sm text-[#71717a]">
                         <Calendar className="w-4 h-4" /> {FEATURED_POST.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#71717a]">
                         <Clock className="w-4 h-4" /> {FEATURED_POST.readTime}
                      </div>
                   </div>
                   
                   <h2 className="text-2xl md:text-4xl font-medium text-white mb-6 tracking-tight group-hover:text-blue-400 transition-colors">
                     {FEATURED_POST.title}
                   </h2>
                   
                   <p className="text-[#a1a1aa] leading-relaxed text-lg mb-8 max-w-xl">
                      {FEATURED_POST.desc}
                   </p>
                   
                   <div className="flex items-center gap-4 mt-auto">
                      <img src={FEATURED_POST.author.avatar} alt={FEATURED_POST.author.name} className="w-10 h-10 rounded-full border border-white/[0.1]" />
                      <div className="flex justify-between items-center w-full max-w-[200px]">
                         <span className="text-white text-sm font-medium">{FEATURED_POST.author.name}</span>
                         <span className="text-white flex items-center gap-2 text-sm font-medium group-hover:translate-x-2 transition-transform">Read <ArrowRight className="w-4 h-4" /></span>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
       </section>

       {/* Post Grid */}
       <section className="border-b border-white/[0.08] bg-[#000] relative">
          <div className="max-w-[1200px] mx-auto p-6 md:p-12 lg:p-20 relative z-10">
             <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-medium text-white tracking-tight">Recent Posts</h3>
                <div className="flex gap-2 hidden md:flex">
                   <button className="px-4 py-2 text-sm text-white bg-white/[0.05] border border-white/[0.1] rounded-full hover:bg-white/[0.1] transition-colors">All</button>
                   <button className="px-4 py-2 text-sm text-[#888] hover:text-white transition-colors">Engineering</button>
                   <button className="px-4 py-2 text-sm text-[#888] hover:text-white transition-colors">Product</button>
                   <button className="px-4 py-2 text-sm text-[#888] hover:text-white transition-colors">Tutorials</button>
                </div>
             </div>

             <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-transparent border-t border-l border-white/[0.08]"
             >
                {POSTS.map((post, i) => (
                   <motion.div key={i} variants={fadeUp} className="group cursor-pointer flex flex-col h-full border-r border-b border-white/[0.08] p-8 hover:bg-white/[0.02] transition-colors relative">
                      <div className="flex items-center justify-between mb-8 text-sm text-[#888]">
                         <div className="w-8 h-8 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white"><path d="M12 2L2 22h20L12 2z"/></svg>
                         </div>
                         <span>{post.date}</span>
                      </div>
                      
                      <h4 className="text-2xl font-medium text-white mb-4 tracking-tighter group-hover:text-blue-400 transition-colors line-clamp-3">
                         {post.title}
                      </h4>
                      
                      <p className="text-[#888] leading-relaxed text-[15px] mb-8 line-clamp-4 flex-1">
                         {post.desc}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-auto pt-6 border-t border-white/[0.08]">
                         <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full border border-white/[0.1]" />
                         <span className="text-white text-sm font-medium">{post.author.name}</span>
                      </div>
                   </motion.div>
                ))}
             </motion.div>
             
             <div className="mt-20 flex justify-center">
                <button className="px-8 py-3 rounded-full text-sm font-medium text-white bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] transition-colors flex items-center gap-2">
                   Load more posts <ArrowRight className="w-4 h-4" />
                </button>
             </div>
          </div>
       </section>

       {/* Newsletter */}
       <section className="py-24 px-6 md:px-12 border-b border-white/[0.08] bg-[#000000] flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03),_transparent_50%)] pointer-events-none" />
          
          <h2 className="text-3xl font-medium text-white mb-4 tracking-tight relative z-10">Subscribe to our newsletter</h2>
          <p className="text-[#a1a1aa] mb-10 max-w-md relative z-10">Get the latest posts delivered right to your inbox. We promise we won't spam you.</p>
          
          <form className="flex w-full max-w-md relative z-10" onSubmit={(e) => e.preventDefault()}>
             <input type="email" placeholder="john@example.com" className="flex-1 bg-white/[0.03] border border-white/[0.1] rounded-l-lg px-4 py-3 text-white outline-none focus:border-white/[0.2] transition-colors" />
             <button type="submit" className="bg-white text-black px-6 py-3 font-medium rounded-r-lg hover:bg-gray-200 transition-colors">
                Subscribe
             </button>
          </form>
       </section>
    </main>
  );
}
