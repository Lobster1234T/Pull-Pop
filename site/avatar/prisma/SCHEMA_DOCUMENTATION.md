# AVATAR Platform - Prisma Schema Documentation

## Overview

Complete PostgreSQL database schema for AVATAR Platform - a comprehensive management system for a network of gaming clubs.

**File:** `schema.prisma`  
**Lines:** 3,756  
**Database:** PostgreSQL  
**ORM:** Prisma 5.x  
**Total Models:** 37 + supporting enums and relations

---

## Schema Structure

### Generator & Datasource
- **Provider:** PostgreSQL
- **Client:** @prisma/client
- **Environment Variable:** DATABASE_URL

### Key Features
✅ UUID primary keys for all models  
✅ Comprehensive indexes for performance  
✅ Soft delete support (User.deleted_at)  
✅ Timestamps on all entities (created_at, updated_at)  
✅ JSON fields for flexible metadata storage  
✅ Enum types for status and type fields  
✅ Complete relationship mappings  
✅ Audit logging for all actions  
✅ Multi-branch support  
✅ RBAC (Role-Based Access Control)

---

## 37 Core Modules

### 1. Users & Authentication (7 models)
- **User** - Main user account with soft delete
- **UserProfile** - User profile information
- **UserContact** - Additional contacts (phone, email, Telegram, WhatsApp)
- **UserSettings** - User preferences
- **UserConsent** - Privacy and terms consent tracking
- **UserSession** - Session and refresh token management
- **AuditLog** - Complete audit trail

**Key Fields:**
- User: id, email, phone, password_hash, status, last_login_at, deleted_at
- UserProfile: first_name, last_name, avatar_file_id, birth_date, language, timezone
- UserContact: type (PHONE/EMAIL/TELEGRAM/WHATSAPP), value, is_verified

---

### 2. Roles & Permissions (4 models)
- **Role** - System roles (Owner, Manager, Admin, etc.)
- **Permission** - Fine-grained permissions
- **RolePermission** - Role-Permission mapping (M:N)
- **UserRole** - User-Role assignment per branch

**Supported Roles:**
- Owner, Network Manager, Branch Manager, Administrator
- Cashier, Bar/Kitchen, Courier, Technical Employee
- Marketer, Financial Employee, Support, Customer

**Permission Examples:**
- booking.read, booking.create, booking.cancel
- finance.read, finance.create, orders.manage
- branches.manage, employees.manage, analytics.read

---

### 3. Employees (1 model)
- **Employee** - Employee information and employment tracking
  - Status: ACTIVE, VACATION, SUSPENDED, TERMINATED
  - Fields: employee_number, position, hire_date, termination_date

---

### 4. Branches & Infrastructure (4 models)
- **Branch** - Gaming club locations
- **BranchWorkingHours** - Regular working schedule
- **BranchSpecialHours** - Special hours (holidays, events)
- **BranchMap** - Branch map visualizations

**Branch Fields:**
- Identification: name, slug, code, description
- Location: address, city, district, postal_code, latitude, longitude
- Contact: phone, whatsapp, email, timezone
- Properties: is_24_7, status (ACTIVE/INACTIVE/MAINTENANCE)

---

### 5. Zones (1 model)
- **Zone** - Gaming zones within branches
  - Type: STANDARD, VIP, PS5, OTHER
  - Status: ACTIVE, INACTIVE
  - Fields: name, code, capacity, sort_order

---

### 6. Gaming Stations & Hardware (3 models)
- **GamingStation** - Individual computers/stations
  - Type: PC, PS5, CONSOLE
  - Status: AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE, DISABLED
- **HardwareProfile** - Hardware configurations
  - Fields: cpu, gpu, ram_gb, storage, monitor_model, monitor_hz
- **GamingStationHardware** - Station-Hardware mapping with validity dates

**Standard Config:** Intel Core i5-14600, RTX 5070, 32GB RAM, 380Hz

---

### 7. Tariffs & Pricing (2 models)
- **Tariff** - Pricing plans
  - BillingType: HOURLY, FIXED, PACKAGE
  - Status: ACTIVE, INACTIVE
