'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export default function GlobalErrorBoundary({ children }: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      setError(event.error);
      setIsVisible(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      setError(new Error(String(event.reason)));
      setIsVisible(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <>
      {children}

      {/* Error Notification */}
      {isVisible && error && (
        <div className="fixed bottom-6 right-6 max-w-md bg-red-900/80 border border-red-500 rounded-lg p-4 shadow-2xl z-50 backdrop-blur">
          <div className="flex gap-4">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-white mb-1">Ошибка приложения</h3>
              <p className="text-red-100 text-sm">{error.message}</p>
              {process.env.NODE_ENV === 'development' && (
                <pre className="mt-2 text-xs text-red-200 bg-black/30 p-2 rounded overflow-auto max-h-40">
                  {error.stack}
                </pre>
              )}
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-red-400 hover:text-red-300 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
