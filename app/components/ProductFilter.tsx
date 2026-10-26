'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface ProductFilterProps {
  onFilter?: (filters: any) => void;
  categories?: string[];
}

export default function ProductFilter({
  onFilter,
  categories = ['Электроника', 'Одежда', 'Книги', 'Спорт'],
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    category: '',
    sortBy: 'newest',
  });

  const handleChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleApply = () => {
    onFilter?.(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      category: '',
      sortBy: 'newest',
    });
    onFilter?.({
      minPrice: '',
      maxPrice: '',
      category: '',
      sortBy: 'newest',
    });
  };

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
      >
        <Filter size={20} />
        Фильтры
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={`
          fixed right-0 top-0 h-full w-80 bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-gray-700 shadow-lg z-50 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-6 space-y-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Фильтры
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <X size={24} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Сортировка
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="newest">Новые</option>
              <option value="price_asc">Цена: от низкой к высокой</option>
              <option value="price_desc">Цена: от высокой к низкой</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Категория
            </label>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={filters.category === cat}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Цена
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="От"
                value={filters.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="До"
                value={filters.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleApply}
              className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Применить
            </button>
            <button
              onClick={handleReset}
              className="flex-1 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Сброс
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
