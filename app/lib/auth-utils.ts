import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-jwt-secret'
);

export interface UserPayload {
  userId: string;
  email: string;
  role?: string;
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    return verified.payload as any;
  } catch (err) {
    return null;
  }
}

export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

export async function checkAuth(request: NextRequest) {
  const token = extractTokenFromRequest(request);
  
  if (!token) {
    return {
      authenticated: false,
      user: null,
      error: 'No token provided',
    };
  }

  const user = await verifyToken(token);
  
  if (!user) {
    return {
      authenticated: false,
      user: null,
      error: 'Invalid token',
    };
  }

  return {
    authenticated: true,
    user,
    error: null,
  };
}

export function createErrorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function withAdminCheck(
  request: NextRequest,
  handler: (user: UserPayload) => Promise<NextResponse>
) {
  const auth = await checkAuth(request);
  
  if (!auth.authenticated) {
    return createErrorResponse('Unauthorized', 401);
  }

  // Проверяем, есть ли админский email
  const isAdmin = auth.user?.email === process.env.ADMIN_EMAIL;
  
  if (!isAdmin) {
    return createErrorResponse('Forbidden', 403);
  }

  return handler(auth.user!);
}
