'use client';

import Link from 'next/link';
import { Binoculars } from 'lucide-react';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="inline-block bg-orange-500/20 border border-orange-500/50 rounded-full p-6 mb-6">
            <Binoculars className="w-16 h-16 text-orange-400 mx-auto" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-4 gradient-text">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-200">Страница не найдена</h2>

        <p className="text-xl text-slate-400 mb-8">
          Похоже, вы ищете что-то, чего здесь нет. Проверьте адрес или вернитесь на главную страницу.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-cyan-500/30"
          >
            ← На главную
          </Link>
          <Link
            href="/booking"
            className="inline-block px-8 py-3 bg-slate-800/50 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 font-bold rounded-lg transition-all hover:bg-slate-800"
          >
            Забронировать место →
          </Link>
        </div>

        <div className="mt-12 p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg">
          <p className="text-slate-400 text-sm">
            <strong>Код ошибки:</strong> 404 Not Found
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Запрашиваемый ресурс не найден на сервере.
          </p>
        </div>
      </div>
    </div>
  );
}
