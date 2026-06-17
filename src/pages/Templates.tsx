import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Layers, Code2, Server, Sparkles, Smartphone, ArrowRight,
  Star, Zap, GitFork, Rocket, Terminal, Check
} from 'lucide-react';

type Category = 'All' | 'Full-stack' | 'Frontend' | 'Backend' | 'AI' | 'Mobile';

const categories: { label: Category; icon: any }[] = [
  { label: 'All', icon: Layers },
  { label: 'Full-stack', icon: Layers },
  { label: 'Frontend', icon: Code2 },
  { label: 'Backend', icon: Server },
  { label: 'AI', icon: Sparkles },
  { label: 'Mobile', icon: Smartphone },
];

const templates = [
  { name: 'Next.js SaaS Starter', desc: 'Auth, Stripe billing, and a dashboard — production-ready.', stack: ['Next.js', 'Stripe', 'Postgres'], category: 'Full-stack', glyph: '▲', accent: 'from-white/[0.08]', uses: '12.4k' },
  { name: 'React + Vite SPA', desc: 'A lightning-fast single-page app with Tailwind preconfigured.', stack: ['React', 'Vite', 'Tailwind'], category: 'Frontend', glyph: '⚛', accent: 'from-sky-500/15', uses: '28.1k' },
  { name: 'AI Chatbot', desc: 'Streaming chat UI wired to Gemini with message history.', stack: ['Next.js', 'Gemini', 'Edge'], category: 'AI', glyph: '✦', accent: 'from-indigo-500/20', uses: '9.7k' },
  { name: 'FastAPI Service', desc: 'Typed Python API with async routes and OpenAPI docs.', stack: ['Python', 'FastAPI', 'Pydantic'], category: 'Backend', glyph: '🐍', accent: 'from-emerald-500/15', uses: '6.3k' },
  { name: 'SvelteKit Blog', desc: 'Markdown-powered blog with RSS and zero-JS pages.', stack: ['SvelteKit', 'MDsveX'], category: 'Frontend', glyph: '◆', accent: 'from-orange-500/15', uses: '4.1k' },
  { name: 'Expo Mobile App', desc: 'Cross-platform React Native starter with navigation.', stack: ['Expo', 'React Native'], category: 'Mobile', glyph: '◉', accent: 'from-purple-500/15', uses: '5.8k' },
  { name: 'RAG Pipeline', desc: 'Retrieval-augmented generation with a vector store.', stack: ['Python', 'LangChain', 'pgvector'], category: 'AI', glyph: '⌘', accent: 'from-pink-500/15', uses: '3.9k' },
  { name: 'Remix Commerce', desc: 'Full storefront with cart, checkout, and product pages.', stack: ['Remix', 'Stripe'], category: 'Full-stack', glyph: '◈', accent: 'from-blue-500/15', uses: '7.2k' },
  { name: 'Go Microservice', desc: 'Minimal gRPC + REST service with graceful shutdown.', stack: ['Go', 'gRPC', 'Docker'], category: 'Backend', glyph: '⟁', accent: 'from-cyan-500/15', uses: '4.6k' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export function Templates() {
  const [active, setActive] = useState<Category>('All');
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax: hero glow + grid drift slightly slower than scroll.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filtered = active === 'All' ? templates : templates.filter((t) => t.category === active);

  return (
    <main className="w-full flex-1 flex flex-col bg-[#080808]">
      {/* Hero with parallax backdrop */}
      <section ref={heroRef} className="pt-28 pb-20 md:pt-36 md:pb-28 px-6 flex flex-col items-center text-center relative overflow-hidden border-b border-white/[0.08]">
        <motion.div style={{ y: glowY, scale: glowScale }} className="absolute inset-0 origin-top pointer-events-none">
          <div className="absolute inset-0 bg-grid mask-fade opacity-60" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 via-purple-500/5 to-transparent blur-[110px] rounded-full" />
          </div>
        </motion.div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        <motion.div style={{ opacity: heroFade }} className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-[12px] font-mono uppercase tracking-widest text-indigo-300/80 mb-8"
          >
            <Rocket className="w-3.5 h-3.5" />
            Templates
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gradient text-4xl md:text-6xl lg:text-[5.5rem] tracking-tighter font-semibold mb-7 leading-[0.95] max-w-4xl"
          >
            Skip the setup. <br className="hidden md:block" /> Start from a template.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed mb-10"
          >
            Pre-configured, production-ready starters that boot into a live cloud workspace in seconds. No installs, no config — just open and code.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button className="group bg-white text-black px-7 py-3.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 shadow-[0_0_50px_-12px_rgba(255,255,255,0.5)]">
              Browse templates
              <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="bg-white/[0.04] border border-white/[0.1] text-white px-7 py-3.5 rounded-full font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
              Submit a template
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Sticky category filter + grid */}
      <section className="border-b border-white/[0.08] relative">
        {/* sticky filter bar */}
        <div className="sticky top-[64px] z-30 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center gap-2 overflow-x-auto px-6 md:px-12 lg:px-20 xl:px-[100px] py-4 no-scrollbar">
            {categories.map((c) => {
              const Icon = c.icon;
              const on = active === c.label;
              return (
                <button
                  key={c.label}
                  onClick={() => setActive(c.label)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 border ${
                    on
                      ? 'bg-white text-black border-white'
                      : 'text-gray-400 border-white/[0.08] bg-white/[0.02] hover:text-white hover:border-white/20'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 md:p-12 lg:p-20 xl:p-[100px] gap-6"
        >
          {filtered.map((t) => (
            <motion.div
              key={t.name}
              layout
              variants={fadeUp}
              className="group flex flex-col rounded-2xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden hover:border-white/[0.16] transition-all duration-300 hover:-translate-y-1"
            >
              {/* preview thumbnail */}
              <div className={`relative h-40 bg-gradient-to-br ${t.accent} to-transparent overflow-hidden border-b border-white/[0.06]`}>
                <div className="absolute inset-0 bg-grid-sm opacity-40" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-5xl text-white/80 group-hover:scale-110 transition-transform duration-500">
                  {t.glyph}
                </div>
                <span className="absolute bottom-3 right-3 text-[10px] font-mono uppercase tracking-widest text-white/50 px-2 py-0.5 rounded-full border border-white/[0.08] bg-black/40">
                  {t.category}
                </span>
              </div>

              {/* body */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-[16px] font-medium text-white tracking-tight">{t.name}</h3>
                  <span className="shrink-0 inline-flex items-center gap-1 text-[11px] text-[#888]">
                    <Star className="w-3 h-3 text-amber-400/80" /> {t.uses}
                  </span>
                </div>
                <p className="text-[#888] text-[13px] leading-relaxed mb-4 flex-1">{t.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {t.stack.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md border border-white/[0.06] bg-white/[0.02] text-[11px] text-gray-400">{s}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-white text-black text-[13px] font-medium hover:bg-gray-100 transition-colors">
                    <Zap className="w-3.5 h-3.5" /> Deploy
                  </button>
                  <button className="w-10 h-10 shrink-0 rounded-full border border-white/[0.1] bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.06] transition-colors" title="Fork">
                    <GitFork className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Sticky-scroll: how it works */}
      <section className="border-b border-white/[0.08] relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* pinned column */}
          <div className="lg:sticky lg:top-[120px] lg:h-fit p-8 md:p-12 lg:p-20 xl:p-[100px] border-b lg:border-b-0 lg:border-r border-white/[0.08]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-indigo-300/80 text-[11px] font-mono mb-6 w-fit uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" /> Zero setup
            </div>
            <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold mb-6 leading-[1.1]">
              <span className="text-gradient">From template</span><br />
              <span className="text-[#666]">to running app.</span>
            </h2>
            <p className="text-lg text-[#888] leading-relaxed max-w-md">
              Every template is more than source code — it’s a snapshot of a fully provisioned environment. Pick one and you’re instantly inside a live, dependency-installed workspace.
            </p>
          </div>

          {/* scrolling steps */}
          <div className="flex flex-col">
            {[
              { n: '01', icon: Layers, title: 'Pick a template', desc: 'Choose from full-stack apps, AI starters, APIs, and mobile — each vetted and kept up to date.' },
              { n: '02', icon: Zap, title: 'Workspace boots instantly', desc: 'A cloud microVM hydrates from a snapshot with dependencies already installed. No npm install wait.' },
              { n: '03', icon: Code2, title: 'Start coding immediately', desc: 'The dev server is already running with hot reload. Edit a file and see it live in the preview.' },
              { n: '04', icon: Rocket, title: 'Deploy in one click', desc: 'Ship to the edge straight from the workspace — or invite your team to build alongside you.' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  viewport={{ once: true, margin: '-120px' }}
                  className="group p-8 md:p-12 lg:p-16 xl:p-20 border-b border-white/[0.08] last:border-b-0 flex gap-6 hover:bg-white/[0.015] transition-colors"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[11px] tracking-widest text-[#555] mt-3">{s.n}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 tracking-tight">{s.title}</h3>
                    <p className="text-[#888] leading-relaxed max-w-md">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="border-b border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 bg-[#050505]">
        {[
          { v: '0s', l: 'Local setup' },
          { v: '120+', l: 'Templates' },
          { v: '1-click', l: 'Deploy' },
          { v: 'Always', l: 'Up to date' },
        ].map((s, i) => (
          <div key={i} className={`group p-8 md:p-12 text-center relative overflow-hidden hover:bg-white/[0.02] transition-colors ${i !== 3 ? 'lg:border-r border-white/[0.08]' : ''} ${i % 2 === 0 ? 'border-r lg:border-r' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''}`}>
            <div className="text-3xl md:text-5xl font-semibold tracking-tighter text-gradient mb-2 flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-emerald-400/70 hidden md:block" />{s.v}
            </div>
            <div className="text-[#888] text-sm tracking-wide">{s.l}</div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40 px-6 flex flex-col items-center text-center relative overflow-hidden bg-[#050505] border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-grid mask-fade opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-6xl tracking-tighter font-semibold text-gradient mb-6 max-w-3xl leading-[1]">
            Your next project is one click away.
          </h2>
          <p className="text-[#888] text-lg max-w-xl mb-10">
            Open a template and start building in a live workspace — no credit card required.
          </p>
          <button className="group bg-white text-black px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 shadow-[0_0_50px_-12px_rgba(255,255,255,0.5)]">
            Browse all templates
            <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>
    </main>
  );
}
