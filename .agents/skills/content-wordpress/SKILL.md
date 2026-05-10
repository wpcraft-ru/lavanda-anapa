---
name: content-wordpress
description: >
  Управление блогом на WordPress: посты, страницы, медиа, категории, теги, комментарии.
  Основной инструмент — CLI-скрипт `.agents/scripts/wp_api.mjs`.
  Поддерживает --raw (context=edit), --file (из файла), --replace (массовая замена).
  Временные файлы — в ./tmp/.
  Workflow: draft → review → publish.
---

# content-wordpress — Управление контентом блога

## Обязательный контекст

**Читать первым делом:**
1. `AGENTS.md` — роли, правила безопасности
2. `MARKETING.md` — brand voice, tone, SEO-чеклист

## REST API & Auth

Документация: https://developer.wordpress.org/rest-api/reference/

Переменные читаются из `.env` в корне проекта (автоматически через `.agents/scripts/functions.mjs`):

```
WP_BASE_URL=https://example.com
WP_USER=admin
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx
```

Application Password создаётся в WordPress: **Пользователи → Ваш профиль → Application Passwords**.

## Основной инструмент: `.agents/scripts/wp_api.mjs`

Тонкая обёртка над WordPress REST API. Креды из `.env`, вызов — через `--path`, `--method`, `--data`.

```bash
node .agents/scripts/wp_api.mjs [--method GET|POST|PUT|DELETE] --path <эндпоинт> [--data '<JSON>'] [--header '<JSON>'] [--raw] [--file <path>] [--replace '<JSON>']
```

- `--method` — HTTP метод. По умолчанию `GET`.
- `--path` — путь после `/wp-json/wp/v2/` (например `posts`, `posts/123`, `pages`).
- `--data` — JSON-строка. Для GET — query-параметры; для POST/PUT/DELETE — тело запроса.
- `--header` — JSON-объект с дополнительными заголовками.
- `--raw` — добавляет `context=edit` к GET-запросу (возвращает сырой контент).
- `--file <path>` — читает тело запроса из JSON-файла (альтернатива `--data` для длинного контента).
- `--replace '<JSON>'` — PUT: забирает raw-контент, применяет замены `[["old","new"],...]`, пушит обратно.

Временные файлы создавать в `./tmp/` (директория игнорируется git).

### Примеры

```bash
# Connection test (последние посты + категории)
node .agents/scripts/wp_api.mjs

# Посты
node .agents/scripts/wp_api.mjs --path posts
node .agents/scripts/wp_api.mjs --path posts --data '{"per_page":5,"status":"publish","_fields":"id,title,link,date"}'
node .agents/scripts/wp_api.mjs --path posts --data '{"search":"ключевое слово"}'
node .agents/scripts/wp_api.mjs --path posts/123

# Создать пост (draft)
node .agents/scripts/wp_api.mjs --method POST --path posts --data '{"title":"Заголовок","content":"<p>Контент</p>","status":"draft","categories":[3],"tags":[10]}'

# Обновить пост (контент + опубликовать)
node .agents/scripts/wp_api.mjs --method PUT --path posts/123 --data '{"content":"<p>Обновлённый контент</p>","status":"publish"}'

# Удалить пост
node .agents/scripts/wp_api.mjs --method DELETE --path posts/123

# Страницы
node .agents/scripts/wp_api.mjs --path pages
node .agents/scripts/wp_api.mjs --path pages --data '{"per_page":10,"status":"publish"}'
node .agents/scripts/wp_api.mjs --method POST --path pages --data '{"title":"О нас","content":"<p>...</p>","status":"draft"}'

# Категории и теги
node .agents/scripts/wp_api.mjs --path categories
node .agents/scripts/wp_api.mjs --path categories --data '{"per_page":20,"_fields":"id,name,count"}'
node .agents/scripts/wp_api.mjs --method POST --path categories --data '{"name":"Новая категория","slug":"new-cat"}'
node .agents/scripts/wp_api.mjs --path tags
node .agents/scripts/wp_api.mjs --method POST --path tags --data '{"name":"Новый тег"}'

# Комментарии
node .agents/scripts/wp_api.mjs --path comments --data '{"post":123}'
node .agents/scripts/wp_api.mjs --path comments --data '{"per_page":10,"status":"hold"}'
node .agents/scripts/wp_api.mjs --method POST --path comments --data '{"post":123,"content":"Отличный пост!","status":"approved"}'
node .agents/scripts/wp_api.mjs --method PUT --path comments/456 --data '{"status":"approved"}'

# Пользователи
node .agents/scripts/wp_api.mjs --path users
node .agents/scripts/wp_api.mjs --path users --data '{"per_page":10,"_fields":"id,name,slug"}'
node .agents/scripts/wp_api.mjs --path users/me

# Raw-контент поста (context=edit)
node .agents/scripts/wp_api.mjs --path posts/123 --raw

# Массовая замена в контенте (fetch raw → replace → PUT)
node .agents/scripts/wp_api.mjs --method PUT --path posts/123 --replace '[
  ["<!-- wp:paragraph -->\n<p>Старый заголовок</p>\n<!-- /wp:paragraph -->",
   "<!-- wp:heading -->\n<h2>Новый заголовок</h2>\n<!-- /wp:heading -->"]
]'

# Обновить пост из файла (для длинного HTML)
node .agents/scripts/wp_api.mjs --method PUT --path posts/123 --file ./tmp/content.json
```

