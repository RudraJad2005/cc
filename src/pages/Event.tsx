import React from 'react';
import { Triangle, Box, Shield, Zap, Globe, Cpu } from 'lucide-react';

const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-4 h-4 pointer-events-none z-10 ${className}`}>
    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/30 -translate-y-1/2" />
    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/30 -translate-x-1/2" />
  </div>
);

const events = [
  {
    id: 1,
    date: '24 OCT',
    icon: <Triangle className="w-10 h-10 text-white stroke-[1.5px] fill-white/10" />,
    title: 'Agentic Infrastructure',
    description: 'Every generation of software eventually demands a new generation of infrastructure. Join us to see how coding agents are driving the next transition.',
    speaker: 'Alice Chen, Chief Product Officer',
    avatars: ['bg-blue-500', 'bg-purple-500'],
    image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    date: '12 NOV',
    icon: <Box className="w-10 h-10 text-white stroke-[1.5px] fill-white/10" />,
    title: 'The Future of Monorepos',
    description: 'Scaling large codebases doesn\'t have to be painful. Learn how our new intelligent caching layer reduces build times by 80% for enterprise teams.',
    speaker: 'Marcus Johnson, Engineering',
    avatars: ['bg-emerald-500'],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    date: '05 DEC',
    icon: <Shield className="w-10 h-10 text-white stroke-[1.5px] fill-white/10" />,
    title: 'Protecting against token theft',
    description: 'HTTP requests are inexpensive. AI tokens are not. We dive into the new attack vectors targeting AI applications and how to secure your endpoints.',
    speaker: 'Sarah Connor, Security Lead',
    avatars: ['bg-red-500', 'bg-orange-500'],
    image: 'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    date: '18 JAN',
    icon: <Zap className="w-10 h-10 text-white stroke-[1.5px] fill-white/10" />,
    title: 'Turbocharged Iteration',
    description: 'A deep dive into the inner workings of our real-time collaboration engine. Discover how we achieve <50ms latency across global edge networks.',
    speaker: 'David Kim, Infrastructure',
    avatars: ['bg-pink-500'],
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    date: '02 FEB',
    icon: <Globe className="w-10 h-10 text-white stroke-[1.5px] fill-white/10" />,
    title: 'Global Edge Computing',
    description: 'Deploying logic close to your users is the new standard. Join our workshop on migrating heavy backend processes to edge middleware.',
    speaker: 'Elena Rodriguez, Developer Relations',
    avatars: ['bg-cyan-500', 'bg-blue-600'],
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    date: '15 MAR',
    icon: <Cpu className="w-10 h-10 text-white stroke-[1.5px] fill-white/10" />,
    title: 'State of Frontend 2025',
    description: 'Our annual keynote discussing the massive shift towards server-driven UI, agentic development, and the death of traditional SPA architectures.',
    speaker: 'Guillermo Rauch, Guest Speaker',
    avatars: ['bg-white'],
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800'
  }
];

export function Event() {
  return (
    <main className="w-full flex-1 flex flex-col bg-black text-white selection:bg-blue-500/30 selection:text-white font-sans min-h-screen">
      
      {/* Header Area */}
      <div className="w-full border-b border-white/10 pt-32 bg-black z-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-12">
            Events & Updates
          </h1>
          
          {/* Navigation/Filter */}
          <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide text-[15px]">
            <button className="text-white bg-white/10 px-4 py-1.5 rounded-full font-medium whitespace-nowrap border border-white/10 hover:border-white/20 transition-colors">All Posts</button>
            <button className="text-[#888] hover:text-white transition-colors whitespace-nowrap font-medium">Engineering</button>
            <button className="text-[#888] hover:text-white transition-colors whitespace-nowrap font-medium">Community</button>
            <button className="text-[#888] hover:text-white transition-colors whitespace-nowrap font-medium">Company News</button>
            <button className="text-[#888] hover:text-white transition-colors whitespace-nowrap font-medium">Customers</button>
            <button className="text-[#888] hover:text-white transition-colors whitespace-nowrap font-medium">Security</button>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <section className="w-full bg-black py-12 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative">
          
          {/* Decorative outer crosshairs */}
          <Crosshair className="-top-2 -left-2" />
          <Crosshair className="-top-2 -right-2" />
          
          {/* The Grid: 1px gap on a white/10 background creates the border lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 relative">
            
            {events.map((event) => (
              <div key={event.id} className="bg-black flex flex-col relative group cursor-pointer min-h-[420px] overflow-hidden">
                
                {/* Background Image on Hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-0 grayscale"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                
                {/* Content Container */}
                <div className="relative z-10 p-10 flex flex-col h-full w-full">
                  {/* Event Date */}
                  <div className="text-xs text-[#888] mb-12 font-mono text-right tracking-widest uppercase group-hover:text-white transition-colors">
                    {event.date}
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-10 opacity-80 group-hover:opacity-100 transition-opacity">
                    {event.icon}
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-[22px] md:text-2xl font-bold text-white tracking-tight mb-4 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-[#888] text-[15px] leading-relaxed mb-12 flex-1 line-clamp-4 group-hover:text-white/80 transition-colors">
                    {event.description}
                  </p>
                  
                  {/* Footer/Speakers */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="flex -space-x-2">
                      {event.avatars.map((color, idx) => (
                        <div key={idx} className={`w-6 h-6 rounded-full border-[1.5px] border-black ${color}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[#aaa] group-hover:text-white transition-colors line-clamp-1">
                      {event.speaker}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>
          
          {/* Decorative outer crosshairs bottom */}
          <Crosshair className="-bottom-2 -left-2" />
          <Crosshair className="-bottom-2 -right-2" />

        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="w-full bg-black border-t border-white/10 py-32 flex flex-col items-center justify-center text-center px-6">
         <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
           Stay in the loop.
         </h2>
         <p className="text-[#888] mb-10 max-w-md text-lg">
           Subscribe to our newsletter to get the latest updates on product releases, community events, and technical deep dives.
         </p>
         <div className="flex w-full max-w-sm gap-2">
           <input 
             type="email" 
             placeholder="Enter your email" 
             className="flex-1 bg-[#111] border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-[#666] focus:outline-none focus:border-white/30 transition-colors"
           />
           <button className="px-6 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition-colors">
             Subscribe
           </button>
         </div>
      </section>

    </main>
  );
}
