# AVATAR Platform - Prisma Schema Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install @prisma/client prisma --save-dev
```

### 2. Configure Database Connection

Create or update `.env` file:

```env
# PostgreSQL Connection
DATABASE_URL="postgresql://username:password@localhost:5432/avatar_db"

# Or use connection pooling (for production)
DATABASE_URL="postgresql://username:password@localhost:6543/avatar_db"
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Create Initial Migration

```bash
npx prisma migrate dev --name init
```

This will:
- Create your PostgreSQL database
- Run all migrations
- Generate Prisma Client

### 5. Verify Schema

```bash
npx prisma validate
```

---

## Database Setup Instructions

### Using PostgreSQL locally

#### Option A: Docker (Recommended)

```bash
# Run PostgreSQL in Docker
docker run --name avatar-postgres \
  -e POSTGRES_USER=avatar \
  -e POSTGRES_PASSWORD=avatar123 \
  -e POSTGRES_DB=avatar_db \
  -p 5432:5432 \
  -d postgres:15

# Verify connection
docker exec -it avatar-postgres psql -U avatar -d avatar_db -c "SELECT 1;"
```

#### Option B: Local PostgreSQL Installation

```bash
# macOS
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

Create database:

```sql
CREATE DATABASE avatar_db;
CREATE USER avatar WITH PASSWORD 'avatar123';
GRANT ALL PRIVILEGES ON DATABASE avatar_db TO avatar;
```

### Update .env

```env
DATABASE_URL="postgresql://avatar:avatar123@localhost:5432/avatar_db"
```

---

## Initial Data Seeding

### Create Seed Script

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Create system roles
  const roles = [
    { name: 'Owner', code: 'OWNER', description: 'Founder access', is_system: true },
    { name: 'Network Manager', code: 'NETWORK_MANAGER', description: 'Manage network', is_system: true },
    { name: 'Branch Manager', code: 'BRANCH_MANAGER', description: 'Manage branch', is_system: true },
    { name: 'Administrator', code: 'ADMINISTRATOR', description: 'Admin access', is_system: true },
    { name: 'Cashier', code: 'CASHIER', description: 'Handle payments', is_system: true },
    { name: 'Bar/Kitchen', code: 'BAR_KITCHEN', description: 'Prepare orders', is_system: true },
    { name: 'Courier', code: 'COURIER', description: 'Deliver orders', is_system: true },
    { name: 'Technical Employee', code: 'TECHNICAL', description: 'Maintenance', is_system: true },
    { name: 'Marketer', code: 'MARKETER', description: 'Marketing', is_system: true },
    { name: 'Financial Employee', code: 'FINANCIAL', description: 'Finance', is_system: true },
    { name: 'Support', code: 'SUPPORT', description: 'Customer support', is_system: true },
    { name: 'Customer', code: 'CUSTOMER', description: 'Regular customer', is_system: true },
  ]

  for (const role of roles) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {},
      create: role,
    })
  }

  // 2. Create permissions
  const permissions = [
    // Booking permissions
    { code: 'booking.read', name: 'Read Bookings', module: 'booking' },
    { code: 'booking.create', name: 'Create Booking', module: 'booking' },
    { code: 'booking.cancel', name: 'Cancel Booking', module: 'booking' },
    // Order permissions
    { code: 'orders.read', name: 'Read Orders', module: 'orders' },
    { code: 'orders.manage', name: 'Manage Orders', module: 'orders' },
    // Finance permissions
    { code: 'finance.read', name: 'Read Finance', module: 'finance' },
    { code: 'finance.create', name: 'Create Transaction', module: 'finance' },
    // User permissions
    { code: 'users.read', name: 'Read Users', module: 'users' },
    { code: 'users.manage', name: 'Manage Users', module: 'users' },
    // Branch permissions
    { code: 'branches.read', name: 'Read Branches', module: 'branches' },
    { code: 'branches.manage', name: 'Manage Branches', module: 'branches' },
    // Employee permissions
    { code: 'employees.read', name: 'Read Employees', module: 'employees' },
    { code: 'employees.manage', name: 'Manage Employees', module: 'employees' },
    // Analytics
    { code: 'analytics.read', name: 'View Analytics', module: 'analytics' },
  ]

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { code: permission.code },
      update: {},
      create: permission,
    })
  }

  // 3. Create loyalty levels
  const loyaltyLevels = [
    { name: 'Bronze', code: 'BRONZE', min_spent: 0, discount_percent: 2, cashback_percent: 1, priority: 1, status: 'ACTIVE' },
    { name: 'Silver', code: 'SILVER', min_spent: 100000, discount_percent: 5, cashback_percent: 2, priority: 2, status: 'ACTIVE' },
    { name: 'Gold', code: 'GOLD', min_spent: 500000, discount_percent: 10, cashback_percent: 5, priority: 3, status: 'ACTIVE' },
    { name: 'Platinum', code: 'PLATINUM', min_spent: 1000000, discount_percent: 15, cashback_percent: 10, priority: 4, status: 'ACTIVE' },
  ]

  for (const level of loyaltyLevels) {
    await prisma.loyaltyLevel.upsert({
      where: { code: level.code },
      update: {},
      create: level,
    })
  }

  // 4. Create financial categories
  const incomeCategories = [
    { name: 'Gaming Sessions', type: 'INCOME', is_system: true, status: 'ACTIVE' },
    { name: 'Shop Sales', type: 'INCOME', is_system: true, status: 'ACTIVE' },
    { name: 'Additional Services', type: 'INCOME', is_system: true, status: 'ACTIVE' },
  ]

  const expenseCategories = [
    { name: 'Rent', type: 'EXPENSE', is_system: true, status: 'ACTIVE' },
    { name: 'Utilities', type: 'EXPENSE', is_system: true, status: 'ACTIVE' },
    { name: 'Salaries', type: 'EXPENSE', is_system: true, status: 'ACTIVE' },
    { name: 'Purchases', type: 'EXPENSE', is_system: true, status: 'ACTIVE' },
    { name: 'Maintenance', type: 'EXPENSE', is_system: true, status: 'ACTIVE' },
    { name: 'Marketing', type: 'EXPENSE', is_system: true, status: 'ACTIVE' },
  ]

  for (const cat of [...incomeCategories, ...expenseCategories]) {
    await prisma.financialCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    })
  }

  console.log('✓ Seeding completed')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

### Configure seed script in package.json

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

### Run seed

```bash
npx prisma db seed
```

---

## Development Workflow

### 1. Make Schema Changes

Edit `schema.prisma` with your changes.

### 2. Create Migration

```bash
npx prisma migrate dev --name "description_of_changes"
```

### 3. Test Changes

```bash
npx prisma validate
```

### 4. Generate Client

```bash
npx prisma generate
```

### 5. Reset During Development (if needed)

```bash
# Warning: This deletes all data!
npx prisma migrate reset
```

---

## Common Operations

### View Database in Prisma Studio

Interactive database viewer:

```bash
npx prisma studio
```

Opens browser at `http://localhost:5555`

