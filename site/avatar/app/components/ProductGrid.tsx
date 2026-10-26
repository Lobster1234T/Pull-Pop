'use client';

import ProductCard from './ProductCard';
import { LoadingSkeleton } from './index';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onAddToCart?: (productId: string) => void;
  onAddToFavorites?: (productId: string) => void;
  columns?: number;
}

export default function ProductGrid({
  products,
  isLoading = false,
  onAddToCart,
  onAddToFavorites,
  columns = 4,
}: ProductGridProps) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns] || 'grid-cols-4';

  if (isLoading) {
    return (
      <div className={`grid ${gridClass} gap-6`}>
        {[...Array(8)].map((_, i) => (
          <LoadingSkeleton key={i} height={300} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Товары не найдены
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={onAddToCart}
          onAddToFavorites={onAddToFavorites}
        />
      ))}
    </div>
  );
}
