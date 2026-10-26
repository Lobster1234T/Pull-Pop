'use client';

import { useState } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  id: string;
  title: string;
  description?: string;
  excerpt?: string;
  image: string;
  author?: string;
  date?: string;
  category?: string;
  featured?: boolean;
}

export default function NewsCard({
  id,
  title,
  description,
  excerpt,
  image,
  author,
  date,
  category,
  featured = false,
}: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const displayText = description || excerpt || '';

  return (
    <Link href={`/news/${id}`}>
      <div
        className={`glass border border-cyan-500/30 hover:border-cyan-500/60 rounded-lg overflow-hidden transition-all duration-300 hover-lift cursor-pointer h-full flex flex-col ${
          featured ? 'md:col-span-2 lg:row-span-2' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Category badge */}
          {category && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/90 text-white text-xs font-bold rounded-full">
              {category}
            </div>
          )}

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
              ⭐ ГЛАВНОЕ
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className={`font-bold mb-3 line-clamp-2 transition-colors ${
            featured 
              ? 'text-lg sm:text-2xl text-cyan-300' 
              : 'text-base sm:text-lg text-white'
          } group-hover:text-cyan-400`}>
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-sm mb-4 line-clamp-2 sm:line-clamp-3">
            {displayText}
          </p>

          {/* Meta info */}
          <div className={`flex flex-wrap gap-4 text-xs text-slate-500 mb-4 pb-4 border-b border-cyan-500/20 ${
            featured ? 'text-sm' : ''
          }`}>
            {date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            )}
            {author && (
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {author}
              </div>
            )}
          </div>

          {/* Read more button */}
          <button className="mt-auto inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors text-sm">
            Читать далее
            <ArrowRight className={`w-4 h-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
          </button>
        </div>
      </div>
    </Link>
  );
}
