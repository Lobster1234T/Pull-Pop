import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/app/lib/auth';

// POST /api/upload - загрузить изображение на Cloudinary
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);

    if (!auth) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Файл не найден' },
        { status: 400 }
      );
    }

    // Валидация файла
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Только изображения допускаются' },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Размер файла не должен превышать 5MB' },
        { status: 400 }
      );
    }

    // Загрузить на Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || 'avatar_preset');
    cloudinaryFormData.append('folder', 'avatar');

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    if (!cloudinaryResponse.ok) {
      throw new Error('Ошибка загрузки на Cloudinary');
    }

    const cloudinaryData = await cloudinaryResponse.json();

    return NextResponse.json(
      {
        success: true,
        url: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id,
        size: cloudinaryData.bytes,
        width: cloudinaryData.width,
        height: cloudinaryData.height,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    return NextResponse.json(
      { error: 'Ошибка загрузки файла' },
      { status: 500 }
    );
  }
}
