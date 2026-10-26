# AVATAR Platform - Prisma Schema Quick Reference

## 37 Core Modules at a Glance

### 1-3: Authentication & Employees
| Module | Models | Key Fields |
|--------|--------|-----------|
| Users & Auth | User, UserProfile, UserContact, UserSettings, UserConsent, UserSession, AuditLog | id, email, password_hash, status, deleted_at |
| Roles & Permissions | Role, Permission, RolePermission, UserRole | code, permissions, branch_id |
| Employees | Employee | employee_number, position, status |

### 4-7: Infrastructure
| Module | Models | Key Fields |
|--------|--------|-----------|
| Branches | Branch, BranchWorkingHours, BranchSpecialHours, BranchMap | name, address, timezone, status |
| Zones | Zone | type (STANDARD/VIP/PS5), capacity |
| Gaming Stations | GamingStation, HardwareProfile, GamingStationHardware | station_number, type, status |
| Tariffs | Tariff, TariffRule | price, billing_type, day_of_week |

### 8-11: Bookings & Sessions
| Module | Models | Key Fields |
|--------|--------|-----------|
| Customers | Customer, CustomerAddress | customer_number, status, loyalty_level_id |
| Bookings | Booking, BookingStatusHistory, BookingItem, BookingHold | booking_number, start_at, end_at, status |
| Gaming Sessions | GamingSession | started_at, ended_at, status |
| QR System | QRTicket, QRScan | token_hash, type, status |

### 12-16: Products & Payments
| Module | Models | Key Fields |
|--------|--------|-----------|
| Products & Shop | ProductCategory, Product, BranchProduct | sku, price, cost_price, status |
| Orders | Order, OrderItem, OrderStatusHistory | order_number, status, total_amount |
| Deliveries | Delivery | delivery_type, courier_id, status |
| Payments | Payment, PaymentWebhook | provider, method, status, amount |

### 17-21: Financial System
| Module | Models | Key Fields |
|--------|--------|-----------|
| Wallets & Balance | Wallet, WalletTransaction | balance, type (MAIN/BONUS), status |
| Loyalty | LoyaltyLevel, BonusTransaction | min_spent, cashback_percent |
| Finances | FinancialCategory, IncomeTransaction, ExpenseTransaction | amount, category_id, status |
| Vendors & Purchases | Vendor, PurchaseOrder, PurchaseOrderItem | vendor_id, order_number, status |

### 22-26: Inventory & Marketing
| Module | Models | Key Fields |
|--------|--------|-----------|
| Inventory | InventoryTransaction, InventoryTransfer, InventoryTransferItem | type, quantity, from_branch_id |
| Promotions | Promotion, PromotionRule, PromoCode, PromoCodeUsage | discount_value, code, usage_count |
| News & CMS | News | title, slug, content, status |
| SEO | SEOMetadata | meta_title, canonical_url, og_image_file_id |

### 27-33: Operations & Support
| Module | Models | Key Fields |
|--------|--------|-----------|
| Tournaments | Tournament, TournamentParticipant | name, game, prize_pool, status |
| Telegram Bot | TelegramAccount, TelegramMessage | telegram_user_id, chat_id |
| Notifications | Notification, PushSubscription | channel, title, status |
| Support | SupportTicket, SupportMessage | ticket_number, priority, status |
| Maintenance | Equipment, MaintenanceTicket | serial_number, category, status |
| Reviews | Review, ReviewReply | rating, title, status |
| AI Module | AIConversation, AIMessage, AITask | type, role, status |
| Segmentation | CustomerSegment, CustomerSegmentMember | criteria, status |
| Files & Settings | File, SystemSetting | file_name, key, value |

---

## Common Query Patterns

### Find Customer with All Related Data
```javascript
const customer = await prisma.customer.findUnique({
  where: { id: customerId },
  include: {
    user: true,
    bookings: { include: { items: true } },
    wallets: { include: { transactions: true } },
  }
});
```

### Get Branch with All Infrastructure
```javascript
const branch = await prisma.branch.findUnique({
  where: { id: branchId },
  include: {
    zones: {
      include: {
        gaming_stations: {
          include: { hardware: { include: { hardware_profile: true } } }
        }
      }
    },
    tariffs: true,
  }
});
```

### Get Active Bookings for Today
```javascript
const bookings = await prisma.booking.findMany({
  where: {
    status: { in: ['PAID', 'CONFIRMED', 'ARRIVED'] },
    start_at: { gte: new Date().setHours(0, 0, 0, 0) },
  },
  include: { customer: true, station: true },
});
```

### Get Financial Summary
```javascript
const summary = await prisma.$queryRaw`
  SELECT 
    SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as income,
    SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as expenses
  FROM financial_transactions
  WHERE branch_id = ${branchId}
  AND transaction_date >= ${fromDate}
`;
```

---

## Key Enums

