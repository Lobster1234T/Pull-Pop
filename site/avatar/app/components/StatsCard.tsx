'use client';

import { useState, useEffect } from 'react';
import { ReactNode } from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  color?: 'orange' | 'cyan' | 'purple' | 'pink';
  animated?: boolean;
  delay?: number;
}

export default function StatsCard({
  label,
  value,
  unit,
  icon,
  color = 'orange',
  animated = true,
  delay = 0,
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!animated) {
      setDisplayValue(Number(value));
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [animated, delay, value]);

  useEffect(() => {
    if (!isVisible || !animated) return;

    const numValue = Number(value);
    if (isNaN(numValue)) {
      setDisplayValue(0);
      return;
    }

    let start = 0;
    const increment = numValue / 60;
    let current = start;

    const counter = setInterval(() => {
      current += increment;
      if (current >= numValue) {
        setDisplayValue(numValue);
        clearInterval(counter);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [isVisible, animated, value]);

  const colorClasses = {
    orange: 'from-orange-500 to-orange-600 text-orange-400',
    cyan: 'from-cyan-500 to-cyan-600 text-cyan-400',
    purple: 'from-purple-500 to-purple-600 text-purple-400',
    pink: 'from-pink-500 to-pink-600 text-pink-400',
  };

  return (
    <div className={`glass p-6 rounded-lg border border-orange-500/30 hover:border-orange-500/60 hover-lift group transition-all ${
      animated ? 'animate-fade-in-up' : ''
    }`} style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg p-3 group-hover:rotate-12 transition-transform`}>
            {icon}
          </div>
        )}
      </div>

      <div className="mb-2">
        <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          {displayValue}
          {unit && <span className="text-2xl">{unit}</span>}
        </div>
      </div>

      <div className="text-slate-400 text-sm font-semibold">{label}</div>
    </div>
  );
}
