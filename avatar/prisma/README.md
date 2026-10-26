# Prisma Schema for AVATAR Platform

Complete PostgreSQL database schema for AVATAR Platform - a comprehensive management system for gaming club networks.

## 📋 Documentation Index

Start with these files in this order:

### 1. **PRISMA_SCHEMA_SUMMARY.md** (Root Level)
- **Start here!** Project overview and completion status
- All 37 modules listed
- Getting started in 5 steps
- Production checklist

### 2. **SETUP_GUIDE.md** (This Directory)
- Installation and configuration
- Database setup (Docker/Local/Cloud)
- Initial data seeding
- Development workflow
- Production deployment
- Troubleshooting

### 3. **schema.prisma** (This Directory)
- The actual database schema (3,756 lines)
- 37 core modules + support models
- Enums and relationships
- Indexes and constraints

### 4. **SCHEMA_DOCUMENTATION.md** (This Directory)
- Complete reference for each module
- Key fields and relationships
- All enum types
- API query patterns
- Performance considerations

### 5. **QUICK_REFERENCE.md** (This Directory)
- Module quick lookup
- Common query patterns
- Key enums
- Useful code snippets

### 6. **MODULE_RELATIONSHIPS.md** (This Directory)
- ASCII architecture diagrams
- Data flow examples
- Booking workflow
- Financial system
- Query optimization patterns

---

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Install Prisma
npm install @prisma/client prisma --save-dev

# 2. Configure database
# Edit .env: DATABASE_URL="postgresql://..."

# 3. Run migrations
npx prisma migrate dev --name init

# 4. Generate client
npx prisma generate

