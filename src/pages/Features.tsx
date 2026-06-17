import { motion } from 'motion/react';
import {
  Users, Cloud, GitBranch, Terminal, ShieldCheck, Gauge,
  Sparkles, Command, Boxes, Workflow, Lock, ArrowRight,
  Check, X, Layers, Bell, Search, Puzzle, History, Cpu
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const features = [
  { icon: Users, title: 'Multiplayer editing', desc: 'See teammates’ cursors, selections, and edits live. Pair program without screen-sharing latency.' },
  { icon: Cloud, title: 'Instant cloud compute', desc: 'Every workspace is backed by dedicated microVMs. Run servers, databases, and builds in milliseconds.' },
  { icon: GitBranch, title: 'Native Git workflow', desc: 'Branch, commit, and resolve conflicts inside the editor — with live PR review baked in.' },
  { icon: Command, title: 'Global command menu', desc: 'Trigger any action, script, or workload from a single keystroke. Stop hunting through CLI tools.' },
  { icon: ShieldCheck, title: 'Zero-trust security', desc: 'Source code never touches a local disk. Isolated, ephemeral environments that vanish when you’re done.' },
  { icon: Gauge, title: 'Sub-second cold starts', desc: 'A proprietary snapshotting engine hydrates your environment faster than your laptop wakes up.' },
];

export function Features() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#080808]">
      {/* Hero */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 px-6 flex flex-col items-center text-center relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-grid mask-fade opacity-60 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[520px] pointer-events-none opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 via-purple-500/5 to-transparent blur-[110px] rounded-full" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] text-[12px] font-mono uppercase tracking-widest text-indigo-300/80 mb-8 relative z-10"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Features
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-gradient text-4xl md:text-6xl lg:text-[5.5rem] tracking-tighter font-semibold mb-7 leading-[0.95] relative z-10 max-w-4xl"
        >
          Everything you need <br className="hidden md:block" /> to ship faster.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed relative z-10 mb-10"
        >
          A complete, multiplayer cloud development platform — from instant compute to native Git, designed so your team spends time building, not configuring.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 relative z-10"
        >
          <button className="group bg-white text-black px-7 py-3.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 shadow-[0_0_50px_-12px_rgba(255,255,255,0.5)]">
            Start for free
            <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button className="bg-white/[0.04] border border-white/[0.1] text-white px-7 py-3.5 rounded-full font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
            Read the docs
          </button>
        </motion.div>
      </section>

      {/* Feature grid */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-white/[0.08] relative"
      >
        {/* grid intersection markers */}
        <span className="corner-cross hidden lg:block top-[-6px] left-1/3 -translate-x-1/2" />
        <span className="corner-cross hidden lg:block top-[-6px] left-2/3 -translate-x-1/2" />

        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              variants={fadeUp}
              key={i}
              className={`group relative p-8 md:p-12 lg:p-14 overflow-hidden border-white/[0.08]
                ${i % 3 !== 2 ? 'lg:border-r' : ''}
                ${i % 2 === 0 ? 'md:border-r lg:border-r' : 'md:border-r-0'}
                ${i >= 1 ? 'border-t md:border-t' : ''}
                ${i >= 3 ? 'lg:border-t' : ''}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(99,102,241,0.06),_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-7 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/[0.04] transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-medium text-[#f4f4f5] mb-3 tracking-tight">{f.title}</h3>
                <p className="text-[#a1a1aa] leading-relaxed text-sm md:text-[15px]">{f.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Spotlight split: workflow */}
      <section className="flex flex-col lg:flex-row border-b border-white/[0.08] relative">
        <span className="corner-cross hidden lg:block top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2" />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-full lg:w-1/2 p-8 md:p-12 lg:p-20 xl:p-[100px] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-indigo-300/80 text-[11px] font-mono mb-6 w-fit uppercase tracking-widest">
            <Workflow className="w-3.5 h-3.5" />
            Built for teams
          </div>
          <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold mb-6 leading-[1.1]">
            <span className="text-gradient">One workspace.</span><br />
            <span className="text-[#666]">Your whole team.</span>
          </h2>
          <p className="text-lg text-[#888] leading-relaxed mb-8 max-w-lg">
            Invite anyone with a link. Everyone shares the same files, the same compute, and the same terminal — in real time, with zero local setup.
          </p>
          <div className="flex flex-col gap-3">
            {['Live presence & shared cursors', 'In-editor reviews and comments', 'Per-branch preview environments'].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-[15px] text-gray-300">
                <span className="w-6 h-6 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-[#888] font-mono text-[11px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-20 flex items-center justify-center relative overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 bg-grid-sm mask-fade opacity-50 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08),_transparent_70%)] pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
            className="w-full max-w-[420px] rounded-xl border border-white/[0.1] bg-[#0d0d0d]/90 backdrop-blur-xl glow-ring overflow-hidden relative z-10"
          >
            <div className="flex items-center justify-between px-4 h-11 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-[12px] font-mono text-gray-400">
                <Boxes className="w-3.5 h-3.5 text-indigo-400" /> workspace / main
              </div>
              <div className="flex -space-x-1.5">
                {['a', 'b', 'c'].map((u) => (
                  <img key={u} src={`https://i.pravatar.cc/80?u=feat-${u}`} className="w-6 h-6 rounded-full ring-2 ring-[#0d0d0d]" alt="" />
                ))}
              </div>
            </div>
            <div className="p-4 font-mono text-[12.5px] leading-relaxed">
              <p className="text-gray-500"><span className="text-pink-400">function</span> <span className="text-amber-200">deploy</span>() {'{'}</p>
              <p className="text-gray-400 pl-4 relative">
                <span className="text-emerald-400">await</span> build();
                <span className="absolute -right-1 top-0 text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Ana</span>
              </p>
              <p className="text-gray-400 pl-4"><span className="text-emerald-400">await</span> ship();</p>
              <p className="text-gray-500">{'}'}</p>
              <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-gray-500 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">✓</span> Deployed to edge in <span className="text-white">312ms</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 relative">
        {[
          { v: '<2s', l: 'Cold start' },
          { v: '64GB', l: 'Max RAM' },
          { v: '18', l: 'Edge regions' },
          { v: '99.99%', l: 'Uptime SLA' },
        ].map((s, i) => (
          <div
            key={i}
            className={`group p-8 md:p-12 lg:p-16 text-center relative overflow-hidden hover:bg-white/[0.02] transition-colors
              ${i !== 3 ? 'lg:border-r border-white/[0.08]' : ''} ${i % 2 === 0 ? 'border-r lg:border-r' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.04),_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 text-4xl md:text-6xl font-semibold tracking-tighter text-gradient mb-2">{s.v}</div>
            <div className="relative z-10 text-[#888] text-sm tracking-wide">{s.l}</div>
          </div>
        ))}
      </section>

      {/* Security callout */}
      <section className="flex flex-col items-center text-center py-24 md:py-32 px-6 border-b border-white/[0.08] relative overflow-hidden">
        <div className="absolute inset-0 bg-dots mask-fade opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="w-14 h-14 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center mx-auto mb-8 text-white shadow-[0_0_40px_rgba(255,255,255,0.05)]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-gradient mb-6">Secure by design.</h2>
          <p className="text-lg text-[#888] leading-relaxed mb-10">
            Hardware-isolated microVMs, encryption at rest and in transit, and ephemeral environments that leave nothing behind. Compliance you can hand to your security team.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['SOC 2 Type II', 'ISO 27001', 'GDPR', 'HIPAA ready'].map((b) => (
              <div key={b} className="px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[13px] font-medium text-white">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-b border-white/[0.08] relative bg-[#080808]">
        <div className="p-8 md:p-12 lg:p-20 xl:p-[100px]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-indigo-300/80 text-[11px] font-mono mb-6 tracking-widest uppercase">
              <Layers className="w-3.5 h-3.5" /> The difference
            </div>
            <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-gradient mb-5">Cloud-native, not bolted-on.</h2>
            <p className="text-[#888] text-lg">See how a Collab Code workspace compares to a traditional local development setup.</p>
          </div>

          <div className="max-w-[920px] mx-auto rounded-2xl border border-white/[0.08] overflow-hidden bg-[#050505]">
            {/* header row */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr] text-[13px] md:text-sm">
              <div className="p-5 md:p-6 text-[#888] font-medium">Capability</div>
              <div className="p-5 md:p-6 text-center font-medium text-white bg-white/[0.03] border-x border-white/[0.06] flex items-center justify-center gap-2">
                <div className="w-5 h-5 rounded-md bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center"><Cpu className="w-3 h-3 text-indigo-300" /></div>
                Collab Code
              </div>
              <div className="p-5 md:p-6 text-center font-medium text-[#888]">Local dev</div>
            </div>
            {[
              { c: 'Setup time', a: 'Seconds', b: 'Hours / days' },
              { c: 'Real-time collaboration', a: true, b: false },
              { c: 'Consistent environments', a: true, b: false },
              { c: 'Dedicated cloud compute', a: true, b: false },
              { c: 'Zero battery / CPU drain', a: true, b: false },
              { c: 'Source code on local disk', a: 'Never', b: 'Always' },
              { c: 'Instant preview per branch', a: true, b: false },
            ].map((r, i) => (
              <div key={i} className="grid grid-cols-[1.4fr_1fr_1fr] text-[13px] md:text-sm border-t border-white/[0.06]">
                <div className="p-5 md:p-6 text-gray-300">{r.c}</div>
                <div className="p-5 md:p-6 flex items-center justify-center bg-white/[0.02] border-x border-white/[0.06]">
                  {typeof r.a === 'boolean'
                    ? <Check className="w-5 h-5 text-emerald-400" />
                    : <span className="text-white font-medium">{r.a}</span>}
                </div>
                <div className="p-5 md:p-6 flex items-center justify-center">
                  {typeof r.b === 'boolean'
                    ? <X className="w-5 h-5 text-[#555]" />
                    : <span className="text-[#888]">{r.b}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento: more capabilities */}
      <section className="border-b border-white/[0.08] relative bg-[#080808] overflow-hidden">
        <div className="absolute inset-0 bg-dots mask-fade opacity-30 pointer-events-none" />
        <div className="relative z-10 p-8 md:p-12 lg:p-20 xl:p-[100px]">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-gradient mb-5">And so much more.</h2>
            <p className="text-[#888] text-lg">Hundreds of thoughtful details that make the whole platform feel effortless.</p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { icon: Search, t: 'Semantic search', d: 'Find any symbol or file across the repo instantly.' },
              { icon: Bell, t: 'Smart notifications', d: 'Only get pinged when a review actually needs you.' },
              { icon: History, t: 'Time-travel history', d: 'Roll back the entire workspace to any point.' },
              { icon: Puzzle, t: 'Extensions', d: 'Bring your favorite editor extensions along.' },
              { icon: Terminal, t: 'Persistent terminals', d: 'Long-running processes survive disconnects.' },
              { icon: Boxes, t: 'Devcontainers', d: 'Full support for the open devcontainer spec.' },
              { icon: ShieldCheck, t: 'Secret vault', d: 'Inject env vars at runtime, never in code.' },
              { icon: Gauge, t: 'Usage insights', d: 'Track compute spend per project and member.' },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  variants={fadeUp}
                  key={i}
                  className="group p-6 rounded-2xl border border-white/[0.08] bg-[#0b0b0b]/60 hover:bg-[#101010] hover:border-white/[0.14] transition-all duration-300"
                >
                  <div className="w-10 h-10 mb-5 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                  <h3 className="text-[15px] font-medium text-white mb-1.5 tracking-tight">{b.t}</h3>
                  <p className="text-[#888] text-[13px] leading-relaxed">{b.d}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Integrations strip */}
      <section className="border-b border-white/[0.08] relative bg-[#050505]">
        <div className="p-8 md:p-12 lg:p-20 xl:p-[100px] flex flex-col items-center text-center">
          <p className="text-[#71717a] text-[12px] font-mono tracking-[0.2em] uppercase mb-10">Works with your entire stack</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
            {['GitHub', 'GitLab', 'Vercel', 'Slack', 'Figma', 'Linear', 'Jira', 'Supabase', 'Neon', 'AWS', 'Postgres', 'Docker'].map((n) => (
              <span key={n} className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-[13px] text-gray-300 hover:text-white hover:border-white/20 transition-colors">{n}</span>
            ))}
          </div>
          <a href="/integrations" className="group inline-flex items-center gap-2 mt-10 text-white font-medium text-[14px] hover:text-gray-300 transition-colors">
            Explore all integrations
            <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40 px-6 flex flex-col items-center text-center relative overflow-hidden bg-[#050505] border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-grid mask-fade opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-6xl tracking-tighter font-semibold text-gradient mb-6 max-w-3xl leading-[1]">
            Ready to build at the speed of thought?
          </h2>
          <p className="text-[#888] text-lg max-w-xl mb-10">
            Spin up your first multiplayer workspace in seconds. No credit card required.
          </p>
          <button className="group bg-white text-black px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 shadow-[0_0_50px_-12px_rgba(255,255,255,0.5)]">
            Start coding now
            <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>
    </main>
  );
}
