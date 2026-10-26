# Admin Login Testing Checklist

## Pre-Flight Checklist

- [ ] Database is connected and running
- [ ] `.env` file has valid `DATABASE_URL`
- [ ] `JWT_SECRET` is set in `.env`
- [ ] All dependencies installed: `npm install`

## Step 1: Seed Admin User

```bash
npm run prisma:seed
```

**Expected output:**
```
✅ Админ пользователь создан:
   Email: admin@avatar.local
   Пароль: Admin123!@#
   ID: [uuid]
```

**If it says "already exists"** - that's OK, admin is already in database.

## Step 2: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 16.4.0
  - Local:        http://localhost:3000
```

Wait for "ready - started server on ..." message.

## Step 3: Test Admin Login Flow

### 3.1 Open Application
- Go to `http://localhost:3000`
- Should see gaming club homepage

### 3.2 Click "Вход" Button
- Click login button in header
- AuthModal should open with email/password fields

### 3.3 Enter Admin Credentials
- Email: `admin@avatar.local`
- Password: `Admin123!@#`
- Click "Войти"

### 3.4 Verify Login Success
- [ ] Modal closes
- [ ] Page reloads
- [ ] User menu appears in header with admin name
- [ ] **NO** "Ошибка входа" message
- [ ] **NO** redirect loop back to login form

### 3.5 Navigate to Admin Panel
- Click user menu (dropdown with admin name)
- Click "Мой профиль" or navigate directly to `/admin`
- Should see AdminDashboard with:
  - [ ] "Админ-панель" heading
  - [ ] Stats cards (orders, users, revenue, products)
  - [ ] Product management section
  - [ ] User management section
  - [ ] **NO** login form appearing
  - [ ] **NO** redirect happening

## Step 4: Browser Console Checks

**Open DevTools (F12) → Console tab:**

- [ ] **NO** ReferenceError about undefined variables
- [ ] **NO** "Не авторизован" errors
- [ ] **NO** Auth-related 401/403 errors
- [ ] localStorage shows:
  - `authToken`: JWT string starting with `eyJ...`
  - `user`: Object with `{ id, email, name, isAdmin: true }`

**Verify by typing in console:**
```javascript
JSON.parse(localStorage.getItem('user'))
// Should show: { id: "...", email: "admin@avatar.local", name: "Administrator", isAdmin: true }
```

## Step 5: Test Regular User (Optional)

### 5.1 Register New User
- Click "Регистрация"
- Fill in: email, password, name
- Submit

### 5.2 Verify Regular User Cannot Access Admin
- Navigate to `/admin`
- Should see alert: "У вас нет доступа к админ-панели"
- Should redirect back to home page
- **NOT** show admin dashboard

## Step 6: Test Language Switcher (Bug Fix Verification)

### 6.1 Desktop
- Click language buttons in header (КГ, РУ, EN)
- Should switch without console errors

### 6.2 Mobile
- Resize browser to mobile width (< 1024px)
- Click hamburger menu
- Scroll to "ЯЗЫК:" section
- Click language buttons
- Should work without "undefined" errors

## Success Criteria

✅ Admin login works without redirect loop
✅ Admin can access `/admin` dashboard
✅ User localStorage has `isAdmin: true`
✅ No console errors about undefined variables
✅ Regular users cannot access admin panel
✅ Language switcher works on mobile

## Troubleshooting

### Issue: "Не авторизован" Error
**Cause:** JWT_SECRET doesn't match or token is malformed
**Fix:** 
1. Check `.env` has JWT_SECRET set
2. Restart dev server: `npm run dev`
3. Clear localStorage: `localStorage.clear()` in console
4. Try login again

### Issue: Cannot find admin user
**Cause:** Seed didn't run or database reset
**Fix:**
```bash
npx prisma migrate reset  # ⚠️ WARNING: deletes all data
npm run prisma:seed
```

### Issue: Redirect loop on admin page
**Cause:** 
- Old login response still cached (no isAdmin)
- localStorage outdated
**Fix:**
1. Open DevTools → Application → Clear storage
2. Hard refresh: Ctrl+Shift+R
3. Login again with admin credentials

### Issue: "ReferenceError: languages is not defined" in console
**Cause:** Header.tsx still has old code
**Fix:**
1. File was already fixed in this update
2. Hard refresh: Ctrl+Shift+R
3. If persists, check file was saved correctly

---

## Quick Command Reference

```bash
# Setup
npm install
npm run prisma:seed

# Run
npm run dev

# Visit
http://localhost:3000

# Admin credentials
Email: admin@avatar.local
Password: Admin123!@#

# Admin page
http://localhost:3000/admin

# Debug in console
localStorage.getItem('user')
localStorage.getItem('authToken')
```

---

*Tests verified: 2026-10-20*
