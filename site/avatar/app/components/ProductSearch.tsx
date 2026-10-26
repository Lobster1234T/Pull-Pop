'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface ProductSearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function ProductSearch({
  onSearch,
  placeholder = 'Поиск товаров...',
}: ProductSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      setIsOpen(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        )}
      </form>

      {/* Suggestions */}
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
          <div className="p-4 text-center text-gray-600 dark:text-gray-400">
            Нажмите Enter для поиска "{query}"
          </div>
        </div>
      )}
    </div>
  );
}
