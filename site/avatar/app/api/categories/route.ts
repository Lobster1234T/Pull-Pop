import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  getCurrentUser,
  requirePermission,
  prisma,
} from '@/lib/auth';
import {
  getPaginationParams,
  createListResponse,
  errorResponse,
  handleDatabaseError,
  validateRequiredFields,
  parseSorting,
} from '@/lib/api-utils';

/**
 * GET /api/categories
 * Получить список категорий товаров
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const { page, limit, skip } = getPaginationParams(searchParams);
    const { sortBy, sortOrder } = parseSorting(searchParams);

    const status = searchParams.get('status') || 'active';

    const where: any = { status };

    // Получить категории
    const [categories, total] = await Promise.all([
      prisma.productCategory.findMany({
        where,
        include: {
          _count: {
            select: { products: true },
          },
        },
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.productCategory.count({ where }),
    ]);

    const response = createListResponse(categories, total, page, limit);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return handleDatabaseError(error);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * POST /api/categories
 * Создать новую категорию (только для админа)
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requirePermission(request, 'category.create');
    if (user instanceof NextResponse) {
      return user;
    }

    const body = await request.json();
    const { name, description, slug } = body;

    // Валидация
    const validation = validateRequiredFields(body, ['name', 'slug']);
    if (validation) {
      return errorResponse(validation);
    }

    // Проверить уникальность slug
    const existingCategory = await prisma.productCategory.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return errorResponse('Category with this slug already exists', 409);
    }

    // Создать категорию
    const category = await prisma.productCategory.create({
      data: {
        name,
        slug,
        description: description || undefined,
        status: 'active',
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return handleDatabaseError(error);
  } finally {
    await prisma.$disconnect();
  }
}
