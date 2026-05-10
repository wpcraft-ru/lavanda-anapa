---
name: content-woocommerce
description: >
  Управление каталогом WooCommerce: продукты, вариации, категории, атрибуты, заказы.
  Основной инструмент — CLI-скрипт `.agents/scripts/woo_api.mjs`.
  Workflow: product → review → publish.
---

# content-woocommerce — Управление каталогом продуктов

## Обязательный контекст

**Читать первым делом:**
1. `AGENTS.md` — роли, правила безопасности
2. `MARKETING.md` — brand voice для описаний продуктов

## REST API & Auth

Документация: https://developer.woocommerce.com/docs/apis/rest-api/v3/

Переменные читаются из `.env` в корне проекта (автоматически через `.agents/scripts/functions.mjs`):

```
WOO_BASE_URL=https://example.com
WOO_CONSUMER_KEY=ck_xxxxx
WOO_CONSUMER_SECRET=cs_xxxxx
```

Consumer Key и Secret создаются в WordPress: **WooCommerce → Settings → Advanced → REST API → Add key**.

## Основной инструмент: `.agents/scripts/woo_api.mjs`

Тонкая обёртка над WooCommerce REST API. Креды из `.env`, вызов — через `--path`, `--method`, `--data`.

```bash
node .agents/scripts/woo_api.mjs [--method GET|POST|PUT|DELETE] --path <эндпоинт> --data '<JSON>' [--header '<JSON>']
```

- `--method` — HTTP метод. По умолчанию `GET`.
- `--path` — путь после `/wp-json/wc/v3/` (например `products`, `products/123`, `orders`).
- `--data` — JSON-строка. Для GET — query-параметры; для POST/PUT/DELETE — тело запроса.
- `--header` — JSON-объект с дополнительными заголовками (например `'{"X-Custom":"value"}'`).

### Примеры

```bash
# Connection test (последние продукты + категории)
node .agents/scripts/woo_api.mjs

# Категории
node .agents/scripts/woo_api.mjs --path products/categories
node .agents/scripts/woo_api.mjs --path products/categories --data '{"per_page":20,"_fields":"id,name,count"}'

# Продукты
node .agents/scripts/woo_api.mjs --path products
node .agents/scripts/woo_api.mjs --path products --data '{"per_page":5,"status":"publish","_fields":"id,name,price"}'
node .agents/scripts/woo_api.mjs --path products --data '{"search":"сайтолог"}'
node .agents/scripts/woo_api.mjs --path products/123

# Создать продукт (draft)
node .agents/scripts/woo_api.mjs --method POST --path products --data '{"name":"Сайтолог","type":"simple","status":"draft","regular_price":"14999.00","short_description":"<p>ИИ-ассистент для вебмастеров</p>","description":"<p>Полное описание...</p>","sku":"SAYTOLOG-001","categories":[{"id":3}]}'

# Обновить продукт (цена + опубликовать)
node .agents/scripts/woo_api.mjs --method PUT --path products/123 --data '{"regular_price":"15999.00","status":"publish"}'

# Удалить продукт
node .agents/scripts/woo_api.mjs --method DELETE --path products/123

# Вариации
node .agents/scripts/woo_api.mjs --path products/123/variations
node .agents/scripts/woo_api.mjs --method POST --path products/123/variations --data '{"regular_price":"2990.00","attributes":[{"name":"Размер","option":"M"}]}'

# Заказы
node .agents/scripts/woo_api.mjs --path orders
node .agents/scripts/woo_api.mjs --path orders --data '{"per_page":10,"status":"processing"}'
node .agents/scripts/woo_api.mjs --path orders/456

# Атрибуты и теги
node .agents/scripts/woo_api.mjs --path products/attributes
node .agents/scripts/woo_api.mjs --path products/tags

# Отчёты
node .agents/scripts/woo_api.mjs --path reports/sales --data '{"date_min":"2026-04-01","date_max":"2026-05-01"}'
node .agents/scripts/woo_api.mjs --path reports/top_sellers --data '{"period":"month"}'

# Batch-операции
node .agents/scripts/woo_api.mjs --method POST --path products/batch --data '{"update":[{"id":101,"regular_price":"3990.00"},{"id":102,"stock_quantity":0}]}'
```

### Изображения (через WordPress REST API — другая ручка)

Загрузка в Media Library идёт через `wp/v2/media`, не через `wc/v3`. Для этого используем curl:

```bash
source <(grep -E '^(WOO_BASE_URL|WOO_CONSUMER_KEY|WOO_CONSUMER_SECRET)=' .env | sed 's/^/export /')
AUTH=$(echo -n "$WOO_CONSUMER_KEY:$WOO_CONSUMER_SECRET" | base64)

MEDIA_ID=$(curl -s "${WOO_BASE_URL}/wp-json/wp/v2/media" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Disposition: attachment; filename=product.jpg" \
  -H "Content-Type: image/jpeg" \
  --data-binary @product.jpg | jq '.id')

# Привязать к продукту
node .agents/scripts/woo_api.mjs --method PUT --path products/123 --data "{\"images\":[{\"id\":${MEDIA_ID}}]}"
```

