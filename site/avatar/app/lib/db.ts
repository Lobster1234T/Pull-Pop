// Mock Database - Real data structure

export const BRANCH_ID = 'branch-001';

// Филиал
export const branch = {
  id: BRANCH_ID,
  name: 'AVATAR Gaming Club',
  slug: 'avatar-bishkek',
  code: 'AVT-001',
  description: 'Премиум игровой клуб с новейшим оборудованием и сервисом',
  phone: '+996 (312) 500-100',
  whatsapp: '+996 555 500-100',
  email: 'info@avatar-club.kg',
  address: 'ул. Чуй, 123, Бишкек',
  city: 'Бишкек',
  district: 'Советский',
  latitude: 42.87339,
  longitude: 74.59368,
  is_24_7: true,
  status: 'active',
  workingHours: {
    0: { open: '10:00', close: '23:00' }, // Sun
    1: { open: '10:00', close: '00:00' }, // Mon
    2: { open: '10:00', close: '00:00' }, // Tue
    3: { open: '10:00', close: '00:00' }, // Wed
    4: { open: '10:00', close: '00:00' }, // Thu
    5: { open: '10:00', close: '02:00' }, // Fri
    6: { open: '10:00', close: '02:00' }, // Sat
  },
};

// Зоны
export const zones = [
  {
    id: 'zone-pc',
    branch_id: BRANCH_ID,
    name: 'PC Зона',
    code: 'PC',
    type: 'standard',
    description: 'Мощные ПК для всех игр',
    capacity: 20,
    computers: 20,
    image: '/images/zones/pc-zone.svg',
  },
  {
    id: 'zone-ps5',
    branch_id: BRANCH_ID,
    name: 'PlayStation 5',
    code: 'PS5',
    type: 'ps5',
    description: 'Sony PlayStation 5 консоли',
    capacity: 8,
    computers: 8,
    image: '/images/zones/ps5-zone.svg',
  },
  {
    id: 'zone-vip',
    branch_id: BRANCH_ID,
    name: 'VIP Зона',
    code: 'VIP',
    type: 'vip',
    description: 'Люкс-комнаты для команд',
    capacity: 4,
    computers: 4,
    image: '/images/zones/vip-zone.svg',
  },
];

// Игровые места
export const gamingStations = [
  // PC Зона
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `station-pc-${i + 1}`,
    zone_id: 'zone-pc',
    station_number: `PC-${String(i + 1).padStart(2, '0')}`,
    name: `Компьютер PC-${String(i + 1).padStart(2, '0')}`,
    type: 'pc',
    status: i % 3 === 0 ? 'reserved' : 'available',
    specs: {
      cpu: 'Intel Core i5-14600',
      gpu: 'RTX 5070',
      ram: '32 GB',
      monitor: '380 Hz',
    },
  })),
  // PS5 Зона
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `station-ps5-${i + 1}`,
    zone_id: 'zone-ps5',
    station_number: `PS5-${String(i + 1).padStart(2, '0')}`,
    name: `PlayStation 5 PS5-${String(i + 1).padStart(2, '0')}`,
    type: 'ps5',
    status: 'available',
    specs: {
      console: 'Sony PlayStation 5',
      storage: '825 GB SSD',
      fps: '120 FPS',
    },
  })),
  // VIP Зона
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `station-vip-${i + 1}`,
    zone_id: 'zone-vip',
    station_number: `VIP-${String(i + 1).padStart(2, '0')}`,
    name: `VIP Комната VIP-${String(i + 1).padStart(2, '0')}`,
    type: 'pc',
    status: 'available',
    specs: {
      cpu: 'Intel Core i7-14700K',
      gpu: 'RTX 5090',
      ram: '64 GB',
      monitor: '480 Hz',
    },
  })),
];

// Тарифы
export const tariffs = [
  {
    id: 'tariff-pc-hourly',
    zone_id: 'zone-pc',
    name: 'PC по часам',
    code: 'PC_HOURLY',
    description: 'Стандартный тариф для PC зоны',
    billing_type: 'hourly',
    price: 120,
    duration_minutes: 60,
    min_duration_minutes: 30,
  },
  {
    id: 'tariff-pc-package',
    zone_id: 'zone-pc',
    name: 'PC Пакет 5 часов',
    code: 'PC_PACKAGE_5H',
    description: 'Экономичный пакет',
    billing_type: 'package',
    price: 500,
    duration_minutes: 300,
    min_duration_minutes: 300,
  },
  {
    id: 'tariff-pc-night',
    zone_id: 'zone-pc',
    name: 'PC Ночной (20:00-08:00)',
    code: 'PC_NIGHT',
    description: 'Льготный тариф ночью',
    billing_type: 'hourly',
    price: 80,
    duration_minutes: 60,
    min_duration_minutes: 30,
  },
  {
    id: 'tariff-ps5-hourly',
    zone_id: 'zone-ps5',
    name: 'PS5 по часам',
    code: 'PS5_HOURLY',
    description: 'PlayStation 5 консоль',
    billing_type: 'hourly',
    price: 150,
    duration_minutes: 60,
    min_duration_minutes: 30,
  },
  {
    id: 'tariff-ps5-package',
    zone_id: 'zone-ps5',
    name: 'PS5 Пакет 3 часа',
    code: 'PS5_PACKAGE_3H',
    description: 'Пакет для PS5',
    billing_type: 'package',
    price: 400,
    duration_minutes: 180,
    min_duration_minutes: 180,
  },
  {
    id: 'tariff-vip-hourly',
    zone_id: 'zone-vip',
    name: 'VIP Люкс',
    code: 'VIP_HOURLY',
    description: 'Премиум-комната с лучшим оборудованием',
    billing_type: 'hourly',
    price: 300,
    duration_minutes: 60,
    min_duration_minutes: 60,
  },
];