- **TariffRule** - Time/day-based pricing rules
  - Fields: day_of_week, start_time, end_time, price, priority

---

### 8. Customers & CRM (2 models)
- **Customer** - Customer accounts
  - Status: ACTIVE, BLOCKED, INACTIVE
  - Fields: customer_number, loyalty_level_id, preferred_branch_id
  - Tracking: first_visit_at, last_visit_at, total_visits, total_spent
- **CustomerAddress** - Delivery addresses

---

### 9. Bookings (4 models)
- **Booking** - Gaming session reservations
  - Status: DRAFT, AWAITING_PAYMENT, PAID, CONFIRMED, ARRIVED, SESSION_ACTIVE, COMPLETED, CANCELLED, REFUNDED, NO_SHOW, PAYMENT_EXPIRED
  - Source: WEBSITE, PWA, TELEGRAM, STAFF, ADMIN
  - Fields: booking_number, start_at, end_at, subtotal, discount_amount, bonus_amount, total_amount
- **BookingStatusHistory** - Status change tracking
- **BookingItem** - Additional items in booking
- **BookingHold** - Temporary station reservations

---

### 10. Gaming Sessions (1 model)
- **GamingSession** - Actual play sessions
  - Status: ACTIVE, COMPLETED, CANCELLED
  - Source: BOOKING, STAFF, ADMIN
  - Fields: started_at, ended_at, planned_end_at, actual_duration_minutes

---

### 11. QR System (2 models)
- **QRTicket** - QR tickets for various actions
  - Type: ENTRY, PAYMENT, SESSION, ORDER
  - Status: ACTIVE, USED, EXPIRED, REVOKED
- **QRScan** - QR scan history
  - Action: ENTRY, SESSION_START, ORDER_PICKUP, OTHER
  - Result: SUCCESS, FAILED

---

### 12. Products & Shop (3 models)
- **ProductCategory** - Product categories (hierarchical)
  - Status: ACTIVE, INACTIVE
- **Product** - Products for sale
  - Fields: sku, name, slug, price, cost_price, image_file_id
  - Status: ACTIVE, INACTIVE, is_featured
- **BranchProduct** - Branch-specific product availability
  - Fields: price, is_available, stock_quantity, min_stock_level

---

### 13. Orders (3 models)
- **Order** - Food/drink/merchandise orders
  - Status: PENDING, ACCEPTED, PREPARING, READY, DELIVERING, COMPLETED, CANCELLED
  - PaymentStatus: PENDING, PAID, REFUNDED
  - DeliveryType: TO_STATION, PICKUP, EXTERNAL
- **OrderItem** - Products in order
- **OrderStatusHistory** - Status change tracking

---

### 14. Deliveries (1 model)
- **Delivery** - Order deliveries
  - Status: PENDING, ASSIGNED, PICKED_UP, DELIVERING, DELIVERED, CANCELLED
  - Fields: courier_id, assigned_at, picked_up_at, delivered_at

---

### 15. Payments (2 models)
- **Payment** - Payment records
  - Method: QR, CARD, CASH, WALLET
  - Status: PENDING, PAID, FAILED, REFUNDED
  - Fields: provider, provider_payment_id, amount, currency
- **PaymentWebhook** - Payment provider webhooks
  - Fields: event_id, event_type, payload, signature_valid, processed

---

### 16. Wallets & Balance (2 models)
- **Wallet** - Customer wallets
  - Type: MAIN, BONUS
  - Status: ACTIVE, BLOCKED
- **WalletTransaction** - Wallet history
  - Type: DEPOSIT, WITHDRAWAL, CASHBACK, REFUND, ADJUSTMENT
  - Fields: amount, balance_before, balance_after, reference_type

---

### 17. Loyalty (2 models)
- **LoyaltyLevel** - Loyalty tiers
  - Fields: min_spent, discount_percent, cashback_percent, priority
- **BonusTransaction** - Bonus/cashback tracking
  - Type: EARNED, SPENT, EXPIRED, ADJUSTMENT

---

### 18. Finances (2 models)
- **FinancialCategory** - Transaction categories (hierarchical)
  - Type: INCOME, EXPENSE
