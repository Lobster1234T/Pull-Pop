'use client';

import { useState } from 'react';
import { ChevronRight, Zap, Users, DollarSign } from 'lucide-react';
import { ReactNode } from 'react';
import Image from 'next/image';

interface GamingZoneCardProps {
  name: string;
  type: string;
  capacity: number;
  description: string;
  icon: ReactNode;
  color: string;
  image?: string;
  price?: number;
  featured?: boolean;
  specs?: {
    label: string;
    value: string;
  }[];
}

export default function GamingZoneCard({
  name,
  type,
  capacity,
  description,
  icon,
  color,
  image,
  price,
  featured = false,
  specs = [],
}: GamingZoneCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 ${featured ? 'md:scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Animated background glow */}
      <div
        className={`absolute inset-0 rounded-xl blur-2xl opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : ''
        }`}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 107, 53, 0.3) 0%, transparent 70%)`,
        }}
      />

      {/* Glow effect on featured */}
      {featured && (
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity z-0"></div>
      )}

      {/* Main card */}
      <div
        className={`glass rounded-xl border transition-all duration-300 relative z-10 overflow-hidden ${
          featured
            ? 'border-orange-500/60 shadow-2xl shadow-orange-500/20'
            : 'border-orange-500/30 hover:border-orange-500/60'
        } ${isHovered ? 'hover-lift neon-glow-orange' : ''}`}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 10}deg) rotateY(${(mousePosition.x - 0.5) * -10}deg) scale(1.02)`
            : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
        }}
      >
        {/* Image container */}
        {image && (
          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-b from-slate-700 to-slate-900">
            <Image
              src={image}
              alt={name}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Icon container */}
          <div
            className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg p-3 mb-4 transition-all duration-300 inline-flex items-center justify-center ${
              isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
            }`}
          >
            {icon}
          </div>

          {/* Title and description */}
          <h3 className="text-xl font-bold mb-2 text-orange-400">{name}</h3>
          <p className="text-slate-400 mb-4 text-sm leading-relaxed">{description}</p>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-orange-500/20">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-xs text-slate-500">Мест</p>
                <p className="text-sm font-bold text-white">{capacity}</p>
              </div>
            </div>
            {price && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-orange-400" />
                <div>
                  <p className="text-xs text-slate-500">От:</p>
                  <p className="text-sm font-bold text-white">{price} сом</p>
                </div>
              </div>
            )}
          </div>

          {/* Specs if provided */}
          {specs.length > 0 && (
            <div className="mb-4 pb-4 border-b border-orange-500/20">
              <div className="space-y-2">
                {specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="text-orange-400 font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer action */}
          <div className="flex items-center justify-between pt-4 group-hover:text-orange-300 transition-colors">
            <span className="text-orange-400 font-bold flex items-center gap-1">
              <Zap className="w-4 h-4" />
              ВЫБРАТЬ
            </span>
            <ChevronRight
              className={`w-5 h-5 text-orange-400 transition-transform ${
                isHovered ? 'translate-x-2' : 'translate-x-0'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Optional featured badge */}
      {featured && (
        <div className="absolute -top-3 -right-3 z-20">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-orange-500/50 animate-glow-pulse">
            ⭐ ТОП ВЫБОР
          </div>
        </div>
      )}
    </div>
  );
}
