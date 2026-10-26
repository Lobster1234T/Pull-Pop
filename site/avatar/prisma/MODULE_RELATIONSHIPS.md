# AVATAR Platform - Module Relationships & Data Flow

## Complete Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     AVATAR PLATFORM DATABASE                     │
│                      37 Interconnected Modules                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core User System

```
┌──────────────────────────────────────────────────────────────┐
│                           USER (Hub)                          │
│  id, email, password_hash, status, last_login, deleted_at    │
└──────────┬───────────────┬─────────────┬──────────────────────┘
           │               │             │
       1:1 │           1:N │         1:1 │
┌──────────┴──┐  ┌────────┴───┐  ┌──────┴──────────┐
│ PROFILE    │  │ CONTACTS   │  │ EMPLOYEE       │
├────────────┤  ├────────────┤  ├────────────────┤
│ first_name │  │ type       │  │ position       │
│ last_name  │  │ value      │  │ hire_date      │
│ avatar_id  │  │ verified   │  │ status         │
│ language   │  └────────────┘  └────────────────┘
│ timezone   │
└────────────┘

    1:1         1:N           1:1              1:N
┌────────┐   ┌──────────┐  ┌──────────┐  ┌────────────┐
│SETTINGS│   │ SESSIONS │  │ CUSTOMER │  │ USER_ROLE  │
├────────┤   ├──────────┤  ├──────────┤  ├────────────┤
│theme   │   │device_id │  │cust_num  │  │role_id     │
│language│   │expires_at│  │status    │  │branch_id   │
└────────┘   └──────────┘  └──────────┘  └────────────┘
                                  │              │
                                  │              ↓
                            1:N   │         ┌──────────┐
                            ┌─────┼────┐    │  ROLE    │
                            │     │    │    ├──────────┤
                            ↓     ↓    ↓    │code      │
                        ┌────────────────┐  │perms...  │
                        │  AUDIT_LOG     │  └──────────┘
                        ├────────────────┤
                        │action, entity  │
                        │old_values      │
                        │new_values      │
                        └────────────────┘
```

---

## Branch Infrastructure Ecosystem

```
┌──────────────────────────────────────────────────────────────┐
│  BRANCH (name, address, city, timezone, status, is_24_7)     │
└──────────┬──────────────┬──────────────┬─────────────────────┘
           │              │              │
       1:N │          1:N │          1:N │
           ↓              ↓              ↓
    ┌──────────┐  ┌─────────────┐  ┌─────────────┐
    │ ZONE     │  │ TARIFF      │  │ PRODUCT     │
    ├──────────┤  ├─────────────┤  ├─────────────┤
    │type      │  │price        │  │sku          │
    │capacity  │  │billing_type │  │name         │
    │status    │  │duration_min │  │price        │
    └────┬─────┘  └─────┬───────┘  └──────┬──────┘
         │              │                  │
     1:N │              │ 1:N          1:N │
         ↓         1:N  ↓              ↓   │
    ┌──────────────┐  ┌────────────┐  │   │
    │GAMING_       │  │TARIFF_RULE │  │   │
    │STATION       │  ├────────────┤  │   │
    ├──────────────┤  │day_of_week │  │   │
    │number        │  │start_time  │  │   │
    │status        │  │price       │  │   │
    │type          │  └────────────┘  │   │
    └────┬─────────┘                   │   │
         │                 1:N         ↓   ↓
     1:N │            ┌────────────────────────┐
         ↓            │  BRANCH_PRODUCT        │
    ┌──────────────┐  ├────────────────────────┤
    │GAMING_       │  │product_id, price       │
    │STATION_      │  │is_available, stock_qty │
    │HARDWARE      │  └────────────────────────┘
    ├──────────────┤
    │hardware_id   │
    │valid_from    │
    │valid_to      │
    └──────────────┘
         │
     M:1 │
         ↓
    ┌──────────────┐
    │HARDWARE_     │
    │PROFILE       │
    ├──────────────┤
    │cpu, gpu, ram │
    │monitor_hz    │
    └──────────────┘
```