### Status Enums
- **UserStatus:** ACTIVE, BLOCKED, SUSPENDED, PENDING
- **BookingStatus:** DRAFT, AWAITING_PAYMENT, PAID, CONFIRMED, ARRIVED, SESSION_ACTIVE, COMPLETED, CANCELLED, REFUNDED, NO_SHOW
- **OrderStatus:** PENDING, ACCEPTED, PREPARING, READY, DELIVERING, COMPLETED, CANCELLED
- **PaymentStatus:** PENDING, PAID, REFUNDED

### Type Enums
- **StationType:** PC, PS5, CONSOLE
- **ZoneType:** STANDARD, VIP, PS5, OTHER
- **BillingType:** HOURLY, FIXED, PACKAGE
- **PaymentMethod:** QR, CARD, CASH, WALLET
- **WalletType:** MAIN, BONUS

### Business Enums
- **BookingSource:** WEBSITE, PWA, TELEGRAM, STAFF, ADMIN
- **SessionSource:** BOOKING, STAFF, ADMIN
- **PromotionType:** CASHBACK, DISCOUNT, BONUS, SPECIAL
- **NotificationChannel:** PUSH, TELEGRAM, EMAIL, SMS

---

## Relationships Summary

### One-to-One
- User ↔ UserProfile
- User ↔ Employee
- User ↔ Customer
- User ↔ TelegramAccount
- User ↔ UserSettings
- Booking ↔ GamingSession

### One-to-Many
- Branch → Zone → GamingStation
- Branch → Tariff
- Branch → BranchProduct
- Customer → Booking
- Booking → Order
- Order → Delivery
- Tour... 

### Many-to-Many
- Role ↔ Permission (via RolePermission)
- Customer ↔ Segment (via CustomerSegmentMember)
- Branch ↔ User (via UserRole)

---

## Soft Delete Pattern

```javascript
// Soft delete
await prisma.user.update({
  where: { id: userId },
  data: { deleted_at: new Date() }
});

// Find non-deleted users
const users = await prisma.user.findMany({
  where: { deleted_at: null }
});

// Permanently delete
await prisma.user.delete({
  where: { id: userId }
});
```

---

## Audit Logging Pattern

```javascript
// All changes are logged via AuditLog
const audit = await prisma.auditLog.create({
  data: {
    user_id: userId,
    action: 'BOOKING_CREATED',
    entity_type: 'Booking',
    entity_id: bookingId,
    new_values: bookingData,
    ip_address: req.ip,
  }
});
```

---

## Transaction Example

```javascript
// Atomic transaction
const result = await prisma.$transaction(async (tx) => {
  // Create booking
  const booking = await tx.booking.create({
    data: { /* ... */ }
  });

  // Process payment
  const payment = await tx.payment.create({
    data: { booking_id: booking.id, /* ... */ }
  });

  // Start session
  const session = await tx.gamingSession.create({
    data: { booking_id: booking.id, /* ... */ }
  });

  return { booking, payment, session };
});
```

---

## Useful Raw Queries

### Revenue by Branch
```javascript
const revenue = await prisma.$queryRaw`
  SELECT b.name, SUM(p.amount) as total
  FROM payments p
  JOIN bookings bk ON p.booking_id = bk.id
  JOIN branches b ON bk.branch_id = b.id
  WHERE p.status = 'PAID'
  GROUP BY b.id, b.name
`;
```

### Most Popular Gaming Stations
```javascript
const popular = await prisma.$queryRaw`
  SELECT gs.station_number, COUNT(*) as bookings
  FROM gaming_stations gs
  LEFT JOIN bookings b ON gs.id = b.station_id
  GROUP BY gs.id
  ORDER BY bookings DESC
  LIMIT 10
`;
```

### Customer Lifetime Value
```javascript
const ltv = await prisma.$queryRaw`
  SELECT c.id, c.customer_number,
    SUM(b.total_amount) as total_bookings,
    SUM(o.total_amount) as total_orders,
    SUM(b.total_amount) + SUM(o.total_amount) as ltv
  FROM customers c
  LEFT JOIN bookings b ON c.id = b.customer_id
  LEFT JOIN orders o ON c.id = o.customer_id
  GROUP BY c.id
`;
```

---

## Schema Statistics

| Metric | Value |
|--------|-------|
| Total Models | 37 |
| Total Enums | 40+ |
| Total Indexes | 100+ |
| File Lines | 3,756 |
| Relations | 150+ |

---

## Migration Commands

```bash
# Create migration
npx prisma migrate dev --name "add_feature"

# Apply migrations to production
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset

# Validate schema
npx prisma validate

# Generate client
npx prisma generate

# Studio (visual editor)
npx prisma studio
```

---

## Environment Setup

```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/avatar_db"
```

```bash
# Install Prisma
npm install @prisma/client prisma

# Initialize
npx prisma init
npx prisma migrate dev --name init
```

---

## Production Deployment

```javascript
// Use connection pooling
const prisma = new PrismaClient({
  log: ['error', 'warn'],
  errorFormat: 'pretty',
});

// Disconnect on process exit
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
```

---

**Version:** 1.0  
**Last Updated:** 2024  
**Status:** Production Ready
