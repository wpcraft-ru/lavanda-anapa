# AGENTS.md — Гостевой Дом «Лаванда»

> Инструкции для AI-агентов, работающих над проектом. Сайт гостевого дома в посёлке Нижнее Джемете, Анапа.
> Практические правила для дизайна, маркетинга, контента и кода.

## Направления работы

У проекта три основных направления:

**1. Дизайн**
- Навык: `.agents/skills/web-design/SKILL.md`
- UI/UX, дизайн-система, компоненты, вёрстка

**2. Маркетинг и контент**
- `.agents/skills/xeo-marketing/SKILL.md` — SEO + AEO + GEO (все поисковые движки)
- `.agents/skills/content-marketing/SKILL.md` — стратегия, контент-план, брифы
- `.agents/skills/content-wordpress/SKILL.md` — блог, посты, страницы
- `.agents/skills/content-woocommerce/SKILL.md` — каталог продуктов, вариации, заказы
- `.agents/skills/humanizer/SKILL.md` — финальная очистка AI-следов

**3. Разработка**
- Роль: Developer (`.agents/teammates/developer/AGENT.md`)
- Код, плагины, API, деплой, автоматизация, Astro, WordPress REST/WooCommerce
- `.agents/skills/wp-env/SKILL.md` — локальное WordPress-окружение (Docker, WP-CLI, Xdebug)
- `.agents/skills/wordpress-plugin-i18n/SKILL.md` — интернационализация плагинов

**Стартовый скилл**
- `.agents/skills/ai-webmaster-project-setup/SKILL.md` — адаптация шаблона под новый проект



## Структура проекта

- `DESIGN.md`: дизайн-система (цвета, типографика, отступы, компоненты). Читать при любых задачах UI/UX.
- `MARKETING.md`: бренд-голос, ICP, tone of voice, SEO-чеклист. Читать при создании контента.
- `.agents/`: конфигурация агентов — skills.
- `.agents/skills/`: навыки (xeo-marketing, content-marketing, content-wordpress, content-woocommerce, design-page, humanizer, wordpress-plugin-i18n, wp-env, project-setup, site-build, ui-ux-design).
- `.agents/scripts/`: CLI-скрипты для WordPress и WooCommerce REST API.
- `ssg/`: Astro-проект (SSG/SSR фронтенд).
- `.env`: переменные окружения (не коммитить в git).


## Agent priorities

1. **Минимальные изменения** — smallest viable patch.
2. **Кастомный код > vendor/core** — всегда предпочитать свои файлы.
3. **Консистентность** — следовать DESIGN.md и MARKETING.md.
4. **Безопасность** — не коммитить секреты, sanitize input, escape output.
5. Никаких широких рефакторов без явного запроса.

## Editing checklist

- [ ] Подтвердить целевой файл.
- [ ] Минимальный патч.
- [ ] Проверить синтаксис.
- [ ] Запустить проверки (lint, тесты) если есть.
- [ ] Описать что изменилось и риски.

## Communication style

- Явно указывать предположения.
- При конфликте с правилами — сначала предупредить.
- Если не уверены в scope — один точный вопрос.

## WordPress safety rules

- Не менять WordPress core: `wp-admin/`, `wp-includes/`.
- Все кастомные изменения в `wp-content/`.
- Не коммитить секреты или креды в репо.
- Не создавать черновики в WordPress без явного разрешения. Сначала показать превью → получить «OK» → публиковать.

## PHP и WordPress coding rules

- Для custom PHP: `[]` вместо `array()`.
- Следовать WordPress PHP Coding Standards; сохранять стиль файла.
- Одинарные кавычки, кроме интерполяции.
- Избегать новых глобалов; предпочитать явные зависимости.
- Для кастомных плагинов/тем: namespaces и slug-префиксы.

## Security and API practices

- Sanitize untrusted input (`sanitize_text_field()`, `wp_kses()`, или аналог по контексту).
- Escape output на границе рендера (`esc_html()`, `esc_attr()`, и т.д.).
- Nonces для кастомных форм и mutation endpoint'ов.
- Предпочитать WordPress API (`get_posts()`, WP_Query, metadata API) вместо прямого SQL.
- Если прямой SQL неизбежен — `$wpdb` с prepared statements.

## Performance and integration practices

- Transients/object cache для дорогих повторных чтений.
- Скрипты и стили через `wp_enqueue_script()` и `wp_enqueue_style()`.
- `add_action()` и `add_filter()` для точек расширения; префиксовать хуки slug проекта.
- WP-CLI для повторяемой автоматизации.

## Docker and runtime rules

- `.env` хранит переменные окружения. Никогда не коммитить.
- Не менять образы контейнеров, volume mounts или long-running команды без запроса.

