'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  image?: string;
  color?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  image,
  color = 'from-cyan-500 to-blue-600',
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated glow background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}></div>

      {/* Main card */}
      <div className="glass border border-cyan-500/30 hover:border-cyan-500/60 rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col hover-lift relative z-10">
        {/* Image container */}
        {image && (
          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
            <Image
              src={image}
              alt={title}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br ${color} mb-4 transition-all duration-300 ${
            isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
          }`}>
            <span className="text-2xl">{icon}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed flex-grow">
            {description}
          </p>

          {/* Underline accent */}
          <div className={`mt-4 h-1 bg-gradient-to-r ${color} rounded-full transition-all duration-300 ${
            isHovered ? 'w-full' : 'w-0'
          }`}></div>
        </div>
      </div>
    </div>
  );
}
