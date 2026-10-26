# Руководство по структуре переводов

## Текущая структура (main.json)

### Основные разделы:

#### 1. `navigation` - Навигация
```json
{
  "zones": "Зоны",
  "tariffs": "Тарифы",
  "booking": "Бронирование",
  "contact": "Контакты"
}
```

#### 2. `hero` - Главная секция
```json
{
  "title": "AVATAR Gaming Club",
  "description": "Описание клуба",
  "bookButton": "Забронировать место",
  "learnButton": "Узнать больше"
}
```

#### 3. `stats` - Статистика/Показатели
```json
{
  "computers": "Компьютеров",
  "availability": "Работаем",
  "monitor": "Hz монитор",
  "gpu": "GPU"
}
```

#### 4. `branchInfo` - Информация о филиале
```json
{
  "title": "Филиал Кызыл-Аскер",
  "location": "Местоположение",
  "locationDesc": "ул. Дэн Сяопина, 225, Первомайский район, Бишкек",
  "workTime": "Режим работы",
  "workTimeDesc": "Круглосуточно (24/7)",
  "capacity": "Емкость",
  "capacityDesc": "103 игровых места",
  "internet": "Интернет",
  "internetDesc": "Скоростной с низкой латенцией",
  "configuration": "Конфигурация ПК",
  "cpu": "Процессор",
  "cpuValue": "Intel Core i5-14600",
  "gpu": "Видеокарта",
  "gpuValue": "NVIDIA RTX 5070",
  "ram": "Оперативная память",
  "ramValue": "32 GB",
  "monitor": "Монитор",
  "monitorValue": "380 Hz"
}
```

#### 5. `zones` - Игровые зоны
```json
{
  "title": "Игровые зоны",
  "standardZone": "Стандартная зона",
  "vipZone": "VIP зона",
  "ps5Zone": "PS5 зона",
  "seats": "мест",
  "select": "Выбрать"
}
```

#### 6. `tariffs` - Тарифы
```json
{
  "title": "Тарифы",
  "perHour": "На час",
  "perHourDesc": "Идеально для коротких сессий",
  "day": "День",
  "dayDesc": "Максимум времени за один день",
  "package": "Пакет",
  "packageDesc": "Экономия и гибкость",
  "currency": "сом",
  "feature1Hour": "1 час игры",
  "feature2Hour": "Полный доступ",
  "feature3Hour": "Горячие напитки",
  "feature1Day": "12 часов игры",
  "feature2Day": "Приоритет места",
  "feature3Day": "Льготные напитки",
  "feature1Package": "30 часов",
  "feature2Package": "Действует месяц",
  "feature3Package": "VIP поддержка",
  "selectButton": "Выбрать"
}
```

#### 7. `booking` - Бронирование
```json
{
  "title": "Онлайн-бронирование",
  "fastBooking": "Быстрое бронирование",
  "date": "Дата",
  "startTime": "Время начала",
  "zone": "Зона",
  "popular": "Популярное сейчас",
  "vipZoneSeats": "VIP зона",
  "standardZoneSeats": "Стандартная зона",
  "ps5ZoneSeats": "PS5 зона",
  "availableSeats": "мест",
  "proceedButton": "Перейти к оформлению"
}
```

#### 8. `contact` - Контакты
```json
{
  "title": "Контакты",
  "phone": "Телефон",
  "phoneDesc": "Бронирование и вопросы",
  "whatsapp": "WhatsApp",
  "whatsappLink": "Написать в WhatsApp",
  "whatsappDesc": "Быстрый ответ",
  "address": "Адрес",
  "addressLine1": "ул. Дэн Сяопина, 225",
  "addressLine2": "Первомайский район, Бишкек",
  "phone2": "Дополнительный контакт",
  "phone2Desc": "Резервный номер"
}
```

#### 9. `footer` - Подвал
```json
{
  "copyright": "AVATAR Gaming Club © 2026",
  "description": "Премиальный компьютерный клуб в Бишкеке"
}
```

## Соглашения об именовании

### Правила для ключей:

1. **Используйте camelCase** для ключей:
   ```json
   ❌ "Book Button"
   ❌ "book-button"
   ✅ "bookButton"
   ```

2. **Группируйте похожие элементы** в разделы:
   ```json
   ✅ "booking": {
     "title": "...",
     "date": "...",
     "time": "..."
   }
   ```

3. **Описательные имена** для основных ключей:
   ```json
   ✅ "hero.title"
   ✅ "navigation.booking"
   ❌ "t1"
   ❌ "nav_book"
   ```

4. **Суффиксы для описаний**:
   ```json
   "location": "Местоположение",        // Основной текст
   "locationDesc": "Адрес..."           // Описание
   ```

## Добавление новых переводов

### Шаг 1: Определите структуру
```json
{
  "newFeature": {
    "title": "Название",
    "description": "Описание",
    "button": "Кнопка",
    "itemName": "Элемент"
  }
}
```

### Шаг 2: Добавьте во все языки
Убедитесь, что ключи структуры идентичны во всех `main.json` файлах:
- `app/i18n/locales/ru/main.json`
- `app/i18n/locales/en/main.json`
- `app/i18n/locales/kg/main.json`

### Шаг 3: Используйте в коде
```tsx
const { t } = useLanguage();
const title = t('newFeature.title');
```

## Типичные паттерны

### Для форм:
```json
"forms": {
  "title": "Форма",
  "submit": "Отправить",
  "cancel": "Отменить",
  "label": {
    "email": "Email",
    "password": "Пароль"
  },
  "error": {
    "required": "Поле обязательно",
    "invalid": "Неверный формат"
  }
}
```

### Для модальных окон:
```json
"modals": {
  "confirm": {
    "title": "Подтверждение",
    "message": "Вы уверены?",
    "ok": "Да",
    "cancel": "Отменить"
  }
}
```

### Для сообщений об ошибках:
```json
"errors": {
  "notFound": "Не найдено",
  "unauthorized": "Не авторизирован",
  "forbidden": "Доступ запрещен",
  "serverError": "Ошибка сервера"
}
```

## Проверка полноты переводов

Убедитесь, что все три файла имеют:
1. ✅ Идентичную структуру ключей
2. ✅ Одинаковое количество элементов в каждом разделе
3. ✅ Переводы на каждый язык

```bash
# Сравнить структуру:
diff app/i18n/locales/ru/main.json app/i18n/locales/en/main.json
diff app/i18n/locales/ru/main.json app/i18n/locales/kg/main.json
```

## Лучшие практики

✅ **Делайте:**
- Группируйте связанные переводы
- Используйте согласованное именование
- Переводите полные предложения (не разбивайте слова)
- Используйте дескриптивные имена ключей

❌ **Не делайте:**
- Не смешивайте разные языки в одном файле
- Не используйте очень длинные ключи
- Не оставляйте пустые значения
- Не используйте спецсимволы в ключах