### Вариативный продукт (пример)

```bash
# 1. Создать контейнер
node .agents/scripts/woo_api.mjs --method POST --path products --data '{"name":"Футболка","type":"variable","status":"draft","attributes":[{"name":"Размер","visible":true,"variation":true,"options":["S","M","L","XL"]}]}'

# 2. Добавить вариации (PRODUCT_ID из вывода шага 1)
for SIZE in S M L XL; do
  node .agents/scripts/woo_api.mjs --method POST --path products/${PRODUCT_ID}/variations --data "{\"regular_price\":\"2990.00\",\"stock_quantity\":10,\"attributes\":[{\"name\":\"Размер\",\"option\":\"${SIZE}\"}]}"
done
```

## Альтернатива: curl напрямую

Если скрипт недоступен, можно curl:

```bash
source <(grep -E '^(WOO_BASE_URL|WOO_CONSUMER_KEY|WOO_CONSUMER_SECRET)=' .env | sed 's/^/export /')
AUTH=$(echo -n "$WOO_CONSUMER_KEY:$WOO_CONSUMER_SECRET" | base64)

curl -s "${WOO_BASE_URL}/wp-json/wc/v3/products" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"name":"...","status":"draft","regular_price":"14999.00"}'
```

## Query Parameters (GET)

Передаются в `--data` как JSON-объект: `'{"per_page":20,"status":"publish"}'`.

| Параметр | Назначение | Пример |
|----------|-----------|--------|
| `per_page` | На страницу (max 100) | `{"per_page":50}` |
| `page` | Пагинация | `{"page":2}` |
| `status` | Фильтр | `{"status":"publish,draft"}` |
| `category` | По категории ID | `{"category":3}` |
| `tag` | По тегу ID | `{"tag":10}` |
| `search` | Поиск | `{"search":"keyword"}` |
| `sku` | По SKU | `{"sku":"SKU-001"}` |
| `on_sale` | Только распродажа | `{"on_sale":true}` |
| `min_price` / `max_price` | Диапазон цен | `{"min_price":1000}` |
| `orderby` | Сортировка | `{"orderby":"date"}` (date, id, title, slug, price, popularity, rating) |
| `order` | Направление | `{"order":"desc"}` |
| `_fields` | Лимит полей | `{"_fields":"id,name,price"}` |
| `low_in_stock` | С низким остатком | `{"low_in_stock":true}` |

## Product statuses

| Статус | Назначение |
|--------|-----------|
| `draft` | Черновик (по умолчанию — безопасно) |
| `pending` | На ревью |
| `publish` | Опубликован |
| `private` | Приватный |

## Workflow: Создание продукта

```
1. Данные продукта (название, описание, цена, изображения)
2. Черновик (status: draft) — через скрипт или curl
3. Превью пользователю
4. Аппрув → publish
```

## Описание продукта — checklist

- [ ] Название (уникальное, SEO-оптимизированное)
- [ ] Краткое описание (каталог, 1-2 предложения)
- [ ] Полное описание (подробности, преимущества, use cases)
- [ ] Изображения (основное + галерея, 800x800px мин.)
- [ ] Цена (regular + sale если есть)
- [ ] SKU
- [ ] Категория (обязательная)
- [ ] Атрибуты (если применимо)
- [ ] SEO: title, meta description, URL slug

## Error Handling

| HTTP | Значение |
|------|---------|
| 401 | Auth failed — проверить `.env` |
| 400 | Invalid data — проверить формат полей |
| 404 | Resource not found |
| 500 | Server error |

## Rules

- Всегда `draft` → ревью → `publish`
- Цены — число с двумя знаками (`"2990.00"`)
- SKU — уникальный, системный формат
- Изображения — загрузить в Media Library, передавать ID
- Batch operations — предел 100 за запрос

## После создания или изменения контента

После любого создания, обновления или удаления продукта, категории, вариации или другого объекта — **всегда выдавать две ссылки**:

| Действие | URL |
|----------|-----|
| ✏️ Редактирование | `${WOO_BASE_URL}/wp-admin/post.php?post={ID}&action=edit` |
| 👁️ Предпросмотр | `${WOO_BASE_URL}/?post_type=product&p={ID}` |

- `{ID}` — числовой идентификатор созданного/изменённого объекта.
- Для категорий и тегов — ссылка на страницу термина: `${WOO_BASE_URL}/wp-admin/term.php?taxonomy=product_cat&tag_ID={ID}`
