import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  isAdmin: boolean;
}

export interface AuthPayload {
  user: AuthUser;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function verifyAuth(request: NextRequest): Promise<AuthPayload | null> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      // Проверить cookie
      const token = request.cookies.get('authToken')?.value;
      if (!token) {
        return null;
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return {
        user: {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          isAdmin: decoded.isAdmin || false,
        },
      };
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    return {
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        isAdmin: decoded.isAdmin || false,
      },
    };
  } catch (error) {
    return null;
  }
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 10);
}

export async function comparePasswords(
  password: string,
  hash: string
): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}
