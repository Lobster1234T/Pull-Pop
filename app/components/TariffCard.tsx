'use client';

import { useState, useEffect } from 'react';
import { Check, Zap } from 'lucide-react';
import HoverCard from './HoverCard';

interface TariffCardProps {
  name: string;
  description: string;
  price: string | number;
  currency?: string;
  features: string[];
  highlighted?: boolean;
  onSelect?: () => void;
}

export default function TariffCard({
  name,
  description,
  price,
  currency = 'сом',
  features,
  highlighted = false,
  onSelect,
}: TariffCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <HoverCard effect="lift">
      <div 
        className={`glass p-8 rounded-xl border transition-all group relative ${
          highlighted
            ? 'border-primary/60 shadow-2xl shadow-primary/30 md:scale-105'
            : 'border-primary/30 hover:border-primary/60'
        }`}
        onMouseEnter={() => !prefersReducedMotion && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Highlight indicator */}
        {highlighted && (
          <div className="absolute -top-3 -right-3 z-20">
            <div className={`bg-gradient-to-r from-primary to-primary/80 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-primary/50 flex items-center gap-1 ${!prefersReducedMotion ? 'animate-glow' : ''}`}>
              ⭐ РЕКОМЕНДУЕМЫЙ
            </div>
          </div>
        )}

        {/* Animated background line */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-transparent rounded-t-xl transition-all duration-300 ${
          isHovered && !prefersReducedMotion ? 'opacity-100' : 'opacity-30'
        }`}></div>

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
            {highlighted && <Zap className="w-5 h-5" />}
            {name}
          </h3>
          <p className="text-slate-400 text-sm">{description}</p>
        </div>

        {/* Price section */}
        <div className={`mb-8 pb-8 border-b border-primary/20 transition-all ${isHovered && !prefersReducedMotion ? 'border-primary/40' : ''}`}>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {price}
            </span>
            <span className="text-slate-400">{currency}</span>
          </div>
        </div>

        {/* Features list */}
        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className={`flex items-start gap-3 text-slate-300 transition-all transform ${
                isHovered && !prefersReducedMotion ? `translate-x-2 delay-${idx * 50}` : ''
              }`}
            >
              <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:rotate-12 transition-transform">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={onSelect}
          className={`w-full py-3 rounded-lg font-bold transition-all duration-300 relative overflow-hidden group/btn ${
            highlighted
              ? 'bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-xl hover:shadow-primary/50'
              : 'border-2 border-primary text-primary hover:bg-primary/10'
          }`}
        >
          {/* Shimmer effect */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 opacity-0 group-hover/btn:opacity-100"></div>
          )}

          <span className="relative flex items-center justify-center gap-2">
            <Zap className={`w-4 h-4 ${!prefersReducedMotion ? 'group-hover/btn:animate-pulse' : ''}`} />
            ВЫБРАТЬ ТАРИФ
          </span>
        </button>

        {/* Optional badge */}
        {highlighted && (
          <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-xs text-primary font-semibold text-center">✨ Самый популярный выбор</p>
          </div>
        )}
      </div>
    </HoverCard>
  );
}
