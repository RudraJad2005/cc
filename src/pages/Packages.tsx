import { motion, type Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Package, Download, ArrowUpRight, ArrowRight, Terminal, ShieldCheck, Boxes, Zap, Star } from 'lucide-react';
import { PageHero } from '../components/PageHero';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const stats = [
  { value: '2.1M+', label: 'Packages published' },
  { value: '48B', label: 'Monthly downloads' },
  { value: '180k+', label: 'Active maintainers' },
  { value: '<40ms', label: 'Edge install time' }
];

const packages = [
  {
    name: '@core/runtime',
    version: '4.8.2',
    desc: 'The blazing-fast in-browser execution engine that powers every workspace container.',
    downloads: '12.4M',
    stars: '24.1k',
    tag: 'Official'
  },
  {
    name: 'collab-cursor',
    version: '2.3.0',
    desc: 'Real-time multiplayer cursors and presence built on CRDTs. Drop-in for any editor.',
    downloads: '3.8M',
    stars: '9.7k',
    tag: 'Popular'
  },
  {
    name: 'fs-sync',
    version: '1.9.5',
    desc: 'Bi-directional filesystem synchronization with conflict-free merges and offline support.',
    downloads: '5.2M',
    stars: '14.3k',
    tag: 'Popular'
  },
  {
    name: '@core/ai-agent',
    version: '0.12.1',
    desc: 'Composable AI coding agents with tool-use, streaming, and sandboxed execution.',
    downloads: '1.1M',
    stars: '6.2k',
    tag: 'New'
  },
  {
    name: 'term-emulator',
    version: '6.0.0',
    desc: 'A GPU-accelerated terminal emulator for the web with full xterm compatibility.',
    downloads: '8.9M',
    stars: '18.5k',
    tag: 'Official'
  },
  {
    name: 'deploy-edge',
    version: '3.4.7',
    desc: 'Ship any workspace to a global edge network with a single command. Zero config.',
    downloads: '2.6M',
    stars: '11.0k',
    tag: 'Popular'
  }
];

const categories = [
  { icon: <Boxes className="w-6 h-6" />, name: 'Frameworks', count: '12.4k packages' },
  { icon: <Zap className="w-6 h-6" />, name: 'Build Tools', count: '8.1k packages' },
  { icon: <ShieldCheck className="w-6 h-6" />, name: 'Security', count: '3.9k packages' },
  { icon: <Terminal className="w-6 h-6" />, name: 'CLI & Dev', count: '15.2k packages' }
];

function tagStyles(tag: string) {
  switch (tag) {
    case 'Official':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    case 'New':
      return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    default:
      return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
  }
}

