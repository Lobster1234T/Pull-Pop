'use client';

import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/app/i18n';
import AdminVerificationModal from './AdminVerificationModal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [is2FAOpen, setIs2FAOpen] = useState(false);
  const [pendingUserId, setPendingUserId] = useState<string>('');
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/callback`;
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email) throw new Error('Введите адрес электронной почты');
      if (!password) throw new Error('Введите пароль');
      
      if (!isLogin) {
        if (!name) throw new Error('Введите ваше имя');
        if (password.length < 6) throw new Error('Пароль должен быть не менее 6 символов');
        if (password !== confirmPassword) throw new Error('Пароли не совпадают');
      }

      // For registration
      if (!isLogin) {
        const endpoint = '/api/auth/register';
        const payload = { email, password, name };

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Ошибка аутентификации');
        }

        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setEmail('');
        setPassword('');
        setName('');
        setConfirmPassword('');

        onClose();
        window.location.reload();
        return;
      }

      // For admin login - try 2FA first
      console.log('📧 Attempting admin 2FA login...');
      const response = await fetch('/api/admin/login-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.requiresVerification) {
        // Admin login - need 2FA verification
        console.log('✓ Credentials verified, waiting for 2FA code');
        setPendingUserId(data.userId);
        setIs2FAOpen(true);
        setEmail('');
        setPassword('');
        return;
      }

      // If 2FA endpoint not available or user is not admin, fallback to regular login
      if (response.status === 403) {
        throw new Error(data.error || 'Только администраторы могут использовать эту форму');
      }

      // Try regular login
      console.log('🔄 Falling back to regular login...');
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.error || 'Ошибка аутентификации');
      }

      localStorage.setItem('authToken', loginData.token);
      localStorage.setItem('user', JSON.stringify(loginData.user));

      setEmail('');
      setPassword('');
      setName('');
      setConfirmPassword('');

      onClose();

      if (loginData.user.isAdmin) {
        window.location.href = '/admin';
      } else {
        window.location.reload();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          <div className="relative p-8 pb-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h1 className="text-2xl font-bold text-white">AVATAR</h1>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Добро пожаловать' : 'Создай аккаунт'}
            </h2>
            <p className="text-slate-400 text-sm">
              {isLogin ? 'Введи свои учетные данные' : 'Присоединись к нам за несколько кликов'}
            </p>
          </div>

          {/* Tabs */}
          <div className="px-8 pt-6 pb-2">
            <div className="flex gap-4 border-b border-slate-700">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
                className={`pb-3 font-bold text-base transition-all relative ${
                  isLogin ? 'text-orange-400' : 'text-slate-400'
                }`}
              >
                Вход
                {isLogin && <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t"></div>}
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                className={`pb-3 font-bold text-base transition-all relative ${
                  !isLogin ? 'text-orange-400' : 'text-slate-400'
                }`}
              >
                Регистрация
                {!isLogin && <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t"></div>}
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative px-8 pb-8 space-y-4">
            {/* Error */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-xs font-medium">
                ⚠ {error}
              </div>
            )}

            {/* Name */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                  Полное имя
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Петров"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm"
                    required={!isLogin}
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-10 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-orange-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-slate-500 mt-1">Минимум 6 символов</p>
              )}
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                  Подтвердить пароль
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-10 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all text-sm"
                    required={!isLogin}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-orange-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 text-sm uppercase tracking-wider"
            >
              {loading ? '⚡ Загрузка...' : (isLogin ? 'Войти' : 'Создать аккаунт')}
            </button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-500">ИЛИ</span>
              </div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800/50 border border-slate-700/50 hover:border-orange-500/30 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
          </form>
        </div>
      </div>

      {/* 2FA Verification Modal */}
      <AdminVerificationModal
        isOpen={is2FAOpen}
        onClose={() => {
          setIs2FAOpen(false);
          setPendingUserId('');
          onClose();
        }}
        userId={pendingUserId}
        onVerifySuccess={(data) => {
          setIs2FAOpen(false);
          setPendingUserId('');
        }}
      />
    </>
  );
}
