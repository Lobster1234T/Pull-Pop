'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showCount?: boolean;
}

export default function RatingStars({
  rating,
  count = 0,
  size = 20,
  interactive = false,
  onChange,
  showCount = true,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => {
              if (interactive && onChange) {
                onChange(star);
              }
            }}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            disabled={!interactive}
            className={`transition-all ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Star
              size={size}
              className={`${
                star <= displayRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      {showCount && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)} ({count} отзывов)
        </span>
      )}
    </div>
  );
}
