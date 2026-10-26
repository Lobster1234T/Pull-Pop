import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

/**
 * DEBUG ENDPOINT: Get latest verification code (for testing only)
 * Remove this in production!
 */
export async function GET(request: NextRequest) {
  try {
    const latestCode = await prisma.adminVerificationCode.findFirst({
      where: {
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!latestCode) {
      return NextResponse.json(
        { error: 'No active verification code found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      code: latestCode.code,
      userId: latestCode.userId,
      email: latestCode.user.email,
      expiresAt: latestCode.expiresAt,
      createdAt: latestCode.createdAt,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to get code' },
      { status: 500 }
    );
  }
}
