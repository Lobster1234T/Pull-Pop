'use client';

import { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TableSkeleton } from '@/app/components/Skeletons';

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'date' | 'select';
  editable?: boolean;
  options?: Array<{ value: string; label: string }>;
}

interface AdminTableProps {
  title: string;
  columns: Column[];
  data: any[];
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
  total?: number;
  currentPage?: number;
  apiEndpoint?: string;
  onDataChange?: (data: any[]) => void;
}

export default function AdminTable({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  loading = false,
  total = 0,
  currentPage = 1,
  apiEndpoint,
  onDataChange,
}: AdminTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDesc, setSortDesc] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDesc(!sortDesc);
    } else {
      setSortKey(key);
      setSortDesc(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);

  if (loading) {
    return <TableSkeleton rows={5} columns={columns.length} />;
  }

  return (
    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Добавить
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/20 bg-slate-900/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-cyan-300 cursor-pointer hover:bg-slate-800/50 transition"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortKey === col.key && (
                      sortDesc ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">Действия</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-8 text-center">
                  <p className="text-slate-400">Нет данных для отображения</p>
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={item.id || idx} className="border-b border-cyan-500/10 hover:bg-slate-800/30 transition">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-slate-300 text-sm">
                      {col.type === 'date'
                        ? new Date(item[col.key]).toLocaleDateString('ru-RU')
                        : item[col.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-sm flex items-center gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded transition text-xs"
                      >
                        <Edit2 className="w-3 h-3" />
                        Изменить
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => {
                          if (confirm('Вы уверены?')) {
                            onDelete(item.id);
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded transition text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                        Удалить
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-cyan-500/20">
          <p className="text-slate-400 text-sm">
            Показано {data.length} из {total} элементов
          </p>
          <div className="flex gap-2 items-center">
            <button
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition text-sm"
            >
              ← Назад
            </button>
            <span className="px-4 py-1 bg-slate-800 text-slate-300 rounded text-sm">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition text-sm"
            >
              Далее →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
