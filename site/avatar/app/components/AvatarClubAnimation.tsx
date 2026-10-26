'use client';

import { useEffect, useRef } from 'react';

interface AvatarClubAnimationProps {
  text?: string;
  subtitle?: string;
  colorA?: string;
  colorB?: string;
  font?: string;
  speed?: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'avatar-club-animation': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        text?: string;
        subtitle?: string;
        'color-a'?: string;
        'color-b'?: string;
        font?: string;
        speed?: string;
      };
    }
  }
}

export default function AvatarClubAnimation({
  text = 'AVATAR',
  subtitle = 'КОМПЬЮТЕРНЫЙ КЛУБ',
  colorA = '#8a5cff',
  colorB = '#19e3ff',
  font = 'Unbounded, "Arial Black", sans-serif',
  speed = 1,
}: AvatarClubAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Подключаем скрипт веб-компонента
    const script = document.createElement('script');
    script.src = '/avatar-animation.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <avatar-club-animation
        text={text}
        subtitle={subtitle}
        color-a={colorA}
        color-b={colorB}
        font={font}
        speed={speed.toString()}
      />
    </div>
  );
}
