import { useState } from "react";
import Icon from "@/components/ui/icon";

const AGENT_PHOTO = "https://cdn.poehali.dev/projects/cfa8cd8f-becf-49b5-8c9d-709a381dc130/files/8cbc890d-3336-45ca-a49f-45eb09d671d3.jpg";
const APARTMENT_1 = "https://cdn.poehali.dev/projects/cfa8cd8f-becf-49b5-8c9d-709a381dc130/files/1218480e-fa39-45d4-aff0-216108f053b3.jpg";
const APARTMENT_2 = "https://cdn.poehali.dev/projects/cfa8cd8f-becf-49b5-8c9d-709a381dc130/files/b29b8cfe-2147-4cea-8237-9bf8b9d5f51b.jpg";

const INSTAGRAM_URL = "https://www.instagram.com/viktoria_ekizyan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const TELEGRAM_URL = "https://t.me/dvizh_nedvizh_61";

const properties = [
  { id: 1, type: "apartment", title: "Апартаменты в Пресненском районе", address: "ул. Большая Грузинская, 12", price: 42_500_000, area: 87, rooms: 3, district: "ЦАО", image: APARTMENT_1, tag: "Новинка" },
  { id: 2, type: "penthouse", title: "Пентхаус с видом на Москву-реку", address: "Котельническая наб., 1", price: 125_000_000, area: 210, rooms: 4, district: "ЦАО", image: APARTMENT_2, tag: "Топ" },
  { id: 3, type: "apartment", title: "Квартира в Хамовниках", address: "Фрунзенская наб., 30", price: 38_000_000, area: 72, rooms: 2, district: "ЦАО", image: APARTMENT_1, tag: null },
  { id: 4, type: "townhouse", title: "Таунхаус в Рублёво-Успенском", address: "Рублёво-Успенское ш., 45", price: 89_000_000, area: 320, rooms: 5, district: "ЗАО", image: APARTMENT_2, tag: "Эксклюзив" },
  { id: 5, type: "apartment", title: "Студия в Сити", address: "Пресненская наб., 8", price: 22_000_000, area: 45, rooms: 1, district: "ЦАО", image: APARTMENT_1, tag: null },
  { id: 6, type: "apartment", title: "Квартира на Патриарших прудах", address: "М. Козихинский пер., 7", price: 67_000_000, area: 130, rooms: 4, district: "ЦАО", image: APARTMENT_2, tag: "Топ" },
];

const deals = [
  { year: "2024", title: "Пентхаус, Котельническая набережная", result: "Продажа за 3 недели", price: "118 млн ₽", type: "Продажа" },
  { year: "2024", title: "4-комн. квартира, Хамовники", result: "Выше рынка на 12%", price: "71 млн ₽", type: "Продажа" },
  { year: "2023", title: "Таунхаус, Рублёвка", result: "Закрыто за 10 дней", price: "95 млн ₽", type: "Продажа" },
  { year: "2023", title: "Апартаменты, Москва-Сити", result: "Подобрано под клиента", price: "55 млн ₽", type: "Покупка" },
  { year: "2023", title: "Квартира, Патриаршие пруды", result: "Полное юридическое сопровождение", price: "63 млн ₽", type: "Покупка" },
  { year: "2022", title: "Студия, Пресня", result: "Инвестиционная покупка", price: "19 млн ₽", type: "Покупка" },
];

const mapObjects = [
  { id: 1, x: 48, y: 42 },
  { id: 2, x: 52, y: 55 },
  { id: 3, x: 38, y: 60 },
  { id: 4, x: 62, y: 38 },
  { id: 5, x: 45, y: 70 },
];

const typeLabels: Record<string, string> = {
  all: "Все",
  apartment: "Квартиры",
  penthouse: "Пентхаусы",
  townhouse: "Таунхаусы",
};

