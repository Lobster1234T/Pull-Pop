'use client';

import { useState } from 'react';
import { Loader, Send } from 'lucide-react';
import { RatingStars } from './index';

interface ReviewFormProps {
  productId: string;
  onSubmit?: (rating: number, comment: string) => Promise<void>;
  onCancel?: () => void;
}

export default function ReviewForm({
  productId,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!comment.trim()) {
      setError('Напишите комментарий');
      return;
    }

    if (comment.length < 10) {
      setError('Комментарий должен быть минимум 10 символов');
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit?.(rating, comment);
      setRating(5);
      setComment('');
    } catch (err: any) {
      setError(err.message || 'Ошибка отправки отзыва');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4">
      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
        Оставить отзыв
      </h3>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Rating */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Оценка
        </label>
        <RatingStars
          rating={rating}
          interactive={true}
          onChange={setRating}
          showCount={false}
          size={28}
        />
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Комментарий
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Поделитесь своим мнением о товаре..."
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:outline-none focus:border-cyan-500"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {comment.length} / 1000 символов
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <Loader size={18} className="animate-spin" />}
          {isLoading ? 'Отправка...' : 'Отправить отзыв'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}
