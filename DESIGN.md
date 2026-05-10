---
name: Гостевой Дом «Лаванда» — Design System
description: >
  Дизайн-система сайта Гостевого Дома «Лаванда» (Анапа, Джемете).
  Источник токенов для UI-агентов: цвета, типографика, отступы, компоненты.
---

# Mission

Тёплый, уютный и доверительный визуальный язык для сайта гостевого дома. Передаёт атмосферу побережья Чёрного моря, лавандовых полей и семейного уюта. Чистый, воздушный, гостеприимный.

# Brand

| Параметр | Значение |
|----------|----------|
| Product | Гостевой Дом «Лаванда» |
| Audience | Семьи с детьми, пары, соло-путешественники — гости Анапы |
| Style | Тёплый, прибрежный, уютный, доверительный |

# Семантические токены

## Colors

| Токен | HEX | Назначение |
|-------|-----|-----------|
| `primary` | `#7C3AED` | Основной — кнопки, ссылки, акценты (лавандовый violet-600) |
| `primary-dark` | `#6D28D9` | Ховер-состояние (violet-700) |
| `primary-light` | `#EDE9FE` | Фон выделения, бейджи (violet-100) |
| `secondary` | `#0891B2` | Второстепенные акценты — морская волна (cyan-600) |
| `accent` | `#F59E0B` | Акцентный — солнце, тёплые детали (amber-500) |
| `success` | `#16A34A` | Подтверждения (green-600) |
| `warning` | `#D97706` | Предупреждения (amber-600) |
| `danger` | `#DC2626` | Ошибки (red-600) |
| `surface` | `#FFFFFF` | Фон карточек |
| `background` | `#FAF5FF` | Основной фон — очень светлый лавандовый (violet-50) |
| `text` | `#1E1B4B` | Основной текст — глубокий тёмно-фиолетовый (indigo-950) |
| `textMuted` | `#6B7280` | Второстепенный текст (gray-500) |
| `border` | `#E5E7EB` | Границы (gray-200) |

## Typography

| Токен | Размер | Вес | Line-height |
|-------|--------|-----|-------------|
| `h1` | 48px | 700 | 1.2 |
| `h2` | 36px | 700 | 1.3 |
| `h3` | 24px | 600 | 1.4 |
| `h4` | 20px | 600 | 1.4 |
| `body-lg` | 18px | 400 | 1.7 |
| `body-md` | 16px | 400 | 1.7 |
| `body-sm` | 14px | 400 | 1.5 |
| `caption` | 12px | 400 | 1.4 |

**Font stack:** `"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif`

**Type scale:** 12 / 14 / 16 / 18 / 20 / 24 / 36 / 48 px

**Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## Spacing

| Токен | Значение |
|-------|----------|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |
| `2xl` | 48px |
| `3xl` | 64px |
| `4xl` | 96px |

## Border radius

| Токен | Значение | Назначение |
|-------|----------|-----------|
| `sm` | 8px | Кнопки, инпуты, теги |
| `md` | 12px | Карточки, модалки |
| `lg` | 16px | Панели, крупные блоки |
| `xl` | 20px | Герой-секции |
| `full` | 9999px | Аватары, pills |

## Shadows

| Токен | Значение |
|-------|----------|
| `sm` | `0 1px 3px rgba(124,58,237,0.06)` |
| `md` | `0 4px 12px rgba(124,58,237,0.08)` |
| `lg` | `0 8px 24px rgba(124,58,237,0.10)` |

## Breakpoints

| Токен | Значение |
|-------|----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

# Компоненты

## Button

- Height: 44px (sm), 52px (md), 60px (lg)
- Padding: 0 24px (sm), 0 36px (md)
- Radius: `sm` (8px)
- Font: body-sm, weight 600
- Primary: bg `primary`, text white, hover `primary-dark`
- Secondary: border `primary`, text `primary`, bg transparent, hover `primary-light`
- CTA: bg `accent` (amber), text `#1E1B4B` (тёмный), hover `#D97706`

