import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

/**
 * Получить токен из заголовка Authorization
 */
export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Проверить и декодировать JWT токен
 */
export function verifyToken(token: string): any {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-jwt-secret'
    );
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Получить текущего пользователя из запроса
 */
export async function getCurrentUser(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded) return null;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        profile: true,
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        customer: true,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

/**
 * Проверить, имеет ли пользователь роль
 */
export async function userHasRole(userId: string, roleCode: string): Promise<boolean> {
  try {
    const userRole = await prisma.userRole.findFirst({
      where: {
        userId,
        role: {
          code: roleCode,
        },
      },
    });
    return !!userRole;
  } catch (error) {
    return false;
  }
}

/**
 * Проверить, имеет ли пользователь разрешение
 */
export async function userHasPermission(userId: string, permissionCode: string): Promise<boolean> {
  try {
    const userWithPermissions = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!userWithPermissions) return false;

    for (const userRole of userWithPermissions.roles) {
      for (const rolePermission of userRole.role.permissions) {
        if (rolePermission.permission.code === permissionCode) {
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Middleware для проверки аутентификации
 */
export async function requireAuth(request: NextRequest) {
  const user = await getCurrentUser(request);
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  return user;
}

/**
 * Middleware для проверки роли
 */
export async function requireRole(request: NextRequest, roleCode: string) {
  const user = await getCurrentUser(request);
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const hasRole = await userHasRole(user.id, roleCode);
  if (!hasRole) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  return user;
}

/**
 * Middleware для проверки разрешения
 */
export async function requirePermission(request: NextRequest, permissionCode: string) {
  const user = await getCurrentUser(request);
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const hasPermission = await userHasPermission(user.id, permissionCode);
  if (!hasPermission) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }

  return user;
}

export { prisma };
