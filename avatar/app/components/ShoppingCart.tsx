'use client';

import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingCart as CartIcon } from 'lucide-react';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemoveItem?: (productId: string) => void;
  onCheckout?: () => void;
}

export default function ShoppingCart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: ShoppingCartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      {/* Cart button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/50 rounded-lg hover:border-cyan-500/80 transition-all"
      >
        <CartIcon className="w-6 h-6 text-cyan-400" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-slate-800 border border-cyan-500/30 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-cyan-500/20">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Корзина ({totalItems})
            </h3>
          </div>

          {items.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <CartIcon size={40} className="mx-auto mb-2 opacity-50" />
              <p>Корзина пуста</p>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="p-4 border-b border-cyan-500/10 flex gap-4"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {item.price.toLocaleString()} ₽
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity?.(item.productId, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity?.(item.productId, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => onRemoveItem?.(item.productId)}
                          className="ml-auto p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-cyan-500/20 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-cyan-600 dark:text-cyan-400">
                    {totalAmount.toLocaleString()} ₽
                  </span>
                </div>
                <button
                  onClick={() => {
                    onCheckout?.();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  Оформить заказ
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
