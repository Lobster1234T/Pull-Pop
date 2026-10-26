import { NextRequest, NextResponse } from 'next/server';
import { getPaginationParams, paginate } from '@/app/lib/pagination';

const mockTariffs = [
  { id: '1', name: 'Стандарт', price: 500, duration: 60, type: 'hourly', status: 'active' },
  { id: '2', name: 'VIP', price: 800, duration: 60, type: 'hourly', status: 'active' },
  { id: '3', name: 'Пакет 10 часов', price: 4500, duration: 600, type: 'package', status: 'active' },
  { id: '4', name: 'Студент (скидка 10%)', price: 450, duration: 60, type: 'hourly', status: 'active' },
  { id: '5', name: 'Ночной (00:00-06:00)', price: 300, duration: 60, type: 'hourly', status: 'active' },
  { id: '6', name: 'Пакет 30 часов', price: 12000, duration: 1800, type: 'package', status: 'active' },
  { id: '7', name: 'Корпоративный', price: 1200, duration: 60, type: 'hourly', status: 'inactive' },
  { id: '8', name: 'VIP Пакет 5 часов', price: 3500, duration: 300, type: 'package', status: 'active' },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { page, limit } = getPaginationParams(searchParams);

    const result = paginate(mockTariffs, page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Get tariffs error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name || !data.price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newTariff = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
    };

    return NextResponse.json(newTariff, { status: 201 });
  } catch (error) {
    console.error('Create tariff error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
