const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export interface TelegramNotification {
  type: 'order' | 'payment' | 'review' | 'error' | 'info';
  title: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * Отправить уведомление в Telegram
 */
export async function sendTelegramNotification(
  notification: TelegramNotification
): Promise<boolean> {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('Telegram не настроен');
      return false;
    }

    const icons = {
      order: '📦',
      payment: '💳',
      review: '⭐',
      error: '❌',
      info: 'ℹ️',
    };

    const text = formatTelegramMessage(notification, icons[notification.type]);

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Ошибка отправки Telegram:', error);
    return false;
  }
}

/**
 * Отправить уведомление о новом заказе
 */
export async function notifyNewOrder(orderData: any) {
  return sendTelegramNotification({
    type: 'order',
    title: 'Новый заказ',
    message: `Заказ #${orderData.id} на сумму ${orderData.totalAmount} ₽`,
    details: {
      customer: orderData.customer,
      items: orderData.itemCount,
      total: orderData.totalAmount,
    },
  });
}

/**
 * Отправить уведомление о платеже
 */
export async function notifyPayment(paymentData: any) {
  return sendTelegramNotification({
    type: 'payment',
    title: 'Платеж обработан',
    message: `Платеж на сумму ${paymentData.amount} ₽ успешно обработан`,
    details: {
      orderId: paymentData.orderId,
      amount: paymentData.amount,
      method: paymentData.method,
    },
  });
}

/**
 * Отправить уведомление об ошибке
 */
export async function notifyError(error: any) {
  return sendTelegramNotification({
    type: 'error',
    title: 'Ошибка в системе',
    message: error.message || 'Произошла ошибка',
    details: {
      timestamp: new Date().toISOString(),
      stack: error.stack?.split('\n')[0],
    },
  });
}

function formatTelegramMessage(notification: TelegramNotification, icon: string): string {
  let text = `${icon} <b>${notification.title}</b>\n`;
  text += `${notification.message}\n`;

  if (notification.details && Object.keys(notification.details).length > 0) {
    text += '\n<b>Детали:</b>\n';
    Object.entries(notification.details).forEach(([key, value]) => {
      text += `• <code>${key}</code>: ${value}\n`;
    });
  }

  text += `\n<i>${new Date().toLocaleString('ru-RU')}</i>`;

  return text;
}
