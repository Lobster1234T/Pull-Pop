import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json(
    { message: 'Вы вышли из системы' },
    { status: 200 }
  );

  // Удалить cookie с токеном
  response.cookies.set('authToken', '', {
    maxAge: 0,
    path: '/',
  });

  return response;
}
