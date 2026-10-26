import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'kg' | 'ru' | 'en';

const translations: { [key in Language]: { [key: string]: string } } = {
  kg: {
    // Navigation
    'nav.home': 'Башталык',
    'nav.products': 'Товарлар',
    'nav.cart': 'Себет',
    'nav.orders': 'Буйрутмалар',
    'nav.profile': 'Профиль',
    'nav.admin': 'Админ',
    'nav.logout': 'Чыгуу',

    // Products
    'product.price': 'Баасы',
    'product.rating': 'Рейтинги',
    'product.reviews': 'Сын-пикирлер',
    'product.addToCart': 'Себетке кошуу',
    'product.addToFavorites': 'Сүйүктүүлөргө кошуу',
    'product.description': 'Сүрөттөмөсү',
    'product.stock': 'Сапта',

    // Cart
    'cart.empty': 'Себет бош',
    'cart.total': 'Жалпы сумма',
    'cart.checkout': 'Чекаут',
    'cart.remove': 'Алып салуу',
    'cart.quantity': 'Саны',

    // Orders
    'order.number': 'Буйрутма номери',
    'order.date': 'Дата',
    'order.status': 'Статусу',
    'order.total': 'Жалпы',
    'order.items': 'Товарлар',

    // Auth
    'auth.login': 'Кирүү',
    'auth.register': 'Катталуу',
    'auth.logout': 'Чыгуу',
    'auth.email': 'Email',
    'auth.password': 'Пароль',
    'auth.name': 'Аты',
    'auth.forgotPassword': 'Парольду унутуп албадыңыз?',

    // Common
    'common.save': 'Сохранить',
    'common.cancel': 'Жокко чыгаруу',
    'common.delete': 'Өчүрүү',
    'common.edit': 'Түзөтүү',
    'common.add': 'Кошуу',
    'common.search': 'Издөө',
    'common.filter': 'Чыпкалоо',
    'common.loading': 'Жүктөлүп жатат...',
    'common.error': 'Катаа',
    'common.success': 'Ийгиликтүү',
    'common.language': 'Тил',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.products': 'Товары',
    'nav.cart': 'Корзина',
    'nav.orders': 'Заказы',
    'nav.profile': 'Профиль',
    'nav.admin': 'Админ',
    'nav.logout': 'Выход',

    // Products
    'product.price': 'Цена',
    'product.rating': 'Рейтинг',
    'product.reviews': 'Отзывы',
    'product.addToCart': 'Добавить в корзину',
    'product.addToFavorites': 'Добавить в избранное',
    'product.description': 'Описание',
    'product.stock': 'В наличии',

    // Cart
    'cart.empty': 'Корзина пуста',
    'cart.total': 'Итого',
    'cart.checkout': 'Оформить заказ',
    'cart.remove': 'Удалить',
    'cart.quantity': 'Количество',

    // Orders
    'order.number': 'Номер заказа',
    'order.date': 'Дата',
    'order.status': 'Статус',
    'order.total': 'Всего',
    'order.items': 'Товары',

    // Auth
    'auth.login': 'Вход',
    'auth.register': 'Регистрация',
    'auth.logout': 'Выход',
    'auth.email': 'Email',
    'auth.password': 'Пароль',
    'auth.name': 'Имя',
    'auth.forgotPassword': 'Забыли пароль?',

    // Common
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.add': 'Добавить',
    'common.search': 'Поиск',
    'common.filter': 'Фильтр',
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.success': 'Успешно',
    'common.language': 'Язык',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.cart': 'Cart',
    'nav.orders': 'Orders',
    'nav.profile': 'Profile',
    'nav.admin': 'Admin',
    'nav.logout': 'Logout',

    // Products
    'product.price': 'Price',
    'product.rating': 'Rating',
    'product.reviews': 'Reviews',
    'product.addToCart': 'Add to Cart',
    'product.addToFavorites': 'Add to Favorites',
    'product.description': 'Description',
    'product.stock': 'In Stock',

    // Cart
    'cart.empty': 'Cart is empty',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.remove': 'Remove',
    'cart.quantity': 'Quantity',

    // Orders
    'order.number': 'Order Number',
    'order.date': 'Date',
    'order.status': 'Status',
    'order.total': 'Total',
    'order.items': 'Items',

    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.forgotPassword': 'Forgot password?',

    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.language': 'Language',
  },
};

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const useI18n = create<I18nStore>()(
  persist(
    (set, get) => ({
      language: 'ru',
      setLanguage: (lang: Language) => set({ language: lang }),
      t: (key: string) => {
        const { language } = get();
        return translations[language][key] || translations.en[key] || key;
      },
    }),
    {
      name: 'i18n-storage',
    }
  )
);
