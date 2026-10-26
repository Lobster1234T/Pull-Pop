'use client';

import { Language, supportedLanguages, defaultLanguage } from './config';

const LANGUAGE_COOKIE_NAME = 'AVATAR_LANGUAGE';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

export function getLanguageCookie(): Language {
  if (typeof document === 'undefined') return defaultLanguage;
  
  const name = LANGUAGE_COOKIE_NAME + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      const value = cookie.substring(name.length);
      if (supportedLanguages.includes(value as Language)) {
        return value as Language;
      }
    }
  }
  
  return defaultLanguage;
}

export function setLanguageCookie(language: Language): void {
  if (typeof document === 'undefined') return;
  
  const date = new Date();
  date.setTime(date.getTime() + COOKIE_MAX_AGE * 1000);
  const expires = 'expires=' + date.toUTCString();
  
  document.cookie = `${LANGUAGE_COOKIE_NAME}=${language};${expires};path=/`;
}