### Медиа (загрузка файла)

Загрузка в Media Library требует `Content-Disposition` и бинарных данных — через curl:

```bash
source <(grep -E '^(WP_BASE_URL|WP_USER|WP_APP_PASSWORD)=' .env | sed 's/^/export /')
AUTH=$(echo -n "$WP_USER:$(echo $WP_APP_PASSWORD | tr -d ' ')" | base64)

MEDIA_ID=$(curl -s "${WP_BASE_URL}/wp-json/wp/v2/media" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Disposition: attachment; filename=image.jpg" \
  -H "Content-Type: image/jpeg" \
  --data-binary @image.jpg | jq '.id')

# Привязать featured image к посту
node .agents/scripts/wp_api.mjs --method PUT --path posts/123 --data "{\"featured_media\":${MEDIA_ID}}"
```

## Альтернатива: curl напрямую

Если скрипт недоступен, можно curl:

```bash
source <(grep -E '^(WP_BASE_URL|WP_USER|WP_APP_PASSWORD)=' .env | sed 's/^/export /')
AUTH=$(echo -n "$WP_USER:$(echo $WP_APP_PASSWORD | tr -d ' ')" | base64)

curl -s "${WP_BASE_URL}/wp-json/wp/v2/posts" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"title":"Заголовок","content":"<p>Контент</p>","status":"draft"}'
```

## Query Parameters (GET)

Передаются в `--data` как JSON-объект: `'{"per_page":20,"status":"publish"}'`.

| Параметр | Назначение | Пример |
|----------|-----------|--------|
| `per_page` | На страницу (max 100) | `{"per_page":50}` |
| `page` | Пагинация | `{"page":2}` |
| `status` | Фильтр | `{"status":"publish,draft"}` |
| `categories` | По категории ID | `{"categories":3}` |
| `tags` | По тегу ID | `{"tags":10}` |
| `search` | Поиск | `{"search":"keyword"}` |
| `author` | По автору ID | `{"author":1}` |
| `after` / `before` | Фильтр по дате (ISO8601) | `{"after":"2026-01-01T00:00:00"}` |
| `orderby` | Сортировка | `{"orderby":"date"}` (date, id, title, relevance) |
| `order` | Направление | `{"order":"desc"}` |
| `_fields` | Лимит полей | `{"_fields":"id,title,link"}` |
| `slug` | По slug | `{"slug":"hello-world"}` |
| `exclude` | Исключить ID | `{"exclude":1}` |

## Post statuses

| Статус | Назначение |
|--------|-----------|
| `draft` | Черновик (по умолчанию — безопасно) |
| `pending` | На ревью |
| `publish` | Опубликован |
| `future` | Запланирован (с `date`) |
| `private` | Приватный |

## Workflow: Создание поста

```
1. Brief от пользователя (тема, цель, формат)
2. Контент по MARKETING.md (brand voice, SEO)
3. Черновик (status: draft) — через скрипт или curl
4. Превью пользователю (ссылка на пост в админке)
5. Аппрув → publish
```

## Пост — checklist

- [ ] Title (уникальный, SEO-оптимизированный)
- [ ] Content (HTML, структура H1-H4)
- [ ] Excerpt (краткое описание для архива)
- [ ] Featured image (загрузить в Media, привязать ID)
- [ ] Категории (обязательные)
- [ ] Теги (опционально)
- [ ] SEO: title tag, meta description, URL slug
- [ ] Alt-text для изображений
- [ ] Internal links (2-5)

## Error Handling

| HTTP | Значение |
|------|---------|
| 401 | Auth failed — проверить `.env` |
| 403 | Permission denied |
| 404 | Resource not found |
| 422 | Invalid params |

## Rules

- Всегда `draft` → ревью → `publish`
- Длинный HTML — писать в файл, передавать в скрипт
- Featured image — сначала upload media, получить ID, передать в пост
- Bulk operations — сначала all draft, потом ревью, потом batch publish

## References

Подробные справки по endpoint'ам:

- `references/posts.md` — CRUD постов, фильтры, статусы
- `references/taxonomy.md` — категории и теги, паттерны анализа
- `references/comments.md` — комментарии, модерация, статусы

## После создания или изменения контента

После любого создания, обновления или удаления поста, страницы, категории или тега — **всегда выдавать две ссылки**:

| Действие | URL |
|----------|-----|
| ✏️ Редактирование | `${WP_BASE_URL}/wp-admin/post.php?post={ID}&action=edit` |
| 👁️ Предпросмотр | `${WP_BASE_URL}/?p={ID}` |

- `{ID}` — числовой идентификатор созданного/изменённого объекта.
- Для страниц — `${WP_BASE_URL}/wp-admin/post.php?post={ID}&action=edit` и `${WP_BASE_URL}/?page_id={ID}`
- Для категорий и тегов — ссылка на страницу термина: `${WP_BASE_URL}/wp-admin/term.php?taxonomy=category&tag_ID={ID}`
