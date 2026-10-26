'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  animation?: 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'scale-in' | 'fadeIn';
  delay?: number; // в миллисекундах
  duration?: number; // в миллисекундах
  className?: string;
  triggerOnce?: boolean; // Триггер только один раз при скролле
}

/**
 * Компонент для анимирования элементов с поддержкой prefers-reduced-motion
 * Поддерживает:
 * - Различные типы анимаций
 * - Задержку анимации
 * - Пользовательскую длительность
 * - Триггер при скролле (Intersection Observer)
 * - Отключение анимаций для пользователей с prefers-reduced-motion
 */
export default function AnimatedElement({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 600,
  className = '',
  triggerOnce = false,
}: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!triggerOnce);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Проверяем prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer для триггера при скролле
  useEffect(() => {
    if (!triggerOnce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [triggerOnce]);

  const animationClass = prefersReducedMotion ? '' : `animate-${animation}`;
  const style = prefersReducedMotion
    ? {}
    : {
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        opacity: triggerOnce && !isVisible ? 0 : 1,
      };

  return (
    <div
      ref={ref}
      className={`${animationClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
