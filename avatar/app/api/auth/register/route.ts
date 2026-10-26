import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { hashPassword, generateToken } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Валидация
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Заполните все поля' },
        { status: 400 }
      );
    }

    // Проверить, существует ли пользователь
    const existingUser = await prisma.user?.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с этим email уже существует' },
        { status: 400 }
      );
    }

    // Хешировать пароль
    const hashedPassword = await hashPassword(password);

    // Создать пользователя
    const user = await prisma.user?.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
      },
    });

    // Генерировать токен
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: false,
    });

    const response = NextResponse.json(
      {
        message: 'Регистрация успешна',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      },
      { status: 201 }
    );

    // Установить cookie с токеном
    response.cookies.set('authToken', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 дней
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
