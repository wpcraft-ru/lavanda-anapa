# Product Variations — WooCommerce REST API v3

Endpoint: `/wp-json/wc/v3/products/{product_id}/variations`

**Работает только с продуктами type=`variable`.**

Источник: https://developer.woocommerce.com/docs/apis/rest-api/v3/product-variations/

---

## Свойства вариации

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | integer | ID вариации. **READ-ONLY** |
| `date_created` | date-time | Дата создания. **READ-ONLY** |
| `date_modified` | date-time | Дата изменения. **READ-ONLY** |
| `description` | string | Описание вариации |
| `permalink` | string | URL. **READ-ONLY** |
| `sku` | string | Артикул вариации |
| `price` | string | Текущая цена. **READ-ONLY** |
| `regular_price` | string | Обычная цена |
| `sale_price` | string | Цена распродажи |
| `date_on_sale_from` | date-time | Начало распродажи |
| `date_on_sale_to` | date-time | Конец распродажи |
| `on_sale` | boolean | На распродаже. **READ-ONLY** |
| `status` | string | `draft`, `pending`, `private`, `publish`. Default: `publish` |
| `purchasable` | boolean | Можно купить. **READ-ONLY** |
| `virtual` | boolean | Default: `false` |
| `downloadable` | boolean | Default: `false` |
| `manage_stock` | boolean\|string | `true`/`false` или `"parent"` (наследовать от родителя). Default: `false` |
| `stock_quantity` | integer | Остаток |
| `stock_status` | string | `instock`, `outofstock`, `onbackorder` |
| `backorders` | string | `no`, `notify`, `yes` |
| `weight` | string | Вес |
| `dimensions` | object | `{length, width, height}` |
| `shipping_class` | string | Slug класса доставки |
| `image` | object | `{id, src, name, alt}` |
| `attributes` | array | `[{id, name, option}]` — выбранные опции |
| `menu_order` | integer | Порядок |
| `meta_data` | array | Произвольные поля |

### Image (вложенный)

| Поле | Тип |
|------|-----|
| `id` | integer |
| `src` | string (URL) |
| `name` | string |
| `alt` | string |

### Attributes (вложенный)

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | integer | Attribute ID |
| `name` | string | Attribute name |
| `option` | string | Выбранный термин (напр. «Red») |

---

## Query Parameters (GET)

| Параметр | Тип | Описание |
|----------|-----|----------|
| `page` | integer | Default: `1` |
| `per_page` | integer | Max 100. Default: `10` |
| `search` | string | Поиск по описанию |
| `after` / `before` | string | Дата фильтр (ISO8601) |
| `exclude` / `include` | array | Фильтр по ID |
| `offset` | integer | Сдвиг |
| `order` | string | `asc` / `desc` |
| `orderby` | string | `date`, `id`, `title`, `slug`, `price`, `menu_order` |
| `status` | string | `any`, `draft`, `pending`, `private`, `publish` |
| `sku` | string | Фильтр по SKU |
| `on_sale` | boolean | На распродаже |
| `min_price` / `max_price` | string | Диапазон цен |
| `stock_status` | string | `instock`, `outofstock`, `onbackorder` |

---

## Примеры через скрипт

```bash
# Список вариаций продукта
node scripts/woo_api.mjs variations --product-id 42

# Создать вариацию
node scripts/woo_api.mjs variation-create --product-id 42 --price "2990" --attr "Размер:S"

# Обновить
node scripts/woo_api.mjs variation-update --product-id 42 --var-id 100 --price "3490"
```

## Примеры через curl

```bash
source <(grep -E '^(WOO_BASE_URL|WOO_CONSUMER_KEY|WOO_CONSUMER_SECRET)=' .env | sed 's/^/export /')
AUTH=$(echo -n "$WOO_CONSUMER_KEY:$WOO_CONSUMER_SECRET" | base64)
PID=42
BASE="${WOO_BASE_URL}/wp-json/wc/v3/products/${PID}/variations"

# Список вариаций
curl -s "$BASE?per_page=50" -H "Authorization: Basic $AUTH" | jq '.[] | {id, price, sku}'

# Одна вариация
curl -s "$BASE/100" -H "Authorization: Basic $AUTH" | jq '.'

# Создать вариацию
curl -s -X POST "$BASE" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "regular_price": "2990.00",
    "stock_quantity": 15,
    "attributes": [
      {"name": "Размер", "option": "L"},
      {"name": "Цвет", "option": "Красный"}
    ]
  }'

# Обновить цену вариации
curl -s -X PUT "$BASE/100" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"regular_price": "3490.00"}'

# Batch
curl -s "$BASE/batch" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{"update": [{"id": 100, "regular_price": "3500"}, {"id": 101, "stock_quantity": 0}]}'

# Удалить вариацию
curl -s -X DELETE "$BASE/100?force=true" -H "Authorization: Basic $AUTH"
```
