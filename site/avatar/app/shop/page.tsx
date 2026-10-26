'use client';

import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import Header from '@/app/components/Header';
import NeoButton from '@/app/components/NeoButtton';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import { getProducts, getProductCategories } from '@/app/lib/db';

export default function ShopPage() {
  const allProducts = getProducts();
  const categories = getProductCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? allProducts.filter(p => p.category === selectedCategory)
    : allProducts;

  const categoryEmojis: Record<string, string> = {
    'Напитки': '🥤',
    'Снеки': '🍟',
    'Аксессуары': '🔌',
  };

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-6xl sm:text-7xl font-black mb-6 text-center gradient-text">
            МАГАЗИН
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Все необходимое для идеальной игровой сессии
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedCategory === null
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-cyan-500/20'
              }`}
            >
              ВСЕ
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-cyan-500/20'
                }`}
              >
                <span>{categoryEmojis[cat]}</span>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-slate-400">
            Показано товаров: <span className="text-cyan-300 font-bold">{filteredProducts.length}</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="glass border border-cyan-500/30 rounded-xl overflow-hidden hover:border-cyan-500/60 hover-lift group transition-all">
                  {/* Product Image */}
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 text-center text-6xl h-40 flex items-center justify-center group-hover:scale-110 transition-transform">
                    📦
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <p className="text-cyan-300 text-xs font-bold mb-2">{product.category}</p>
                    <h3 className="font-bold text-white mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-slate-400 text-xs mb-4">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-orange-400 text-cyan-300" />
                      ))}
                      <span className="text-xs text-slate-400">(24)</span>
                    </div>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-black text-cyan-300">
                        {product.price}с
                      </div>
                      <NeoButton variant="primary" size="sm" icon={<ShoppingCart className="w-4 h-4" />}>
                        В корзину
                      </NeoButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass border border-cyan-500/30 rounded-xl p-12 text-center">
              <p className="text-2xl font-bold text-slate-300 mb-2">Товары не найдены</p>
              <p className="text-slate-400">Попробуйте выбрать другую категорию</p>
            </div>
          )}
        </div>
      </section>

      {/* Offers */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-cyan-300 mb-12 text-center">СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass border border-cyan-500/30 rounded-xl p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10">
              <h3 className="text-2xl font-bold text-cyan-300 mb-2">🎉 Комбо меню</h3>
              <p className="text-slate-300 mb-4">Энергетик + Снеки</p>
              <div className="text-3xl font-black text-white mb-4">399с</div>
              <p className="text-slate-400 text-sm mb-4">Экономия 50с</p>
              <NeoButton variant="primary" size="md" className="w-full">
                ДОБАВИТЬ
              </NeoButton>
            </div>

            <div className="glass border border-cyan-500/30 rounded-xl p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">💎 Премиум набор</h3>
              <p className="text-slate-300 mb-4">Всё необходимое геймеру</p>
              <div className="text-3xl font-black text-white mb-4">1,299с</div>
              <p className="text-slate-400 text-sm mb-4">Включает 5 товаров</p>
              <NeoButton variant="secondary" size="md" className="w-full">
                ОБЗОР
              </NeoButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

