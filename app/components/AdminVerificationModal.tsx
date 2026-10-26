'use client';

import { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface AdminVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onVerifySuccess: (data: any) => void;
}

export default function AdminVerificationModal({
  isOpen,
  onClose,
  userId,
  onVerifySuccess,
}: AdminVerificationModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!code || code.length !== 6) {
        throw new Error('Введите 6-значный код');
      }

      const response = await fetch('/api/admin/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка верификации');
      }

      // Save auth data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      console.log('✓ 2FA verification success');
      
      setCode('');
      onClose();
      
      // Redirect to admin panel
      onVerifySuccess(data);
      window.location.href = '/admin';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-orange-500/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header gradient line */}
        <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-orange-400 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="relative p-8 pb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <h1 className="text-2xl font-bold text-white">AVATAR</h1>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            Проверка входа
          </h2>
          <p className="text-slate-400 text-sm">
            Введите 6-значный код, отправленный в Telegram
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="relative px-8 pb-8 space-y-4">
          {/* Error */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-xs font-medium">
              ⚠ {error}
            </div>
          )}

          {/* Code Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
              Код верификации
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm text-center font-mono text-2xl tracking-widest"
                required
                disabled={loading}
                autoFocus
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Код действителен 5 минут
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 text-sm uppercase tracking-wider"
          >
            {loading ? '⚡ Проверка...' : 'Подтвердить'}
          </button>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300 text-xs">
            <p className="font-semibold mb-2">ℹ️ Не получили код?</p>
            <ul className="list-disc list-inside space-y-1 text-blue-300/80">
              <li>Проверьте Telegram-бот на канале @avatar_admin_bot</li>
              <li>Убедитесь, что прошло не более 5 минут</li>
              <li>Попробуйте снова нажать &quot;Войти&quot;</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
