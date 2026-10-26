'use client';

import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Header from '@/app/components/Header';
import AnimatedBackground from '@/app/components/AnimatedBackground';

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs = [
    {
      id: 1,
      category: 'Общие вопросы',
      questions: [
        {
          q: 'Какой режим работы клуба?',
          a: 'AVATAR Gaming Club работает 24/7 без выходных. Вы можете приходить в любое время, даже ночью!',
        },
        {
          q: 'Где находится клуб?',
          a: 'Мы расположены по адресу: ул. Ленина, 42, центр города. Легко добраться на общественном транспорте.',
        },
        {
          q: 'Нужно ли предварительное бронирование?',
          a: 'Рекомендуется, но не обязательно. Вы можете приходить без забронирования, если есть свободные места.',
        },
      ],
    },
    {
      id: 2,
      category: 'Тарифы и оплата',
      questions: [
        {
          q: 'Какие способы оплаты вы принимаете?',
          a: 'Мы принимаем наличные, карты всех банков, QR-коды и электронные кошельки.',
        },
        {
          q: 'Можно ли вернуть деньги за неиспользованное время?',
          a: 'Да, если вы отмените бронирование за 2 часа до начала. Штраф не взимается.',
        },
        {
          q: 'Есть ли скидки для больших компаний?',
          a: 'Да! Группе от 5 человек дается скидка 15%, от 10 человек - 25%.',
        },
      ],
    },
    {
      id: 3,
      category: 'Оборудование',
      questions: [
        {
          q: 'Какие игры установлены на компьютерах?',
          a: 'У нас установлены все популярные тайтлы: CS:GO, Valorant, Dota 2, LOL, Apex Legends и многое другое.',
        },
        {
          q: 'Какая скорость интернета?',
          a: 'Мы обеспечиваем скорость 300 Мбит/с с минимальной задержкой. Никакого лага!',
        },
        {
          q: 'Можно ли подключить свою клавиатуру/мышь?',
          a: 'Да, конечно. Все наши компьютеры имеют USB-порты. Просто принесите свое оборудование.',
        },
      ],
    },
    {
      id: 4,
      category: 'Турниры',
      questions: [
        {
          q: 'Как зарегистрироваться в турнире?',
          a: 'Заполните форму на нашем сайте или обратитесь к администратору в клубе. Регистрация бесплатна!',
        },
        {
          q: 'Какой размер призового фонда?',
          a: 'Это зависит от турнира. От 50K до 250K+ сом для главных событий.',
        },
        {
          q: 'Нужно ли быть профессионалом для участия?',
          a: 'Нет! У нас есть турниры для всех уровней - от новичков до профи.',
        },
      ],
    },
    {
      id: 5,
      category: 'Правила и безопасность',
      questions: [
        {
          q: 'Есть ли видеонаблюдение?',
          a: 'Да, клуб оборудован 24/7 видеонаблюдением для вашей безопасности.',
        },
        {
          q: 'Безопасно ли оставлять вещи на столе?',
          a: 'У нас есть сейфы для ценных вещей. Используйте их для дополнительной безопасности.',
        },
        {
          q: 'Какие правила поведения?',
          a: 'Никакого агрессивного поведения, уважение к другим игрокам, соблюдение расписания. Детально на сайте.',
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-cyber-gradient text-white overflow-hidden relative">
      <AnimatedBackground />
      <Header />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-6xl sm:text-7xl font-black mb-6 text-center neon-text-orange">
            ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Найдите ответы на самые популярные вопросы о AVATAR Gaming Club
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-4xl mx-auto">
          {faqs.map((category) => (
            <div key={category.id} className="mb-12">
              <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6" />
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.questions.map((item, idx) => (
                  <div
                    key={idx}
                    className="glass border border-orange-500/30 rounded-xl overflow-hidden transition-all hover:border-orange-500/60"
                  >
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === `${category.id}-${idx}` ? null : `${category.id}-${idx}`)
                      }
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-orange-500/5 transition-colors"
                    >
                      <h3 className="text-lg font-bold text-white">{item.q}</h3>
                      <ChevronDown
                        className={`w-5 h-5 text-orange-400 transition-transform ${
                          expandedId === `${category.id}-${idx}` ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedId === `${category.id}-${idx}` && (
                      <div className="px-6 py-4 border-t border-orange-500/20 bg-orange-500/5">
                        <p className="text-slate-300">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-6">Не нашли ответ?</h2>
          <p className="text-slate-300 mb-8">
            Свяжитесь с нашей командой поддержки. Мы ответим на все ваши вопросы!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+996709016008"
              className="px-8 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors"
            >
              📞 Позвонить нам
            </a>
            <a
              href="https://wa.me/996709016008"
              className="px-8 py-3 border-2 border-orange-500 text-orange-400 rounded-lg font-bold hover:bg-orange-500/10 transition-colors"
            >
              💬 Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