- **IncomeTransaction** - Income tracking
- **ExpenseTransaction** - Expense tracking
  - Status: PENDING, APPROVED, REJECTED

---

### 19. Vendors & Purchases (3 models)
- **Vendor** - Suppliers
  - Status: ACTIVE, INACTIVE
  - Fields: name, company_name, tax_id, address
- **PurchaseOrder** - Purchase orders
  - Status: DRAFT, ORDERED, RECEIVED, CANCELLED
- **PurchaseOrderItem** - Items in purchase order

---

### 20. Inventory (3 models)
- **InventoryTransaction** - Inventory changes
  - Type: PURCHASE, SALE, RETURN, WRITEOFF, ADJUSTMENT, TRANSFER
- **InventoryTransfer** - Inter-branch transfers
  - Status: DRAFT, SENT, RECEIVED, CANCELLED
- **InventoryTransferItem** - Items in transfer

---

### 21. Promotions & Promo Codes (4 models)
- **Promotion** - Campaign definitions
  - Type: CASHBACK, DISCOUNT, BONUS, SPECIAL
  - DiscountType: PERCENT, FIXED
  - AudienceType: ALL, NEW, VIP, SEGMENT
  - Status: DRAFT, ACTIVE, EXPIRED
- **PromotionRule** - Promotion conditions
- **PromoCode** - Individual promo codes
- **PromoCodeUsage** - Usage tracking

---

### 22. News & CMS (1 model)
- **News** - News articles
  - Status: DRAFT, PUBLISHED, ARCHIVED
  - Fields: title, slug, excerpt, content, cover_file_id, published_at

---

### 23. SEO (1 model)
- **SEOMetadata** - SEO metadata for pages
  - Fields: meta_title, meta_description, canonical_url, og_title, og_image_file_id

---

### 24. Tournaments (2 models)
- **Tournament** - Gaming tournaments
  - Status: DRAFT, OPEN, CLOSED, IN_PROGRESS, COMPLETED, CANCELLED
  - Fields: name, game, start_at, registration_deadline, prize_pool
- **TournamentParticipant** - Participants
  - Status: REGISTERED, CONFIRMED, DISQUALIFIED, COMPLETED

---

### 25. Telegram Bot (2 models)
- **TelegramAccount** - Telegram account linking
  - Fields: telegram_user_id, username, first_name, last_name, is_active
- **TelegramMessage** - Message history
  - Direction: INBOUND, OUTBOUND
  - Fields: telegram_message_id, chat_id, message_type, payload

---

### 26. Notifications (2 models)
- **Notification** - System notifications
  - Channel: PUSH, TELEGRAM, EMAIL, SMS
  - Status: PENDING, SENT, DELIVERED, FAILED, READ
- **PushSubscription** - Web push subscriptions

---

### 27. Support (2 models)
- **SupportTicket** - Support requests
  - Category: BILLING, TECHNICAL, ACCOUNT, BOOKING, GENERAL
  - Priority: LOW, MEDIUM, HIGH, URGENT
  - Status: OPEN, IN_PROGRESS, WAITING, RESOLVED, CLOSED
- **SupportMessage** - Ticket messages

---

### 28. Maintenance (2 models)
- **Equipment** - Equipment registry
  - Status: OPERATIONAL, MAINTENANCE, BROKEN, DISPOSED
  - Fields: serial_number, inventory_number, purchase_date, warranty_until
- **MaintenanceTicket** - Maintenance requests
  - Priority: LOW, MEDIUM, HIGH, CRITICAL
  - Category: HARDWARE, SOFTWARE, NETWORK, PERIPHERALS, COOLING, OTHER
  - Status: OPEN, IN_PROGRESS, WAITING_PARTS, RESOLVED, CLOSED

---

### 29. Reviews (2 models)
- **Review** - Customer reviews
  - Status: PENDING, APPROVED, REJECTED
  - Fields: rating, title, content
- **ReviewReply** - Reply to reviews

---

### 30. AI Module (3 models)
- **AIConversation** - AI conversations
  - Type: ASSISTANT, ANALYSIS, PREDICTION, RECOMMENDATION
  - Status: ACTIVE, ARCHIVED, DELETED
