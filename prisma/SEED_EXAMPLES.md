# 📚 AVATAR Platform Seed - Примеры и расширения

## Примеры использования seed данных

### 1. Проверка разрешений при создании пользователя

```typescript
// Пример: создание admin пользователя
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createAdminUser() {
  // 1. Создаем пользователя
  const user = await prisma.user.create({
    data: {
      email: 'admin@avatar.com',
      phone: '+996700000001',
      passwordHash: 'hashed_password_here',
      status: 'active',
      emailVerified: true,
      profile: {
        create: {
          firstName: 'Админ',
          lastName: 'Администратор',
          language: 'ru',
          timezone: 'MSK',
        },
      },
    },
  });

  // 2. Получаем роль admin
  const adminRole = await prisma.role.findUnique({
    where: { code: 'admin' },
  });

  // 3. Назначаем роль пользователю
  const userRole = await prisma.userRole.create({
    data: {
      userId: user.id,
      roleId: adminRole!.id,
    },
  });

  console.log('✅ Admin пользователь создан:', user.email);
  return user;
}
```

### 2. Проверка разрешений пользователя

```typescript
// Получить все разрешения пользователя
async function getUserPermissions(userId: string) {
  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  const permissions = new Set<string>();

  for (const userRole of userRoles) {
    for (const rp of userRole.role.permissions) {
      permissions.add(rp.permission.code);
    }
  }

  return Array.from(permissions);
}

// Использование
const permissions = await getUserPermissions('user_id');
console.log('Разрешения:', permissions);
// Output: ['admin', 'user.read', 'user.create', 'user.edit', ...]
```

### 3. Проверка наличия разрешения (middleware)

```typescript
// Middleware для проверки разрешения
async function hasPermission(
  userId: string,
  requiredPermission: string
): Promise<boolean> {
  const permissions = await getUserPermissions(userId);

  // Проверяем точное совпадение
  if (permissions.includes(requiredPermission)) {
    return true;
  }

  // Проверяем подстановочное разрешение *:*
  if (permissions.includes('*:*')) {
    return true;
  }

  // Проверяем разрешение модуля (например, 'booking.*')
  const [module] = requiredPermission.split('.');
  if (permissions.includes(`${module}.*`)) {
    return true;
  }

  return false;
}

// Использование
const canCreateBooking = await hasPermission(userId, 'booking.create');
if (!canCreateBooking) {
  throw new Error('Нет разрешения на создание брони');
}
```

### 4. Назначение роли филиалу (для Manager)

```typescript
// Manager может управлять конкретным филиалом
async function assignManagerToBranch(
  userId: string,
  branchId: string
) {
  const managerRole = await prisma.role.findUnique({
    where: { code: 'manager' },
  });

  const userRole = await prisma.userRole.create({
    data: {
      userId,
      roleId: managerRole!.id,
      branchId, // ← Ограничиваем доступ только этим филиалом
    },
  });

  console.log(`✅ Manager назначен филиалу ${branchId}`);
  return userRole;
}
```

### 5. Создание первого филиала

```typescript
// После seed создаем филиал
async function createFirstBranch() {
  const branch = await prisma.branch.create({
    data: {
      name: 'AVATAR Бишкек',
      slug: 'avatar-bishkek',
      code: 'BIS-001',
      description: 'Компьютерный клуб AVATAR - Бишкек, ул. Дэн Сяопина, 225',
      phone: '+996 709 016 008',
      whatsapp: '+996 709 016 008',
      address: 'ул. Дэн Сяопина, 225',
      city: 'Бишкек',
      district: 'Первомайский',
      timezone: 'MSK',
      is24_7: true,
      status: 'active',
    },
  });

  console.log('✅ Филиал создан:', branch.name);
  return branch;
}
```

### 6. Создание зоны в филиале

```typescript
// Создаем зоны после филиала
async function createZones(branchId: string) {
  const zones = [
    {
      name: 'Standard Zone',
      code: 'STD-01',
      type: 'standard',
      capacity: 50,
      sortOrder: 1,
    },
    {
      name: 'VIP Zone',
      code: 'VIP-01',
      type: 'vip',
      capacity: 20,
      sortOrder: 2,
    },
  ];

  for (const zone of zones) {
    await prisma.zone.create({
      data: {
        branchId,
        ...zone,
        status: 'active',
      },
    });
    console.log(`✅ Зона "${zone.name}" создана`);
  }
}
```

### 7. Создание тарифов

```typescript
// Создаем тарифы для зон
async function createTariffs(branchId: string, zoneId: string) {
  const tariffs = [
    {
      name: 'Эконом',
      code: 'ECO',
      description: 'Стандартный тариф',
      billingType: 'hourly',
      price: 150,
      durationMinutes: 60,
    },
    {
      name: 'Premium',
      code: 'PREM',
      description: 'Премиум тариф',
      billingType: 'hourly',
      price: 250,
      durationMinutes: 60,
    },
  ];

  for (const tariff of tariffs) {
    await prisma.tariff.create({
      data: {
        branchId,
        zoneId,
        ...tariff,
        status: 'active',
      },
    });
    console.log(`✅ Тариф "${tariff.name}" создан`);
  }
}
```

### 8. Создание игровых мест

```typescript
// Создаем компьютеры в зоне
async function createGamingStations(
  branchId: string,
  zoneId: string,
  count: number = 10
) {
  for (let i = 1; i <= count; i++) {
    const stationNumber = `PC-${String(i).padStart(3, '0')}`;
    await prisma.gamingStation.create({
      data: {
        branchId,
        zoneId,
        stationNumber,
        name: `Компьютер ${i}`,
        type: 'pc',
        status: 'available',
        positionX: i % 5,
        positionY: Math.floor(i / 5),
      },
    });
  }
  console.log(`✅ Создано ${count} игровых мест`);
}
```