### Format Schema

```bash
npx prisma format
```

### Check for Issues

```bash
npx prisma validate
```

### Export Database

```bash
pg_dump avatar_db > backup.sql
```

### Restore Database

```bash
psql avatar_db < backup.sql
```

---

## Using Prisma in Your Code

### TypeScript Setup

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
```

### Using in API Route (Next.js)

```typescript
// app/api/customers/route.ts
import prisma from '@/lib/prisma'

export async function GET() {
  const customers = await prisma.customer.findMany({
    include: {
      user: true,
      wallets: true,
    },
  })
  return Response.json(customers)
}

export async function POST(req: Request) {
  const data = await req.json()
  const customer = await prisma.customer.create({
    data: {
      user_id: data.user_id,
      customer_number: data.customer_number,
      status: 'ACTIVE',
    },
  })
  return Response.json(customer, { status: 201 })
}
```

### Using in Service

```typescript
// services/bookingService.ts
import prisma from '@/lib/prisma'

export async function createBooking(data: any) {
  return prisma.$transaction(async (tx) => {
    // Create booking
    const booking = await tx.booking.create({
      data: {
        booking_number: generateBookingNumber(),
        customer_id: data.customer_id,
        branch_id: data.branch_id,
        station_id: data.station_id,
        tariff_id: data.tariff_id,
        start_at: data.start_at,
        end_at: data.end_at,
        status: 'DRAFT',
        source: data.source,
        total_amount: data.total_amount,
      },
    })

    // Create audit log
    await tx.auditLog.create({
      data: {
        user_id: data.user_id,
        action: 'BOOKING_CREATED',
        entity_type: 'Booking',
        entity_id: booking.id,
        new_values: booking,
      },
    })

    return booking
  })
}
```

---

## Production Deployment

### 1. Deploy Database

```bash
# Create production database on cloud (AWS RDS, Heroku, etc.)
# Update DATABASE_URL in production environment
```

### 2. Run Migrations

```bash
NODE_ENV=production npx prisma migrate deploy
```

### 3. Deploy Application

```bash
npm run build
npm start
```

### 4. Connection Pooling (for scalability)

Use PgBouncer or Prisma Data Proxy:

```env
DATABASE_URL="postgresql://...@pgbouncer.cloud/avatar_db?pgbouncer=true"
```

### 5. Monitor Performance

```typescript
// Enable query logging
const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
  ],
})

prisma.$on('query', (e) => {
  console.log(`Query: ${e.query}`)
  console.log(`Duration: ${e.duration}ms`)
})
```

---

## Troubleshooting

### Connection Issues

```bash
# Test connection
psql postgresql://avatar:avatar123@localhost:5432/avatar_db

# Check Prisma connection
npx prisma db execute --stdin < "SELECT 1"
```

### Migration Conflicts

```bash
# Reset to clean state (dev only)
npx prisma migrate reset

# For production, create new migration
npx prisma migrate dev --name fix_schema
```

### Generate Client Issues

```bash
# Clear cache and regenerate
rm -rf node_modules/.prisma
npx prisma generate
```

### Type Errors

```bash
# Ensure Prisma types are generated
npx prisma generate
npm install @types/node --save-dev
```

---

## Performance Tips

1. **Use `select`/`include` wisely** - Only fetch needed fields
2. **Add indexes** - Already included in schema
3. **Use batch operations** - `createMany`, `updateMany`
4. **Paginate queries** - Use `skip` and `take`
5. **Cache frequently accessed data** - Use Redis
6. **Use connection pooling** - For production

---

## Backup Strategy

### Regular Backups

```bash
# Daily backup
0 2 * * * pg_dump avatar_db | gzip > backups/avatar_$(date +\%Y\%m\%d).sql.gz

# Keep last 30 days
find backups/ -name "avatar_*.sql.gz" -mtime +30 -delete
```

### Restore from Backup

```bash
gunzip -c backups/avatar_20240101.sql.gz | psql avatar_db
```

---

## Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Data Platform](https://console.prisma.io/)
- [Database Glossary](https://www.prisma.io/dataguide/)

---

## Support & Questions

For issues with this schema:
1. Check SCHEMA_DOCUMENTATION.md
2. Review QUICK_REFERENCE.md
3. See original requirements in Схема БД.md
4. Check Prisma documentation

---

**Version:** 1.0  
**Last Updated:** 2024  
**Status:** Production Ready
