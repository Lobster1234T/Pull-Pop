'use client';

import { ReactNode } from 'react';

interface NeoButttonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function NeoButton({
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  children,
  disabled = false,
  onClick,
  type = 'button',
}: NeoButttonProps) {
  const baseStyles =
    'font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 hover:-translate-y-1',
    secondary:
      'border-2 border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/30',
    ghost:
      'text-cyan-300 hover:bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500/50',
    accent:
      'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:shadow-lg hover:shadow-pink-500/50 hover:-translate-y-1',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 opacity-0 group-hover:opacity-100" />

      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        {icon}
        {children}
      </span>
    </button>
  );
}
