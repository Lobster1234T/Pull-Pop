'use client';

import { ReactNode, useEffect, useState } from 'react';

interface HoverCardProps {
  children: ReactNode;
  effect?: 'lift' | 'glow' | 'glow-accent' | 'scale' | 'bright';
  className?: string;
}

/**
 * Компонент карточки с hover-эффектом и поддержкой prefers-reduced-motion
 * Поддерживаемые эффекты:
 * - lift: поднятие и свечение
 * - glow: фиолетовое свечение
 * - glow-accent: голубое свечение
 * - scale: увеличение при наведении
 * - bright: затемнение при наведении
 */
export default function HoverCard({
  children,
  effect = 'lift',
  className = '',
}: HoverCardProps) {
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

  const effectClass = prefersReducedMotion
    ? ''
    : {
        lift: 'hover-lift',
        glow: 'hover-glow',
        'glow-accent': 'hover-glow-accent',
        scale: 'hover-scale',
        bright: 'hover-bright',
      }[effect] || 'hover-lift';

  return (
    <div className={`${effectClass} ${className}`}>
      {children}
    </div>
  );
}
