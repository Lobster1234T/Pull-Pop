import { NextRequest, NextResponse } from 'next/server';

const LANGUAGE_COOKIE_NAME = 'AVATAR_LANGUAGE';
const SUPPORTED_LANGUAGES = ['ru', 'en', 'kg'];
const DEFAULT_LANGUAGE = 'ru';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Получить текущий язык из cookies
  const languageCookie = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value;
  
  // Если нет cookies или невалидный язык, установить дефолтный
  if (!languageCookie || !SUPPORTED_LANGUAGES.includes(languageCookie)) {
    response.cookies.set(LANGUAGE_COOKIE_NAME, DEFAULT_LANGUAGE, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    });
  }
  
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
