'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader, CheckCircle } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (file: File) => Promise<string>;
  onRemove?: () => void;
  currentImage?: string;
  label?: string;
  accept?: string;
  maxSize?: number; // в МБ
}

export default function ImageUploader({
  onUpload,
  onRemove,
  currentImage,
  label = 'Загрузить изображение',
  accept = 'image/jpeg,image/png,image/webp',
  maxSize = 5, // 5 МБ
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Проверяем размер
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      return `Размер файла не должен превышать ${maxSize} МБ`;
    }

    // Проверяем тип
    const validTypes = accept.split(',').map((t) => t.trim());
    if (!validTypes.includes(file.type)) {
      return 'Поддерживаются только JPEG, PNG и WebP';
    }

    return null;
  };

  const handleFile = async (file: File) => {
    setError(null);
    setSuccess(false);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setProgress(0);

    try {
      // Имитируем прогресс загрузки
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 30;
        });
      }, 200);

      // Загружаем файл
      const result = await onUpload(file);

      clearInterval(progressInterval);
      setProgress(100);
      setSuccess(true);

      // Очищаем форму
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="w-full">
      {/* Current image preview */}
      {currentImage && (
        <div className="mb-4 relative">
          <img
            src={currentImage}
            alt="Current"
            className="w-full h-32 object-cover rounded-lg border border-cyan-500/30"
          />
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Upload area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/10'
            : 'border-cyan-500/30 hover:border-cyan-500/50 bg-slate-800/30 hover:bg-slate-800/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFile(e.target.files[0]);
            }
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {isLoading ? (
          <div className="space-y-3">
            <Loader className="w-8 h-8 mx-auto animate-spin text-cyan-400" />
            <div className="space-y-1">
              <p className="text-slate-300 font-semibold">Загрузка...</p>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-slate-400 text-xs">{Math.round(progress)}%</p>
            </div>
          </div>
        ) : success ? (
          <div className="space-y-2">
            <CheckCircle className="w-8 h-8 mx-auto text-green-400" />
            <p className="text-green-400 font-semibold">Загружено успешно!</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 mx-auto text-cyan-400" />
            <div>
              <p className="text-slate-200 font-semibold">{label}</p>
              <p className="text-slate-400 text-sm">Или перетащите файл сюда</p>
            </div>
            <p className="text-slate-500 text-xs">
              JPEG, PNG, WebP • До {maxSize} МБ
            </p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm flex items-start gap-2">
          <span className="text-lg">⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
