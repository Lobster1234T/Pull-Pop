import { NextRequest, NextResponse } from 'next/server';
import { getPaginationParams, paginate } from '@/app/lib/pagination';

// Mock данные - в реальности загружаются из БД
const mockZones = [
  { id: '1', name: 'Standard Zone', type: 'standard', capacity: 30, status: 'active' },
  { id: '2', name: 'VIP Zone', type: 'vip', capacity: 15, status: 'active' },
  { id: '3', name: 'PS5 Zone', type: 'ps5', capacity: 10, status: 'active' },
  { id: '4', name: 'Bootcamp Zone', type: 'standard', capacity: 25, status: 'active' },
  { id: '5', name: 'Tournament Zone', type: 'vip', capacity: 20, status: 'active' },
  { id: '6', name: 'Casual Zone', type: 'standard', capacity: 35, status: 'active' },
  { id: '7', name: 'Pro Zone', type: 'vip', capacity: 18, status: 'active' },
  { id: '8', name: 'Console Zone', type: 'ps5', capacity: 12, status: 'active' },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { page, limit } = getPaginationParams(searchParams);

    const result = paginate(mockZones, page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Get zones error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Валидация
    if (!data.name || !data.type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // В реальности сохраняем в БД
    const newZone = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
    };

    return NextResponse.json(newZone, { status: 201 });
  } catch (error) {
    console.error('Create zone error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
