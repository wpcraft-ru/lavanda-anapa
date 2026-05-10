# Гостевой Дом «Лаванда»

> Сайт гостевого дома «Лаванда» — комфортабельный семейный отдых на берегу Чёрного моря в Анапе. Современные номера, закрытая территория, душевный приём.

## Что внутри

| Файл/Папка | Назначение |
|-----------|-----------|
| `AGENTS.md` | Инструкции для AI-агентов: навыки, стек, правила |
| `DESIGN.md` | Дизайн-система: токены, компоненты, правила |
| `MARKETING.md` | Маркетинговый конфиг: brand voice, ICP, каналы |
| `.agents/scripts/` | CLI-скрипты: WordPress и WooCommerce REST API |
| `ssg/` | Astro SSG/SSR фронтенд |
| `.env.example` | Переменные окружения: WP, AI API, аналитика, деплой |

## Компетенции

- **Дизайн** — UI/UX, дизайн-система (Design as Code), типографика, компоненты
- **Маркетинг** — XEO (SEO+AEO+GEO), контент-стратегия, аналитика, Marketing as Code
- **Разработка** — Astro JS, HTML/CSS, деплой статических сайтов

## Skills

| Скилл | Папка | Назначение |
|-------|-------|-----------|
| Project Setup | `.agents/skills/ai-webmaster-project-setup/` | Адаптация шаблона под новый проект |
| Web Design | `.agents/skills/web-design/` | UI/UX, дизайн-система, компоненты, вёрстка |
| XEO Marketing | `.agents/skills/xeo-marketing/` | SEO + AEO + GEO — все поисковые движки |
| Content Marketing | `.agents/skills/content-marketing/` | Стратегия, контент-план, брифы |
| Content WordPress | `.agents/skills/content-wordpress/` | Блог: посты, страницы, медиа, WP REST API |
| Content WooCommerce | `.agents/skills/content-woocommerce/` | Каталог: продукты, вариации, заказы |
| Humanizer | `.agents/skills/humanizer/` | Очистка AI-следов, живой тон |

## Как использовать

1. Скопировать шаблон в новый проект
2. Адаптировать `MARKETING.md` под конкретный продукт
3. Настроить `DESIGN.md` под бренд
4. Добавить специфичные скиллы в `.agents/skills/`
5. Подключить к AI-ассистенту (Copilot, Claude Code, OpenCode) как проект

## AI code driven

Проект построен на парадигме «всё как код» — три столпа, каждый из которых превращает креативный хаос в версионированные, воспроизводимые артефакты:

### Design as Code

Дизайн-решения → JSON tokens → Style Dictionary → CSS/Swift/Kotlin. Design tokens — единый source of truth между дизайнерами и разработчиками, устраняющий ручной handoff. Три слоя токенов: option (сырая палитра) → decision (семантические) → component (контекстные). Алиасы (`{path.to.token}`) позволяют менять визуальный язык продукта изменением нескольких семантических токенов. W3C DTCG разрабатывает официальную спецификацию формата.

Контекст и инструкции в `DESIGN.md` 

> [Design as Code — дизайн-токены и архитектура](https://ddpa.ru/kb/ai/design/design-as-code/)

### Marketing as Code

Маркетинговые операции описываются как код: цели, ограничения и данные, а AI-системы автономно генерируют, тестируют и оптимизируют кампании. Ключевой сдвиг: от фиксированных if-then правил к автономным циклам, где AI оперирует миллионами динамических сегментов. Человек задаёт стратегию и guardrails, AI исполняет.

Контекст и инструкции в `MARKETING.md`

> [Marketing as Code — AI-автоматизация маркетинга](https://wpcraft.ru/kb/marketing/marketing-as-code/)

### Infrastructure as Code

Серверы, базы данных, сети и балансировщики описываются в конфигурационных файлах и разворачиваются автоматически. Декларативность, идемпотентность, воспроизводимость: dev = staging = prod, весь код в Git. Для WordPress: инфраструктура под сайт создаётся одной командой.

Используется 
- GitHub Actions для CI/CD, 
- Docker для облачной инфраструктуры,
- AstroJS для прототипирования дизайна.
- `@wordpress/env` для локальной разработки WordPress.

> [Infrastructure as Code для WordPress](https://wpcraft.ru/kb/components/hosting/iac-wordpress/)



## Структура

```
ai-webmaster/
├── AGENTS.md                  # AI-агенты: навыки, стек, правила
├── DESIGN.md                  # Дизайн-система
├── MARKETING.md               # Маркетинговый конфиг
├── .env.example               # Переменные окружения
├── README.md                  # Этот файл
├── .agents/
│   ├── scripts/
│   │   ├── wp_api.mjs         # WordPress REST API (CLI)
│   │   ├── woo_api.mjs        # WooCommerce REST API (CLI)
│   │   └── functions.mjs      # Общие утилиты
│   └── skills/
│       ├── ai-webmaster-project-setup/  # Стартовый скилл
│       ├── web-design/                  # Дизайн и вёрстка
│       ├── xeo-marketing/               # SEO + AEO + GEO
│       ├── content-marketing/           # Стратегия контента
│       ├── content-wordpress/           # Блог на WordPress
│       ├── content-woocommerce/         # Каталог WooCommerce
│       └── humanizer/                   # Очистка AI-следов
├── ssg/                       # Astro SSG/SSR фронтенд
│   ├── src/
│   │   ├── layouts/
│   │   └── pages/
│   └── astro.config.mjs
```

## License

MIT
