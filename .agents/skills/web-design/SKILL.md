---
name: web-design
description: >
  Design pages and UI components for the Сайтолог project. Use when designing a new page,
  creating an RFC for a page layout, building UI components, planning a landing/catalog/blog page,
  or validating UI against the Сайтолог design system.
  Triggers: дизайн страницы, RFC страницы, page design, page layout, UI компонент,
  верстка, design system, макет, page pattern, blog page, landing page.
metadata:
  version: "1.0.0"
  domain: design
  role: designer + developer
  scope: implementation + documentation
  output-format: RFC md file + code
---

# Web Design — Сайтолог

Дизайн страниц и UI-компонентов для проекта Сайтолог согласно дизайн-системе, бренд-голосу и техническому стеку.

## Контекст проекта

- **Платформа:** Astro (SSG) работаем тут `ssg/`
- **Стиль:** берем из `DESIGN.md`
- **Аудитория:** берем из `MARKETING.md`
- **RFC:** Каждый page design сохраняется в `docs/rfc/` как `.md` файл


## Workflow

### Этап 1 — Discovery (сбор контекста)

Определить (спросить, если не указано):
- Тип страницы: блог-пост / landing / kb-статья / каталог / карточка продукта / archive
- Цель страницы: конвертация / информация / навигация / SEO
- Целевая аудитория (из MARKETING.md → ICP)
- Ключевые секции и контент
- Есть ли существующие RFC или референсы (`docs/rfc/`)

### Этап 2 — Structure (wireframe и иерархия)

- Wireframe — текстовое описание блоков и их порядка
- Иерархия контента (H1 → H4)
- User flow для интерактивных элементов

### Этап 3 — Visual (дизайн по токенам)

- Использовать ТОЛЬКО токены из DESIGN.md
- Цвета — семантические токены
- Типографика — из type scale
- Отступы — из spacing scale
- Компоненты — из DESIGN.md Components

### Этап 4 — Responsive

- Mobile first (от sm к xl)
- Каждая ключевая секция — 3 точки: mobile, tablet, desktop
- Touch targets ≥ 44px на мобильных

### Этап 5 — RFC документ

Создать файл со структурой:

```md
# RFC: <Название страницы>

## Meta
- **URL / шаблон:**
- **Тип:** blog | landing | kb | catalog | archive | product-card
- **Цель:**
- **Аудитория:** (из MARKETING.md ICP)
- **Статус:** draft | review | approved

## Sections

### <Название секции>
- **Layout:** описание сетки / позиционирования
- **Контент:** заголовки, тексты, CTA (тон по MARKETING.md)
- **Компоненты:** кнопки, карточки, badge, input — из дизайн-системы
- **Mobile:** поведение на мобильных

## Иллюстрации / промпты
- Промпты для генерации изображений (если нужны)

## Технические заметки
- Astro компоненты / шаблоны
- CSS классы, custom properties
- API эндпоинты (если нужны)
```

### Этап 6 — Реализация

После аппрува RFC приступить к коду в `ssg/`:
- Компоненты → `ssg/src/components/`
- Страницы → `ssg/src/pages/`
- Layouts → `ssg/src/layouts/`
- Стили → CSS custom properties из дизайн-токенов

## Дизайн-токены (из DESIGN.md)

### Цвета
```css
--color-primary: #2563EB;
--color-primary-dark: #1D4ED8;
--color-primary-light: #DBEAFE;
--color-secondary: #8B5CF6;
--color-success: #16A34A;
--color-warning: #D97706;
--color-danger: #DC2626;
--color-surface: #FFFFFF;
--color-background: #F8FAFC;
--color-text: #0F172A;
--color-text-muted: #64748B;
--color-border: #E2E8F0;
```

### Типографика

Font stack: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

| Элемент | Size | Weight | Line-height |
|---------|------|--------|-------------|
| H1 | 48px | 700 | 1.2 |
| H2 | 36px | 700 | 1.3 |
| H3 | 24px | 600 | 1.4 |
| H4 | 20px | 600 | 1.4 |
| Body-lg | 18px | 400 | 1.6 |
| Body-md | 16px | 400 | 1.6 |
| Body-sm | 14px | 400 | 1.5 |
| Caption | 12px | 400 | 1.4 |

