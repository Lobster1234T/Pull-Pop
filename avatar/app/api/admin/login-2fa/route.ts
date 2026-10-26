import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { comparePasswords } from '@/app/lib/auth';
import { sendTelegramNotification } from '@/app/lib/telegram';

/**
 * Generate a random 6-digit code
 */
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * POST /api/admin/login-2fa
 * Step 1: Verify credentials and send 2FA code to Telegram
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user?.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const isAdmin = user.isAdmin || user.role === 'admin';
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Только администраторы могут использовать 2FA вход' },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePasswords(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    // Generate verification code
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save code to database
    await prisma.adminVerificationCode.create({
      data: {
        userId: user.id,
        code,
        expiresAt,
      },
    });

    // Send code via Telegram
    const telegramSent = await sendTelegramNotification({
      type: 'info',
      title: 'Код входа в админ-панель',
      message: `Код: <b>${code}</b>`,
      details: {
        user: user.email,
        valid_for: '5 минут',
        timestamp: new Date().toLocaleString('ru-RU'),
      },
    });

    if (!telegramSent) {
      return NextResponse.json(
        { error: 'Не удалось отправить код в Telegram' },
        { status: 500 }
      );
    }

    // Return user info without token (2FA pending)
    return NextResponse.json({
      message: 'Код отправлен в Telegram',
      userId: user.id,
      email: user.email,
      requiresVerification: true,
    });
  } catch (error) {
    console.error('Ошибка входа:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
