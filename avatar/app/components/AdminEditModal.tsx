'use client';

import { useState, useEffect } from 'react';
import { X, Save, Loader } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { uploadToCloudinary } from '@/app/lib/cloudinary';

interface Field {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'date' | 'textarea' | 'select' | 'image';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: (value: any) => string | null;
}

interface AdminEditModalProps {
  isOpen: boolean;
  title: string;
  fields: Field[];
  initialData?: any;
  loading?: boolean;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
}

export default function AdminEditModal({
  isOpen,
  title,
  fields,
  initialData,
  loading = false,
  onSave,
  onClose,
}: AdminEditModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const newData: any = {};
      fields.forEach((field) => {
        newData[field.key] = field.type === 'number' ? 0 : '';
      });
      setFormData(newData);
    }
    setErrors({});
  }, [initialData, isOpen, fields]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
    // Очищаем ошибку при изменении поля
    setErrors((prev) => ({
      ...prev,
      [key]: '',
    }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      const result = await uploadToCloudinary(file);
      handleChange('image', result.secure_url);
      return result.secure_url;
    } catch (error) {
      throw new Error('Ошибка загрузки изображения');
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.key];

      if (field.required && !value) {
        newErrors[field.key] = `${field.label} обязательно`;
      }

      if (field.validation && value) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.key] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      const err = error as any;
      setErrors({
        submit: err.message || 'Ошибка при сохранении',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-cyan-500/20 bg-slate-900/95 backdrop-blur">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="text-slate-400 hover:text-white disabled:opacity-50 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.key} className={field.type === 'textarea' || field.type === 'image' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-400 ml-1">*</span>}
                </label>

                {field.type === 'image' ? (
                  <ImageUploader
                    currentImage={formData[field.key]}
                    onUpload={handleImageUpload}
                    onRemove={() => handleChange(field.key, '')}
                    label={field.label}
                  />
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition"
                    placeholder={field.label}
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500/60 transition"
                  >
                    <option value="">Выберите...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition"
                    placeholder={field.label}
                  />
                )}

                {errors[field.key] && (
                  <p className="text-red-400 text-xs mt-1">{errors[field.key]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Сохранение...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Сохранить
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 px-6 py-3 bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 text-slate-300 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
