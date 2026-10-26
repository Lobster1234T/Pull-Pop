// Используем nodemailer для отправки email
import nodemailer from 'nodemailer';

const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@avatar.kg';
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter && SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASSWORD) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

export interface EmailNotification {
  to: string;
  subject: string;
  html: string;
}

/**
 * Отправить email
 */
export async function sendEmail(notification: EmailNotification): Promise<boolean> {
  try {
    const mailer = getTransporter();

    if (!mailer) {
      console.warn('Email не настроен');
      return false;
    }

    const result = await mailer.sendMail({
      from: EMAIL_FROM,
      to: notification.to,
      subject: notification.subject,
      html: notification.html,
    });

    return !!result.messageId;
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    return false;
  }
}

/**
 * Отправить email о новом заказе
 */
export async function sendOrderConfirmationEmail(orderData: any) {
  const html = `
    <h2>Спасибо за ваш заказ!</h2>
    <p>Ваш заказ <strong>#${orderData.id}</strong> успешно создан.</p>
    
    <h3>Детали заказа:</h3>
    <ul>
      <li>Номер: ${orderData.id}</li>
      <li>Дата: ${new Date(orderData.createdAt).toLocaleDateString('ru-RU')}</li>
      <li>Сумма: <strong>${orderData.totalAmount} ₽</strong></li>
      <li>Статус: ${orderData.status}</li>
    </ul>

    <h3>Товары:</h3>
    <ul>
      ${orderData.items?.map((item: any) => `
        <li>${item.name} x ${item.quantity} = ${item.price * item.quantity} ₽</li>
      `).join('') || ''}
    </ul>

    <p>Вы можете отследить ваш заказ по ссылке: 
    <a href="https://avatar.kg/orders/${orderData.id}">Просмотреть заказ</a></p>

    <hr />
    <p><small>Это письмо было отправлено автоматически. Не отвечайте на это письмо.</small></p>
  `;

  return sendEmail({
    to: orderData.customer.email,
    subject: `Заказ #${orderData.id} подтвержден`,
    html,
  });
}

/**
 * Отправить email об обновлении статуса заказа
 */
export async function sendOrderStatusEmail(orderData: any, newStatus: string) {
  const statusMessages: { [key: string]: string } = {
    accepted: 'Ваш заказ принят и находится в обработке',
    preparing: 'Ваш заказ готовится',
    ready: 'Ваш заказ готов и готов к отправке',
    delivering: 'Ваш заказ в пути',
    completed: 'Ваш заказ доставлен',
    cancelled: 'Ваш заказ был отменен',
  };

  const html = `
    <h2>Обновление статуса заказа</h2>
    <p>${statusMessages[newStatus] || 'Статус вашего заказа изменился'}</p>
    
    <p>Номер заказа: <strong>#${orderData.id}</strong></p>
    <p>Новый статус: <strong>${newStatus}</strong></p>

    <p>Подробности: 
    <a href="https://avatar.kg/orders/${orderData.id}">Просмотреть заказ</a></p>

    <hr />
    <p><small>Это письмо было отправлено автоматически. Не отвечайте на это письмо.</small></p>
  `;

  return sendEmail({
    to: orderData.customer.email,
    subject: `Заказ #${orderData.id}: ${newStatus}`,
    html,
  });
}

/**
 * Отправить email о платеже
 */
export async function sendPaymentConfirmationEmail(paymentData: any) {
  const html = `
    <h2>Платеж принят</h2>
    <p>Ваш платеж успешно обработан.</p>
    
    <h3>Детали платежа:</h3>
    <ul>
      <li>ID платежа: ${paymentData.id}</li>
      <li>Сумма: <strong>${paymentData.amount} ₽</strong></li>
      <li>Метод: ${paymentData.method}</li>
      <li>Дата: ${new Date(paymentData.createdAt).toLocaleDateString('ru-RU')}</li>
    </ul>

    <hr />
    <p><small>Это письмо было отправлено автоматически. Не отвечайте на это письмо.</small></p>
  `;

  return sendEmail({
    to: paymentData.userEmail,
    subject: 'Платеж подтвержден',
    html,
  });
}

/**
 * Отправить email о отзыве
 */
export async function sendReviewNotificationEmail(reviewData: any) {
  const html = `
    <h2>Новый отзыв о товаре</h2>
    <p>На товар "<strong>${reviewData.productName}</strong>" оставлен новый отзыв.</p>
    
    <h3>Автор: ${reviewData.authorName}</h3>
    <h3>Оценка: ${'⭐'.repeat(reviewData.rating)}</h3>
    <p>${reviewData.comment}</p>

    <p><a href="https://avatar.kg/products/${reviewData.productId}#reviews">Просмотреть все отзывы</a></p>

    <hr />
    <p><small>Это письмо было отправлено автоматически. Не отвечайте на это письмо.</small></p>
  `;

  return sendEmail({
    to: reviewData.adminEmail,
    subject: `Новый отзыв: ${reviewData.productName}`,
    html,
  });
}
