# Products — WooCommerce REST API v3

Endpoint: `/wp-json/wc/v3/products`

Источник: https://developer.woocommerce.com/docs/apis/rest-api/v3/products/

---

## Свойства продукта

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | integer | ID ресурса. **READ-ONLY** |
| `name` | string | Название продукта. **Обязательное** |
| `slug` | string | URL-slug |
| `permalink` | string | URL продукта. **READ-ONLY** |
| `type` | string | Тип: `simple`, `grouped`, `external`, `variable`. Default: `simple` |
| `status` | string | Статус: `draft`, `pending`, `private`, `publish`. Default: `publish` |
| `featured` | boolean | Избранный. Default: `false` |
| `catalog_visibility` | string | Видимость: `visible`, `catalog`, `search`, `hidden`. Default: `visible` |
| `description` | string | Полное описание (HTML) |
| `short_description` | string | Краткое описание (HTML) |
| `sku` | string | Артикул (уникальный) |
| `price` | string | Текущая цена (расчётная). **READ-ONLY** |
| `regular_price` | string | Обычная цена |
| `sale_price` | string | Цена распродажи |
| `date_on_sale_from` | date-time | Начало распродажи (timezone сайта) |
| `date_on_sale_from_gmt` | date-time | Начало распродажи (GMT) |
| `date_on_sale_to` | date-time | Конец распродажи (timezone сайта) |
| `date_on_sale_to_gmt` | date-time | Конец распродажи (GMT) |
| `on_sale` | boolean | На распродаже. **READ-ONLY** |
| `purchasable` | boolean | Можно купить. **READ-ONLY** |
| `total_sales` | integer | Общее число продаж. **READ-ONLY** |
| `virtual` | boolean | Виртуальный. Default: `false` |
| `downloadable` | boolean | Скачиваемый. Default: `false` |
| `manage_stock` | boolean | Управление остатками на уровне продукта. Default: `false` |
| `stock_quantity` | integer | Остаток на складе |
| `stock_status` | string | Статус: `instock`, `outofstock`, `onbackorder`. Default: `instock` |
| `backorders` | string | Предзаказ: `no`, `notify`, `yes`. Default: `no` |
| `sold_individually` | boolean | Только 1 шт в заказе. Default: `false` |
| `weight` | string | Вес |
| `dimensions` | object | `{length, width, height}` |
| `tax_status` | string | Налог: `taxable`, `shipping`, `none`. Default: `taxable` |
| `tax_class` | string | Класс налога |
| `reviews_allowed` | boolean | Отзывы разрешены. Default: `true` |
| `average_rating` | string | Средний рейтинг. **READ-ONLY** |
| `rating_count` | integer | Число отзывов. **READ-ONLY** |
| `related_ids` | array | ID связанных продуктов. **READ-ONLY** |
| `upsell_ids` | array | ID апселлов |
| `cross_sell_ids` | array | ID кросс-сейлов |
| `parent_id` | integer | ID родителя (grouped/variation) |
| `categories` | array | `[{id, name, slug}]` — категории |
| `tags` | array | `[{id, name, slug}]` — теги |
| `images` | array | `[{id, src, alt, name}]` — изображения |
| `attributes` | array | `[{id, name, position, visible, variation, options}]` — атрибуты |
| `menu_order` | integer | Порядок сортировки |
| `meta_data` | array | Произвольные поля |

### Dimensions (вложенный объект)

| Поле | Тип |
|------|-----|
| `length` | string |
| `width` | string |
| `height` | string |

### Image (вложенный объект)

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | integer | Media ID |
| `date_created` | date-time | **READ-ONLY** |
| `date_modified` | date-time | **READ-ONLY** |
| `src` | string | URL изображения |
| `name` | string | Имя файла |
| `alt` | string | Alt-текст |

---

## Query Parameters (GET)

| Параметр | Тип | Описание |
|----------|-----|----------|
| `context` | string | `view` / `edit`. Default: `view` |
| `page` | integer | Страница. Default: `1` |
| `per_page` | integer | На странице (max 100). Default: `10` |
| `search` | string | Поиск по названию/slug |
| `after` | string | Опубликовано после (ISO8601) |
| `before` | string | Опубликовано до (ISO8601) |
| `exclude` | array | Исключить ID |
| `include` | array | Только эти ID |
| `offset` | integer | Сдвиг |
| `order` | string | `asc` / `desc`. Default: `desc` |
| `orderby` | string | `date`, `id`, `title`, `slug`, `price`, `popularity`, `rating`. Default: `date` |
| `status` | string | `any`, `draft`, `pending`, `private`, `publish` |
| `category` | string | Фильтр по категории ID |
| `tag` | string | Фильтр по тегу ID |
| `sku` | string | Фильтр по SKU |
| `on_sale` | boolean | Только распродажа |
| `min_price` | string | Мин. цена |
| `max_price` | string | Макс. цена |
| `stock_status` | string | `instock`, `outofstock`, `onbackorder` |
| `_fields` | string | Лимит полей в ответе |
| `low_in_stock` | boolean | С низким остатком |

---

## Примеры через скрипт

```bash
# Список (20 простых)
cd /path/to/project && node scripts/woo_api.mjs list --per_page 20

# Один продукт
node scripts/woo_api.mjs get --id 123

# Создать (draft по умолчанию)
node scripts/woo_api.mjs create --name "Товар" --price "2990.00" --sku "SKU-001"

# Обновить и опубликовать
node scripts/woo_api.mjs update --id 123 --status publish --price "3490.00"
```

## Примеры через curl

```bash
# Auth
source <(grep -E '^(WOO_BASE_URL|WOO_CONSUMER_KEY|WOO_CONSUMER_SECRET)=' .env | sed 's/^/export /')
AUTH=$(echo -n "$WOO_CONSUMER_KEY:$WOO_CONSUMER_SECRET" | base64)
BASE="${WOO_BASE_URL}/wp-json/wc/v3/products"

# Список
curl -s "$BASE?per_page=20&status=publish" \
  -H "Authorization: Basic $AUTH" | jq '.[] | {id, name, price, status}'

# Создать simple product (draft)
curl -s -X POST "$BASE" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Название товара",
    "type": "simple",
    "status": "draft",
    "regular_price": "2990.00",
    "sku": "SKU-001",
    "short_description": "<p>Краткое описание</p>",
    "description": "<p>Подробное описание</p>",
    "categories": [{"id": 3}],
    "tags": [{"id": 10}],
    "images": [{"id": 123}],
    "attributes": [{"id": 1, "visible": true, "options": ["Red", "Blue"]}]
  }'

# Обновить
curl -s -X PUT "$BASE/123" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"regular_price": "3490.00", "status": "publish"}'

# Batch update
curl -s "$BASE/batch" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"update": [{"id": 101, "regular_price": "3990.00"}, {"id": 102, "stock_quantity": 0}]}'

# Удалить (soft — в корзину)
curl -s -X DELETE "$BASE/123?force=false" -H "Authorization: Basic $AUTH"

# Удалить навсегда
curl -s -X DELETE "$BASE/123?force=true" -H "Authorization: Basic $AUTH"
```

## Batch Operations

```bash
# Batch create
curl -s "$BASE/batch" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"create": [{"name": "Product A", "regular_price": "1000"}, {"name": "Product B", "regular_price": "2000"}]}'

# Batch update + delete
curl -s "$BASE/batch" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"update": [{"id": 100, "sale_price": "800"}], "delete": [200, 201]}'
```

Лимит: 100 объектов за batch-запрос.
