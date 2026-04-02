import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[rgba(10,10,10,0.9)] border-t border-[rgba(255,102,0,0.15)] pt-16 pb-8 px-4 sm:px-6 relative z-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-xl font-bold tracking-tighter text-white mb-4">
            ЭкоПроф<span className="text-orange-600 font-extrabold">Сервис</span>
          </div>
          <p className="text-sm border-l-2 border-orange-600 pl-3 text-zinc-400">
            Профессиональная очистка систем вентиляции от жира и пыли.
          </p>
          <p className="text-xs text-zinc-500 mt-3 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            Работаем по всей Самаре и области
          </p>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">Для бизнеса</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services/restaurants" className="hover:text-orange-600 transition-colors">Рестораны и кафе</Link></li>
            <li><Link href="/services/factories" className="hover:text-orange-600 transition-colors">Заводы и производства</Link></li>
            <li><Link href="/services/malls" className="hover:text-orange-600 transition-colors">Торговые центры</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">Навигация</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-white transition-colors">Наши услуги</Link></li>
            <li><Link href="/portfolio" className="hover:text-white transition-colors">До и после</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">О компании</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">Контакты</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:89023391617" className="hover:text-white transition-colors">8 (902) 339-16-17</a></li>
            <li><a href="mailto:info@ekoprof-service.ru" className="hover:text-white transition-colors">info@ekoprof-service.ru</a></li>
            <li className="text-zinc-500">г. Самара, ул. Гагарина, 181Б</li>
            <li className="mt-4 text-xs">Пн-Вс: 24/7 (Выездные бригады)</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-zinc-800/50 text-xs flex justify-between">
        <p>&copy; 2018-{new Date().getFullYear()} ЭкоПрофСервис. Все права защищены.</p>
        <p>Политика конфиденциальности</p>
      </div>
    </footer>
  );
}
