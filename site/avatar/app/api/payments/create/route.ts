import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/app/lib/auth';

// POST /api/payments/create - создать платеж
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);

    if (!auth) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const body = await request.json();
    const { amount, orderId, paymentMethod, description } = body;

    if (!amount || !orderId) {
      return NextResponse.json(
        { error: 'Заполните все обязательные поля' },
        { status: 400 }
      );
    }

    // Разные обработчики в зависимости от метода оплаты
    if (paymentMethod === 'stripe') {
      return handleStripePayment(amount, orderId, description);
    } else if (paymentMethod === 'post_kg') {
      return handlePostKgPayment(amount, orderId, description);
    } else if (paymentMethod === 'demo') {
      return handleDemoPayment(amount, orderId, description);
    }

    return NextResponse.json(
      { error: 'Неподдерживаемый метод оплаты' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Ошибка при создании платежа:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

// Обработка Stripe платежей
function handleStripePayment(amount: number, orderId: string, description?: string) {
  // В реальном приложении здесь должна быть интеграция со Stripe API
  // Для демо возвращаем mock response
  const paymentId = `stripe_${Date.now()}`;

  return NextResponse.json(
    {
      success: true,
      paymentId,
      method: 'stripe',
      amount,
      orderId,
      status: 'pending',
      message: 'Платеж создан. Перенаправляем на Stripe...',
      redirectUrl: `https://checkout.stripe.com/pay/${paymentId}`, // Mock URL
    },
    { status: 201 }
  );
}

// Обработка Post.kg платежей
function handlePostKgPayment(amount: number, orderId: string, description?: string) {
  // Интеграция с Post.kg API
  const paymentId = `postkg_${Date.now()}`;

  return NextResponse.json(
    {
      success: true,
      paymentId,
      method: 'post_kg',
      amount,
      orderId,
      status: 'pending',
      message: 'Платеж создан через Post.kg',
      redirectUrl: `${process.env.POSTKG_REDIRECT_URL || 'https://post.kg'}?payment_id=${paymentId}`,
    },
    { status: 201 }
  );
}

// Демо платеж для тестирования
function handleDemoPayment(amount: number, orderId: string, description?: string) {
  const paymentId = `demo_${Date.now()}`;

  // Автоматически одобряем платеж для демо
  return NextResponse.json(
    {
      success: true,
      paymentId,
      method: 'demo',
      amount,
      orderId,
      status: 'completed',
      message: 'Демо платеж успешно обработан',
      transactionId: `TXN-${paymentId}`,
    },
    { status: 201 }
  );
}
