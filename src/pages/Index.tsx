import { useState } from "react";
import Icon from "@/components/ui/icon";

const AGENT_PHOTO = "https://cdn.poehali.dev/projects/cfa8cd8f-becf-49b5-8c9d-709a381dc130/bucket/b204a07a-580e-4340-8e74-78b6e13b4c10.jpg";
const JK_1 = "https://cdn.poehali.dev/projects/cfa8cd8f-becf-49b5-8c9d-709a381dc130/files/e26d7c5b-2b99-403e-b94a-80c3ce36774c.jpg";
const JK_2 = "https://cdn.poehali.dev/projects/cfa8cd8f-becf-49b5-8c9d-709a381dc130/files/faabf641-8fbc-4785-aa64-781b11b003fe.jpg";
const JK_3 = "https://cdn.poehali.dev/projects/cfa8cd8f-becf-49b5-8c9d-709a381dc130/files/6c8ffc51-8c20-436d-8f1f-a50979dc3d13.jpg";

const INSTAGRAM_URL = "https://www.instagram.com/viktoria_ekizyan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const TELEGRAM_URL = "https://t.me/dvizh_nedvizh_61";

const properties = [
  { id: 1, type: "apartment", title: "ЖК «Западный луч»", address: "ул. Вавилова, 68", price: 5_200_000, area: 42, rooms: 1, district: "Советский", image: JK_1, tag: "Новинка" },
  { id: 2, type: "apartment", title: "ЖК «Позитив»", address: "ул. Жмайлова, 4е", price: 7_800_000, area: 68, rooms: 2, district: "Советский", image: JK_2, tag: "Топ" },
  { id: 3, type: "apartment", title: "ЖК «Родной берег»", address: "пр. Королёва, 12а", price: 6_400_000, area: 56, rooms: 2, district: "Кировский", image: JK_3, tag: null },
  { id: 4, type: "apartment", title: "ЖК «Суворовский»", address: "пр. Маршала Жукова, 1", price: 9_100_000, area: 85, rooms: 3, district: "Суворовский", image: JK_1, tag: "Хит" },
  { id: 5, type: "apartment", title: "ЖК «Вершина»", address: "ул. Берег реки Дон, 1", price: 4_900_000, area: 38, rooms: 1, district: "Кировский", image: JK_2, tag: null },
  { id: 6, type: "apartment", title: "ЖК «Платовский»", address: "ул. Платовский пр-т, 18", price: 11_500_000, area: 102, rooms: 3, district: "Советский", image: JK_3, tag: "Топ" },
];

const deals = [
  { year: "2024", title: "ЖК «Суворовский», 3-комн. квартира", result: "Продажа за 2 недели", price: "9.2 млн ₽", type: "Продажа" },
  { year: "2024", title: "ЖК «Позитив», 2-комн. квартира", result: "Выше рынка на 8%", price: "7.8 млн ₽", type: "Продажа" },
  { year: "2024", title: "ЖК «Западный луч», студия", result: "Оформлена ипотека 5.9%", price: "5.1 млн ₽", type: "Покупка" },
  { year: "2023", title: "ЖК «Платовский», 3-комн. квартира", result: "Подобрано под клиента", price: "11.2 млн ₽", type: "Покупка" },
  { year: "2023", title: "ЖК «Родной берег», 2-комн. квартира", result: "Полное юридическое сопровождение", price: "6.3 млн ₽", type: "Покупка" },
  { year: "2023", title: "ЖК «Вершина», 1-комн. квартира", result: "Инвестиционная покупка", price: "4.7 млн ₽", type: "Покупка" },
];

const mapObjects = [
  { id: 1, x: 52, y: 38 },
  { id: 2, x: 45, y: 50 },
  { id: 3, x: 60, y: 55 },
  { id: 4, x: 38, y: 44 },
  { id: 5, x: 55, y: 65 },
];

const typeLabels: Record<string, string> = {
  all: "Все",
  apartment: "Квартиры",
};

const districtLabels = ["Все", "Советский", "Кировский", "Суворовский"];

