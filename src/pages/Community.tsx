import type { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Trophy,
  Code2,
  Calendar,
  Sparkles,
  MapPin,
  MessageSquare,
  Heart,
  Star,
  Users
} from 'lucide-react';
import { PageHero } from '../components/PageHero';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const stats = [
  { value: '42,000+', label: 'Community members' },
  { value: '120+', label: 'Countries' },
  { value: '8,500', label: 'Messages / day' },
  { value: '1,200+', label: 'OSS contributors' }
];

const channels = [
  {
    icon: <DiscordIcon className="w-7 h-7" />,
    color: 'text-[#5865F2]',
    glow: 'bg-[#5865F2]/15',
    title: 'Discord',
    desc: 'The beating heart of the community. Live help, showcase channels, and voice co-working rooms.',
    meta: '28,400 online',
    cta: 'Join server'
  },
  {
    icon: <Github className="w-7 h-7" />,
    color: 'text-white',
    glow: 'bg-white/10',
    title: 'GitHub',
    desc: 'Build the platform with us. Browse good-first-issues and ship PRs that merge the same day.',
    meta: '1.2k contributors',
    cta: 'Start contributing'
  },
  {
    icon: <XIcon className="w-6 h-6" />,
    color: 'text-white',
    glow: 'bg-sky-500/15',
    title: 'X / Twitter',
    desc: 'Product drops, community highlights, and the occasional spicy engineering thread.',
    meta: '96k followers',
    cta: 'Follow along'
  }
];

