# ⚡ Быстрый старт локализации

## 1️⃣ Используйте переводы в компоненте

```tsx
'use client';

import { useLanguage } from '@/app/i18n';

export default function MyComponent() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.description')}</p>
      <button>{t('hero.bookButton')}</button>
    </div>
  );
}
```

## 2️⃣ Переключайте языки

```tsx
const { language, setLanguage } = useLanguage();

<button onClick={() => setLanguage('en')}>EN</button>
<button onClick={() => setLanguage('ru')}>РУ</button>
<button onClick={() => setLanguage('kg')}>КГ</button>

<p>Текущий язык: {language}</p>
```

## 3️⃣ Добавьте переключатель в навигацию

```tsx
import { LanguageSwitcher } from '@/app/i18n';

export default function Header() {
  return (
    <nav>
      <h1>AVATAR</h1>
      <LanguageSwitcher /> {/* Кнопки для переключения */}
    </nav>
  );
}
```

## 4️⃣ Добавьте новые переводы

### Шаг 1: Отредактируйте JSON файлы

```json
// app/i18n/locales/ru/main.json
{
  "myNewSection": {
    "title": "Мой новый заголовок",
    "description": "Описание"
  }
}
```

```json
// app/i18n/locales/en/main.json
{
  "myNewSection": {
    "title": "My new title",
    "description": "Description"
  }
}
```

```json
// app/i18n/locales/kg/main.json
{
  "myNewSection": {
    "title": "Менин жаңы башламасы",
    "description": "Сүрөттөмө"
  }
}
```

### Шаг 2: Используйте в компоненте

```tsx
const { t } = useLanguage();

<h1>{t('myNewSection.title')}</h1>
<p>{t('myNewSection.description')}</p>
```

## 5️⃣ Доступные ключи переводов

```tsx
// Навигация
t('navigation.zones')
t('navigation.tariffs')
t('navigation.booking')
t('navigation.contact')

// Hero секция
t('hero.title')
t('hero.description')
t('hero.bookButton')
t('hero.learnButton')

// Статистика
t('stats.computers')
t('stats.availability')
t('stats.monitor')
t('stats.gpu')

// Информация о филиале
t('branchInfo.title')
t('branchInfo.location')
t('branchInfo.locationDesc')
t('branchInfo.workTime')
t('branchInfo.workTimeDesc')
t('branchInfo.capacity')
t('branchInfo.capacityDesc')
t('branchInfo.internet')
t('branchInfo.internetDesc')
t('branchInfo.configuration')
t('branchInfo.cpu')
t('branchInfo.cpuValue')
t('branchInfo.gpu')
t('branchInfo.gpuValue')
t('branchInfo.ram')
t('branchInfo.ramValue')
t('branchInfo.monitor')
t('branchInfo.monitorValue')

// Игровые зоны
t('zones.title')
t('zones.standardZone')
t('zones.vipZone')
t('zones.ps5Zone')
t('zones.seats')
t('zones.select')

// Тарифы
t('tariffs.title')
t('tariffs.perHour')
t('tariffs.perHourDesc')
t('tariffs.day')
t('tariffs.dayDesc')
t('tariffs.package')
t('tariffs.packageDesc')
t('tariffs.currency')
t('tariffs.feature1Hour')
t('tariffs.feature2Hour')
t('tariffs.feature3Hour')
t('tariffs.feature1Day')
t('tariffs.feature2Day')
t('tariffs.feature3Day')
t('tariffs.feature1Package')
t('tariffs.feature2Package')
t('tariffs.feature3Package')
t('tariffs.selectButton')

// Бронирование
t('booking.title')
t('booking.fastBooking')
t('booking.date')
t('booking.startTime')
t('booking.zone')
t('booking.popular')
t('booking.vipZoneSeats')
t('booking.standardZoneSeats')
t('booking.ps5ZoneSeats')
t('booking.availableSeats')
t('booking.proceedButton')

// Контакты
t('contact.title')
t('contact.phone')
t('contact.phoneDesc')
t('contact.whatsapp')
t('contact.whatsappLink')
t('contact.whatsappDesc')
t('contact.address')
t('contact.addressLine1')
t('contact.addressLine2')
t('contact.phone2')
t('contact.phone2Desc')

// Подвал
t('footer.copyright')
t('footer.description')
```

## 6️⃣ Примеры на практике

### Кнопка с переводом

```tsx
<button className="btn">
  {t('hero.bookButton')}
</button>
```

### Заголовок секции

```tsx
<section>
  <h2>{t('zones.title')}</h2>
  <p>{t('branchInfo.locationDesc')}</p>
</section>
```

### Форма бронирования

```tsx
<form>
  <label>{t('booking.date')}</label>
  <input type="date" />
  
  <label>{t('booking.startTime')}</label>
  <input type="time" />
  
  <label>{t('booking.zone')}</label>
  <select>
    <option>{t('zones.standardZone')}</option>
    <option>{t('zones.vipZone')}</option>
    <option>{t('zones.ps5Zone')}</option>
  </select>
  
  <button>{t('booking.proceedButton')}</button>
</form>
```

### Контактная информация

```tsx
<div>
  <h3>{t('contact.phone')}</h3>
  <p>{t('contact.phoneDesc')}</p>
  <a href="tel:+996709016008">+996 709 016 008</a>
</div>
```

## 7️⃣ Условные переводы

```tsx
const { language, t } = useLanguage();

{language === 'ru' && (
  <p>Специальное предложение для русскоязычных!</p>
)}

{language === 'en' && (
  <p>Special offer for English speakers!</p>
)}
```

## 8️⃣ Получить все переводы

```tsx
const { translations } = useLanguage();

// Все переводы для текущего языка
console.log(translations);

// Доступ к определенным значениям
console.log(translations.hero.title);
console.log(translations.contact.phone);
```

## 9️⃣ Значение по умолчанию

```tsx
const { t } = useLanguage();

// Если ключ не найден, будет выведено значение по умолчанию
const text = t('unknown.key', 'Default text');
```

## 🔟 Проверка текущего языка

```tsx
const { language } = useLanguage();

if (language === 'ru') {
  // Русская версия
}

if (language === 'en') {
  // Английская версия
}

if (language === 'kg') {
  // Кыргызская версия
}
```

## 💡 Советы

✅ Всегда оборачивайте компоненты с `'use client'`  
✅ Используйте вложенные ключи (navigation.zones)  
✅ Переводите сразу при добавлении нового текста  
✅ Проверяйте что ключи одинаковые во всех языках  
✅ Используйте описательные имена для ключей  

## 🚀 Что дальше?

1. Смотрите полную документацию в `app/i18n/README.md`
2. Читайте как это работает в `INSTANT_TRANSLATION.md`
3. Добавляйте новые переводы по мере развития сайта
4. Расширяйте на новые языки если нужно

## ✨ Все работает мгновенно!

- ⚡ Переводы появляются сразу
- ⚡ Переключение языков без задержек
- ⚡ Выбор языка сохраняется
- ⚡ Чистый и простой код

**Наслаждайтесь локализацией! 🎉**