---

## Booking & Gaming Flow

```
CUSTOMER (user + profile + loyalty)
    │
    │ 1:N
    ↓
┌──────────────────────────────────────────┐
│  BOOKING                                 │
│  booking_number, start_at, end_at       │
│  status: DRAFT → PAID → CONFIRMED...    │
└──────┬──────────┬──────────┬────────────┘
       │          │          │
   1:N │      1:N │      1:N │
       ↓          ↓          ↓
   ┌────────┐ ┌────────┐ ┌──────────┐
   │ ORDER  │ │ ITEM   │ │ PAYMENT  │
   └────────┘ └────────┘ └──────────┘

    1:1
    ↓
┌──────────────────────┐     1:N
│ GAMING_SESSION       │─────────→ ORDER (food/drink)
│ started_at, ended_at │
│ status, duration     │
└──────────────────────┘
         │
         │ 1:1
         ↓
┌──────────────────────┐
│ BOOKING (reference)  │
└──────────────────────┘

Status Flow:
DRAFT
  ↓
AWAITING_PAYMENT
  ↓
PAID
  ↓
CONFIRMED
  ↓
ARRIVED → SESSION_ACTIVE
  ↓
COMPLETED or CANCELLED/REFUNDED
```

---

## QR System

```
BOOKING / CUSTOMER
    │
    │ 1:N
    ↓
┌──────────────────────┐
│ QR_TICKET            │
│ token_hash           │
│ type: ENTRY/SESSION  │
│ status: ACTIVE/USED  │
└──────┬───────────────┘
       │
       │ 1:N
       ↓
┌──────────────────────┐
│ QR_SCAN              │
│ scanned_by (USER)    │
│ action, result       │
│ device_info, ip      │
└──────────────────────┘
```

---

## Financial System

```
BRANCH
  │
  ├─ 1:N ─────────────────────┐
  │                           │
  ↓                           ↓
┌──────────────────┐  ┌──────────────────┐
│ INCOME_          │  │ EXPENSE_         │
│ TRANSACTION      │  │ TRANSACTION      │
│ amount, date     │  │ amount, status   │
└──────────────────┘  └────┬─────────────┘
       ↑                    │
       │ M:1                │
       │                M:1 │
       │                ↓
       └──────────────────────────┐
                                  ↓
                      ┌──────────────────────┐
                      │ FINANCIAL_CATEGORY   │
                      │ (hierarchical)       │
                      │ type: INCOME/EXPENSE │
                      └──────────────────────┘

Income Sources:
├── Gaming Sessions (Booking)
├── Shop Sales (Order)
└── Other Services

Expense Categories:
├── Rent
├── Utilities
├── Salaries
├── Purchases (Vendor)
├── Maintenance
└── Marketing
```

---

## Procurement & Inventory

```
VENDOR
  │
  │ 1:N
  ├──────────────────────────┐
  │                          │
  ↓                          ↓
┌──────────────────┐  ┌──────────────────┐
│ PURCHASE_ORDER   │  │ EXPENSE_TX       │
│ status: DRAFT... │  │ vendor_ref       │
└────┬─────────────┘  └──────────────────┘
     │
     │ 1:N
     ↓
┌──────────────────┐
│ PO_ITEM          │
│ product_id       │
│ quantity, cost   │
└────┬─────────────┘
     │
     │ M:1
     ↓
PRODUCT
     │
     │ 1:N
     ├─────────────────────────┐
     │                         │
     ↓                         ↓
┌─────────────────┐  ┌──────────────────┐
│BRANCH_PRODUCT   │  │INVENTORY_        │
│stock, price     │  │TRANSACTION       │
└─────────────────┘  │type: PURCHASE    │
                     │SALE, RETURN...   │
                     └──────────────────┘

Inter-branch Transfers:
BRANCH (from)
    │
    ├─ 1:N
    │
    ↓
INVENTORY_TRANSFER
    │
    ├─ 1:N
    │
    ↓
INVENTORY_TRANSFER_ITEM
```

