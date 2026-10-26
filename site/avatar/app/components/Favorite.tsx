'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

interface FavoriteProps {
  productId: string;
  isFavorited?: boolean;
  onToggle?: (productId: string, isFavorited: boolean) => void;
  size?: number;
}

export default function Favorite({
  productId,
  isFavorited = false,
  onToggle,
  size = 24,
}: FavoriteProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMarked, setIsMarked] = useState(isFavorited);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const method = isMarked ? 'DELETE' : 'POST';
      const endpoint = isMarked
        ? `/api/favorites?productId=${productId}`
        : '/api/favorites';

      const response = await fetch(
        endpoint,
        {
          method,
          headers: { 'Content-Type': 'application/json' },
          ...(method === 'POST' && {
            body: JSON.stringify({ productId }),
          }),
        }
      );

      if (response.ok) {
        setIsMarked(!isMarked);
        onToggle?.(productId, !isMarked);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="p-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
    >
      <Heart
        size={size}
        className={`transition-colors ${
          isMarked
            ? 'fill-red-500 text-red-500'
            : 'text-gray-400 hover:text-red-500'
        }`}
      />
    </button>
  );
}
