'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  type?: 'zone' | 'game' | 'tournament' | 'product';
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const placeholderIcons = {
  zone: '🎮',
  game: '👾',
  tournament: '🏆',
  product: '📦',
};

const placeholderColors = {
  zone: 'from-cyan-500/20 to-blue-600/20',
  game: 'from-purple-500/20 to-pink-600/20',
  tournament: 'from-yellow-500/20 to-orange-600/20',
  product: 'from-green-500/20 to-emerald-600/20',
};

export default function ImagePlaceholder({
  src,
  alt,
  type = 'zone',
  width = 400,
  height = 250,
  className = '',
  priority = false,
}: ImagePlaceholderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Если нет изображения, показываем заглушку
  if (!src || error) {
    return (
      <div
        className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${placeholderColors[type]} border border-cyan-500/30 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        {/* Сетка фона */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Центральный контент */}
        <div className="relative z-10 text-center pointer-events-none">
          <div className="text-6xl mb-4 animate-bounce">{placeholderIcons[type]}</div>
          <p className="text-slate-400 text-sm font-medium">
            {type === 'zone' && 'Нет фото зоны'}
            {type === 'game' && 'Нет фото игры'}
            {type === 'tournament' && 'Нет фото турнира'}
            {type === 'product' && 'Нет фото товара'}
          </p>
        </div>

        {/* Светящиеся углы */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/20 rounded-bl-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-600/20 rounded-tr-full blur-xl"></div>
      </div>
    );
  }

  // Показываем реальное изображение
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-slate-700/50 ${className}`}
      style={{ width, height }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-slate-700/50 animate-pulse z-10"></div>
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        className="w-full h-full object-cover"
        quality={80}
      />
    </div>
  );
}
