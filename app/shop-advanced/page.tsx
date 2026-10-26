'use client';

import { Search, Filter, Star, Zap, ShoppingCart } from 'lucide-react';
import { useState, useMemo } from 'react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function ShopAdvancedPage() {
  const allProducts = [
    { id: 1, name: 'Gaming Headset Pro', category: 'Наушники', price: 8500, rating: 4.9, inStock: true },
    { id: 2, name: 'Mechanical Keyboard RGB', category: 'Клавиатуры', price: 6200, rating: 4.8, inStock: true },
    { id: 3, name: 'Gaming Mouse Ultra', category: 'Мыши', price: 4500, rating: 4.9, inStock: true },
    { id: 4, name: 'Mousepad Extended', category: 'Коврики', price: 2800, rating: 4.7, inStock: true },
    { id: 5, name: 'Monitor 27" OLED', category: 'Мониторы', price: 45000, rating: 5, inStock: false },
    { id: 6, name: 'Laptop Stand', category: 'Аксессуары', price: 3200, rating: 4.6, inStock: true },
    { id: 7, name: 'Cable Organizer Set', category: 'Аксессуары', price: 1500, rating: 4.5, inStock: true },
    { id: 8, name: 'Energy Drink (Pack)', category: 'Напитки', price: 2000, rating: 4.8, inStock: true },
    { id: 9, name: 'Gaming Chair Pro', category: 'Мебель', price: 28000, rating: 4.9, inStock: true },
    { id: 10, name: 'RGB Lighting Kit', category: 'Освещение', price: 5500, rating: 4.7, inStock: true },
    { id: 11, name: 'Webcam 4K', category: 'Аксессуары', price: 12000, rating: 4.8, inStock: true },
    { id: 12, name: 'Microphone Pro', category: 'Аксессуары', price: 8000, rating: 4.9, inStock: true },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['Все', ...new Set(allProducts.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'Все' || p.category === selectedCategory;
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-6xl sm:text-7xl font-black mb-6 text-center neon-text-orange">
            УМНЫЙ МАГАЗИН
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Найдите идеальное оборудование с расширенным поиском и фильтрацией
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-orange-500/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {/* Categories */}
            <div className="glass border border-orange-500/30 rounded-lg p-4">
              <h3 className="font-bold text-orange-400 mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Категория
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded transition-all ${
                      selectedCategory === cat
                        ? 'bg-orange-500 text-white font-bold'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-orange-500/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="glass border border-orange-500/30 rounded-lg p-4">
              <h3 className="font-bold text-orange-400 mb-4">Цена</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">От: {priceRange[0].toLocaleString()}</label>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full accent-orange-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">До: {priceRange[1].toLocaleString()}</label>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Sorting */}
            <div className="glass border border-orange-500/30 rounded-lg p-4">
              <h3 className="font-bold text-orange-400 mb-4">Сортировка</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-800/50 border border-orange-500/30 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
              >
                <option value="popular">Популярные</option>
                <option value="price-low">Цена: низкая</option>
                <option value="price-high">Цена: высокая</option>
                <option value="rating">Лучший рейтинг</option>
              </select>
            </div>

            {/* Stock Filter */}
            <div className="glass border border-orange-500/30 rounded-lg p-4">
              <h3 className="font-bold text-orange-400 mb-4">Наличие</h3>
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-orange-500" defaultChecked />
                Только в наличии
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-slate-400">Найдено товаров: <span className="text-orange-400 font-bold">{filteredProducts.length}</span></p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="glass border border-orange-500/30 rounded-xl overflow-hidden hover:border-orange-500/60 hover-lift transition-all">
                  <div className="bg-orange-500/10 p-8 text-center flex items-center justify-center h-40 text-4xl">
                    📦
                  </div>

                  <div className="p-6">
                    <p className="text-orange-400 text-xs font-bold mb-2">{product.category}</p>
                    <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-orange-400 text-orange-400' : 'text-slate-600'}`} />
                        ))}
                      </div>
                      <span className="text-slate-400 text-sm">{product.rating}</span>
                    </div>

                    <div className="mb-4 pb-4 border-t border-orange-500/20">
                      <div className="text-2xl font-black text-orange-400">{product.price.toLocaleString()} ₽</div>
                    </div>

                    <NeoButton variant={product.inStock ? 'primary' : 'ghost'} size="md" className="w-full text-sm" icon={<ShoppingCart className="w-4 h-4" />} disabled={!product.inStock}>
                      {product.inStock ? 'КУПИТЬ' : 'НЕТ В НАЛИЧИИ'}
                    </NeoButton>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass border border-orange-500/30 rounded-xl p-12 text-center">
              <p className="text-2xl font-bold text-slate-300 mb-2">Товары не найдены</p>
              <p className="text-slate-400">Попробуйте изменить параметры поиска или фильтрации</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
