'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard';

interface News {
  id: string;
  title: string;
  description?: string;
  excerpt?: string;
  image: string;
  author?: string;
  date?: string;
  category?: string;
}

interface NewsCarouselProps {
  news: News[];
}

export default function NewsCarousel({ news }: NewsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrent(page);
  };

  const startIndex = current * itemsPerPage;
  const displayedNews = news.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative">
      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {displayedNews.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            excerpt={item.excerpt}
            image={item.image}
            author={item.author}
            date={item.date}
            category={item.category}
            featured={current === 0 && displayedNews[0].id === item.id && itemsPerPage === 1}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        {/* Left button */}
        <button
          onClick={goToPrevious}
          className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-500/50 hover:border-cyan-500/70 text-cyan-300 hover:text-cyan-200 rounded-lg transition-all duration-300"
          aria-label="Previous news"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Page indicators */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`transition-all duration-300 rounded-full ${
                index === current
                  ? 'w-8 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50'
                  : 'w-3 h-3 bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to page ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Right button */}
        <button
          onClick={goToNext}
          className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-500/50 hover:border-cyan-500/70 text-cyan-300 hover:text-cyan-200 rounded-lg transition-all duration-300"
          aria-label="Next news"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Page counter */}
      <div className="text-center mt-6">
        <p className="text-slate-400 text-sm">
          Страница {current + 1} из {totalPages}
        </p>
      </div>
    </div>
  );
}
