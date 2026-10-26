// Хранилище кодов верификации (в продакшене переместить в БД)
export interface CodeData {
  code: string;
  expiresAt: number;
  attempts: number;
}

export const codesStorage = new Map<string, CodeData>();

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeCode(email: string, code: string, expirationMinutes = 5): void {
  codesStorage.set(email, {
    code,
    expiresAt: Date.now() + expirationMinutes * 60 * 1000,
    attempts: 0,
  });
}

export function getCode(email: string): CodeData | undefined {
  return codesStorage.get(email);
}

export function deleteCode(email: string): void {
  codesStorage.delete(email);
}

export function incrementAttempts(email: string): boolean {
  const data = codesStorage.get(email);
  if (!data) return false;
  data.attempts++;
  return true;
}

export function isCodeExpired(email: string): boolean {
  const data = codesStorage.get(email);
  if (!data) return true;
  return Date.now() > data.expiresAt;
}
