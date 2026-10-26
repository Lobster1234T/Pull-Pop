'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  onUploadSuccess?: (url: string, publicId: string) => void;
  onError?: (error: string) => void;
  maxSize?: number; // в MB
  preview?: boolean;
}

export default function ImageUpload({
  onUploadSuccess,
  onError,
  maxSize = 5,
  preview = true,
}: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setIsLoading(true);

    // Валидация
    if (!file.type.startsWith('image/')) {
      setError('Только изображения допускаются');
      setIsLoading(false);
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`Размер файла не должен превышать ${maxSize}MB`);
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Ошибка загрузки');
      }

      const data = await response.json();
      setUploadedImage(data);
      onUploadSuccess?.(data.url, data.publicId);
    } catch (err: any) {
      const errorMsg = err.message || 'Ошибка загрузки';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files[0]) {
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        input.files = dataTransfer.files;

        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isLoading}
          className="hidden"
        />

        {isLoading ? (
          <>
            <Loader size={48} className="mx-auto mb-4 text-cyan-500 animate-spin" />
            <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
          </>
        ) : uploadedImage ? (
          <>
            <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
            <p className="font-semibold text-gray-900 dark:text-white">
              Файл загружен успешно
            </p>
          </>
        ) : (
          <>
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="font-semibold text-gray-900 dark:text-white mb-2">
              Перетащите изображение или нажмите
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Максимальный размер: {maxSize}MB
            </p>
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError('')}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Preview */}
      {preview && uploadedImage && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <Image
            src={uploadedImage.url}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            onClick={() => setUploadedImage(null)}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Image Info */}
      {uploadedImage && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Разрешение:</span>
            <span className="font-mono text-gray-900 dark:text-white">
              {uploadedImage.width} x {uploadedImage.height}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Размер:</span>
            <span className="font-mono text-gray-900 dark:text-white">
              {(uploadedImage.size / 1024).toFixed(2)} KB
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">URL:</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(uploadedImage.url);
              }}
              className="font-mono text-cyan-600 dark:text-cyan-400 hover:underline truncate max-w-xs"
            >
              Скопировать
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
