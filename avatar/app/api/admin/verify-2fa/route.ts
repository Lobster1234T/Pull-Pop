import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { generateToken } from '@/app/lib/auth';

/**
 * POST /api/admin/verify-2fa
 * Step 2: Verify the code sent to Telegram and return auth token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, code } = body;

    if (!userId || !code) {
      return NextResponse.json(
        { error: 'userId и код обязательны' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user?.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    // Find valid verification code
    const verificationCode = await prisma.adminVerificationCode.findFirst({
      where: {
        userId,
        code,
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verificationCode) {
      return NextResponse.json(
        { error: 'Неверный или истекший код' },
        { status: 401 }
      );
    }

    // Mark code as used
    await prisma.adminVerificationCode.update({
      where: { id: verificationCode.id },
      data: {
        isUsed: true,
        usedAt: new Date(),
      },
    });

    // Generate auth token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name || user.email,
      isAdmin: user.isAdmin || user.role === 'admin',
    });

    const response = NextResponse.json({
      message: 'Вход успешен',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin || user.role === 'admin',
      },
      token,
    });

    // Set auth cookie
    response.cookies.set('authToken', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Ошибка верификации:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