const districtLabels = ["Все", "ЦАО", "ЗАО", "СВАО", "ЮАО"];

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
            А. Соколова
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
                Элитная недвижимость · Ростов-на-Дону
              </p>
              <h1 className="animate-fade-in-delay-1 font-display text-6xl md:text-8xl font-light leading-none mb-6 text-[#FDFFF5]">
                Виктория<br />
                <span className="italic text-gold">Экизьян</span>
              </h1>
              <div className="animate-fade-in-delay-2 w-16 h-px bg-gold mb-6" />
              <p className="animate-fade-in-delay-3 font-body text-sm tracking-widest text-gold mb-6">
                Риэлтор · Консультант по недвижимости
              </p>
              <p className="animate-fade-in-delay-3 font-body text-base text-[#d6d7d7] leading-relaxed mb-6 max-w-lg">
                Специализируюсь на недвижимости Ростова-на-Дону — от квартир в центре до загородных домов. Более 8 лет, более 200 сделок. Полное сопровождение от поиска до регистрации права собственности.
              </p>

              <div className="animate-fade-in-delay-3 grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "Award", text: "Сертифицированный риэлтор РГР" },
                  { icon: "Shield", text: "Полное юридическое сопровождение" },
                  { icon: "Users", text: "База проверенных застройщиков" },
                  { icon: "TrendingUp", text: "Инвестиционные консультации" },
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

              <div className="animate-fade-in-delay-5 grid grid-cols-3 gap-6 pt-8 border-t border-[#FDFFF5]/10">
                {[
                  { num: "200+", label: "Сделок" },
                  { num: "8", label: "Лет опыта" },
                  { num: "98%", label: "Довольных" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-4xl font-light text-gold">{s.num}</div>
                    <div className="font-body text-xs tracking-wider uppercase text-[#d6d7d7]/60 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — фото */}
            <div className="animate-fade-in-delay-2 relative hidden lg:block">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={AGENT_PHOTO} alt="Виктория Экизьян" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 border border-gold p-6 bg-[#2b323f]">
                <div className="font-display text-4xl font-light text-gold">8+</div>
                <div className="font-body text-xs tracking-widest uppercase text-[#d6d7d7]/60 mt-1">лет в профессии</div>
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

          {/* Interactive Map */}
          <div className="mb-16 border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center gap-3">
              <Icon name="MapPin" size={16} className="text-gold" />
              <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">Расположение объектов на карте</span>
            </div>
            <div className="relative bg-[hsl(220,15%,9%)] h-64 md:h-80 overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(43,65%,65%)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <ellipse cx="50" cy="52" rx="28" ry="24" fill="none" stroke="hsl(43,65%,65%)" strokeWidth="0.3" strokeOpacity="0.4"/>
                <ellipse cx="50" cy="52" rx="18" ry="15" fill="none" stroke="hsl(43,65%,65%)" strokeWidth="0.3" strokeOpacity="0.3"/>
                <ellipse cx="50" cy="52" rx="10" ry="8" fill="none" stroke="hsl(43,65%,65%)" strokeWidth="0.3" strokeOpacity="0.25"/>
                <line x1="50" y1="20" x2="50" y2="85" stroke="hsl(43,65%,65%)" strokeWidth="0.2" strokeOpacity="0.2"/>
                <line x1="15" y1="52" x2="85" y2="52" stroke="hsl(43,65%,65%)" strokeWidth="0.2" strokeOpacity="0.2"/>
              </svg>
              {mapObjects.map((obj) => (
                <button
                  key={obj.id}
                  style={{ left: `${obj.x}%`, top: `${obj.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  onMouseEnter={() => setMapHover(obj.id)}
                  onMouseLeave={() => setMapHover(null)}
                >
                  <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    mapHover === obj.id ? "bg-gold border-gold scale-150" : "bg-gold/40 border-gold"
                  }`} />
                  {mapHover === obj.id && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-gold px-3 py-1.5 whitespace-nowrap z-10">
                      <p className="font-body text-xs text-gold tracking-wider">{properties[obj.id - 1]?.title}</p>
                      <p className="font-body text-xs text-muted-foreground">{formatPrice(properties[obj.id - 1]?.price)}</p>
                    </div>
                  )}
                </button>
              ))}
              <div className="absolute bottom-4 right-4 font-body text-xs text-muted-foreground tracking-wider uppercase">
                Москва · Схема районов
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



      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Результаты</p>
            <h2 className="font-display text-5xl font-light text-foreground gold-line mb-6">Закрытые сделки</h2>
            <p className="font-body text-base text-muted-foreground mt-10 max-w-xl">
              Каждый кейс — это история доверия и профессионального подхода. Реальные результаты для реальных клиентов.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {deals.map((deal, i) => (
              <div key={i} className="bg-background p-8 hover:bg-card transition-colors duration-300 group">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-display text-5xl font-light text-border group-hover:text-gold transition-colors duration-300">{deal.year}</span>
                  <span className={`font-body text-xs tracking-widest uppercase px-3 py-1 border ${
                    deal.type === "Продажа" ? "border-gold text-gold" : "border-muted-foreground text-muted-foreground"
                  }`}>
                    {deal.type}
                  </span>
                </div>
                <h3 className="font-display text-xl font-light text-foreground mb-3 leading-snug">{deal.title}</h3>
                <p className="font-body text-sm text-muted-foreground mb-6 flex items-center gap-2">
                  <Icon name="CheckCircle" size={14} className="text-gold flex-shrink-0" />
                  {deal.result}
                </p>
                <div className="pt-4 border-t border-border">
                  <span className="font-display text-2xl font-light text-gold">{deal.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 border border-gold/30 bg-card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: "200+", label: "Сделок закрыто" },
                { num: "15 млрд", label: "Общий объём" },
                { num: "98%", label: "Положительных отзывов" },
                { num: "30 дней", label: "Средний срок сделки" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl font-light text-gold mb-2">{s.num}</div>
                  <div className="font-body text-xs tracking-wider uppercase text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
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
                Готова ответить на все вопросы о покупке, продаже или аренде недвижимости. Первичная консультация — бесплатно.
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