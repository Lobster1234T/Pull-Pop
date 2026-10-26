'use client';

import { useI18n } from '@/app/lib/i18n';
import { ChevronDown, LogOut, User as UserIcon, Menu, X, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import FinikPaymentModal from './FinikPaymentModal';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  id: string;
  email: string;
  name: string;
}

export default function Header() {
  const { t, language, setLanguage } = useI18n();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFinikModalOpen, setIsFinikModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        setUser(JSON.parse(userJson));
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        try {
          setUser(JSON.parse(updatedUser));
        } catch (e) {
          console.error('Error parsing user:', e);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    window.location.reload();
  };

  // Оптимизированное меню: только 6 основных пунктов
  const navLinks = [
    { href: '/', label: 'Главная' },
    { href: '/zones', label: 'Зоны' },
    { href: '/tariffs', label: 'Тарифы' },
    { href: '/tournaments', label: 'Турниры' },
    { href: '/news', label: 'Новости' },
    { href: '/booking', label: 'Бронирование' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass-dark border-b border-primary/20" style={{ transitionDuration: 'var(--transition-normal)' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo with improved styling and spacing */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
              <Image 
                src="/logo.svg" 
                alt="AVATAR" 
                width={40} 
                height={40}
                className="w-10 h-10"
              />
            </div>
            <div className="text-2xl font-bold gradient-text whitespace-nowrap hidden sm:block">AVATAR</div>
          </Link>
          
          {/* Desktop Navigation - centered with proper spacing */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-slate-300 hover:text-cyan-300 transition-colors text-sm font-medium group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right side controls - language, auth, payment */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Selector with Flags */}
            <div className="flex items-center gap-2 bg-slate-800/30 hover:bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg p-1 transition-all">
              {['kg', 'ru', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as any)}
                  title={lang.toUpperCase()}
                  className={`px-2.5 py-1.5 rounded text-xs font-bold transition-all ${
                    language === lang
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Finik Pay Button */}
            {user && (
              <button
                onClick={() => setIsFinikModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 border border-green-500/50 hover:border-green-500/70 rounded-lg font-semibold transition-all text-sm text-green-300 hover:text-green-200"
              >
                <CreditCard className="w-4 h-4" />
                Оплатить
              </button>
            )}

            {/* Auth Buttons */}
            {!user && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 border border-cyan-500 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/10 hover:text-cyan-200 transition-all text-sm"
                  suppressHydrationWarning
                >
                  {mounted ? (t('auth.login') || 'Вход') : 'Вход'}
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-sm"
                  suppressHydrationWarning
                >
                  {mounted ? (t('auth.register') || 'Регистрация') : 'Регистрация'}
                </button>
              </div>
            )}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 hover:bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-all"
                >
                  <UserIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-slate-300">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 glass border border-cyan-500/30 rounded-lg shadow-lg overflow-hidden z-50 min-w-56">
                    <div className="px-4 py-3 border-b border-cyan-500/20 bg-cyan-500/5">
                      <div className="text-sm font-medium text-cyan-400">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-cyan-500/10 transition-all text-slate-300 hover:text-cyan-300">
                      Мой профиль
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm hover:bg-red-500/10 transition-all text-slate-300 hover:text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      Выход
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-cyan-500/10 rounded-lg transition-colors border border-cyan-500/20"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-cyan-400" />
            ) : (
              <Menu className="w-6 h-6 text-cyan-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-cyan-500/20 glass py-4 px-4">
            <div className="space-y-2 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-cyan-500/10 rounded-lg transition-colors text-slate-300 hover:text-cyan-300 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-cyan-500/20 pt-3 space-y-3">
              {/* Language Selector Mobile - only abbreviations */}
              <div className="px-4 py-2">
                <p className="text-xs text-cyan-400/70 mb-2 font-semibold">ЯЗЫК:</p>
                <div className="flex gap-2 flex-wrap">
                  {['kg', 'ru', 'en'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang as any);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                        language === lang
                          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                          : 'bg-slate-800 hover:bg-cyan-500/20 text-slate-400 hover:text-slate-300 border border-cyan-500/30'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auth Mobile */}
              {!user && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 px-4 py-2 border border-cyan-500 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all text-sm"
                    suppressHydrationWarning
                  >
                    {mounted ? (t('auth.login') || 'Вход') : 'Вход'}
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-sm"
                    suppressHydrationWarning
                  >
                    {mounted ? (t('auth.register') || 'Регистрация') : 'Регистрация'}
                  </button>
                </div>
              )}
              {user && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setIsFinikModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/50 rounded-lg font-semibold text-green-300 hover:bg-green-500/30 transition-all"
                  >
                    <CreditCard className="w-4 h-4" />
                    Оплатить
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg font-semibold text-red-300 hover:bg-red-500/30 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Выход
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
      
      {/* Finik Payment Modal */}
      {user && (
        <FinikPaymentModal 
          isOpen={isFinikModalOpen} 
          onClose={() => setIsFinikModalOpen(false)} 
          userId={user.id}
        />
      )}
    </>
  );
}