# 5. Start using
import prisma from '@/lib/prisma'
const customers = await prisma.customer.findMany()
```

---

## 📊 Schema Overview

| Category | Count |
|----------|-------|
| Models | 78 |
| Core Modules | 37 |
| Enums | 40+ |
| Relationships | 150+ |
| Indexes | 100+ |
| Schema Lines | 3,756 |

---

## 🎯 The 37 Core Modules

### Users & Authentication (7)
User, UserProfile, UserContact, UserSettings, UserConsent, UserSession, AuditLog

### Roles & Security (4)
Role, Permission, RolePermission, UserRole

### Employees (1)
Employee

### Branch Infrastructure (4)
Branch, BranchWorkingHours, BranchSpecialHours, BranchMap

### Zones & Stations (4)
Zone, GamingStation, HardwareProfile, GamingStationHardware

### Tariffs (2)
Tariff, TariffRule

### Customers & CRM (2)
Customer, CustomerAddress

### Bookings (4)
Booking, BookingStatusHistory, BookingItem, BookingHold

### Gaming Sessions (1)
GamingSession

### QR System (2)
QRTicket, QRScan

### Products & Shop (3)
ProductCategory, Product, BranchProduct

### Orders (3)
Order, OrderItem, OrderStatusHistory

### Deliveries (1)
Delivery

### Payments (2)
Payment, PaymentWebhook

### Wallets & Balance (2)
Wallet, WalletTransaction

### Loyalty (2)
LoyaltyLevel, BonusTransaction

### Finances (2)
FinancialCategory, IncomeTransaction, ExpenseTransaction

### Vendors & Purchases (3)
Vendor, PurchaseOrder, PurchaseOrderItem

### Inventory (3)
InventoryTransaction, InventoryTransfer, InventoryTransferItem

### Promotions (4)
Promotion, PromotionRule, PromoCode, PromoCodeUsage

### News & CMS (1)
News

### SEO (1)
SEOMetadata

### Tournaments (2)
Tournament, TournamentParticipant

### Telegram Bot (2)
TelegramAccount, TelegramMessage

### Notifications (2)
Notification, PushSubscription

### Support (2)
SupportTicket, SupportMessage

### Maintenance (2)
Equipment, MaintenanceTicket

### Reviews (2)
Review, ReviewReply

### AI Module (3)
AIConversation, AIMessage, AITask

### Customer Segmentation (2)
CustomerSegment, CustomerSegmentMember

### Files & Settings (2)
File, SystemSetting

---

## ✨ Key Features

- ✅ PostgreSQL optimized
- ✅ UUID primary keys
- ✅ Strategic indexing
- ✅ Foreign key constraints
- ✅ Soft deletes (User.deleted_at)
- ✅ Audit logging (AuditLog model)
- ✅ RBAC system
- ✅ Multi-branch support
- ✅ JSON flexible fields
- ✅ Enum type safety
- ✅ Transaction support
- ✅ 150+ relationships
- ✅ Production-ready

---

## 📖 Documentation Files

```
prisma/
├── README.md                        ← You are here
├── schema.prisma                    # Main schema (3,756 lines)
├── SCHEMA_DOCUMENTATION.md          # Complete reference (detailed)
├── QUICK_REFERENCE.md               # Quick lookup (cheat sheet)
├── SETUP_GUIDE.md                   # Installation guide
└── MODULE_RELATIONSHIPS.md          # Architecture diagrams
```

---

## 🔗 File Cross-References

### To understand specific modules:
1. Start with **QUICK_REFERENCE.md** (summary table)
2. Go to **SCHEMA_DOCUMENTATION.md** (detailed description)
3. Check **MODULE_RELATIONSHIPS.md** (relationships & flow)

### To query data:
1. Find example in **QUICK_REFERENCE.md**
2. Review patterns in **SCHEMA_DOCUMENTATION.md**
3. Optimize using **MODULE_RELATIONSHIPS.md**

### To set up locally:
1. Follow **SETUP_GUIDE.md** step by step
2. Test with queries from **QUICK_REFERENCE.md**
3. Deploy using production checklist in **PRISMA_SCHEMA_SUMMARY.md**

---

## 📚 Learning Path

### Beginner
1. Read PRISMA_SCHEMA_SUMMARY.md (overview)
2. Run quick start commands
3. Check QUICK_REFERENCE.md (examples)

### Intermediate
1. Study SCHEMA_DOCUMENTATION.md (modules)
2. Review MODULE_RELATIONSHIPS.md (relationships)
3. Write test queries

### Advanced
1. Optimize queries using index strategy
2. Implement complex workflows
3. Set up production deployment

---

## 🛠️ Common Tasks

### Find a module's fields
```
1. Go to QUICK_REFERENCE.md
2. Look for module name in table
3. See "Key Fields" column
```

### Write a query
```
1. Check QUICK_REFERENCE.md for example
2. Review SCHEMA_DOCUMENTATION.md for details
3. Test in Prisma Studio: npx prisma studio
```

### Set up database
```
Follow SETUP_GUIDE.md:
- Section "Database Setup"
- Choose: Docker OR Local
- Configure .env
- Run migrations
```

### Deploy to production
```
Follow SETUP_GUIDE.md:
- Section "Production Deployment"
- Check PRISMA_SCHEMA_SUMMARY.md
- Use production checklist
```

---

## 🔍 Module Quick Finder

### Financial Operations
- IncomeTransaction, ExpenseTransaction
- See: SCHEMA_DOCUMENTATION.md Section 18

### Customer Management
- Customer, CustomerAddress, CustomerSegment
- See: SCHEMA_DOCUMENTATION.md Section 8, 31

### Booking & Gaming
- Booking, GamingSession, GamingStation
- See: MODULE_RELATIONSHIPS.md (Booking Flow section)

### Orders & Delivery
- Order, OrderItem, Delivery
- See: SCHEMA_DOCUMENTATION.md Section 13-14

### Marketing & Promotions
- Promotion, PromoCode, LoyaltyLevel
- See: SCHEMA_DOCUMENTATION.md Section 21, 17

### AI & Analytics
- AIConversation, AITask, AuditLog
- See: SCHEMA_DOCUMENTATION.md Section 30, 1

---

## 💡 Pro Tips

- Use `npx prisma studio` for visual database browsing
- Always use `include` to prevent N+1 queries
- Leverage enums for type safety
- Check indexes for query optimization
- Use transactions for multi-step operations

---

## 🐛 Troubleshooting

**Issue:** Schema validation errors?
→ See SETUP_GUIDE.md section "Troubleshooting"

**Issue:** Query N+1 problems?
→ See MODULE_RELATIONSHIPS.md section "Query Optimization Patterns"

**Issue:** Need to modify schema?
→ See SETUP_GUIDE.md section "Development Workflow"

**Issue:** Production deployment?
→ See SETUP_GUIDE.md section "Production Deployment"

---

## 📞 Getting Help

1. **Schema Questions:** Check SCHEMA_DOCUMENTATION.md
2. **Implementation Help:** See QUICK_REFERENCE.md
3. **Setup Issues:** Follow SETUP_GUIDE.md
4. **Relationship Questions:** Review MODULE_RELATIONSHIPS.md

---

## 📌 Important Notes

- Schema is production-ready
- Use PostgreSQL 12+ for best compatibility
- Enable UUID extension in PostgreSQL
- Set up backups before production
- Review performance indexes before deployment
- All timestamps are in UTC
- Use connection pooling in production

---

## 📄 Files in This Directory

| File | Purpose | Size |
|------|---------|------|
| schema.prisma | Main database schema | 3,756 lines |
| SCHEMA_DOCUMENTATION.md | Complete module reference | ~3,000 words |
| QUICK_REFERENCE.md | Developer quick guide | ~2,000 words |
| SETUP_GUIDE.md | Installation & deployment | ~2,500 words |
| MODULE_RELATIONSHIPS.md | Architecture & diagrams | ~3,000 words |
| README.md | This file | Index & navigation |

---

## 🎓 Additional Resources

- **Prisma:** https://www.prisma.io/docs/
- **PostgreSQL:** https://www.postgresql.org/docs/
- **Database Design:** See Схема БД.md
- **Project Requirements:** See ТЗ.md
- **Root Summary:** See PRISMA_SCHEMA_SUMMARY.md

---

**Version:** 1.0  
**Status:** ✅ Production Ready  
**Last Updated:** 2024  
**Total Documentation:** 12,500+ words + 3,756 lines of schema
