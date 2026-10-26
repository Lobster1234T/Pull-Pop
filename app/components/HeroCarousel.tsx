'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  cta: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1538481143235-2b594ebb8b5d?w=1200&h=600&fit=crop',
    title: 'Премиум Гейм-Зоны',
    description: 'Современное оборудование и комфортная атмосфера для истинных геймеров',
    cta: 'Забронировать место',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=600&fit=crop',
    title: 'Турниры и Соревнования',
    description: 'Участвуйте в престижных турнирах и выигрывайте привлекательные призы',
    cta: 'Узнать о турнирах',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1516321349632-fec880802d7e?w=1200&h=600&fit=crop',
    title: 'Вкусные закуски',
    description: 'Наслаждайтесь игрой с нашей премиум-коллекцией закусок и напитков',
    cta: 'Посмотреть меню',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1575745236778-f1e260eda5c3?w=1200&h=600&fit=crop',
    title: 'Специальные Предложения',
    description: 'Экономьте с нашими выгодными тарифами и VIP пакетами',
    cta: 'Выбрать тариф',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1579546579662-711aa33e7b1f?w=1200&h=600&fit=crop',
    title: 'Присоединяйся к Сообществу',
    description: 'Встречайся с друзьями, соревнуйся и развивайся вместе с нами',
    cta: 'Зарегистрироваться',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlay(false);
  };

  return (
    <section className="relative w-full h-[600px] overflow-hidden rounded-2xl group mt-8">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === current}
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl animate-fade-in-up">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl text-slate-100 mb-8 drop-shadow-md">
                  {slide.description}
                </p>
                <button
                  onClick={() => setIsAutoPlay(false)}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 group/btn"
                >
                  <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full backdrop-blur-sm ${
              index === current
                ? 'w-8 h-2 bg-cyan-400 shadow-lg shadow-cyan-500/50'
                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2 ${
            isAutoPlay
              ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50'
              : 'bg-slate-500/30 text-slate-300 border border-slate-500/50'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-cyan-400 animate-pulse' : 'bg-slate-400'}`}></div>
          {isAutoPlay ? 'Авто' : 'Пауза'}
        </button>
      </div>
    </section>
  );
}