function formatPrice(p: number) {
  if (p >= 1_000_000) return `${(p / 1_000_000).toFixed(1).replace(".0", "")} млн ₽`;
  return `${p.toLocaleString("ru")} ₽`;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [typeFilter, setTypeFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("Все");
  const [priceFilter, setPriceFilter] = useState("all");
  const [mapHover, setMapHover] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = properties.filter((p) => {
    const typeOk = typeFilter === "all" || p.type === typeFilter;
    const districtOk = districtFilter === "Все" || p.district === districtFilter;
    const priceOk =
      priceFilter === "all" ||
      (priceFilter === "under50" && p.price < 50_000_000) ||
      (priceFilter === "50to100" && p.price >= 50_000_000 && p.price < 100_000_000) ||
      (priceFilter === "over100" && p.price >= 100_000_000);
    return typeOk && districtOk && priceOk;
  });

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "portfolio", label: "Портфолио" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-display text-xl font-light tracking-widest text-gold uppercase">
            В. Экизьян
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-body text-sm tracking-wider uppercase transition-colors duration-200 ${
                  activeSection === item.id ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"
              className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-200">
              <Icon name="Instagram" size={16} />
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer"
              className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-200">
              <Icon name="Send" size={16} />
            </a>
          </div>
          <button className="md:hidden text-muted-foreground hover:text-gold" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="text-left font-body text-sm tracking-wider uppercase text-muted-foreground hover:text-gold transition-colors">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO + ABOUT */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#2b323f]">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT — текст */}
            <div>
              <p className="animate-fade-in font-body text-xs tracking-[0.3em] uppercase text-gold mb-6">
                Новостройки · Ростов-на-Дону
              </p>
              <h1 className="animate-fade-in-delay-1 font-display text-5xl md:text-7xl leading-tight mb-6 text-[#FDFFF5]">
                <span className="italic font-bold">Привет! <span className="text-gold">Я Вика</span> —</span><br />
                <span style={{ fontFamily: "'Times New Roman', Times, serif" }} className="not-italic font-thin text-[#FDFFF5]">твой гид на рынке новостроек</span>
              </h1>
              <div className="animate-fade-in-delay-2 w-16 h-px bg-gold mb-6" />
              <p className="animate-fade-in-delay-3 font-body text-base text-[#d6d7d7] leading-relaxed mb-4 max-w-lg">
                Я партнёр всех застройщиков Ростова-на-Дону, Аксая и Батайска. Я не «просто агент» — я твой друг-эксперт, который:
              </p>
              <div className="animate-fade-in-delay-3 flex flex-col gap-3 mb-8">
                {[
                  { icon: "Search", text: "Подберёт идеальную квартиру под твой бюджет и запрос" },
                  { icon: "MessageCircle", text: "Расскажет всё честно — со всеми плюсами и минусами объекта" },
                  { icon: "CreditCard", text: "Поможет с одобрением ипотеки" },
                  { icon: "Heart", text: "Сбережёт твои нервы и будет рядом на всех этапах сделки" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-7 h-7 border border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon} size={13} className="text-gold" />
                    </div>
                    <p className="font-body text-sm text-[#d6d7d7] leading-snug">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="animate-fade-in-delay-4 flex flex-col sm:flex-row gap-4 mb-10">
                <button onClick={() => scrollTo("catalog")}
                  className="px-8 py-4 bg-gold text-[#FDFFF5] font-body text-sm tracking-widest uppercase hover:opacity-90 transition-all duration-200 font-medium">
                  Смотреть объекты
                </button>
                <button onClick={() => scrollTo("contacts")}
                  className="px-8 py-4 border border-gold text-gold font-body text-sm tracking-widest uppercase hover:bg-gold hover:text-[#FDFFF5] transition-all duration-200">
                  Связаться
                </button>
              </div>


            </div>

            {/* RIGHT — фото */}
            <div className="animate-fade-in-delay-2 relative hidden lg:block">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={AGENT_PHOTO} alt="Виктория Экизьян" className="w-full h-full object-cover" />
              </div>

              <div className="absolute top-6 -right-4 flex flex-col gap-3">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"
                  className="w-10 h-10 bg-gold flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Icon name="Instagram" size={18} className="text-[#FDFFF5]" />
                </a>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer"
                  className="w-10 h-10 border border-gold flex items-center justify-center hover:bg-gold transition-colors group">
                  <Icon name="Send" size={18} className="text-gold group-hover:text-[#FDFFF5] transition-colors" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Недвижимость</p>
            <h2 className="font-display text-5xl font-light text-foreground gold-line mb-12">Каталог объектов</h2>
            <div className="flex flex-wrap gap-6 items-end">
              <div>
                <p className="font-body text-xs tracking-wider uppercase text-muted-foreground mb-2">Тип объекта</p>
                <div className="flex gap-2">
                  {Object.entries(typeLabels).map(([k, v]) => (
                    <button key={k} onClick={() => setTypeFilter(k)}
                      className={`px-4 py-2 font-body text-xs tracking-wider uppercase border transition-all duration-200 ${
                        typeFilter === k ? "border-gold bg-gold text-background" : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                      }`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-body text-xs tracking-wider uppercase text-muted-foreground mb-2">Район</p>
                <div className="flex gap-2 flex-wrap">
                  {districtLabels.map((d) => (
                    <button key={d} onClick={() => setDistrictFilter(d)}
                      className={`px-4 py-2 font-body text-xs tracking-wider uppercase border transition-all duration-200 ${
                        districtFilter === d ? "border-gold bg-gold text-background" : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                      }`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-body text-xs tracking-wider uppercase text-muted-foreground mb-2">Цена</p>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { k: "all", v: "Все" },
                    { k: "under50", v: "до 50 млн" },
                    { k: "50to100", v: "50–100 млн" },
                    { k: "over100", v: "от 100 млн" },
                  ].map(({ k, v }) => (
                    <button key={k} onClick={() => setPriceFilter(k)}
                      className={`px-4 py-2 font-body text-xs tracking-wider uppercase border transition-all duration-200 ${
                        priceFilter === k ? "border-gold bg-gold text-background" : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                      }`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 && (
              <div className="col-span-3 py-20 text-center text-muted-foreground font-body tracking-wider">
                По выбранным фильтрам объектов не найдено
              </div>
            )}
            {filtered.map((p) => (
              <div key={p.id} className="card-hover border border-border bg-card group cursor-pointer">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {p.tag && (
                    <span className="absolute top-4 left-4 bg-gold text-background font-body text-xs tracking-widest uppercase px-3 py-1">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <p className="font-body text-xs tracking-widest uppercase text-gold mb-2">{p.district} · {typeLabels[p.type]}</p>
                  <h3 className="font-display text-xl font-light text-foreground mb-2 leading-snug">{p.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 flex items-center gap-1.5">
                    <Icon name="MapPin" size={12} className="text-gold flex-shrink-0" />
                    {p.address}
                  </p>
                  <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                    <span className="font-body text-xs tracking-wider flex items-center gap-1">
                      <Icon name="Square" size={12} />
                      {p.area} м²
                    </span>
                    <span className="font-body text-xs tracking-wider flex items-center gap-1">
                      <Icon name="LayoutGrid" size={12} />
                      {p.rooms} комн.
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-display text-2xl font-light text-foreground">{formatPrice(p.price)}</span>
                    <button onClick={() => scrollTo("contacts")}
                      className="font-body text-xs tracking-widest uppercase text-gold border border-gold px-4 py-2 hover:bg-gold hover:text-background transition-all duration-200">
                      Запрос
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* REVIEWS */}
      <section id="portfolio" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Клиенты</p>
            <h2 className="font-display text-5xl font-light text-foreground gold-line mb-6">Отзывы</h2>
            <p className="font-body text-base text-muted-foreground mt-10 max-w-xl">
              Реальные истории людей, которым я помогла найти своё жильё.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Александра М.",
                jk: "ЖК «Суворовский»",
                text: "Вика помогла подобрать идеальную квартиру под наш бюджет. Всё объяснила честно, без навязывания. Ипотеку одобрили с первого раза — спасибо огромное!",
                stars: 5,
                date: "март 2024",
              },
              {
                name: "Дмитрий К.",
                jk: "ЖК «Западный луч»",
                text: "Обратился по рекомендации. Виктория — настоящий профессионал. Рассказала про все минусы объекта, не скрывала ничего. Сделка прошла быстро и без нервов.",
                stars: 5,
                date: "февраль 2024",
              },
              {
                name: "Наталья и Сергей Р.",
                jk: "ЖК «Позитив»",
                text: "Были на нескольких объектах с Викой. Она всегда была на связи, отвечала на все вопросы. Купили двушку — очень довольны и объектом, и сервисом!",
                stars: 5,
                date: "январь 2024",
              },
              {
                name: "Ирина Т.",
                jk: "ЖК «Родной берег»",
                text: "Первая покупка недвижимости — страшно было жуть. Вика взяла за руку и провела через весь процесс. Теперь у меня своя квартира с видом на Дон 🎉",
                stars: 5,
                date: "декабрь 2023",
              },
              {
                name: "Михаил О.",
                jk: "ЖК «Платовский»",
                text: "Брал как инвестицию. Вика подсказала наиболее ликвидные планировки и этажи. Уже через полгода сдаю в аренду — окупаемость отличная.",
                stars: 5,
                date: "октябрь 2023",
              },
              {
                name: "Екатерина В.",
                jk: "ЖК «Вершина»",
                text: "Искала студию под ипотеку. Вика подобрала за один день — именно то, что нужно. С банком помогла всё оформить. Очень рекомендую!",
                stars: 5,
                date: "сентябрь 2023",
              },
            ].map((review, i) => (
              <div key={i} className="card-hover bg-card border border-border p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: review.stars }).map((_, si) => (
                    <span key={si} className="text-gold text-base">★</span>
                  ))}
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed flex-1">«{review.text}»</p>
                <div className="pt-4 border-t border-border flex items-end justify-between">
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{review.name}</p>
                    <p className="font-body text-xs text-gold tracking-wider">{review.jk}</p>
                  </div>
                  <p className="font-body text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#2b323f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Связаться</p>
              <h2 className="font-display text-5xl font-light text-[#FDFFF5] gold-line mb-12">Контакты</h2>
              <p className="font-body text-base text-[#d6d7d7] leading-relaxed mb-12 mt-10">
                Готова ответить на все ваши вопросы о объектах, скидках и ипотеке.
              </p>
              <div className="space-y-6 mb-12">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (961) 307-69-07" },
                  { icon: "Mail", label: "Email", value: "vikkiart@bk.ru" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-widest uppercase text-[#d6d7d7]/60 mb-1">{c.label}</p>
                      <p className="font-body text-base text-[#FDFFF5]">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-6">
              <h3 className="font-display text-3xl font-light text-[#FDFFF5]">Написать напрямую</h3>
              <p className="font-body text-sm text-[#d6d7d7]">
                Выберите удобный мессенджер — отвечаю в течение часа в рабочие дни.
              </p>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer"
                className="flex items-center justify-between px-8 py-6 bg-gold text-background group hover:opacity-90 transition-all duration-200">
                <div className="flex items-center gap-4">
                  <Icon name="Send" size={24} />
                  <div>
                    <p className="font-body text-sm font-medium tracking-wider uppercase">Telegram</p>
                    <p className="font-body text-xs opacity-70">Быстрый ответ</p>
                  </div>
                </div>
                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"
                className="flex items-center justify-between px-8 py-6 border border-gold text-gold group hover:bg-gold hover:text-background transition-all duration-200">
                <div className="flex items-center gap-4">
                  <Icon name="Instagram" size={24} />
                  <div>
                    <p className="font-body text-sm font-medium tracking-wider uppercase">Instagram</p>
                    <p className="font-body text-xs opacity-70">Объекты и истории</p>
                  </div>
                </div>
                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg tracking-widest text-gold uppercase">В. Экизьян</span>
          <p className="font-body text-xs text-muted-foreground tracking-wider">
            © 2024 · Риэлтор в Ростове-на-Дону · Недвижимость
          </p>
          <div className="flex gap-4">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"
              className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors duration-200">
              Instagram
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer"
              className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors duration-200">
              Telegram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;