## Card (Карточка номера)

- Padding: `lg` (24px)
- Radius: `md` (12px)
- Border: 1px `border`
- Shadow: `sm`
- Background: `surface`
- Изображение: сверху, `border-radius: 12px 12px 0 0`
- Бейдж цены: `accent` фон, `text` цвет, `rounded-full`

## Photo Gallery

- Grid: 2–3 колонки на десктопе, 1 на мобильных
- Gap: `md` (16px)
- Изображения: `border-radius: 12px`, aspect-ratio: 4/3
- Лайтбокс: фон `rgba(0,0,0,0.85)`, стрелки навигации, закрытие по Escape и клику вне

## Testimonial (Отзыв)

- Padding: `lg` (24px)
- Radius: `md` (12px)
- Background: `primary-light` (`#EDE9FE`)
- Звёзды: `accent` цвет
- Аватар: 48px, `rounded-full`

## Contact Block

- Background: `primary` (или `primary-light` на светлых секциях)
- Иконки: 24px, `secondary` цвет
- Телефон: крупно, `h3`, цвет `primary`

## Section

- Max-width: 1200px, centered
- Padding vertical: `3xl`/`4xl`
- Gap между секциями: `4xl`

## Hero Section

- Высота: min 70vh
- Фон: градиент от `primary` (60%) до `background`
- Заголовок: `h1`, цвет white
- Подзаголовок: `body-lg`, цвет `primary-light`
- CTA-кнопка: вариант CTA (amber)
- Оверлей: `linear-gradient(180deg, rgba(124,58,237,0.3) 0%, rgba(124,58,237,0.6) 100%)`

## Icons & Amenities

- Иконки удобств: 24px, цвет `secondary`
- Сетка: flex-wrap, gap `md`
- Каждый элемент: иконка + текст `body-sm`

## Component Behavior

### Button

| State | Visual |
|-------|--------|
| Default | `bg-primary`, `text-white`, `rounded-sm`, `px-6`, `py-2.5` |
| Hover | Затемнение на 10% (`brightness(0.9)`) |
| Focus-visible | Ring: `2px solid primary`, offset `2px` |
| Active | Затемнение на 15% (`brightness(0.85)`) |
| Disabled | `opacity: 0.5`, `cursor: not-allowed`, без hover |
| Loading | Спиннер внутри, текст скрыт, кнопка неактивна |

**Варианты:**
- **Primary:** `bg-primary text-white` — основные CTA.
- **Secondary:** `bg-transparent border border-primary text-primary` — второстепенные.
- **CTA:** `bg-accent text-[#1E1B4B] font-semibold` — «Забронировать», «Позвонить».
- **Ghost:** `bg-transparent text-primary` — наименее заметные.
- **Danger:** `bg-danger text-white` — деструктивные действия.

### Input / Textarea / Select

| State | Visual |
|-------|--------|
| Default | `bg-surface`, `border border-border`, `rounded-sm`, `px-4`, `py-2.5` |
| Hover | `border-primary` |
| Focus | `border-primary`, ring `2px solid primary`, offset `2px` |
| Error | `border-danger`, под полем текст `text-sm text-danger` |
| Disabled | `bg-gray-100`, `opacity: 0.6`, `cursor: not-allowed` |

### Link

| State | Visual |
|-------|--------|
| Default | `text-primary`, `underline` (в тексте) или без (навигация) |
| Hover | Затемнение, `text-decoration: underline` |
| Focus-visible | Ring |
| Visited | Не менять цвет (не использовать `:visited`) |

---

## Accessibility (a11y)

**Цель: WCAG 2.2 AA.**

