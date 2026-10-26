import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  requirePermission,
  prisma,
} from '@/lib/auth';
import {
  errorResponse,
  handleDatabaseError,
} from '@/lib/api-utils';

/**
 * GET /api/categories/[id]
 * Получить детали категории
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await prisma.productCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return errorResponse('Category not found', 404);
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return handleDatabaseError(error);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * PUT /api/categories/[id]
 * Обновить категорию (только для админа)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await requirePermission(request, 'category.update');
    if (user instanceof NextResponse) {
      return user;
    }

    const body = await request.json();
    const { name, description, slug, status } = body;

    // Проверить, что категория существует
    const category = await prisma.productCategory.findUnique({
      where: { id },
    });

    if (!category) {
      return errorResponse('Category not found', 404);
    }

    // Если изменяется slug, проверить уникальность
    if (slug && slug !== category.slug) {
      const existingCategory = await prisma.productCategory.findUnique({
        where: { slug },
      });
      if (existingCategory) {
        return errorResponse('Category with this slug already exists', 409);
      }
    }

    // Обновить категорию
    const updatedCategory = await prisma.productCategory.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(description && { description }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return handleDatabaseError(error);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * DELETE /api/categories/[id]
 * Удалить категорию (только для админа)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await requirePermission(request, 'category.delete');
    if (user instanceof NextResponse) {
      return user;
    }

    // Проверить, что категория существует
    const category = await prisma.productCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return errorResponse('Category not found', 404);
    }

    // Проверить, что категория не содержит товаров
    if (category._count.products > 0) {
      return errorResponse(
        'Cannot delete category that contains products',
        400
      );
    }

    // Удалить категорию
    await prisma.productCategory.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return handleDatabaseError(error);
  } finally {
    await prisma.$disconnect();
  }
}