- **AIMessage** - Messages in conversations
  - Role: USER, ASSISTANT, SYSTEM
- **AITask** - AI tasks
  - Type: ANALYSIS, PREDICTION, RECOMMENDATION, GENERATION
  - Status: PENDING, PROCESSING, COMPLETED, FAILED

---

### 31. Customer Segmentation (2 models)
- **CustomerSegment** - Customer segments
  - Status: ACTIVE, INACTIVE
  - Fields: criteria (JSON)
- **CustomerSegmentMember** - Segment membership

---

### 32. Files (1 model)
- **File** - File storage metadata
  - Fields: file_name, storage_key, mime_type, size_bytes, width, height

---

### 33. Settings (1 model)
- **SystemSetting** - System and branch settings
  - Scope: GLOBAL, BRANCH
  - Fields: key, value (JSON)

---

## Enum Types Summary

| Enum | Values |
|------|--------|
| UserStatus | ACTIVE, BLOCKED, SUSPENDED, PENDING |
| EmployeeStatus | ACTIVE, VACATION, SUSPENDED, TERMINATED |
| BranchStatus | ACTIVE, INACTIVE, MAINTENANCE |
| ZoneStatus | ACTIVE, INACTIVE |
| ZoneType | STANDARD, VIP, PS5, OTHER |
| StationStatus | AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE, DISABLED |
| StationType | PC, PS5, CONSOLE |
| BillingType | HOURLY, FIXED, PACKAGE |
| TariffStatus | ACTIVE, INACTIVE |
| CustomerStatus | ACTIVE, BLOCKED, INACTIVE |
| BookingStatus | DRAFT, AWAITING_PAYMENT, PAID, CONFIRMED, ARRIVED, SESSION_ACTIVE, COMPLETED, CANCELLED, REFUNDED, NO_SHOW, PAYMENT_EXPIRED |
| BookingSource | WEBSITE, PWA, TELEGRAM, STAFF, ADMIN |
| SessionStatus | ACTIVE, COMPLETED, CANCELLED |
| SessionSource | BOOKING, STAFF, ADMIN |
| QRStatus | ACTIVE, USED, EXPIRED, REVOKED |
| QRType | ENTRY, PAYMENT, SESSION, ORDER |
| CategoryStatus | ACTIVE, INACTIVE |
| ProductStatus | ACTIVE, INACTIVE |
| OrderStatus | PENDING, ACCEPTED, PREPARING, READY, DELIVERING, COMPLETED, CANCELLED |
| PaymentStatus | PENDING, PAID, REFUNDED |
| DeliveryStatus | PENDING, ASSIGNED, PICKED_UP, DELIVERING, DELIVERED, CANCELLED |
| PaymentMethod | QR, CARD, CASH, WALLET |
| WalletType | MAIN, BONUS |
| WalletStatus | ACTIVE, BLOCKED |
| TransactionType | DEPOSIT, WITHDRAWAL, CASHBACK, REFUND, ADJUSTMENT |
| LoyaltyStatus | ACTIVE, INACTIVE |
| BonusType | EARNED, SPENT, EXPIRED, ADJUSTMENT |
| FinanceType | INCOME, EXPENSE |
| FinanceStatus | ACTIVE, INACTIVE |
| VendorStatus | ACTIVE, INACTIVE |
| PurchaseStatus | DRAFT, ORDERED, RECEIVED, CANCELLED |
| InventoryType | PURCHASE, SALE, RETURN, WRITEOFF, ADJUSTMENT, TRANSFER |
| TransferStatus | DRAFT, SENT, RECEIVED, CANCELLED |
| PromotionType | CASHBACK, DISCOUNT, BONUS, SPECIAL |
| DiscountType | PERCENT, FIXED |
| AudienceType | ALL, NEW, VIP, SEGMENT |
| PromotionStatus | DRAFT, ACTIVE, EXPIRED |
| NewsStatus | DRAFT, PUBLISHED, ARCHIVED |
| TournamentStatus | DRAFT, OPEN, CLOSED, IN_PROGRESS, COMPLETED, CANCELLED |
| ParticipantStatus | REGISTERED, CONFIRMED, DISQUALIFIED, COMPLETED |
| MessageDirection | INBOUND, OUTBOUND |
| NotificationChannel | PUSH, TELEGRAM, EMAIL, SMS |
| NotificationStatus | PENDING, SENT, DELIVERED, FAILED, READ |
| TicketCategory | BILLING, TECHNICAL, ACCOUNT, BOOKING, GENERAL |
| TicketPriority | LOW, MEDIUM, HIGH, URGENT |
| TicketStatus | OPEN, IN_PROGRESS, WAITING, RESOLVED, CLOSED |
| EquipmentStatus | OPERATIONAL, MAINTENANCE, BROKEN, DISPOSED |
| MaintenancePriority | LOW, MEDIUM, HIGH, CRITICAL |
| MaintenanceCategory | HARDWARE, SOFTWARE, NETWORK, PERIPHERALS, COOLING, OTHER |
| MaintenanceStatus | OPEN, IN_PROGRESS, WAITING_PARTS, RESOLVED, CLOSED |
| ReviewStatus | PENDING, APPROVED, REJECTED |
| ConversationType | ASSISTANT, ANALYSIS, PREDICTION, RECOMMENDATION |
| AIStatus | ACTIVE, ARCHIVED, DELETED |
| MessageRole | USER, ASSISTANT, SYSTEM |
| TaskType | ANALYSIS, PREDICTION, RECOMMENDATION, GENERATION |
| AITaskStatus | PENDING, PROCESSING, COMPLETED, FAILED |
| SegmentStatus | ACTIVE, INACTIVE |
| SettingScope | GLOBAL, BRANCH |
| ContactType | PHONE, EMAIL, TELEGRAM, WHATSAPP |
| Theme | LIGHT, DARK, AUTO |
| ConsentType | PRIVACY_POLICY, TERMS_OF_SERVICE, MARKETING, DATA_PROCESSING |
| ScanAction | ENTRY, SESSION_START, ORDER_PICKUP, OTHER |
| ScanResult | SUCCESS, FAILED |
| HoldStatus | ACTIVE, EXPIRED, CONVERTED |
| DeliveryType | TO_STATION, PICKUP, EXTERNAL |
| ExpenseStatus | PENDING, APPROVED, REJECTED |
| PromocodeStatus | ACTIVE, INACTIVE, EXPIRED |

