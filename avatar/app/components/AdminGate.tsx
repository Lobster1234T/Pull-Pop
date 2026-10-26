'use client';

import { ReactNode, useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface AdminGateProps {
  children: ReactNode;
  requiredPermission?: string;
  fallback?: ReactNode;
}

export default function AdminGate({
  children,
  requiredPermission = 'manage_products',
  fallback,
}: AdminGateProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    checkAccess();
  }, [requiredPermission]);

  const checkAccess = async () => {
    try {
      const response = await fetch('/api/auth/me');

      if (!response.ok) {
        setHasAccess(false);
        return;
      }

      const data = await response.json();
      // Проверить, есть ли нужное разрешение у пользователя
      const hasPermission = data.user.permissions?.includes(requiredPermission) || data.user.isAdmin;
      setHasAccess(hasPermission);
    } catch (error) {
      setHasAccess(false);
    }
  };

  if (hasAccess === null) {
    return <div className="text-center py-8">Проверка доступа...</div>;
  }

  if (!hasAccess) {
    return (
      fallback || (
        <div className="flex items-center gap-4 p-6 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
          <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={24} />
          <div>
            <h3 className="font-bold text-yellow-900 dark:text-yellow-300">
              Доступ запрещен
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              У вас нет прав для доступа к этому разделу.
            </p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
