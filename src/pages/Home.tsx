import { Hero } from '../components/Hero';
import { CompaniesSection } from '../components/CompaniesSection';
import { FeatureGrid } from '../components/FeatureGrid';
import { PerformanceSection } from '../components/PerformanceSection';
import { CommandMenuSection } from '../components/CommandMenuSection';
import { SecuritySection } from '../components/SecuritySection';
import { TestimonialSection } from '../components/TestimonialSection';
import { IssueTrackingSection } from '../components/IssueTrackingSection';
import { CtaSection } from '../components/CtaSection';

export function Home() {
  return (
    <main className="w-full flex-1 flex flex-col">
      <Hero />
      <CompaniesSection />
      <FeatureGrid />
      
      <div className="py-24 md:py-32 flex flex-col items-center justify-center text-center px-6 border-b border-white/[0.08] relative overflow-hidden">
         <div className="absolute inset-0 bg-dots mask-fade opacity-40 pointer-events-none" />
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02),_transparent_50%)] pointer-events-none" />
         <h2 className="text-2xl md:text-4xl text-gradient font-medium tracking-tight mb-4 relative z-10">
            Unleash your workflow
         </h2>
         <p className="text-[#a1a1aa] text-lg max-w-xl relative z-10">
            Stop worrying about local dependencies and start focusing on writing code.
         </p>
      </div>

      <PerformanceSection />
      <CommandMenuSection />
      <SecuritySection />
      <TestimonialSection />
      <IssueTrackingSection />
      <CtaSection />
    </main>
  );
}
