'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSkeleton } from './index';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'user';
}

export default function ProtectedRoute({
  children,
  requiredRole = 'user',
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');

        if (!response.ok) {
          router.push('/login');
          return;
        }

        const data = await response.json();

        // Проверить роль если требуется
        if (requiredRole === 'admin' && !data.user.isAdmin) {
          router.push('/');
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  if (isAuthorized === null) {
    return <LoadingSkeleton height={400} />;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