const events = [
  { date: 'JUN 24', title: 'Weekend Hackathon: Edge Agents', type: 'Hackathon', location: 'Online · Discord', accent: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  { date: 'JUL 02', title: 'Office Hours with the Core Team', type: 'AMA', location: 'Online · Stage', accent: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { date: 'JUL 11', title: 'San Francisco Meetup', type: 'IRL', location: 'SF · Mission District', accent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { date: 'JUL 19', title: 'Community Showcase Stream', type: 'Showcase', location: 'Online · YouTube', accent: 'text-amber-400 bg-amber-500/10 border-amber-500/20' }
];

const contributors = [12, 45, 67, 33, 11, 89, 44, 21, 9, 32, 65, 77, 88, 90, 54, 43];

export function Community() {
  return (
    <main className="w-full flex-1 flex flex-col">
      {/* ───────────────── Hero ───────────────── */}
      <PageHero
        layout="split"
        bgPattern="none"
        glowColor="none"
        titleClassName="text-5xl md:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tighter text-white"
        badgeText={
          <>
            <MessageSquare className="w-3.5 h-3.5" />
            Join the Discussion
          </>
        }
        title="Where developers build together."
        description="Join thousands of developers in the Collab Code community. Share your projects, get help, and shape the future of the platform."
        primaryCta={{
          text: "Join Discord",
          href: "#",
          icon: <span className="w-3 h-3 bg-black rounded-sm" />
        }}
        secondaryCta={{
          text: "Read the Blog",
          href: "/blog"
        }}
      >
        {/* Fake PR UI */}
        <div className="w-full max-w-[920px] relative z-10 rounded-2xl border border-white/[0.08] bg-[#000] glow-ring overflow-hidden text-left">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.12] to-transparent opacity-60 pointer-events-none [mask:linear-gradient(#000,transparent_40%)]" />
          {/* window bar */}
          <div className="h-12 border-b border-white/[0.05] bg-[#020202] flex items-center px-4 justify-between relative z-10">
            <div className="flex items-center gap-2 text-[#888]">
              <DiscordIcon className="w-4 h-4 text-[#5865F2]" />
              <span className="text-xs font-mono tracking-widest uppercase"># general</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 28,400 online
            </div>
          </div>
          {/* messages */}
          <div className="p-5 md:p-6 space-y-5 relative z-10">
            <FeedMessage img={1} name="ada.codes" color="text-pink-400" time="2m" msg="just shipped my first PR to the core repo and it got merged in 20 minutes 🤯" />
            <FeedMessage img={12} name="marcus_dev" color="text-blue-400" time="1m" msg="welcome! the maintainers here are unreal. who's joining the hackathon this weekend?" />
            <FeedMessage img={32} name="sofia.rs" color="text-emerald-400" time="just now" msg="me! building an edge AI agent. anyone want to pair? 🙌" />
            <div className="flex items-center gap-2 pt-2 text-[#52525b] text-[13px]">
              <span className="w-2 h-2 rounded-full bg-[#5865F2] animate-pulse" />
              3 people are typing…
            </div>
          </div>
        </div>
      </PageHero>

      {/* ───────────────── Stats ───────────────── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-2 md:grid-cols-4 border-b border-white/[0.08] bg-[#050505]"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className={`flex flex-col items-center text-center py-14 px-4 border-white/[0.08] ${i < stats.length - 1 ? 'md:border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} ${i === 0 ? 'border-r' : ''} ${i === 2 ? 'border-r md:border-r' : ''} hover:bg-white/[0.02] transition-colors`}
          >
            <span className="text-3xl md:text-5xl font-semibold text-gradient tracking-tight mb-2">{s.value}</span>
            <span className="text-[#71717a] text-sm">{s.label}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* ───────────────── Channels ───────────────── */}
      <section className="border-b border-white/[0.08] bg-[#000]">
        <div className="py-24 md:py-28 px-6 text-center border-b border-white/[0.08]">
          <h2 className="text-3xl md:text-5xl tracking-tight font-medium text-white mb-5">Find your people</h2>
          <p className="text-lg text-[#71717a] max-w-2xl mx-auto">
            Wherever you like to hang out, we're there. Jump into the channel that fits your flow.
          </p>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 bg-[#050505]"
        >
          {channels.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              className={`group relative overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col items-start border-white/[0.08] ${i < channels.length - 1 ? 'md:border-r' : ''} border-b md:border-b-0 hover:bg-white/[0.02] transition-colors`}
            >
              <div className={`absolute -top-10 -right-10 w-48 h-48 ${c.glow} blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              <div className={`${c.color} mb-6 relative z-10`}>{c.icon}</div>
              <h3 className="text-2xl font-medium text-white mb-3 tracking-tight relative z-10">{c.title}</h3>
              <p className="text-[#a1a1aa] leading-relaxed mb-6 relative z-10">{c.desc}</p>
              <span className="text-[#71717a] text-xs font-medium mb-8 relative z-10 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" /> {c.meta}
              </span>
              <button className="mt-auto inline-flex items-center gap-2 text-white font-medium bg-white/[0.05] hover:bg-white/[0.1] px-5 py-2.5 rounded-full border border-white/[0.1] transition-colors relative z-10">
                {c.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ───────────────── Bento ───────────────── */}
      <section className="border-b border-white/[0.08] bg-[#000]">
        <div className="py-24 md:py-28 px-6 text-center border-b border-white/[0.08]">
          <h2 className="text-3xl md:text-5xl tracking-tighter font-semibold text-white mb-5 leading-[1.1]">
            A new kind of <br className="hidden sm:block" />
            <span className="text-[#888]">developer network.</span>
          </h2>
          <p className="text-lg text-[#71717a] max-w-2xl mx-auto">
            Whether you're shipping your first project or scaling a startup, you'll find your people here.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-[#050505]"
        >
          {/* Big feature */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-2 p-8 md:p-12 lg:p-16 border-b lg:border-r border-white/[0.08] hover:bg-white/[0.02] transition-colors relative overflow-hidden group flex flex-col justify-between min-h-[360px]"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
            <div className="absolute bottom-8 right-8 hidden sm:flex -space-x-4 opacity-50 group-hover:opacity-100 transition-opacity">
              {[1, 2, 3, 4].map((n) => (
                <img key={n} className="w-12 h-12 rounded-full border-2 border-[#050505]" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${n}`} alt="" />
              ))}
            </div>
            <div className="relative z-10">
              <Trophy className="w-8 h-8 text-white/50 mb-6" />
              <h3 className="text-2xl font-medium text-white mb-4 tracking-tight max-w-[320px]">Weekly Hackathons & Bounties</h3>
              <p className="text-[#a1a1aa] leading-relaxed max-w-[360px]">
                Join weekend sprints to build features, crush high-priority bugs, and compete for
                exclusive community bounties and swag.
              </p>
            </div>
          </motion.div>

          <BentoCard icon={<Code2 className="w-8 h-8 text-white/50" />} title="Open Source First" desc="Contribute directly to our core repos. We merge community PRs every single day." className="border-b border-white/[0.08]" />
          <BentoCard icon={<Calendar className="w-8 h-8 text-white/50" />} title="Office Hours" desc="Book 1-on-1 time with our core engineers for architecture and code reviews." className="border-b lg:border-r border-white/[0.08]" />
          <BentoCard icon={<Sparkles className="w-8 h-8 text-white/50" />} title="Showcase" desc="Demo your side projects to thousands of developers on our monthly streams." className="border-b md:border-b-0 md:border-r border-white/[0.08]" />
          <BentoCard icon={<MapPin className="w-8 h-8 text-white/50" />} title="Global Meetups" desc="Connect with developers in your city. We sponsor local chapters worldwide." />
        </motion.div>
      </section>

      {/* ───────────────── Events ───────────────── */}
      <section id="events" className="border-b border-white/[0.08] bg-[#000]">
        <div className="py-24 md:py-28 px-6 text-center border-b border-white/[0.08]">
          <h2 className="text-3xl md:text-5xl tracking-tight font-medium text-white mb-5">Upcoming events</h2>
          <p className="text-lg text-[#71717a] max-w-2xl mx-auto">
            Something's always happening. Save your spot — every event is free.
          </p>
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="bg-[#050505]">
          {events.map((e) => (
            <motion.a
              key={e.title}
              href="#"
              variants={fadeUp}
              className="group flex items-center gap-5 md:gap-8 px-6 md:px-12 lg:px-20 py-7 border-b border-white/[0.08] last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex flex-col items-center justify-center w-16 shrink-0 text-center">
                <span className="text-xs text-[#71717a] uppercase tracking-wider">{e.date.split(' ')[0]}</span>
                <span className="text-2xl font-semibold text-white tracking-tight">{e.date.split(' ')[1]}</span>
              </div>
              <div className="w-px h-12 bg-white/[0.08] shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className="text-lg font-medium text-white truncate">{e.title}</h3>
                  <span className={`hidden sm:inline-flex text-[10px] uppercase tracking-[0.12em] border rounded-full px-2.5 py-0.5 ${e.accent}`}>{e.type}</span>
                </div>
                <p className="text-[#71717a] text-sm">{e.location}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#52525b] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* ───────────────── Spotlight ───────────────── */}
      <section className="flex flex-col lg:flex-row border-b border-white/[0.08] bg-[#000]">
        <div className="p-12 md:p-20 xl:p-[100px] flex-1 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08]">
          <span className="text-[#71717a] text-[12px] font-medium tracking-[0.2em] uppercase mb-8">Member spotlight</span>
          <blockquote className="text-2xl md:text-4xl tracking-tight font-medium text-white leading-snug mb-10 max-w-xl">
            "I came for help with a bug and stayed for the people. Six months later I'm a core
            maintainer. This community changed my career."
          </blockquote>
          <div className="flex items-center gap-4">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=15" alt="June Park" className="w-12 h-12 rounded-full border border-white/[0.1] object-cover" />
            <div>
              <div className="text-white font-medium text-[15px]">June Park</div>
              <div className="text-[#71717a] text-sm">Core Maintainer · Seoul</div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center p-12 md:p-20 bg-[#050505] gap-8">
          {[
            { icon: <MessageSquare className="w-6 h-6 text-white/50" />, title: 'Pair programming', desc: 'Jump into live sessions and tackle hard bugs together in real time.' },
            { icon: <Heart className="w-6 h-6 text-white/50" />, title: 'Mentorship', desc: 'Experienced engineers host weekly office hours for newcomers.' },
            { icon: <Star className="w-6 h-6 text-white/50" />, title: 'Recognition', desc: 'Top contributors get swag, shoutouts, and early feature access.' }
          ].map((v) => (
            <div key={v.title} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center shrink-0">{v.icon}</div>
              <div>
                <h4 className="text-lg font-medium text-white mb-1 tracking-tight">{v.title}</h4>
                <p className="text-[#a1a1aa] text-[15px] leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── Open source / CTA ───────────────── */}
      <section className="flex flex-col items-center justify-center py-28 md:py-40 relative border-b border-white/[0.08] overflow-hidden text-center bg-[#050505]">
        <div className="absolute inset-0 bg-grid mask-fade opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="relative z-10 flex flex-col items-center px-6 max-w-3xl">
          <div className="grid grid-cols-8 gap-2.5 mb-12 opacity-70 max-w-md">
            {contributors.map((id, i) => (
              <motion.img
                key={id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                viewport={{ once: true }}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`}
                alt="Contributor"
                className="w-full aspect-square rounded-full border border-white/[0.1] hover:border-white/50 transition-colors"
              />
            ))}
          </div>

          <h2 className="text-4xl md:text-6xl tracking-tight font-medium mb-6 leading-[1]">
            <span className="text-gradient">Your seat is open.</span>
          </h2>
          <p className="text-lg text-[#888] max-w-xl mb-10">
            Join 42,000+ developers building, learning, and shipping together. It's free, and it's
            yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#"
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3.5 text-[14px] font-semibold transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-2"
            >
              <DiscordIcon className="w-4 h-4" /> Join the community
            </a>
            <Link
              to="/careers"
              className="bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] text-white rounded-full px-8 py-3.5 text-[14px] font-medium transition-all"
            >
              We're hiring
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeedMessage({ img, name, color, time, msg }: { img: number; name: string; color: string; time: string; msg: string }) {
  return (
    <div className="flex items-start gap-3">
      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${img}`} alt="" className="w-9 h-9 rounded-full border border-white/[0.08] object-cover shrink-0" />
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className={`text-sm font-medium ${color}`}>{name}</span>
          <span className="text-[11px] text-[#52525b]">{time}</span>
        </div>
        <p className="text-[#d4d4d8] text-[14px] leading-relaxed">{msg}</p>
      </div>
    </div>
  );
}

function BentoCard({ icon, title, desc, className = '' }: { icon: ReactNode; title: string; desc: string; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center hover:bg-white/[0.02] transition-colors ${className}`}
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-medium text-white tracking-tight mb-3">{title}</h3>
      <p className="text-[#a1a1aa] leading-relaxed text-sm lg:text-base">{desc}</p>
    </motion.div>
  );
}
