# Product Tags — WooCommerce REST API v3

Endpoint: `/wp-json/wc/v3/products/tags`

Источник: https://developer.woocommerce.com/docs/apis/rest-api/v3/product-tags/

---

## Свойства тега

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | integer | ID. **READ-ONLY** |
| `name` | string | Название. **MANDATORY** |
| `slug` | string | URL-slug |
| `description` | string | HTML описание |
| `count` | integer | Число продуктов. **READ-ONLY** |

---

## Query Parameters (GET)

| Параметр | Тип | Описание |
|----------|-----|----------|
| `context` | string | `view` / `edit` |
| `page` | integer | Default: `1` |
| `per_page` | integer | Max 100. Default: `10` |
| `search` | string | Поиск |
| `exclude` / `include` | array | Фильтр по ID |
| `offset` | integer | Сдвиг |
| `order` | string | `asc` / `desc` |
| `orderby` | string | `id`, `name`, `slug`, `count` |
| `hide_empty` | boolean | Скрыть пустые. Default: `false` |
| `product` | integer | Фильтр по product ID |
| `slug` | string | Фильтр по slug |

---

## Примеры через скрипт

```bash
node scripts/woo_api.mjs tags        # список всех тегов
```

## Примеры через curl

```bash
source <(grep -E '^(WOO_BASE_URL|WOO_CONSUMER_KEY|WOO_CONSUMER_SECRET)=' .env | sed 's/^/export /')
AUTH=$(echo -n "$WOO_CONSUMER_KEY:$WOO_CONSUMER_SECRET" | base64)
BASE="${WOO_BASE_URL}/wp-json/wc/v3/products/tags"

# Все теги
curl -s "$BASE?per_page=100&hide_empty=false" \
  -H "Authorization: Basic $AUTH" | jq '.[] | {id, name, slug, count}'

# Создать
curl -s -X POST "$BASE" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"name": "Новинка", "description": "<p>Новые поступления</p>"}'

# Обновить
curl -s -X PUT "$BASE/34" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"description": "<p>Обновлённое описание</p>"}'

# Batch
curl -s "$BASE/batch" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"create": [{"name": "Распродажа"}, {"name": "Лимитированная серия"}]}'

# Удалить
curl -s -X DELETE "$BASE/34?force=true" -H "Authorization: Basic $AUTH"
```

## Назначить теги продукту

Теги указываются при создании/обновлении продукта через массив `tags`:

```bash
curl -s -X PUT "${WOO_BASE_URL}/wp-json/wc/v3/products/123" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"tags": [{"id": 34}, {"name": "Новинка"}]}'
```

WooCommerce автоматически создаст тег «Новинка» если его не существует.
