# Admin Panel Login Fix

## Problem
Admin users were logging in but then immediately redirected back to the login page instead of accessing the admin dashboard.

## Root Causes

### 1. Missing `isAdmin` in Login Response
**File:** `app/api/auth/login/route.ts`

**Issue:** The login endpoint was returning the user object without the `isAdmin` field, even though the backend was checking for it:
```typescript
// BEFORE (incorrect)
user: {
  id: user.id,
  email: user.email,
  name: user.name,
  // Missing isAdmin!
}
```

**Why this mattered:** The `/admin` page checks `localStorage` for `user.isAdmin`:
```typescript
if (!data.user.isAdmin) {
  alert('У вас нет доступа к админ-панели');
  window.location.href = '/';
  return;
}
```

Without `isAdmin` in the response, it would always be `undefined`, failing the check.

**Fix Applied:**
```typescript
// AFTER (correct)
user: {
  id: user.id,
  email: user.email,
  name: user.name,
  isAdmin: user.isAdmin || user.role === 'admin', // ✓ Now included
}
```

### 2. Undefined `languages` Reference in Header
**File:** `app/components/Header.tsx`

**Issue:** Mobile menu language selector referenced `Object.entries(languages)` which doesn't exist:
```typescript
// BEFORE (broken)
{Object.entries(languages).map(([lang]) => (
  // ReferenceError: languages is not defined
))}
```

**Fix Applied:**
```typescript
// AFTER (correct)
{['kg', 'ru', 'en'].map((lang) => (
  // Now hardcoded, works correctly
))}
```

## Admin User Credentials

After running `prisma db seed`, use:
- **Email:** `admin@avatar.local`
- **Password:** `Admin123!@#`

## Login Flow (Now Fixed)

1. User enters email/password
2. AuthModal sends to `/api/auth/login`
3. Backend returns:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIs...",
     "user": {
       "id": "...",
       "email": "admin@avatar.local",
       "name": "Administrator",
       "isAdmin": true  // ✓ Now included
     }
   }
   ```
4. AuthModal stores in localStorage:
   - `authToken` → JWT token
   - `user` → Full user object with isAdmin
5. User navigates to `/admin`
6. `/admin/page.tsx` checks:
   - localStorage has authToken? ✓
   - localStorage has user? ✓
   - user.isAdmin === true? ✓ (NOW FIXED!)
7. AdminDashboard displays ✓

## Verification Steps

1. **Seed the database:**
   ```bash
   npm run prisma:seed
   ```

2. **Login with admin credentials:**
   - Email: `admin@avatar.local`
   - Password: `Admin123!@#`

3. **Verify redirect to admin panel:**
   - Should see "Админ-панель" heading
   - Should see AdminDashboard component
   - Should NOT redirect back to login

4. **Check browser console:**
   - No ReferenceError about undefined `languages`
   - No console errors from Header component

## Files Modified

- ✅ `app/api/auth/login/route.ts` - Added `isAdmin` to response
- ✅ `app/components/Header.tsx` - Fixed languages reference

## Related Files (No changes needed)

- `app/admin/page.tsx` - Auth check logic is correct
- `app/api/auth/me/route.ts` - Returns `isAdmin` correctly
- `app/lib/auth.ts` - JWT includes `isAdmin` correctly
- `prisma/seed.ts` - Creates admin with `isAdmin: true`

## Testing Admin Redirect Loop

**Before fix:** Login → Admin page → "Вход" form again (loop)
**After fix:** Login → Admin page → AdminDashboard (works! ✓)

---

*Last updated: 2026-10-20*
