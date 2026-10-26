# 🔧 Исправление ошибки Google OAuth - redirect_uri_mismatch

**Ошибка:** `Error 400: redirect_uri_mismatch`

Это означает, что в Google Console не добавлен Redirect URI: `http://localhost:3000/auth/callback`

---

## 🎯 Решение

### Шаг 1: Откройте Google Cloud Console

1. Откройте https://console.cloud.google.com/
2. Войдите со своей Google учетной записью

### Шаг 2: Выберите проект

1. В верхней части нажмите на название проекта
2. Найдите и выберите проект, связанный с Client ID: `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com`

### Шаг 3: Перейдите в OAuth Consent Screen

1. В левой панели найдите **"APIs & Services"** → **"OAuth consent screen"**
2. Убедитесь что все данные заполнены (App name, User support email и т.д.)

### Шаг 4: Добавьте Authorized redirect URIs

1. В левой панели найдите **"APIs & Services"** → **"Credentials"**
2. Найдите и нажмите на Client ID: `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com`
3. Должно открыться окно редактирования этого Client ID

### Шаг 5: Добавьте redirect URIs

В разделе **"Authorized redirect URIs"** добавьте следующие URLs:

```
http://localhost:3000/auth/callback
http://127.0.0.1:3000/auth/callback
```

**Если планируете деплой в production:**
```
https://yourdomain.com/auth/callback
```

### Шаг 6: Сохраните изменения

1. Нажмите кнопку **"SAVE"** или **"Update"**
2. Дождитесь подтверждения

---

## ✅ После добавления

После добавления Redirect URIs в Google Console:

1. **Перезагрузите браузер** (очистите кэш если нужно)
2. **Откройте приложение:** http://localhost:3000
3. **Нажмите "Войти через Google"**
4. Должно сработать!

---

## 📋 Текущие настройки в коде

### В AuthModal.tsx

```typescript
const redirectUri = `${window.location.origin}/auth/callback`;
```

Это динамически создает redirect URI в зависимости от того, где находится ваше приложение:
- На localhost: `http://localhost:3000/auth/callback`
- На production: `https://yourdomain.com/auth/callback`

### В google-callback/route.ts

```typescript
const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`;
```

Это тот же URL, который используется на сервере для обмена кода на токены.

---

## 🔍 Проверка текущих значений

Текущие значения в `.env`:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 📸 Скриншоты где добавлять

### В Google Cloud Console:

```
APIs & Services
    ├── OAuth consent screen (проверьте данные)
    └── Credentials
        └── [Client ID] → Edit
            └── Authorized redirect URIs
                ├── http://localhost:3000/auth/callback  ← ДОБАВЬТЕ ЭТО
                └── http://127.0.0.1:3000/auth/callback  ← И ЭТО
```

---

## 🧪 Тестирование после исправления

1. **Запустите приложение:**
   ```bash
   npm run dev
   ```

2. **Откройте браузер:**
   ```
   http://localhost:3000
   ```

3. **Нажмите "Войти через Google"**

4. **Ожидаемый результат:**
   - Должно открыться окно выбора Google аккаунта
   - Не должно быть ошибки `redirect_uri_mismatch`
   - После выбора аккаунта должны вернуться на приложение авторизованными

---

## ⚠️ Если всё ещё не работает

### Проверьте:

1. **Client ID правильный?**
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
   ```

2. **Redirect URIs в Google Console точно совпадают?**
   - Проверьте `http://` vs `https://`
   - Проверьте `localhost` vs `127.0.0.1`
   - Проверьте `/auth/callback` в конце

3. **Прошло ли достаточно времени после сохранения?**
   - Подождите 1-2 минуты после сохранения в Google Console
   - Очистите кэш браузера

4. **Используете правильный адрес?**
   - `http://localhost:3000` (с `http`, не `https` для локалхоста)
   - `http://127.0.0.1:3000` (альтернатива)

---

## 🔐 Для Production деплоя

Когда будете деплоить на production, добавьте:

```
https://yourdomain.com/auth/callback
```

И обновите в `.env`:

```env
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

---

## 📊 Общий поток Google OAuth

```
1. Пользователь нажимает "Войти через Google"
   ↓
2. AuthModal генерирует redirect_uri
   redirectUri = http://localhost:3000/auth/callback
   ↓
3. Редирект на Google: 
   accounts.google.com/o/oauth2/v2/auth?client_id=...&redirect_uri=http://localhost:3000/auth/callback&...
   ↓
4. Google проверяет redirect_uri в Console
   ✅ Если совпадает → продолжается
   ❌ Если НЕ совпадает → Error 400: redirect_uri_mismatch
   ↓
5. Пользователь выбирает Google аккаунт
   ↓
6. Google редиректит обратно:
   http://localhost:3000/auth/callback?code=AUTH_CODE
   ↓
7. AuthModal обрабатывает код
   ↓
8. Отправляет POST на /api/auth/google-callback с кодом
   ↓
9. Server обменивает код на токен с Google
   ↓
10. Пользователь авторизован!
```

---

## ✅ Чек-лист исправления

- [ ] Открыл Google Cloud Console
- [ ] Выбрал проект
- [ ] Перешел в Credentials
- [ ] Открыл Client ID для редактирования
- [ ] Добавил `http://localhost:3000/auth/callback` в Redirect URIs
- [ ] Добавил `http://127.0.0.1:3000/auth/callback` в Redirect URIs (опционально)
- [ ] Нажал SAVE
- [ ] Подождал 1-2 минуты
- [ ] Перезагрузил браузер
- [ ] Попробовал "Войти через Google" снова

---

## 📞 Если нужна помощь

Проверьте:
1. Правильный ли Client ID в `.env`?
2. Правильный ли Client Secret в `.env`?
3. Добавлены ли Redirect URIs в Google Console?
4. Прошло ли достаточно времени после сохранения?
5. Используется ли правильный адрес (http:// для localhost)?

---

**После исправления Google OAuth должен работать идеально!** ✅