// Товары для магазина
export const products = [
  // Напитки
  {
    id: 'prod-energy-1',
    category: 'Напитки',
    name: 'Red Bull Energy',
    price: 200,
    image: '/photo_2026-10-14_15-31-54.jpg',
    description: 'Энергетический напиток',
  },
  {
    id: 'prod-energy-2',
    category: 'Напитки',
    name: 'Monster Energy',
    price: 220,
    image: '/photo_2026-10-14_15-31-57.jpg',
    description: 'Оригинальный Monster',
  },
  {
    id: 'prod-water',
    category: 'Напитки',
    name: 'Вода 0.5L',
    price: 40,
    image: '/photo_2026-10-14_15-32-00.jpg',
    description: 'Чистая вода',
  },
  // Снеки
  {
    id: 'prod-chips',
    category: 'Снеки',
    name: 'Чипсы Lay\'s',
    price: 80,
    image: '/photo_2026-10-14_15-32-08.jpg',
    description: 'Классические чипсы',
  },
  {
    id: 'prod-popcorn',
    category: 'Снеки',
    name: 'Попкорн сыр',
    price: 100,
    image: '/photo_2026-10-14_15-32-10.jpg',
    description: 'Попкорн со вкусом сыра',
  },
  // Кабели и аксессуары
  {
    id: 'prod-hdmi',
    category: 'Аксессуары',
    name: 'Кабель HDMI 2м',
    price: 400,
    image: '/photo_2026-10-14_15-32-12.jpg',
    description: 'Высокоскоростной HDMI',
  },
  {
    id: 'prod-mousepad',
    category: 'Аксессуары',
    name: 'Игровой коврик',
    price: 600,
    image: '/photo_2026-10-14_15-32-14.jpg',
    description: 'Большой игровой коврик',
  },
];

// Новости
export const news = [
  {
    id: 'news-1',
    title: 'Открытие новой VIP зоны',
    excerpt: 'Мы рады представить нашу новую люкс-зону с максимальной производительностью',
    content: 'Открыта новая VIP зона с 4 премиум-комнатами и лучшим оборудованием. Каждая комната оборудована Intel Core i7, RTX 5090 и 480 Hz мониторами.',
    date: '2024-10-20',
    image: '/images/news/vip-launch.svg',
  },
  {
    id: 'news-2',
    title: 'Турнир CS:GO - финальная регистрация',
    excerpt: 'Последние 24 часа для регистрации команд на турнир',
    content: 'Спешите зарегистрировать вашу команду! Финальная регистрация заканчивается через 24 часа. Призовой фонд: 500,000 ₽',
    date: '2024-10-19',
    image: '/images/news/csgo-tournament.svg',
  },
  {
    id: 'news-3',
    title: 'Новый формат: Ночные смены со скидкой 30%',
    excerpt: 'С 20:00 до 08:00 скидка 30% на все зоны',
    content: 'Введен специальный ночной тариф с 30% скидкой. Идеально для поздно встающих геймеров!',
    date: '2024-10-18',
    image: '/images/news/night-rates.svg',
  },
];

// Турниры
export const tournaments = [
  {
    id: 'tournament-csgo',
    name: 'CS:GO Pro League Championship',
    game: 'CS:GO',
    status: 'active',
    participants: 16,
    maxParticipants: 16,
    prizePool: 400000,
    startDate: '2024-11-15',
    description: 'Главный турнир сезона с участием лучших команд региона',
    image: '/images/tournaments/csgo.svg',
  },
  {
    id: 'tournament-valorant',
    name: 'Valorant Open Cup',
    game: 'Valorant',
    status: 'registration',
    participants: 12,
    maxParticipants: 20,
    prizePool: 250000,
    startDate: '2024-11-25',
    description: 'Открытый кубок для всех желающих',
    image: '/images/tournaments/valorant.svg',
  },
  {
    id: 'tournament-ps5',
    name: 'PlayStation 5 Racing League',
    game: 'Gran Turismo 7',
    status: 'registration',
    participants: 8,
    maxParticipants: 16,
    prizePool: 150000,
    startDate: '2024-12-01',
    description: 'Гоночный турнир на PlayStation 5',
    image: '/images/tournaments/gt7.svg',
  },
];

// Помощь функции
export function getBranch() {
  return branch;
}

export function getZones() {
  return zones;
}

export function getZoneById(id: string) {
  return zones.find(z => z.id === id);
}

export function getGamingStations(zoneId?: string) {
  if (zoneId) {
    return gamingStations.filter(s => s.zone_id === zoneId);
  }
  return gamingStations;
}

export function getTariffs(zoneId?: string) {
  if (zoneId) {
    return tariffs.filter(t => t.zone_id === zoneId);
  }
  return tariffs;
}

export function getProducts(category?: string) {
  if (category) {
    return products.filter(p => p.category === category);
  }
  return products;
}

export function getNews() {
  return news;
}

export function getTournaments() {
  return tournaments;
}

export function getProductCategories() {
  return [...new Set(products.map(p => p.category))];
}