---

## Key Relationships & Architecture

### User Hub (Central to all operations)
```
User
├── UserProfile (1:1)
├── UserContact (1:N)
├── UserRole (1:N) → Role → Permission
├── Employee (1:1)
├── Customer (1:1)
├── AuditLog (1:N)
└── Multiple operational records
```

### Branch Infrastructure
```
Branch
├── Zone (1:N)
│  └── GamingStation (1:N)
│     ├── GamingStationHardware (1:N)
│     └── MaintenanceTicket (1:N)
├── BranchWorkingHours (1:N)
├── BranchSpecialHours (1:N)
├── Tariff (1:N)
├── BranchProduct (1:N)
├── Equipment (1:N)
└── Multiple transaction records
```

### Booking Workflow
```
Booking
├── Tariff
├── GamingStation
├── Customer
├── BookingStatusHistory (1:N)
├── BookingItem (1:N)
├── GamingSession (1:1)
├── Order (1:N)
├── Payment (1:N)
└── QRTicket (1:N)
```

### Order & Delivery
```
Order
├── OrderItem (1:N)
├── OrderStatusHistory (1:N)
├── Delivery (1:N)
└── Payment (1:N)
```

### Customer Experience
```
Customer
├── Booking (1:N)
├── Order (1:N)
├── GamingSession (1:N)
├── Wallet (1:N)
├── BonusTransaction (1:N)
├── Review (1:N)
├── SupportTicket (1:N)
└── CustomerSegmentMember (1:N)
```

### Financial System
```
Transaction
├── IncomeTransaction
│  └── FinancialCategory
├── ExpenseTransaction
│  ├── FinancialCategory
│  ├── Vendor
│  └── PurchaseOrder
├── WalletTransaction
└── BonusTransaction
```

