# Product Categories — WooCommerce REST API v3

Endpoint: `/wp-json/wc/v3/products/categories`

Источник: https://developer.woocommerce.com/docs/apis/rest-api/v3/product-categories/

---

## Свойства категории

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | integer | ID. **READ-ONLY** |
| `name` | string | Название. **MANDATORY** |
| `slug` | string | URL-slug |
| `parent` | integer | ID родительской категории (0 = корневая) |
| `description` | string | HTML описание |
| `display` | string | Тип отображения: `default`, `products`, `subcategories`, `both`. Default: `default` |
| `image` | object | `{id, src, name, alt}` |
| `menu_order` | integer | Порядок |
| `count` | integer | Число продуктов. **READ-ONLY** |

### Image (вложенный)

| Поле | Тип |
|------|-----|
| `id` | integer |
| `date_created` | date-time |
| `date_modified` | date-time |
| `src` | string (URL) |
| `name` | string |
| `alt` | string |

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
| `orderby` | string | `id`, `name`, `slug`, `count`, `include` |
| `hide_empty` | boolean | Скрыть пустые. Default: `false` |
| `parent` | integer | Фильтр по parent ID |
| `product` | integer | Фильтр по product ID |
| `slug` | string | Фильтр по slug |

---

## Примеры через скрипт

```bash
node scripts/woo_api.mjs categories            # список всех
node scripts/woo_api.mjs category-create --name "Одежда" --parent 5
```

## Примеры через curl

```bash
source <(grep -E '^(WOO_BASE_URL|WOO_CONSUMER_KEY|WOO_CONSUMER_SECRET)=' .env | sed 's/^/export /')
AUTH=$(echo -n "$WOO_CONSUMER_KEY:$WOO_CONSUMER_SECRET" | base64)
BASE="${WOO_BASE_URL}/wp-json/wc/v3/products/categories"

# Все категории (дерево)
curl -s "$BASE?per_page=100&hide_empty=false" \
  -H "Authorization: Basic $AUTH" | jq '.[] | {id, name, slug, parent, count}'

# Дочерние категории
curl -s "$BASE?parent=5" -H "Authorization: Basic $AUTH" | jq '.[] | {id, name}'

# Создать с изображением
curl -s -X POST "$BASE" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{
    "name": "Одежда",
    "parent": 0,
    "description": "<p>Вся одежда</p>",
    "display": "both",
    "image": {"src": "https://example.com/category.jpg"}
  }'

# Обновить
curl -s -X PUT "$BASE/9" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"description": "<p>Новое описание</p>"}'

# Batch
curl -s "$BASE/batch" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"create": [{"name": "Футболки"}, {"name": "Штаны"}]}'

# Удалить
curl -s -X DELETE "$BASE/9?force=true" -H "Authorization: Basic $AUTH"
```
