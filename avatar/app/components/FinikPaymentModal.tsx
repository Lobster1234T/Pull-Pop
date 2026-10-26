'use client';

import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import PaymentButton from './PaymentButton';

interface FinikPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  bookingData?: {
    date: string;
    time: string;
    zone: string;
    duration: string;
    players: string;
  };
}

export default function FinikPaymentModal({
  isOpen,
  onClose,
  userId,
  bookingData,
}: FinikPaymentModalProps) {
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Расчет суммы платежа (5 сомов фиксированная цена)
  const amount = 5;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 w-full max-w-md overflow-hidden">
        {/* Header с фоном */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-cyan-500/20 to-transparent opacity-50"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20 hover:border-red-500/50"
        >
          <X className="w-5 h-5 text-red-400" />
        </button>

        {/* Content */}
        <div className="relative p-8 pt-12">
          {/* Title */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-2 gradient-text">
              {bookingData ? '🎮 Подтверждение бронирования' : '💳 Finik Pay'}
            </h2>
            <p className="text-slate-400 text-sm">
              {bookingData ? 'Оплатите бронирование вашей зоны' : 'Безопасная платежная система Кыргызстана'}
            </p>
          </div>

          {/* Payment Info Card */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-lg border border-cyan-500/20 p-6 mb-6">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Сумма платежа</p>
                <p className="text-4xl font-bold gradient-text">{amount} сом</p>
              </div>

              {bookingData && (
                <div className="pt-2 border-t border-cyan-500/10">
                  <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide font-semibold">Данные бронирования:</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Дата:</span>
                      <span className="text-cyan-300">{bookingData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Время:</span>
                      <span className="text-cyan-300">{bookingData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Зона:</span>
                      <span className="text-cyan-300">{bookingData.zone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Продолжительность:</span>
                      <span className="text-cyan-300">{bookingData.duration}ч</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Игроков:</span>
                      <span className="text-cyan-300">{bookingData.players}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-cyan-500/10">
                <p className="text-xs text-slate-500 mb-1">Способ оплаты</p>
                <p className="text-sm font-semibold text-cyan-300">QR-код Finik</p>
              </div>

              <div className="pt-2 border-t border-cyan-500/10">
                <p className="text-xs text-slate-500 mb-1">Валюта</p>
                <p className="text-sm font-semibold text-cyan-300">KGS (Сомы)</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6 space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-400 text-xs">✓</span>
              </div>
              <span className="text-sm text-slate-400">Моментальный платеж через QR-код</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-400 text-xs">✓</span>
              </div>
              <span className="text-sm text-slate-400">Безопасная верификация</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-400 text-xs">✓</span>
              </div>
              <span className="text-sm text-slate-400">Поддержка карт Finik</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Payment Button */}
          <div className="mb-6">
            <PaymentButton
              workId={`booking-${bookingData?.date}-${bookingData?.time}-${Date.now()}`}
              userId={userId}
              workTopic={`Бронирование ${bookingData?.zone || 'зоны'} на ${bookingData?.date || 'дату'}`}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg border-0"
            />
          </div>

          {/* Info */}
          <div className="text-center text-xs text-slate-500 space-y-2">
            <p>После нажатия кнопки вы будете перенаправлены на</p>
            <p className="text-cyan-400/70">платежную страницу Finik Pay</p>
            <p>Сканируйте QR-код вашей карточкой Finik</p>
            {bookingData && (
              <p className="pt-2 text-cyan-400">Ваше бронирование будет подтверждено после оплаты</p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-cyan-500/10 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-slate-200 transition-all font-medium text-sm"
            >
              Отмена
            </button>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50"></div>
      </div>
    </div>
  );
}
