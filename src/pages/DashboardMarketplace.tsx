import { Search, Database, Lock, Box, CreditCard, Cloud } from 'lucide-react';

export function DashboardMarketplace() {
  const featured = [
    { name: 'AWS', desc: 'Serverless, reliable, secure PostgreSQL and NoSQL databases.', category: 'Storage', icon: <img src="https://cdn.simpleicons.org/amazonaws/FF9900" className="w-8 h-8 object-contain" alt="AWS" /> },
    { name: 'Neon', desc: 'Neon is serverless Postgres built for the cloud, with autoscaling and instant branching.', category: 'Storage', icon: <img src="https://cdn.simpleicons.org/neon/00E599" className="w-8 h-8 object-contain" alt="Neon" /> },
    { name: 'Shopify', desc: 'Shopify is the all-in-one commerce platform to start, run, and grow your business.', category: 'Commerce', icon: <img src="https://cdn.simpleicons.org/shopify/95BF47" className="w-8 h-8 object-contain" alt="Shopify" /> },
    { name: 'Redis', desc: 'Redis is the fastest in-memory database for caching and real-time data.', category: 'Storage', icon: <img src="https://cdn.simpleicons.org/redis/DC382D" className="w-8 h-8 object-contain" alt="Redis" /> },
  ];

  const recentlyAdded = [
    { name: 'Auth0', desc: 'Auth for Users, APIs & Agents', category: 'Authentication', icon: <img src="https://cdn.simpleicons.org/auth0/white" className="w-8 h-8 object-contain" alt="Auth0" /> },
    { name: 'Shopify', desc: 'Build and deploy high-performance Shopify storefronts', category: 'Commerce', icon: <img src="https://cdn.simpleicons.org/shopify/95BF47" className="w-8 h-8 object-contain" alt="Shopify" /> },
    { name: 'AWS', desc: 'Serverless, reliable, secure AWS Services.', category: 'Storage', icon: <img src="https://cdn.simpleicons.org/amazonaws/FF9900" className="w-8 h-8 object-contain" alt="AWS" /> },
  ];

  const native = [
    { name: 'Neon', desc: 'Neon is serverless Postgres built for the cloud, with autoscaling and instant branching.', category: 'Storage', icon: <img src="https://cdn.simpleicons.org/neon/00E599" className="w-8 h-8 object-contain" alt="Neon" /> },
    { name: 'AWS', desc: 'Serverless, reliable, secure AWS Services.', category: 'Storage', icon: <img src="https://cdn.simpleicons.org/amazonaws/FF9900" className="w-8 h-8 object-contain" alt="AWS" /> },
    { name: 'Stripe', desc: 'Manage your billing directly.', category: 'Payments', icon: <img src="https://cdn.simpleicons.org/stripe/635BFF" className="w-8 h-8 object-contain" alt="Stripe" /> },
  ];

  const IntegrationCard = ({ item }: { item: any }) => (
    <div className="group rounded-xl border border-white/[0.08] bg-[#020202] hover:bg-[#050505] transition-colors p-6 flex flex-col h-[220px] cursor-pointer">
       <div className="flex items-start justify-between">
          <span className="text-xs text-gray-400 font-medium">{item.category}</span>
       </div>
       <div className="flex-1 flex flex-col items-center justify-center gap-3">
          {item.icon}
          <span className="text-white font-medium text-lg">{item.name}</span>
       </div>
       <div className="mt-auto">
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{item.desc}</p>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-12 w-full text-[#a1a1aa] pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
         <h1 className="text-3xl font-semibold tracking-tight text-white">Marketplace</h1>
         <div className="flex items-center gap-3">
            <button className="bg-[#050505] border border-white/[0.1] text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:text-white hover:border-white/[0.2] transition-colors">
               Installed Integrations
            </button>
            <button className="bg-[#050505] border border-white/[0.1] text-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:text-white hover:border-white/[0.2] transition-colors">
               Integrations Console
            </button>
         </div>
      </div>

      {/* Main Search */}
      <div className="relative w-full">
         <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
         <input 
            type="text" 
            placeholder="Search integrations..." 
            className="w-full bg-[#050505] border border-white/[0.1] rounded-lg pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-white/[0.3] transition-colors placeholder:text-[#666]"
         />
      </div>

      {/* Featured Section */}
      <section className="flex flex-col gap-4">
         <div>
            <h2 className="text-xl font-semibold text-white mb-1">Featured</h2>
            <p className="text-sm text-gray-400">A selection of integrations curated by our marketplace team.</p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((item, i) => <IntegrationCard key={i} item={item} />)}
         </div>
      </section>

      {/* Recently Added Section */}
      <section className="flex flex-col gap-4">
         <div>
            <h2 className="text-xl font-semibold text-white mb-1">Recently Added</h2>
            <p className="text-sm text-gray-400">The latest integrations added to the marketplace.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentlyAdded.map((item, i) => <IntegrationCard key={i} item={item} />)}
         </div>
      </section>

      {/* Native Integrations Section */}
      <section className="flex flex-col gap-4">
         <div>
            <h2 className="text-xl font-semibold text-white mb-1">Native Integrations</h2>
            <p className="text-sm text-gray-400 flex items-center gap-1">A collection of first-party services you can easily add to your Collab Code project. <a href="#" className="text-white hover:underline">Learn more <span className="text-xs">↗</span></a></p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {native.map((item, i) => <IntegrationCard key={i} item={item} />)}
         </div>
      </section>

    </div>
  );
}