- **Контраст:** 4.5:1 (normal text), 3:1 (large text ≥ 18px bold или ≥ 24px).
- **Focus-visible:** все интерактивные элементы имеют видимый ring (`2px solid primary`, offset `2px`). Никогда не `outline: none` без замены.
- **Keyboard:** все действия доступны с клавиатуры. Модалки — Escape, фокус запирается. Галерея — стрелки влево/вправо.
- **Screen readers:** иконки — `aria-label` или скрытый текст. Изображения — осмысленный `alt`. Формы — связанный `<label>`.
- **Motion:** уважать `prefers-reduced-motion`.
- **Colour:** цвет не единственный способ передачи смысла (иконки + текст + цвет).

---

## Правила: Do ✅

- **Семантические токены**, не raw hex-значения в коде компонентов.
- **Все состояния** для интерактивных элементов: default, hover, focus-visible, active, disabled, loading, error.
- Указывать **responsive-поведение** и крайние случаи.
- Проверять контраст **перед** коммитом.
- Токены отступов — только из шкалы.
- Все изображения — с `alt`.
- Модалки и дропдауны — Escape и клик вне.
- **Сначала DESIGN.md, потом код** — изменения вносятся в этом порядке.

## Правила: Don't ❌

- **Не raw hex** — только через токены или CSS-переменные.
- **Не one-off значения** отступов, шрифтов, цветов — всё из шкалы.
- **Не стоковые фото** — только реальные фотографии номеров и территории.
- **Не emoji как иконки** в навигации и ключевых элементах — использовать SVG-иконки или иконочный шрифт.
- **Не прятать focus-индикаторы** (`outline: none` без замены).
- **Не низкоконтрастный текст** (светло-серый на белом).
- **Не цвет как единственный способ** передачи информации.
- **Не смешивать шрифты** — единый стек.
- **Не использовать danger** для привлечения внимания (только деструктивные действия).
- **Не более одной primary-кнопки** в одном hero-блоке.

## Anti-patterns

| Антипаттерн | Почему плохо | Как правильно |
|-------------|-------------|---------------|
| `outline: none` без ring | Ломает keyboard-навигацию | `focus-visible: 2px solid primary` |
| Серый текст (`#999`, `#CCC`) на белом | Контраст < 3:1, нечитаемо | Минимум `#64748B` (textMuted) |
| `margin-top: 27px` / `padding: 13px` | Выходит из шкалы | Ближайший токен: `md` (16px) или `lg` (24px) |
| Цветные плашки без иконок | Неразличимо для дальтоников | Иконка + текст + цвет |
| Три кнопки разного цвета в одном блоке | Конкурируют за внимание | Одна primary, остальные secondary/ghost |
| `box-shadow` для смысла | Недоступно для SR | Дублировать текстом / иконкой |

---

## QA Checklist

- [ ] **Токены:** DESIGN.md и код используют одинаковые значения.
- [ ] **Контраст:** все текстовые комбинации проходят WCAG 2.2 AA.
- [ ] **Focus:** все интерактивные элементы имеют видимый focus-visible.
- [ ] **Keyboard:** Tab-порядок логичный, модалки запирают фокус, Escape закрывает.
- [ ] **Responsive:** на 320/768/1024/1440px нет горизонтального скролла, контент не обрезан.
- [ ] **Images:** все `<img>` с `alt`, декоративные — `alt=""`.
- [ ] **Forms:** все `<input>` со связанным `<label>`, ошибки текстом (не только цветом).
- [ ] **Motion:** анимации не нарушают `prefers-reduced-motion`.
- [ ] **No raw values:** в коде нет `#3B82F6`, `16px`, `margin: 27px` — только токены.

---

## Workflow: внесение изменений в дизайн

1. **Обновить DESIGN.md** — токены и правила (этот файл).
2. **Синхронизировать CSS-переменные** — в `ssg/src/styles/` или `tailwind.config`.
3. **Проверить фронтенд** — цвета, контраст, состояния кнопок.
4. **Коммитить одним набором** — чтобы не расходились токены и реализация.
