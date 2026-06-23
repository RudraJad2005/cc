import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
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
  Users,
  Plus,
  Terminal,
  Radio
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

const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-3 h-3 text-white/[0.15] flex items-center justify-center pointer-events-none z-10 ${className}`}>
    <Plus className="w-3 h-3" />
  </div>
);

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
    color: 'text-white',
    title: 'Discord',
    desc: 'The beating heart of the community. Live help, showcase channels, and voice co-working rooms.',
    meta: '28,400 online',
    cta: 'Join server'
  },
  {
    icon: <Github className="w-7 h-7" />,
    color: 'text-white',
    title: 'GitHub',
    desc: 'Build the platform with us. Browse good-first-issues and ship PRs that merge the same day.',
    meta: '1.2k contributors',
    cta: 'Start contributing'
  },
  {
    icon: <XIcon className="w-6 h-6" />,
    color: 'text-white',
    title: 'X / Twitter',
    desc: 'Product drops, community highlights, and the occasional spicy engineering thread.',
    meta: '96k followers',
    cta: 'Follow along'
  }
];

const events = [
  { date: 'JUN 24', title: 'Weekend Hackathon: Edge Agents', type: 'Hackathon', location: 'Online · Discord' },
  { date: 'JUL 02', title: 'Office Hours with the Core Team', type: 'AMA', location: 'Online · Stage' },
  { date: 'JUL 11', title: 'San Francisco Meetup', type: 'IRL', location: 'SF · Mission District' },
  { date: 'JUL 19', title: 'Community Showcase Stream', type: 'Showcase', location: 'Online · YouTube' }
];

export function Community() {
  return (
    <main className="w-full flex-1 flex flex-col">
      {/* ───────────────── Hero ───────────────── */}
      <PageHero
        layout="split"
        bgPattern="none"
        glowColor="none"
        titleClassName="text-5xl md:text-[5.5rem] lg:text-[6.5rem] font-bold tracking-tighter text-white"
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
        {/* Strict Discord UI Terminal */}
        <div className="w-full max-w-[920px] relative z-10 rounded border border-white/[0.1] bg-[#000] overflow-hidden text-left shadow-2xl">
          {/* window bar */}
          <div className="h-12 border-b border-white/[0.1] bg-[#000] flex items-center px-4 justify-between relative z-10">
            <div className="flex items-center gap-2 text-[#888]">
              <Terminal className="w-4 h-4 text-white" />
              <span className="text-xs font-mono tracking-widest uppercase text-white"># general</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#888]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> 28,400 online
            </div>
          </div>
          {/* messages */}
          <div className="p-5 md:p-6 space-y-5 relative z-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]">
            <FeedMessage img={1} name="ada.codes" color="text-white" time="2m" msg="just shipped my first PR to the core repo and it got merged in 20 minutes 🤯" />
            <FeedMessage img={12} name="marcus_dev" color="text-[#888]" time="1m" msg="welcome! the maintainers here are unreal. who's joining the hackathon this weekend?" />
            <FeedMessage img={32} name="sofia.rs" color="text-white" time="just now" msg="me! building an edge AI agent. anyone want to pair? 🙌" />
            <div className="flex items-center gap-2 pt-2 text-[#52525b] text-[13px] font-mono">
              <span className="w-2 h-2 rounded-sm bg-white animate-pulse" />
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
        className="grid grid-cols-2 md:grid-cols-4 border-b border-white/[0.1] bg-[#000] relative"
      >
        <Crosshair className="-top-1.5 -left-1.5" />
        <Crosshair className="-bottom-1.5 -right-1.5" />
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className={`flex flex-col items-center text-center py-14 px-4 border-white/[0.1] ${i < stats.length - 1 ? 'md:border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} ${i === 0 ? 'border-r' : ''} ${i === 2 ? 'border-r md:border-r' : ''} hover:bg-white/[0.02] transition-colors`}
          >
            <span className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-2">{s.value}</span>
            <span className="text-[#888] text-sm">{s.label}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* ───────────────── Channels ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] relative">
        <div className="py-24 md:py-28 px-6 text-center border-b border-white/[0.1]">
          <h2 className="text-3xl md:text-5xl tracking-tight font-medium text-white mb-5">Find your people</h2>
          <p className="text-lg text-[#888] max-w-2xl mx-auto">
            Wherever you like to hang out, we're there. Jump into the channel that fits your flow.
          </p>
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 bg-[#000] relative"
        >
          <Crosshair className="-top-1.5 -left-1.5" />
          <Crosshair className="-top-1.5 -right-1.5" />
          {channels.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              className={`group relative overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col items-start border-white/[0.1] ${i < channels.length - 1 ? 'md:border-r' : ''} border-b md:border-b-0 hover:bg-white/[0.02] transition-colors`}
            >
              <div className={`${c.color} mb-8 relative z-10 w-12 h-12 flex items-center justify-center border border-white/[0.1] rounded bg-[#0a0a0a]`}>{c.icon}</div>
              <h3 className="text-2xl font-medium text-white mb-3 tracking-tight relative z-10">{c.title}</h3>
              <p className="text-[#888] leading-relaxed mb-6 relative z-10">{c.desc}</p>
              <span className="text-[#888] text-xs font-mono mb-8 relative z-10 flex items-center gap-2">
                <Radio className="w-3 h-3" /> {c.meta}
              </span>
              <button className="mt-auto inline-flex items-center gap-2 text-white font-medium bg-black hover:bg-white/[0.05] px-5 py-2.5 rounded-full border border-white/[0.1] transition-colors relative z-10">
                {c.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ───────────────── Features Grid (Replaced Bento) ───────────────── */}
      <section className="border-b border-white/[0.1] bg-[#000] relative">
        <Crosshair className="-top-1.5 -left-1.5" />
        <div className="py-24 md:py-28 px-6 text-center border-b border-white/[0.1]">
          <h2 className="text-3xl md:text-5xl tracking-tight font-medium text-white mb-5 leading-[1.1]">
            A new kind of developer network.
          </h2>
          <p className="text-lg text-[#888] max-w-2xl mx-auto">
            Whether you're shipping your first project or scaling a startup, you'll find your people here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 bg-[#000]">
           <div className="p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/[0.1] flex flex-col">
              <Trophy className="w-6 h-6 text-white mb-6" />
              <h3 className="text-xl font-medium text-white tracking-tight mb-2">Weekly Hackathons</h3>
              <p className="text-[#888] text-[15px] leading-relaxed">Join weekend sprints to build features, crush bugs, and win exclusive bounties.</p>
           </div>
           <div className="p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/[0.1] flex flex-col">
              <Code2 className="w-6 h-6 text-white mb-6" />
              <h3 className="text-xl font-medium text-white tracking-tight mb-2">Open Source First</h3>
              <p className="text-[#888] text-[15px] leading-relaxed">Contribute directly to our core repositories and help shape the product direction.</p>
           </div>
           <div className="p-12 lg:p-16 border-b md:border-b-0 border-white/[0.1] flex flex-col">
              <Calendar className="w-6 h-6 text-white mb-6" />
              <h3 className="text-xl font-medium text-white tracking-tight mb-2">Office Hours</h3>
              <p className="text-[#888] text-[15px] leading-relaxed">Book 1-on-1 time with our core engineering team to unblock your technical challenges.</p>
           </div>
        </div>
      </section>

      {/* ───────────────── Events ───────────────── */}
      <section id="events" className="border-b border-white/[0.1] bg-[#000] relative">
        <Crosshair className="-top-1.5 -left-1.5" />
        <Crosshair className="-bottom-1.5 -right-1.5" />
        <div className="grid grid-cols-1 lg:grid-cols-2">
           <div className="py-24 md:py-28 px-12 lg:px-20 border-b lg:border-b-0 lg:border-r border-white/[0.1] flex flex-col justify-center">
             <h2 className="text-3xl md:text-5xl tracking-tight font-medium text-white mb-5">Upcoming events</h2>
             <p className="text-lg text-[#888] max-w-md">
               Something's always happening. Save your spot — every event is free.
             </p>
           </div>
           
           <div className="flex flex-col border-white/[0.1]">
             {events.map((e) => (
               <a
                 key={e.title}
                 href="#"
                 className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 px-8 md:px-12 py-8 border-b border-white/[0.1] last:border-b-0 hover:bg-white/[0.02] transition-colors"
               >
                 <div className="flex sm:flex-col items-center justify-center w-auto sm:w-16 shrink-0 gap-2 sm:gap-0">
                   <span className="text-xs text-[#888] uppercase tracking-widest font-mono">{e.date.split(' ')[0]}</span>
                   <span className="text-2xl font-medium text-white tracking-tight">{e.date.split(' ')[1]}</span>
                 </div>
                 <div className="hidden sm:block w-px h-12 bg-white/[0.1] shrink-0" />
                 <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-3 mb-1">
                     <h3 className="text-lg font-medium text-white truncate">{e.title}</h3>
                     <span className="hidden sm:inline-flex text-[10px] uppercase tracking-widest font-mono border border-white/[0.2] text-[#888] rounded px-2 py-0.5">{e.type}</span>
                   </div>
                   <p className="text-[#888] text-sm">{e.location}</p>
                 </div>
                 <ArrowUpRight className="w-5 h-5 text-[#888] group-hover:text-white transition-colors shrink-0 hidden sm:block" />
               </a>
             ))}
           </div>
        </div>
      </section>

      {/* ───────────────── Spotlight ───────────────── */}
      <section className="flex flex-col lg:flex-row border-b border-white/[0.1] bg-[#000] relative">
        <Crosshair className="-top-1.5 -left-1.5" />
        <div className="p-12 md:p-20 xl:p-[100px] flex-1 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.1]">
          <span className="text-[#888] text-[12px] font-mono tracking-widest uppercase mb-8">Member spotlight</span>
          <blockquote className="text-2xl md:text-4xl tracking-tight font-medium text-white leading-snug mb-10 max-w-xl">
            "I came for help with a bug and stayed for the people. Six months later I'm a core
            maintainer. This community changed my career."
          </blockquote>
          <div className="flex items-center gap-4">
            <img src="https://avatars.githubusercontent.com/u/1024025?v=4" alt="June Park" className="w-12 h-12 border border-white/[0.1] object-cover rounded" />
            <div>
              <div className="text-white font-medium text-[15px]">June Park</div>
              <div className="text-[#888] text-sm font-mono">Core Maintainer · Seoul</div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center p-12 md:p-20 bg-[#000] gap-12">
          {[
            { icon: <MessageSquare className="w-5 h-5 text-white" />, title: 'Pair programming', desc: 'Jump into live sessions and tackle hard bugs together in real time.' },
            { icon: <Heart className="w-5 h-5 text-white" />, title: 'Mentorship', desc: 'Experienced engineers host weekly office hours for newcomers.' },
            { icon: <Star className="w-5 h-5 text-white" />, title: 'Recognition', desc: 'Top contributors get swag, shoutouts, and early feature access.' }
          ].map((v) => (
            <div key={v.title} className="flex items-start gap-6">
              <div className="w-10 h-10 border border-white/[0.1] bg-[#0a0a0a] flex items-center justify-center shrink-0 rounded">{v.icon}</div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2 tracking-tight">{v.title}</h4>
                <p className="text-[#888] text-[15px] leading-relaxed max-w-md">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── Giant 2-Column CTA ───────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 relative border-b border-white/[0.1]">
        <Crosshair className="-top-1.5 -left-1.5" />
        <Crosshair className="-top-1.5 -right-1.5" />

        {/* Block 1 (Pink/Rose) */}
        <div className="h-[600px] lg:border-r border-b lg:border-b-0 border-white/[0.1] bg-[#ec4899] p-12 lg:p-16 flex flex-col justify-between text-[#0a0a0a] relative overflow-hidden group">
           <div className="text-black text-5xl font-black italic tracking-tighter mix-blend-overlay opacity-30">OSS</div>
           
           {/* Decorative UI element */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-sm rounded bg-black/10 backdrop-blur-md border border-black/10 p-6 transform group-hover:scale-105 transition-transform duration-500 shadow-2xl">
              <div className="flex items-center gap-3 mb-4 border-b border-black/10 pb-4">
                 <Github className="w-6 h-6 text-black" />
                 <span className="font-bold">CollabCode / core</span>
              </div>
              <div className="flex items-center justify-between font-mono text-sm">
                 <span className="font-medium text-black/70">120+ Issues</span>
                 <span className="bg-black text-white px-3 py-1 rounded text-xs font-bold">Good First Issue</span>
              </div>
           </div>

           <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-3 tracking-tight">Open Source</h3>
              <p className="text-black/70 max-w-sm font-medium leading-relaxed">Join 1,200+ contributors building the future of web infrastructure. Start by picking up a good first issue.</p>
           </div>
        </div>

        {/* Block 2 (Amber) */}
        <div className="h-[600px] bg-[#fbbf24] p-12 lg:p-16 flex flex-col justify-between text-[#0a0a0a] relative overflow-hidden">
           <div className="absolute -right-10 -top-10 opacity-10 text-black">
             <MessageSquare className="w-80 h-80" />
           </div>
           
           <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-md mt-12 relative z-10">
             "The CollabCode community feels like working in the world's best engineering office."
           </h3>

           <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded border border-black/20 bg-black flex items-center justify-center text-white">
                 <Users className="w-5 h-5" />
              </div>
              <div>
                 <div className="font-bold text-lg">Alex Rivera</div>
                 <div className="text-[#0a0a0a]/70 font-medium">Independent Developer</div>
              </div>
           </div>
        </div>
      </section>

    </main>
  );
}

function FeedMessage({ img, name, color, time, msg }: { img: number; name: string; color: string; time: string; msg: string }) {
  return (
    <div className="flex items-start gap-3">
      <img src={`https://avatars.githubusercontent.com/u/${img * 12345 + 50000}?v=4`} alt="" className="w-8 h-8 rounded border border-white/[0.2] object-cover shrink-0" />
      <div className="min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className={`text-[13px] font-mono ${color}`}>{name}</span>
          <span className="text-[10px] text-[#52525b] uppercase">{time}</span>
        </div>
        <p className="text-[#d4d4d8] text-[13px] leading-relaxed">{msg}</p>
      </div>
    </div>
  );
}
