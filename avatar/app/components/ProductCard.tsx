'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  onAddToCart?: (productId: string) => void;
  onAddToFavorites?: (productId: string) => void;
  isFavorited?: boolean;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  rating,
  reviewCount,
  onAddToCart,
  onAddToFavorites,
  isFavorited = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFav, setIsFav] = useState(isFavorited);

  const handleAddToCart = () => {
    onAddToCart?.(id);
  };

  const handleToggleFavorite = () => {
    setIsFav(!isFav);
    onAddToFavorites?.(id);
  };

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover transition-transform duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Favorite button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-all"
        >
          <Heart
            size={20}
            className={`transition-colors ${
              isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.round(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
            {price.toLocaleString()} ₽
          </span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Добавить
        </button>
      </div>
    </div>
  );
}
