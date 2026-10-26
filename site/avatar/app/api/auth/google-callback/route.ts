import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      );
    }

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`;

    // Обмен кода на токены
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId || '',
        client_secret: clientSecret || '',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    const tokens = await tokenResponse.json();

    // Получаем информацию о пользователе
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user info');
    }

    const googleUserInfo = await userResponse.json();

    // Проверяем существует ли пользователь
    let user = await prisma.user.findUnique({
      where: { email: googleUserInfo.email },
      include: {
        profile: true,
      },
    });

    // Если пользователя нет, создаём его
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: googleUserInfo.email,
          passwordHash: '', // Google OAuth, пароль не требуется
          status: 'active',
          emailVerified: true,
          profile: {
            create: {
              firstName: googleUserInfo.given_name,
              lastName: googleUserInfo.family_name,
              displayName: googleUserInfo.name,
            },
          },
          customer: {
            create: {
              customerNumber: `CUST-${Date.now()}`,
              status: 'active',
            },
          },
        },
        include: {
          profile: true,
        },
      });
    }

    // Проверяем статус пользователя
    if (user.status === 'blocked' || user.status === 'suspended') {
      return NextResponse.json(
        { error: `User account is ${user.status}` },
        { status: 403 }
      );
    }

    // Создаём JWT токен
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Обновляем lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Сохраняем сессию в БД
    await prisma.userSession.create({
      data: {
        userId: user.id,
        token: jwtToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.profile?.displayName || googleUserInfo.name,
        picture: googleUserInfo.picture,
      },
    });
  } catch (error) {
    console.error('Google callback error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
