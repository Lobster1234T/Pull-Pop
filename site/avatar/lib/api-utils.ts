import { NextResponse } from 'next/server';

/**
 * Интерфейс для пагинации
 */
export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

/**
 * Получить параметры пагинации из URL query
 */
export function getPaginationParams(searchParams: URLSearchParams): PaginationParams {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

/**
 * Интерфейс для ответа со списком
 */
export interface ListResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

/**
 * Создать ответ со списком
 */
export function createListResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): ListResponse<T> {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
}

/**
 * Успешный ответ
 */
export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}

/**
 * Ошибочный ответ
 */
export function errorResponse(message: string, status: number = 400, details?: any) {
  return NextResponse.json(
    {
      error: message,
      ...(details && { details }),
    },
    { status }
  );
}

/**
 * Обработать ошибку БД
 */
export function handleDatabaseError(error: any): NextResponse {
  console.error('Database error:', error);

  if (error.code === 'P2002') {
    return errorResponse('Duplicate entry', 409);
  }
  if (error.code === 'P2025') {
    return errorResponse('Record not found', 404);
  }
  if (error.code === 'P2003') {
    return errorResponse('Invalid reference', 400);
  }

  return errorResponse('Internal server error', 500);
}

/**
 * Безопасно закрыть Prisma соединение
 */
export async function closePrismaConnection(prisma: any) {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error disconnecting Prisma:', error);
  }
}

/**
 * Валидировать обязательные поля
 */
export function validateRequiredFields(data: any, fields: string[]): string | null {
  for (const field of fields) {
    if (!data[field]) {
      return `${field} is required`;
    }
  }
  return null;
}

/**
 * Валидировать email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Парсить фильтры из query params
 */
export function parseFilters(searchParams: URLSearchParams): Record<string, any> {
  const filters: Record<string, any> = {};

  searchParams.forEach((value, key) => {
    if (!['page', 'limit', 'sortBy', 'sortOrder'].includes(key)) {
      // Пытаемся парсить как JSON или число
      try {
        filters[key] = JSON.parse(value);
      } catch {
        filters[key] = value;
      }
    }
  });

  return filters;
}

/**
 * Парсить сортировку из query params
 */
export function parseSorting(searchParams: URLSearchParams) {
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = (searchParams.get('sortOrder') || 'desc').toLowerCase();

  if (!['asc', 'desc'].includes(sortOrder)) {
    return { sortBy: 'createdAt', sortOrder: 'desc' };
  }

  return { sortBy, sortOrder: sortOrder as 'asc' | 'desc' };
}
