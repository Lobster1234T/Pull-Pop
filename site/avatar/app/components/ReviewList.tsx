'use client';

import { useState, useEffect } from 'react';
import { ReviewCard } from './index';
import { Pagination, LoadingSkeleton } from './index';

interface ReviewListProps {
  productId: string;
  onEditClick?: (reviewId: string) => void;
}

export default function ReviewList({ productId, onEditClick }: ReviewListProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [page, productId]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/reviews?productId=${productId}&page=${page}`
      );
      const data = await response.json();
      setReviews(data.data);
      setAverageRating(parseFloat(data.averageRating));
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error('Ошибка загрузки отзывов:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Вы уверены?')) return;

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews(reviews.filter((r) => r.id !== reviewId));
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton height={150} count={3} />;
  }

  return (
    <div className="space-y-6">
      {/* Average Rating */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-cyan-200 dark:border-cyan-700">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Средняя оценка
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                из 5 звезд
              </span>
            </div>
          </div>
          <div className="flex-1"></div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {reviews.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              всего отзывов
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            Отзывов еще нет
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                {...review}
                author={review.author?.name || 'Аноним'}
                onEdit={onEditClick}
                onDelete={() => handleDelete(review.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
