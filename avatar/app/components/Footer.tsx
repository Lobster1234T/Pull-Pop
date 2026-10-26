'use client';

'use client';

import { MapPin, Phone, Mail, Clock, Share2, Video, Share, Heart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FooterProps {
  branch?: {
    name: string;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    is_24_7: boolean;
  };
}

export default function Footer({ branch }: FooterProps) {
  const [currentYear, setCurrentYear] = useState<number>(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-950 border-t border-primary/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand column */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <h3 className="text-2xl font-black gradient-text mb-2">AVATAR</h3>
                <p className="text-slate-400 text-sm">Премиум игровой клуб в Бишкеке</p>
              </div>
              <div className="flex gap-3 mt-6">
                <a href="#" className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all hover:scale-110">
                  <Share2 className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger transition-all hover:scale-110">
                  <Video className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-all hover:scale-110">
                  <Heart className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-info/10 hover:bg-info/20 text-info transition-all hover:scale-110">
                  <Share className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation column */}
            <div className="md:col-span-1">
              <h4 className="font-bold text-white mb-4">Навигация</h4>
              <ul className="space-y-2">
                {['Главная', 'Зоны', 'Тарифы', 'Турниры', 'Новости', 'Бронирование'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-cyan-300 transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="md:col-span-1">
              <h4 className="font-bold text-white mb-4">Контакты</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-xs">Телефон</p>
                    <a href="tel:+996312500100" className="text-sm text-accent hover:text-accent-light">
                      +996 (312) 500-100
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-xs">WhatsApp</p>
                    <a href="https://wa.me/996555500100" target="_blank" rel="noopener noreferrer" className="text-sm text-success hover:text-success/80">
                      +996 555 500-100
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-xs">Email</p>
                    <a href="mailto:info@avatar-club.kg" className="text-sm text-warning hover:text-warning/80">
                      info@avatar-club.kg
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours column */}
            <div className="md:col-span-1">
              <h4 className="font-bold text-white mb-4">Режим работы</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-xs mb-2">Время</p>
                    {branch?.is_24_7 ? (
                      <p className="text-sm text-primary font-semibold">Работаем 24/7</p>
                    ) : (
                      <>
                        <p className="text-sm text-slate-300">Пн-Чт: 10:00 - 00:00</p>
                        <p className="text-sm text-slate-300">Пт-Сб: 10:00 - 02:00</p>
                        <p className="text-sm text-slate-300">Вс: 10:00 - 23:00</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address banner */}
          <div className="glass border border-primary/30 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white mb-2">Адрес</h4>
                <p className="text-slate-300">
                  {branch?.address || 'ул. Чуй, 123, Бишкек, Кыргызстан'}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-primary/20 pt-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Legal links */}
              <div>
                <h5 className="font-semibold text-white mb-3 text-sm">Правовая информация</h5>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                      Условия использования
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                      Политика конфиденциальности
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                      Публичная оферта
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Help links */}
              <div>
                <h5 className="font-semibold text-white mb-3 text-sm">Помощь</h5>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                      Поддержка
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                      Обратная связь
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Copyright */}
              <div className="md:text-right">
                <p className="text-slate-400 text-sm">
                  © {currentYear} AVATAR Gaming Club. Все права защищены.
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  Разработано с ❤️ для лучшего игрового опыта
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>
      </div>
    </footer>
  );
}
