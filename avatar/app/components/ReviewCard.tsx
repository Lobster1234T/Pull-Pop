'use client';

import { Trash2, Edit2 } from 'lucide-react';
import { RatingStars } from './index';

interface ReviewCardProps {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  isOwn?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ReviewCard({
  id,
  author,
  rating,
  comment,
  date,
  isOwn = false,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
              {author.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {author}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(date).toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>
          <RatingStars rating={rating} showCount={false} />
        </div>

        {isOwn && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit?.(id)}
              className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete?.(id)}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Comment */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {comment}
      </p>
    </div>
  );
}