---

## Order & Delivery Pipeline

```
CUSTOMER
    │
    │ 1:N
    ↓
┌──────────────────────┐
│ ORDER                │
│ order_number         │
│ status: PENDING...   │
└──────┬───────────────┘
       │
   1:N │
       ├────────────────┬────────────────┐
       ↓                ↓                ↓
   ┌────────┐  ┌───────────────┐  ┌──────────┐
   │ ITEM   │  │ STATUS_       │  │ PAYMENT  │
   │        │  │ HISTORY       │  │          │
   └────────┘  └───────────────┘  └──────────┘
       │
       │ M:1
       ↓
    PRODUCT

    1:1
    ↓
┌──────────────┐
│ DELIVERY     │
│ courier_id   │
│ status       │
│ delivered_at │
└──────────────┘
```

---

## Payment & Wallet System

```
BOOKING / ORDER
    │
    │ 1:N
    ↓
┌──────────────────────┐
│ PAYMENT              │
│ method: QR/CARD...   │
│ status: PAID/FAILED  │
│ provider, amount     │
└──────┬───────────────┘
       │
       │ 1:N (webhooks)
       ↓
┌──────────────────────┐
│ PAYMENT_WEBHOOK      │
│ event_id, event_type │
│ payload, signature    │
└──────────────────────┘

CUSTOMER
    │
    │ 1:N
    ↓
┌──────────────────────┐
│ WALLET               │
│ type: MAIN/BONUS     │
│ balance, status      │
└──────┬───────────────┘
       │
       │ 1:N
       ↓
┌──────────────────────┐
│ WALLET_TRANSACTION   │
│ type: DEPOSIT...     │
│ balance_before/after │
└──────────────────────┘
```

---

## Loyalty & Promotions

```
CUSTOMER
    │
    │ M:1
    ↓
┌──────────────────┐
│ LOYALTY_LEVEL    │
│ min_spent        │
│ discount_percent │
│ cashback_percent │
└─────────────────┘

    1:N
    ↓
PROMOTION
    │
    ├─ 1:N ───────────┐
    │                 │
    ↓                 ↓
┌────────────────┐ ┌──────────────┐
│ PROMOTION_RULE │ │ PROMO_CODE   │
│ branch_id      │ │ code, limit  │
│ product_id     │ │ usage_count  │
│ etc...         │ └────┬─────────┘
└────────────────┘      │
                    1:N │
                        ↓
                  ┌──────────────┐
                  │ PROMO_CODE_  │
                  │ USAGE        │
                  │ customer_id  │
                  │ discount_amt │
                  └──────────────┘

Bonus System:
CUSTOMER
    │
    │ 1:N
    ↓
BONUS_TRANSACTION
    │
    ├─ type: EARNED (from purchase)
    ├─ type: SPENT (used)
    ├─ type: EXPIRED
    └─ type: ADJUSTMENT
```

---

## Content & Marketing

```
NEWS
    │
    ├─ 1:1
    ↓
AUTHOR (USER)

PROMOTION
    │
    ├─ 1:1
    ↓
CREATED_BY (USER)

SEO_METADATA
    │
    ├─ entity_type + entity_id
    │  (can reference any page)
    │
    └─ meta_title, og_image_file_id

TOURNAMENT
    │
    ├─ 1:N
    ↓
TOURNAMENT_PARTICIPANT
    │
    └─ customer_id (M:1)
```

---

## Notifications & Communication

