// Cloudinary configuration and utilities
// В реальности используются переменные окружения для API key и т.д.

export interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
}

/**
 * Генерирует подписанный URL для загрузки на Cloudinary
 * В реальности это должно быть на сервере
 */
export async function getCloudinarySignature(): Promise<{
  timestamp: number;
  signature: string;
}> {
  // Это должно быть на сервере в реальном приложении
  // Здесь просто mock
  const timestamp = Math.floor(Date.now() / 1000);
  return {
    timestamp,
    signature: 'mock-signature',
  };
}

/**
 * Загружает изображение на Cloudinary
 */
export async function uploadToCloudinary(file: File): Promise<CloudinaryResponse> {
  // В реальности используем библиотеку cloudinary-core
  // или отправляем на наш сервер, который уже интегрирован с Cloudinary

  // Mock response
  return {
    public_id: `avatar/${Date.now()}`,
    secure_url: URL.createObjectURL(file),
    url: URL.createObjectURL(file),
    width: 800,
    height: 600,
    format: 'jpg',
  };
}

/**
 * Удаляет изображение с Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    // В реальности отправляем запрос на API delete
    // await fetch('/api/cloudinary/delete', { method: 'POST', body: JSON.stringify({ publicId }) })
    console.log('Deleting from Cloudinary:', publicId);
    return true;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
}

/**
 * Генерирует оптимизированный URL для изображения
 */
export function getOptimizedImageUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: 'auto' | 'low' | 'normal' | 'high';
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  }
): string {
  const baseUrl = 'https://res.cloudinary.com';
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';

  const params = new URLSearchParams();
  if (options?.width) params.append('w', options.width.toString());
  if (options?.height) params.append('h', options.height.toString());
  params.append('q', options?.quality || 'auto');
  params.append('f', options?.format || 'auto');

  const queryString = params.toString();
  return `${baseUrl}/${cloudName}/image/upload/${queryString}/${publicId}`;
}
