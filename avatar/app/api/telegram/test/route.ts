import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/app/lib/telegram';

export async function GET(request: NextRequest) {
  try {
    const result = await sendTelegramNotification({
      type: 'info',
      title: 'Test Bot Message',
      message: 'Telegram bot is working correctly! ✅',
      details: {
        timestamp: new Date().toISOString(),
        status: 'active',
      },
    });

    return NextResponse.json({
      success: result,
      message: result ? 'Message sent to Telegram' : 'Failed to send message',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to send telegram message', details: String(error) },
      { status: 500 }
    );
  }
}