```
USER
    │
    ├─ 1:N ───────────────────┐
    │                         │
    ↓                         ↓
┌──────────────┐  ┌─────────────────────┐
│ NOTIFICATION │  │ PUSH_SUBSCRIPTION   │
│ type, channel│  │ endpoint, auth key  │
│ status       │  │ device_type         │
└──────────────┘  └─────────────────────┘

TELEGRAM_ACCOUNT
    │
    ├─ 1:1 (USER)
    │
    └─ 1:N ─────→ TELEGRAM_MESSAGE
                  direction: IN/OUT
                  payload: JSON
```

---

## Support System

```
CUSTOMER / EMPLOYEE
    │
    │ 1:N
    ↓
┌──────────────────────┐
│ SUPPORT_TICKET       │
│ ticket_number        │
│ priority, category   │
│ status: OPEN...      │
└──────┬───────────────┘
       │
       │ 1:N
       ↓
┌──────────────────────┐
│ SUPPORT_MESSAGE      │
│ sender_id (USER)     │
│ message, attachment  │
└──────────────────────┘
```

---

## Maintenance & Equipment

```
BRANCH
    │
    ├─ 1:N
    ↓
EQUIPMENT
    │
    ├─ M:1 (station_id)
    │
    └─ 1:N ────────────────┐
                           ↓
GAMING_STATION    ┌──────────────────────┐
                  │ MAINTENANCE_TICKET   │
                  │ ticket_number        │
                  │ priority, category   │
                  │ status: OPEN...      │
                  └──────────────────────┘
```

---

## Reviews System

```
CUSTOMER
    │
    │ 1:N
    ↓
┌──────────────────────┐
│ REVIEW               │
│ rating, title        │
│ content              │
│ status: PENDING...   │
└──────┬───────────────┘
       │
       │ 1:N
       ↓
┌──────────────────────┐
│ REVIEW_REPLY         │
│ author_id (USER)     │
│ content              │
└──────────────────────┘
```

---

## AI Module

```
USER
    │
    │ 1:N
    ↓
┌──────────────────────┐
│ AI_CONVERSATION      │
│ type: ASSISTANT...   │
│ status: ACTIVE...    │
└──────┬───────────────┘
       │
       │ 1:N
       ↓
┌──────────────────────┐
│ AI_MESSAGE           │
│ role: USER/ASSISTANT │
│ content, model       │
│ tokens_used          │
└──────────────────────┘

USER
    │
    │ 1:N
    ↓
┌──────────────────────┐
│ AI_TASK              │
│ type: ANALYSIS...    │
│ status: PROCESSING   │
│ input_data, result   │
└──────────────────────┘
```

---

## Customer Segmentation

```
CUSTOMER_SEGMENT
    │
    ├─ criteria: JSON
    │
    └─ 1:N ──────────────────┐
                             ↓
                    ┌──────────────────────┐
                    │ CUSTOMER_SEGMENT_    │
                    │ MEMBER               │
                    │ customer_id (M:1)    │
                    │ assigned_at, expires │
                    └──────────────────────┘

Can be used in:
- PROMOTION.audience_type = SEGMENT
- Targeted marketing campaigns
- Personalized offers
```

---

## Files & Settings

```
FILE
    │
    ├─ uploaded_by (USER)
    │
    └─ storage_key: references
       - UserProfile.avatar_file_id
       - Product.image_file_id
       - BranchMap.image_file_id
       - News.cover_file_id
       - etc...

SYSTEM_SETTING
    │
    ├─ scope: GLOBAL / BRANCH
    │
    ├─ updated_by (USER)
    │
    └─ value: JSON (flexible config)
```

---

## Complete Data Flow Example: Booking to Completion

