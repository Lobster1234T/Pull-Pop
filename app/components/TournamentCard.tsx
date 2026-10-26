'use client';

import { useState } from 'react';
import { Users, Trophy, Flame, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface TournamentCardProps {
  id: string;
  name: string;
  game: string;
  description?: string;
  participants: number;
  maxParticipants: number;
  prizePool: number;
  image?: string;
  icon?: string;
  status?: 'active' | 'upcoming' | 'finished';
}

export default function TournamentCard({
  id,
  name,
  game,
  description,
  participants,
  maxParticipants,
  prizePool,
  image,
  icon,
  status = 'active',
}: TournamentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return { text: '🔴 Идёт сейчас', color: 'bg-red-500/20 text-red-300 border-red-500/30' };
      case 'upcoming':
        return { text: '⏳ Скоро', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
      case 'finished':
        return { text: '✅ Завершён', color: 'bg-green-500/20 text-green-300 border-green-500/30' };
    }
  };

  const statusBadge = getStatusBadge();
  const fillPercentage = (participants / maxParticipants) * 100;

  return (
    <div
      className="relative group cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main card with image */}
      <div className="glass border border-cyan-500/30 hover:border-cyan-500/60 rounded-xl overflow-hidden transition-all duration-300 hover-lift h-full flex flex-col">
        {/* Image container */}
        <div className="relative w-full h-64 overflow-hidden bg-gradient-to-b from-slate-700 to-slate-900">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-6xl">
              {icon || (game === 'CS:GO' ? '🎯' : game === 'Valorant' ? '🔫' : '🏎️')}
            </div>
          )}
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          {/* Status badge */}
          <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold border ${statusBadge.color} backdrop-blur-sm`}>
            {statusBadge.text}
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-2xl font-black text-white mb-1">{name}</h3>
            <p className="text-cyan-300 text-sm font-semibold">{game}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Description */}
          {description && (
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{description}</p>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-cyan-500/20">
            {/* Prize Pool */}
            <div className="text-center">
              <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500 mb-1">Призовой фонд</p>
              <p className="text-sm font-bold text-white">{prizePool.toLocaleString()} ₽</p>
            </div>

            {/* Participants */}
            <div className="text-center">
              <Users className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500 mb-1">Участников</p>
              <p className="text-sm font-bold text-white">{participants}</p>
            </div>

            {/* Game Type */}
            <div className="text-center">
              <Flame className="w-5 h-5 text-orange-400 mx-auto mb-2" />
              <p className="text-xs text-slate-500 mb-1">Сложность</p>
              <p className="text-sm font-bold text-white">{maxParticipants === 16 ? 'Средняя' : maxParticipants === 32 ? 'Высокая' : 'Элит'}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-semibold text-slate-400">Заполнено</p>
              <p className="text-xs font-bold text-cyan-300">{Math.round(fillPercentage)}%</p>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
                style={{ width: `${fillPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 mt-auto flex items-center justify-center gap-2 group/btn">
            {status === 'finished' ? 'РЕЗУЛЬТАТЫ' : 'ПОДРОБНЕЕ'}
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Highlight border on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none border-2 border-cyan-400 rounded-xl opacity-50"></div>
        )}
      </div>
    </div>
  );
}
