import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface PageHeroProps {
  badgeText?: ReactNode;
  badgeContent?: ReactNode; // For completely custom badges
  title: ReactNode;
  description: ReactNode;
  primaryCta?: {
    text: string;
    href: string;
    icon?: ReactNode;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  glowColor?: string; // e.g. "from-indigo-500/25 via-purple-500/5"
  layout?: 'centered' | 'left' | 'split';
  bgPattern?: 'grid' | 'dots' | 'mesh' | 'none';
  glowPosition?: 'center' | 'bottom';
  children?: ReactNode;
  titleClassName?: string;
  containerClassName?: string;
}

export function PageHero({
  badgeText,
  badgeContent,
  title,
  description,
  primaryCta,
  secondaryCta,
  glowColor = "from-indigo-500/25 via-purple-500/5",
  layout = 'centered',
  bgPattern = 'grid',
  glowPosition = 'center',
  titleClassName = "text-4xl md:text-[5rem] lg:text-[6.5rem]",
  containerClassName = "pt-32 pb-24 md:pt-44 md:pb-32",
  children
}: PageHeroProps) {
  
  const isCentered = layout === 'centered';
  const isLeft = layout === 'left';
  const isSplit = layout === 'split';

  return (
    <section className={`${containerClassName} px-6 relative overflow-hidden bg-[#080808] border-b border-white/[0.08]`}>
      
      {/* Background Patterns */}
      {bgPattern === 'grid' && (
        <div className="absolute inset-0 bg-grid mask-fade opacity-60 pointer-events-none" />
      )}
      {bgPattern === 'dots' && (
        <div className="absolute inset-0 bg-dots mask-fade opacity-40 pointer-events-none" />
      )}
      {bgPattern === 'mesh' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-emerald-500/20 to-cyan-500/20 blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
        </div>
      )}
      
      {/* Glow Position */}
      {glowPosition === 'center' && glowColor !== 'none' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1100px] h-[640px] pointer-events-none opacity-50">
          <div className={`absolute inset-0 bg-gradient-to-b ${glowColor} to-transparent blur-[110px] rounded-full`} />
        </div>
      )}
      {glowPosition === 'bottom' && glowColor !== 'none' && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[400px] pointer-events-none opacity-60">
           <div className={`absolute inset-0 bg-gradient-to-t ${glowColor} to-transparent blur-[120px] rounded-full`} />
        </div>
      )}

      {/* Top Border Highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className={`relative z-10 w-full max-w-[1200px] mx-auto flex ${isSplit ? 'flex-col lg:flex-row items-center gap-16' : 'flex-col'} ${isCentered ? 'items-center text-center' : 'items-start text-left'}`}>
        
        {/* Text Block */}
        <div className={`${isSplit ? 'flex-1' : 'flex flex-col'} ${isCentered ? 'items-center text-center' : 'items-start text-left'}`}>
          {badgeContent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`mb-8 ${isCentered ? 'mx-auto' : ''}`}
            >
              {badgeContent}
            </motion.div>
          ) : badgeText ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-[13px] text-gray-300 mb-8 ${isCentered ? 'mx-auto' : ''}`}
            >
              {badgeText}
            </motion.div>
          ) : null}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`${titleClassName} tracking-tighter font-semibold mb-8 leading-[0.95] max-w-4xl`}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-lg md:text-xl text-[#888] max-w-2xl leading-relaxed mb-10 ${isCentered ? 'mx-auto' : ''}`}
          >
            {description}
          </motion.p>

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`flex flex-col sm:flex-row items-center gap-4 ${isCentered ? 'justify-center' : 'justify-start'}`}
            >
              {primaryCta && (
                primaryCta.href.startsWith('/') ? (
                  <Link
                    to={primaryCta.href}
                    className="group bg-white text-black px-7 py-3.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 shadow-[0_0_50px_-12px_rgba(255,255,255,0.5)]"
                  >
                    {primaryCta.icon}
                    {primaryCta.text}
                    <ArrowRight className="w-4 h-4 -ml-0.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : (
                  <a
                    href={primaryCta.href}
                    className="group bg-white text-black px-7 py-3.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 shadow-[0_0_50px_-12px_rgba(255,255,255,0.5)]"
                  >
                    {primaryCta.icon}
                    {primaryCta.text}
                    <ArrowRight className="w-4 h-4 -ml-0.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )
              )}
              {secondaryCta && (
                secondaryCta.href.startsWith('/') ? (
                  <Link
                    to={secondaryCta.href}
                    className="bg-white/[0.04] border border-white/[0.1] text-white px-7 py-3.5 rounded-full font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    {secondaryCta.text}
                  </Link>
                ) : (
                  <a
                    href={secondaryCta.href}
                    className="bg-white/[0.04] border border-white/[0.1] text-white px-7 py-3.5 rounded-full font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    {secondaryCta.text}
                  </a>
                )
              )}
            </motion.div>
          )}

          {/* Children if centered layout (usually goes below) */}
          {isCentered && children && !isSplit && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
               className="w-full mt-24 flex justify-center flex-col items-center"
             >
               {children}
             </motion.div>
          )}

          {/* Children if left layout (usually goes below) */}
          {isLeft && children && !isSplit && (
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
               className="w-full mt-20 flex justify-start flex-col items-start"
             >
               {children}
             </motion.div>
          )}
        </div>

        {/* Children if split layout (usually goes to the right) */}
        {isSplit && children && (
          <motion.div
             initial={{ opacity: 0, x: 40 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
             className="flex-1 w-full"
          >
             {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