```
1. CUSTOMER BOOKING
   User → Customer → Booking
                    │
                    ├─ select Tariff
                    ├─ select GamingStation
                    └─ set dates (start_at, end_at)

2. BOOKING STATUS
   DRAFT → AWAITING_PAYMENT
           └─ Payment created (QR/CARD/CASH)

3. PAYMENT PROCESSING
   Payment.status: PENDING → PAID
           │
           └─ PaymentWebhook received from provider
              (signature verified, processed)

4. CONFIRMATION
   Booking.status: PAID → CONFIRMED
           │
           ├─ QRTicket created
           ├─ Notification sent to Customer
           └─ AuditLog recorded

5. ARRIVAL
   Booking.status: CONFIRMED → ARRIVED
           │
           └─ QR scanned at entry
              (QRScan.action = ENTRY)

6. SESSION ACTIVE
   Booking.status: ARRIVED → SESSION_ACTIVE
           │
           ├─ GamingSession created
           │  (started_at = now)
           │
           ├─ GamingStation.status = OCCUPIED
           │
           └─ Customer can order food (Order created)
              ├─ Order → OrderItem
              └─ Payment processed separately

7. ORDER DELIVERY
   Order.status progression:
   PENDING → ACCEPTED → PREPARING → READY → DELIVERING → COMPLETED
           │
           └─ Delivery created (courier assigned)
              └─ QR scanned (QRScan.action = ORDER_PICKUP)

8. SESSION END
   GamingSession.ended_at = now
   Booking.status: SESSION_ACTIVE → COMPLETED
           │
           ├─ Calculate bonuses earned
           ├─ Update customer loyalty_level
           ├─ Add BonusTransaction
           └─ Send completion notification

9. FINANCIAL POSTING
   IncomeTransaction created:
   ├─ from Booking (main session)
   └─ from Order (food/drinks)

10. ANALYTICS
    Data available for:
    ├─ Revenue reports
    ├─ Customer analytics
    ├─ Station occupancy
    ├─ Loyalty calculations
    └─ AI analysis
```

---

## Concurrent Operations Example

```
Multiple customers can simultaneously:

├─ Create different bookings
│  └─ Each: Booking → BookingStatusHistory → AuditLog

├─ Place orders
│  └─ Each: Order → OrderItem → Delivery → Payment

├─ Use QR system
│  └─ Each: QRScan → Notification

├─ Earn/spend bonuses
│  └─ Each: BonusTransaction → WalletTransaction

├─ Generate financial transactions
│  └─ Each: IncomeTransaction / ExpenseTransaction

└─ Create support tickets
   └─ Each: SupportTicket → SupportMessage

All isolated in PostgreSQL with:
- ACID transactions
- Foreign key constraints
- Cascading updates/deletes
- Proper indexing for concurrency
```

---

## Query Optimization Patterns

### N+1 Prevention
```typescript
// ❌ Bad: N+1 queries
const bookings = await prisma.booking.findMany()
for (const booking of bookings) {
  const customer = await prisma.customer.findUnique(...)
}

// ✅ Good: Single query with include
const bookings = await prisma.booking.findMany({
  include: { customer: { include: { user: true } } }
})
```

### Complex Relationships
```typescript
// Get customer with full context
const customer = await prisma.customer.findUnique({
  where: { id: customerId },
  include: {
    user: {
      include: {
        roles: { include: { role: { include: { permissions: true } } } }
      }
    },
    bookings: {
      include: {
        items: true,
        gaming_session: true,
        payments: true,
        orders: { include: { items: true } }
      }
    },
    wallets: { include: { transactions: true } },
    loyalty_level: true
  }
})
```

---

## Index Strategy

Key indexes for performance:
```sql
-- User queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- Branch queries
CREATE INDEX idx_branch_status ON branches(status);

-- Booking queries
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_start_at ON bookings(start_at);

-- Payment queries
CREATE INDEX idx_payments_status ON payments(status);

-- Transaction queries
CREATE INDEX idx_income_transaction_date ON income_transactions(transaction_date);
CREATE INDEX idx_expense_transaction_date ON expense_transactions(expense_date);

-- Audit trail
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

---

**Version:** 1.0  
**Status:** Complete  
**Last Updated:** 2024