**Type scale:** 12 / 14 / 16 / 18 / 20 / 24 / 36 / 48 px

### Spacing scale
`4px / 8px / 16px / 24px / 32px / 48px / 64px / 96px`

### Border-radius
`sm: 6px | md: 8px | lg: 12px | xl: 16px | full: 9999px`

### Shadows
`sm: 0 1px 2px rgba(0,0,0,0.05) | md: 0 4px 6px rgba(0,0,0,0.07) | lg: 0 10px 15px rgba(0,0,0,0.08)`

### Breakpoints
`sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px`

## Компоненты

### Button Primary
```css
background: var(--color-primary);
color: #fff;
border-radius: 6px;
padding: 0 24px;
height: 44px;
font-size: 14px;
font-weight: 600;
transition: all 0.15s ease;
```
Hover: `bg --color-primary-dark` | Focus: `ring 2px primary, offset 2px` | Disabled: `opacity: 0.5`

### Card
```css
background: var(--color-surface);
border: 1px solid var(--color-border);
border-radius: 8px;
padding: 24px;
box-shadow: var(--shadow-sm);
```

### Input
```css
background: var(--color-surface);
border: 1px solid var(--color-border);
border-radius: 6px;
padding: 0 16px;
height: 44px;
```
Focus: `border primary, ring 2px primary 20% opacity`

## Паттерны страниц

### Landing / Hero
- Hero: h1 (48px) + subtitle (body-lg) + primary CTA
- Feature grid: иконка + заголовок + описание, 2-3 col
- Социальное доказательство: логотипы / цифры / кейсы

### Блог-пост / Статья
- Body: max-width 720px, по центру
- Структура: hero (title + meta) → тело статьи → related posts
- Код-блоки: light theme, monospace
- Изображения: border-radius 8px, max-width 100%

### Каталог / Archive
- Сетка: 1 col mobile → 2 col tablet → 3 col desktop
- Карточка: thumbnail → title → excerpt → tags → CTA

## Бренд-голос (из MARKETING.md)

- Дружелюбный эксперт, просто о сложном
- **Запрещено:** кликбейт, капслок, эмодзи в заголовках, рекламные интонации
- Формат: практический > вдохновляющий, конкретика > абстракции

### Примеры заголовков
| ❌ Плохо | ✅ Хорошо |
|---------|---------|
| "Лучший AI для сайтов 2026!!!" | "Как AI-ассистент помогает создавать сайты: опыт Сайтолога" |
| "Революционный инструмент" | "Сайтолог vs конструкторы: сравнение подходов" |
| "Вы не поверите..." | "Пошаговый гайд: запуск сайта с AI-ассистентом" |

## Accessibility checklist

- [ ] Контраст WCAG AA (4.5:1 текст, 3:1 UI)
- [ ] Focus visible на всех интерактивных элементах (2px solid primary, offset 2px)
- [ ] Семантические HTML теги (`<button>`, `<nav>`, `<main>`, `<article>`)
- [ ] Alt text для изображений (осмысленный или пустой для декоративных)
- [ ] Touch targets ≥ 44×44px на мобильных
- [ ] Не более одной primary-кнопки в одном hero-блоке

## Правила кода

- Стили через CSS custom properties из DESIGN.md
- Mobile-first: базовые стили для мобильных, расширять через media queries
- Без inline styles
- Без `!important` (кроме override библиотек)
- Не использовать raw hex-значения в коде — только через токены или CSS-переменные
- Не использовать danger-цвет для привлечения внимания (только деструктивные действия)

## Чеклист перед финализацией RFC

- [ ] Все 4 состояния интерактивных элементов: default / hover / focus / disabled
- [ ] Mobile поведение описано для каждой секции
- [ ] Тон заголовков и текстов проверен по MARKETING.md
- [ ] Технические зависимости (API, компоненты) указаны
- [ ] Промпты для иллюстраций добавлены (если нужны)
