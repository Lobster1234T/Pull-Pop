'use client';

import { useEffect, useState } from 'react';
import { VIEWPORT_TESTS, RESPONSIVE_CHECKLIST } from '@/app/lib/responsive-utils';

/**
 * Компонент для тестирования адаптивности
 * Доступен в development режиме через URL: /responsive-test
 * НЕ ВКЛЮЧАТЬ В PRODUCTION!
 */
export default function ResponsiveTest() {
  const [selectedViewport, setSelectedViewport] = useState(VIEWPORT_TESTS[0]);
  const [isVisible, setIsVisible] = useState(false);

  // Показываем только в development
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-slate-900 border-2 border-primary rounded-lg p-4 shadow-2xl max-w-sm">
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-primary/20">
        <h3 className="text-sm font-bold text-primary mb-2">📱 Responsive Test</h3>
        <p className="text-xs text-slate-400">
          Текущий viewport: <span className="text-accent">{selectedViewport.name}</span> ({selectedViewport.width}x
          {selectedViewport.height})
        </p>
      </div>

      {/* Viewport Selector */}
      <div className="mb-4 pb-4 border-b border-primary/20">
        <label className="text-xs font-semibold text-slate-300 block mb-2">Выберите viewport:</label>
        <select
          value={VIEWPORT_TESTS.indexOf(selectedViewport)}
          onChange={(e) => setSelectedViewport(VIEWPORT_TESTS[parseInt(e.target.value)])}
          className="w-full px-2 py-1 text-xs bg-slate-800 border border-primary/30 rounded text-slate-200"
        >
          {VIEWPORT_TESTS.map((vp, idx) => (
            <option key={idx} value={idx}>
              {vp.name} ({vp.width}x{vp.height})
            </option>
          ))}
        </select>
      </div>

      {/* Current Dimensions */}
      <div className="mb-4 pb-4 border-b border-primary/20">
        <div className="text-xs text-slate-400 space-y-1">
          <div>
            Width: <span className="text-accent font-mono">{selectedViewport.width}px</span>
          </div>
          <div>
            Height: <span className="text-accent font-mono">{selectedViewport.height}px</span>
          </div>
          <div>
            Ratio: <span className="text-accent font-mono">{(selectedViewport.width / selectedViewport.height).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Quick Checks */}
      <div className="text-xs text-slate-300 space-y-2">
        <div className="font-semibold text-primary mb-2">Быстрая проверка:</div>

        {/* Mobile checks */}
        {selectedViewport.width < 768 && (
          <div className="bg-primary/10 border border-primary/30 rounded p-2 text-xs space-y-1">
            <div className="font-semibold text-primary">📱 Mobile</div>
            <div className="text-slate-300">
              ✓ Hamburger меню видна
            </div>
            <div className="text-slate-300">
              ✓ Однаколоночный layout
            </div>
            <div className="text-slate-300">
              ✓ Padding 16px
            </div>
            <div className="text-slate-300">
              ✓ Сенсорные элементы ≥44x44px
            </div>
          </div>
        )}

        {/* Tablet checks */}
        {selectedViewport.width >= 768 && selectedViewport.width < 1024 && (
          <div className="bg-accent/10 border border-accent/30 rounded p-2 text-xs space-y-1">
            <div className="font-semibold text-accent">📱 Tablet</div>
            <div className="text-slate-300">
              ✓ Двухколоночный grid
            </div>
            <div className="text-slate-300">
              ✓ Desktop меню может отображаться
            </div>
            <div className="text-slate-300">
              ✓ Padding 24px
            </div>
            <div className="text-slate-300">
              ✓ max-width 600-800px
            </div>
          </div>
        )}

        {/* Desktop checks */}
        {selectedViewport.width >= 1024 && (
          <div className="bg-success/10 border border-success/30 rounded p-2 text-xs space-y-1">
            <div className="font-semibold text-success">🖥️ Desktop</div>
            <div className="text-slate-300">
              ✓ Полное горизонтальное меню
            </div>
            <div className="text-slate-300">
              ✓ Трёх/четырёхколоночный grid
            </div>
            <div className="text-slate-300">
              ✓ Padding 32px+
            </div>
            <div className="text-slate-300">
              ✓ max-width 1200px
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 pt-4 border-t border-primary/20 text-xs text-slate-500">
        <p>💡 Совет: Используйте DevTools для эмуляции viewport размеров</p>
      </div>
    </div>
  );
}