export function Packages() {
  return (
    <main className="w-full flex-1 flex flex-col">
      {/* Hero */}
      <PageHero
        layout="left"
        bgPattern="none"
        glowColor="none"
        titleClassName="text-5xl md:text-[6rem] lg:text-[7.5rem] font-black tracking-tighter text-white"
        badgeContent={
          <div className="w-14 h-14 rounded-2xl border border-white/[0.1] bg-white/[0.03] flex items-center justify-center">
            <Package className="w-7 h-7 text-white/70" />
          </div>
        }
        title={
          <>
            Every package. <br />
            <span className="text-[#888]">Installed instantly.</span>
          </>
        }
        description="A registry of 2 million+ open-source packages, served from the edge and pre-cached in every workspace. No cold installs, no version conflicts."
      >
        {/* Search bar (decorative) */}
        <div className="w-full max-w-xl">
          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.1] rounded-full px-5 py-3.5 hover:bg-white/[0.05] transition-colors focus-within:border-white/30">
            <Search className="w-5 h-5 text-[#71717a] shrink-0" />
            <input
              type="text"
              placeholder="Search 2.1M packages, e.g. react, vite, tailwind..."
              className="flex-1 bg-transparent text-white text-[15px] placeholder:text-[#52525b] focus:outline-none"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#71717a] border border-white/[0.1] rounded px-2 py-1 font-medium">
              ⌘K
            </kbd>
          </div>
        </div>
      </PageHero>

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

      {/* Popular packages */}
      <section className="flex flex-col border-b border-white/[0.08] bg-[#000000]">
        <div className="py-24 md:py-32 px-6 md:px-12 items-center text-center border-b border-white/[0.08]">
          <h2 className="text-3xl md:text-5xl tracking-tight font-medium text-white mb-6">
            Popular this week
          </h2>
          <p className="text-lg text-[#71717a] max-w-2xl mx-auto">
            The packages developers reach for most — all pre-warmed in the global cache for
            sub-second installs.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#050505]"
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              variants={fadeUp}
              className={`group p-8 md:p-10 flex flex-col border-white/[0.08] border-b
                ${(i + 1) % 3 !== 0 ? 'lg:border-r' : ''}
                ${i % 2 === 0 ? 'md:border-r lg:border-r' : ''}
                hover:bg-white/[0.02] transition-colors`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-medium text-[15px] truncate">{pkg.name}</div>
                    <div className="text-[#71717a] text-xs font-mono">v{pkg.version}</div>
                  </div>
                </div>
                <span className={`shrink-0 text-[11px] uppercase tracking-[0.12em] border rounded-full px-2.5 py-1 ${tagStyles(pkg.tag)}`}>
                  {pkg.tag}
                </span>
              </div>

              <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6 flex-1">{pkg.desc}</p>

              {/* Install command */}
              <div className="flex items-center gap-2 bg-black/40 border border-white/[0.06] rounded-lg px-3 py-2 mb-5 font-mono text-[12px] text-[#d4d4d8] overflow-hidden">
                <span className="text-emerald-400 shrink-0">$</span>
                <span className="truncate">npm i {pkg.name}</span>
              </div>

              <div className="flex items-center justify-between text-[#71717a] text-xs">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> {pkg.downloads}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" /> {pkg.stars}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Categories */}
      <section className="flex flex-col border-b border-white/[0.08] bg-[#000000]">
        <div className="py-20 md:py-24 px-6 md:px-12 text-center border-b border-white/[0.08]">
          <h2 className="text-3xl md:text-4xl tracking-tight font-medium text-white mb-4">
            Browse by category
          </h2>
          <p className="text-base text-[#71717a] max-w-xl mx-auto">
            Curated, security-scanned, and ready to drop into any project.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#050505]"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              variants={fadeUp}
              className={`group p-8 md:p-10 lg:p-12 flex flex-col items-start border-white/[0.08] ${i < categories.length - 1 ? 'md:border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i === 0 || i === 2 ? 'border-b md:border-b lg:border-b-0' : ''} hover:bg-white/[0.02] transition-colors cursor-pointer`}
            >
              <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/60 mb-6 group-hover:text-white transition-colors">
                {cat.icon}
              </div>
              <h3 className="text-lg font-medium text-white mb-1 tracking-tight">{cat.name}</h3>
              <p className="text-[#71717a] text-sm">{cat.count}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Publish CTA */}
      <section className="flex flex-col lg:flex-row border-b border-white/[0.08] bg-[#000000]">
        <div className="p-12 md:p-20 xl:p-[100px] flex-1 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08]">
          <h2 className="text-3xl md:text-5xl tracking-tight font-medium text-white mb-6 leading-tight">
            Publish your <span className="text-gradient">package.</span>
          </h2>
          <p className="text-lg text-[#71717a] leading-relaxed mb-10 max-w-xl">
            Ship to millions of developers with one command. Automatic versioning, provenance
            signing, and edge distribution included — free for open source.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              to="/signup"
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3.5 text-[14px] font-semibold transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-2"
            >
              Start publishing <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>
            <Link
              to="/changelog"
              className="bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] text-white rounded-full px-8 py-3.5 text-[14px] font-medium transition-all"
            >
              Read the docs
            </Link>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-12 lg:p-0 bg-[#050505] relative overflow-hidden min-h-[420px]">
          <div className="absolute inset-0 bg-grid mask-fade opacity-40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative z-10 w-full max-w-sm bg-[#0a0a0a] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-[#71717a] text-xs font-mono">terminal</span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-relaxed">
              <div className="text-[#d4d4d8]"><span className="text-emerald-400">$</span> npm publish</div>
              <div className="text-[#71717a] mt-1">→ packing @you/my-package@1.0.0</div>
              <div className="text-[#71717a]">→ signing provenance...</div>
              <div className="text-[#71717a]">→ distributing to edge (18 regions)</div>
              <div className="text-emerald-400 mt-1">✓ published in 1.2s</div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
