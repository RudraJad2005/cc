import { motion, type Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const stats = [
  { value: '40k+', label: 'Teams shipping daily' },
  { value: '12M+', label: 'Workspaces booted' },
  { value: '99.99%', label: 'Platform uptime' },
  { value: '4.2x', label: 'Faster onboarding' }
];

const logos = ['Vercel', 'Retool', 'Arc', 'Raycast', 'RAMP', 'Loom', 'Linear', 'Supabase'];

const stories = [
  {
    company: 'Northwind',
    industry: 'Fintech',
    quote: 'We cut our environment setup from two days to two minutes. New engineers ship to production on day one.',
    author: 'Priya Nair',
    role: 'VP Engineering',
    img: 'https://i.pravatar.cc/100?img=47',
    metric: '92% less setup time'
  },
  {
    company: 'Halcyon',
    industry: 'Developer Tools',
    quote: 'The collaborative editor replaced three internal tools. Pairing across timezones finally feels native.',
    author: 'Marcus Lee',
    role: 'Staff Engineer',
    img: 'https://i.pravatar.cc/100?img=13',
    metric: '3 tools consolidated'
  },
  {
    company: 'Lumen Labs',
    industry: 'AI Research',
    quote: 'Running real Node containers in the browser changed how we prototype. No more "works on my machine".',
    author: 'Sofia Alvarez',
    role: 'Head of Platform',
    img: 'https://i.pravatar.cc/100?img=32',
    metric: '0 local dependencies'
  },
  {
    company: 'Driftwood',
    industry: 'E-commerce',
    quote: 'Our review cycles got dramatically faster. Reviewers open a live workspace instead of pulling branches.',
    author: 'Tom Becker',
    role: 'Engineering Manager',
    img: 'https://i.pravatar.cc/100?img=68',
    metric: '2.5x faster reviews'
  }
];

export function Customers() {
  return (
    <main className="w-full flex-1 flex flex-col">
      {/* Hero */}
      <section className="flex flex-col border-b border-white/[0.08] relative text-center items-center justify-center py-32 md:py-48 px-6 overflow-hidden bg-[#000000]">
        <div className="absolute inset-0 bg-dots mask-fade opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-60" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#71717a] text-[12px] font-medium tracking-[0.2em] mb-8 uppercase relative z-10"
        >
          Customers
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-[5.5rem] tracking-tighter font-semibold text-white mb-8 leading-[1.05] relative z-10 max-w-4xl"
        >
          <span className="text-gradient">Loved by the teams</span> <br />
          <span className="text-[#888]">building what's next.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed relative z-10 mb-10"
        >
          From seed-stage startups to public companies, engineering teams trust our IDE to ship
          faster — without ever touching a local environment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 relative z-10"
        >
          <Link
            to="/signup"
            className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3.5 text-[14px] font-semibold transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-2"
          >
            Start building <ArrowRight className="w-4 h-4 opacity-70" />
          </Link>
          <a
            href="#stories"
            className="bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] text-white rounded-full px-8 py-3.5 text-[14px] font-medium transition-all"
          >
            Read their stories
          </a>
        </motion.div>
      </section>

      {/* Stats */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-2 md:grid-cols-4 border-b border-white/[0.08] bg-[#050505]"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className={`flex flex-col items-center text-center py-14 px-6 border-white/[0.08] ${i < stats.length - 1 ? 'md:border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} ${i === 0 ? 'border-r' : ''} ${i === 2 ? 'border-r md:border-r' : ''} hover:bg-white/[0.02] transition-colors`}
          >
            <span className="text-4xl md:text-5xl font-semibold text-gradient tracking-tight mb-2">{s.value}</span>
            <span className="text-[#71717a] text-sm">{s.label}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* Logo wall */}
      <section className="py-20 flex flex-col items-center justify-center border-b border-white/[0.08] relative overflow-hidden bg-[#080808]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02),_transparent_50%)] pointer-events-none" />
        <p className="text-[#71717a] text-[12px] font-medium tracking-[0.2em] mb-12 text-center uppercase relative z-10">
          Trusted by 40,000+ engineering teams
        </p>
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 px-6 items-center opacity-40 grayscale relative z-10">
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-2xl font-bold tracking-tighter hover:text-white transition-colors duration-500 cursor-default"
            >
              {logo}
            </div>
          ))}
        </div>
      </section>

      {/* Featured story */}
      <section className="flex flex-col lg:flex-row border-b border-white/[0.08] bg-[#000000]">
        <div className="p-12 md:p-20 xl:p-[100px] flex-1 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08]">
          <span className="text-[#71717a] text-[12px] font-medium tracking-[0.2em] uppercase mb-8">
            Featured story
          </span>
          <Quote className="w-10 h-10 text-white/20 mb-6" />
          <blockquote className="text-2xl md:text-4xl tracking-tight font-medium text-white leading-snug mb-10 max-w-xl">
            "Our entire platform team moved off local machines. The browser is now our production
            environment — and we've never shipped faster."
          </blockquote>
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/100?img=5"
              alt="Elena Cruz"
              className="w-12 h-12 rounded-full border border-white/[0.1] object-cover"
            />
            <div>
              <div className="text-white font-medium text-[15px]">Elena Cruz</div>
              <div className="text-[#71717a] text-sm">CTO, Aperture</div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-12 lg:p-0 bg-[#050505] relative overflow-hidden min-h-[420px]">
          <div className="absolute inset-0 bg-grid mask-fade opacity-40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
          <div className="relative z-10 grid grid-cols-3 gap-4 w-full max-w-sm px-6">
            {['68%', '3x', '0', '12k', '99.9%', '24/7'].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                className="aspect-square rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-xl font-semibold text-white/80"
              >
                {stat}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story grid */}
      <section id="stories" className="flex flex-col border-b border-white/[0.08] bg-[#000000]">
        <div className="py-24 md:py-32 px-6 md:px-12 items-center text-center border-b border-white/[0.08]">
          <h2 className="text-3xl md:text-5xl tracking-tight font-medium text-white mb-6">
            Why teams switch to us
          </h2>
          <p className="text-lg text-[#71717a] max-w-2xl mx-auto">
            Real results from real engineering organizations who replaced their local setup with a
            fully collaborative cloud IDE.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 bg-[#050505]"
        >
          {stories.map((story, i) => (
            <motion.div
              key={story.company}
              variants={fadeUp}
              className={`group p-8 md:p-12 lg:p-16 flex flex-col border-white/[0.08] ${i % 2 === 0 ? 'md:border-r' : ''} ${i < stories.length - 2 ? 'border-b' : 'border-b md:border-b-0'} hover:bg-white/[0.02] transition-colors`}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-semibold text-white tracking-tight">{story.company}</span>
                <span className="text-[11px] text-[#71717a] uppercase tracking-[0.15em] border border-white/[0.08] rounded-full px-3 py-1">
                  {story.industry}
                </span>
              </div>

              <p className="text-[#d4d4d8] text-lg leading-relaxed mb-8 flex-1">"{story.quote}"</p>

              <div className="inline-flex items-center gap-2 self-start text-blue-400 text-sm font-medium bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
                {story.metric}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={story.img}
                    alt={story.author}
                    className="w-10 h-10 rounded-full border border-white/[0.1] object-cover"
                  />
                  <div>
                    <div className="text-white text-sm font-medium">{story.author}</div>
                    <div className="text-[#71717a] text-xs">{story.role}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#71717a] group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center justify-center py-32 md:py-48 relative border-b border-white/[0.08] overflow-hidden text-center bg-[#050505]">
        <div className="absolute inset-0 bg-grid mask-fade opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="relative z-10 flex flex-col items-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-[5rem] tracking-tight font-medium mb-6 leading-[1] max-w-3xl"
          >
            <span className="text-gradient">Join them.</span> <br />
            <span className="text-[#666]">Ship from the browser.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-8"
          >
            <Link
              to="/signup"
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3.5 text-[14px] font-semibold transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-2"
            >
              Start coding <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>
            <a
              href="#"
              className="bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] text-white rounded-full px-8 py-3.5 text-[14px] font-medium transition-all"
            >
              Contact sales
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