### 9. Создание категорий товаров (дополнительно)

```typescript
// Дополнительные категории можно добавить
async function addMoreCategories() {
  const categories = [
    {
      name: 'Энергетики',
      slug: 'energy-drinks',
      description: 'Энергетические напитки',
      sortOrder: 1,
    },
    {
      name: 'Сладкое',
      slug: 'sweets',
      description: 'Сладкие закуски',
      sortOrder: 2,
    },
  ];

  for (const cat of categories) {
    const existing = await prisma.productCategory.findUnique({
      where: { slug: cat.slug },
    });

    if (!existing) {
      await prisma.productCategory.create({
        data: cat,
      });
      console.log(`✅ Категория "${cat.name}" добавлена`);
    }
  }
}
```

### 10. Создание товаров

```typescript
// Создаем товары в категориях
async function createProducts() {
  const drinksCategory = await prisma.productCategory.findUnique({
    where: { slug: 'drinks' },
  });

  const products = [
    {
      categoryId: drinksCategory!.id,
      sku: 'COLA-500ML',
      name: 'Coca-Cola 500ml',
      slug: 'coca-cola-500ml',
      price: 100,
      costPrice: 40,
      status: 'active',
      isFeatured: true,
    },
    {
      categoryId: drinksCategory!.id,
      sku: 'FANTA-500ML',
      name: 'Fanta 500ml',
      slug: 'fanta-500ml',
      price: 100,
      costPrice: 40,
      status: 'active',
      isFeatured: false,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
    console.log(`✅ Товар "${product.name}" создан`);
  }
}
```

---

## Интеграция с API

### Express middleware для проверки разрешений

```typescript
import { Request, Response, NextFunction } from 'express';

// Расширяем объект Request
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      permissions?: string[];
    }
  }
}

// Middleware для получения разрешений
export async function permissionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id; // из JWT или session
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const permissions = await getUserPermissions(userId);
    req.userId = userId;
    req.permissions = permissions;

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Middleware для проверки конкретного разрешения
export function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.permissions?.includes(permission)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// Использование в маршрутах
router.post(
  '/bookings',
  permissionMiddleware,
  requirePermission('booking.create'),
  createBookingController
);

router.get(
  '/finance/report',
  permissionMiddleware,
  requirePermission('finance.read'),
  getFinanceReportController
);
```

### NestJS Guard для разрешений

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private prisma: PrismaClient) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (!userId) return false;

    const permissions = await getUserPermissions(userId);
    request.permissions = permissions;

    return true;
  }
}

// Использование
@Controller('bookings')
@UseGuards(PermissionGuard)
export class BookingsController {
  @Post()
  @Permission('booking.create')
  createBooking(@Body() dto: CreateBookingDto) {
    // ...
  }
}
```

---

## Расширение seed скрипта

### Добавление начальных данных

Создайте файл `prisma/seed-extended.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import seedBasic from './seed';

const prisma = new PrismaClient();

async function seedExtended() {
  // 1. Запустить базовый seed
  await seedBasic();

  // 2. Создать первый филиал
  const branch = await createFirstBranch();

  // 3. Создать зоны
  await createZones(branch.id);

  // 4. Создать тарифы
  const zones = await prisma.zone.findMany({ where: { branchId: branch.id } });
  for (const zone of zones) {
    await createTariffs(branch.id, zone.id);
  }

  // 5. Создать игровые места
  for (const zone of zones) {
    await createGamingStations(branch.id, zone.id, 20);
  }

  // 6. Создать товары
  await createProducts();

  console.log('✅ Расширенная инициализация завершена!');
}

seedExtended();
```

Обновите `package.json`:

```json
{
  "scripts": {
    "prisma:seed": "prisma db seed",
    "prisma:seed:extended": "ts-node prisma/seed-extended.ts"
  }
}
```

---

## Проверка целостности данных

```typescript
async function validateSeedData() {
  console.log('\n🔍 Проверка целостности данных...\n');

  // 1. Проверка ролей
  const roles = await prisma.role.findMany();
  console.log(`✅ Ролей: ${roles.length}`);

  // 2. Проверка разрешений
  const permissions = await prisma.permission.findMany();
  console.log(`✅ Разрешений: ${permissions.length}`);

  // 3. Проверка связей
  const rolePermissions = await prisma.rolePermission.findMany();
  console.log(`✅ Связей роль-разрешение: ${rolePermissions.length}`);

  // 4. Проверка категорий
  const categories = await prisma.productCategory.findMany();
  console.log(`✅ Категорий товаров: ${categories.length}`);

  // 5. Статистика по ролям
  console.log('\n📊 Разрешения по ролям:');
  for (const role of roles) {
    const count = await prisma.rolePermission.count({
      where: { roleId: role.id },
    });
    console.log(`  ${role.name}: ${count} разрешений`);
  }
}
```

---

## Отладка и тестирование

```typescript
// Для быстрого тестирования в ts-node REPL
async function testPermissions() {
  const founder = await prisma.role.findUnique({
    where: { code: 'founder' },
    include: {
      permissions: {
        include: { permission: true },
      },
    },
  });

  console.log('Founder разрешения:');
  founder?.permissions.forEach((rp) => {
    console.log(`  - ${rp.permission.code}`);
  });
}

// Запуск: npx ts-node
// > await testPermissions()
```

---

**Дополнение к SEED_INSTRUCTIONS.md и SEED_GUIDE.md**
