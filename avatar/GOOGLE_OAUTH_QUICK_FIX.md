# ⚡ Быстрое исправление Google OAuth

**Ошибка:** `Error 400: redirect_uri_mismatch`  
**Решение:** Добавить redirect URI в Google Console

---

## 🚀 За 5 минут

### 1️⃣ Откройте Google Console
```
https://console.cloud.google.com/
```

### 2️⃣ Перейдите в Credentials
```
APIs & Services → Credentials
```

### 3️⃣ Редактируйте Client ID
```
Нажмите на Client ID:
YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
```

### 4️⃣ Добавьте Redirect URIs
В разделе **"Authorized redirect URIs"** добавьте:

```
http://localhost:3000/auth/callback
```

### 5️⃣ Сохраните
Нажмите **SAVE**

---

## ✅ Готово!

Теперь Google OAuth должен работать!

- Перезагрузите браузер
- Откройте http://localhost:3000
- Нажмите "Войти через Google"
- ✅ Должно работать!

---

## 📋 Что добавляется в Google Console:

```
Authorized redirect URIs:
├── http://localhost:3000/auth/callback  ← ДЛЯ ЛОКАЛХОСТА
└── https://yourdomain.com/auth/callback ← ДЛЯ PRODUCTION (потом)
```

---

**Всё! Готово!** 🎉