---

## Indexes & Performance

All models include strategic indexes on:
- Primary keys (id) - automatically indexed
- Foreign keys (branch_id, customer_id, etc.)
- Status fields (status, payment_status, etc.)
- Frequently queried fields (email, slug, code)
- Timestamp fields (created_at, start_at)
- Search fields (name, title, etc.)

---

## Data Integrity Features

✅ **Cascading Deletes** - Related records cleaned up automatically  
✅ **Foreign Key Constraints** - Referential integrity enforced  
✅ **Unique Constraints** - On emails, codes, and identifiers  
✅ **Required Fields** - Non-null fields prevent incomplete records  
✅ **Status Enums** - Type-safe status tracking  
✅ **Soft Deletes** - User.deleted_at preserves historical data  
✅ **Audit Trail** - AuditLog tracks all changes  
✅ **Transaction Timestamps** - created_at, updated_at on all entities  

---

## JSON Fields (Flexible Data)

Used for metadata and configuration:
- `UserConsent.ip_address` → IP tracking
- `BookingItem.metadata` → Extra item properties
- `OrderItem.metadata` → Product variations
- `QRScan.device_info` → Device details
- `PaymentWebhook.payload` → Provider response
- `AIMessage.metadata` → Model parameters
- `CustomerSegment.criteria` → Segment conditions
- `Notification.data` → Custom data
- `SystemSetting.value` → Configuration values

---

## Migration Strategy

To apply this schema to your database:

```bash
# 1. Install Prisma if not already installed
npm install @prisma/client prisma --save-dev

# 2. Generate Prisma client
npx prisma generate

# 3. Create and apply migrations
npx prisma migrate dev --name init

# 4. Seed initial data (roles, permissions, etc.)
npx prisma db seed
```

---

## Seeding Initial Data

The schema is ready to be seeded with:
- System roles (12 predefined)
- Permissions (for each role)
- Default loyalty levels
- Financial categories
- System settings

---

## API Query Patterns

### Example Queries

**Get customer with all related data:**
```javascript
const customer = await prisma.customer.findUnique({
  where: { id: customerId },
  include: {
    user: { include: { roles: { include: { role: true } } } },
    bookings: { include: { items: true, payments: true } },
    wallets: { include: { transactions: true } },
    reviews: true,
  }
});
```

**Get branch with infrastructure:**
```javascript
const branch = await prisma.branch.findUnique({
  where: { id: branchId },
  include: {
    zones: { include: { gaming_stations: true } },
    tariffs: { include: { rules: true } },
    products: true,
  }
});
```

**Get booking with full context:**
```javascript
const booking = await prisma.booking.findUnique({
  where: { id: bookingId },
  include: {
    customer: { include: { user: true } },
    tariff: true,
    gaming_session: true,
    payments: true,
    orders: { include: { items: true } },
  }
});
```

---

## Performance Considerations

✅ Proper indexing on all commonly queried fields  
✅ Relationship eager-loading to minimize N+1 queries  
✅ JSON fields for flexible metadata without extra tables  
✅ Partitioning strategy for large tables (transactions, audit logs)  
✅ Connection pooling with Prisma in production  
✅ Query optimization with proper select/include patterns  

---

## Next Steps

1. **Environment Setup** - Configure DATABASE_URL in .env
2. **Migration** - Run `npx prisma migrate dev --name init`
3. **Seeding** - Create seed data for roles, permissions, categories
4. **Client Generation** - Run `npx prisma generate`
5. **Backend Integration** - Connect Prisma client to your API
6. **API Endpoints** - Build CRUD operations for all modules
7. **Validation** - Add zod/yup schemas for input validation
8. **Testing** - Create integration tests for all operations

---

## Documentation Files

- **schema.prisma** - Complete schema definition (3,756 lines)
- **SCHEMA_DOCUMENTATION.md** - This file
- **Схема БД.md** - Original requirements documentation
- **ТЗ.md** - Project technical specifications

---

**Last Updated:** 2024  
**Status:** Complete and Production-Ready  
**Version:** 1.0
