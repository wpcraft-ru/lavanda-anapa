# Product Attributes — WooCommerce REST API v3

## Глобальные атрибуты

Endpoint: `/wp-json/wc/v3/products/attributes`

Источник: https://developer.woocommerce.com/docs/apis/rest-api/v3/product-attributes/

### Свойства атрибута

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | integer | ID. **READ-ONLY** |
| `name` | string | Название. **MANDATORY** |
| `slug` | string | URL-slug (обычно `pa_<name>`) |
| `type` | string | Тип: `select` (по умолчанию) |
| `order_by` | string | Сортировка терминов: `menu_order`, `name`, `name_num`, `id`. Default: `menu_order` |
| `has_archives` | boolean | Архив атрибута. Default: `false` |

### Query Parameters

| Параметр | Тип | Описание |
|----------|-----|----------|
| `context` | string | `view` / `edit` |
| `page` | integer | Default: `1` |
| `per_page` | integer | Max 100. Default: `10` |
| `search` | string | Поиск по названию |
| `exclude` / `include` | array | Фильтр по ID |
| `offset` | integer | Сдвиг |
| `order` | string | `asc` / `desc` |
| `orderby` | string | `id`, `name`, `slug`, `count` |

### Примеры

```bash
source <(grep -E '^(WOO_BASE_URL|WOO_CONSUMER_KEY|WOO_CONSUMER_SECRET)=' .env | sed 's/^/export /')
AUTH=$(echo -n "$WOO_CONSUMER_KEY:$WOO_CONSUMER_SECRET" | base64)
BASE="${WOO_BASE_URL}/wp-json/wc/v3/products/attributes"

# Все атрибуты
curl -s "$BASE?per_page=100" -H "Authorization: Basic $AUTH" | jq '.[] | {id, name, slug, type}'

# Создать
curl -s -X POST "$BASE" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"name": "Цвет", "slug": "pa_color", "type": "select", "order_by": "menu_order", "has_archives": true}'

# Обновить
curl -s -X PUT "$BASE/1" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"order_by": "name"}'

# Удалить (удаляет все термины!)
curl -s -X DELETE "$BASE/1?force=true" -H "Authorization: Basic $AUTH"

# Batch
curl -s "$BASE/batch" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"create": [{"name": "Материал"}, {"name": "Размер"}]}'
```

Через скрипт:
```bash
node scripts/woo_api.mjs attributes          # список
node scripts/woo_api.mjs attribute-create --name "Цвет" --slug "pa_color"
```

---

## Термины атрибута (Attribute Terms)

Endpoint: `/wp-json/wc/v3/products/attributes/{attribute_id}/terms`

Источник: https://developer.woocommerce.com/docs/apis/rest-api/v3/product-attribute-terms/

### Свойства термина

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | integer | ID. **READ-ONLY** |
| `name` | string | Название термина. **MANDATORY** |
| `slug` | string | URL-slug |
| `description` | string | HTML описание |
| `menu_order` | integer | Порядок сортировки |
| `count` | integer | Число продуктов. **READ-ONLY** |

### Query Parameters

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
| `parent` | integer | Фильтр по parent ID |
| `product` | integer | Фильтр по product ID |

### Примеры

```bash
ATTR_ID=1
TERM_BASE="${WOO_BASE_URL}/wp-json/wc/v3/products/attributes/${ATTR_ID}/terms"

# Все термины атрибута
curl -s "$TERM_BASE?per_page=100" -H "Authorization: Basic $AUTH" | jq '.[] | {id, name, slug, count}'

# Создать термин
curl -s -X POST "$TERM_BASE" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"name": "Красный"}'

# Обновить
curl -s -X PUT "$TERM_BASE/23" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"menu_order": 1}'

# Удалить
curl -s -X DELETE "$TERM_BASE/23?force=true" -H "Authorization: Basic $AUTH"

# Batch
curl -s "$TERM_BASE/batch" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"create": [{"name": "M"}, {"name": "L"}, {"name": "XL"}]}'
```

Через скрипт:
```bash
node scripts/woo_api.mjs attribute-terms --attr-id 1    # список
node scripts/woo_api.mjs term-create --attr-id 1 --name "Красный"
```

---

## Полный цикл: атрибут → термины → вариации

```bash
# 1. Создать атрибут "Размер"
ATTR_ID=$(curl -s -X POST "$BASE" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"name":"Размер","type":"select"}' | jq '.id')

# 2. Создать термины
for SIZE in S M L XL; do
  curl -s -X POST "${WOO_BASE_URL}/wp-json/wc/v3/products/attributes/${ATTR_ID}/terms" \
    -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
    -d "{\"name\":\"$SIZE\"}" > /dev/null
done

# 3. Создать variable product с этим атрибутом
PRODUCT_ID=$(curl -s -X POST "${WOO_BASE_URL}/wp-json/wc/v3/products" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d "{\"name\":\"Футболка\",\"type\":\"variable\",\"attributes\":[{\"id\":${ATTR_ID},\"visible\":true,\"variation\":true,\"options\":[\"S\",\"M\",\"L\",\"XL\"]}]}" | jq '.id')

# 4. Создать вариации для каждого размера
for SIZE in S M L XL; do
  curl -s -X POST "${WOO_BASE_URL}/wp-json/wc/v3/products/${PRODUCT_ID}/variations" \
    -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
    -d "{\"regular_price\":\"2990.00\",\"attributes\":[{\"id\":${ATTR_ID},\"option\":\"${SIZE}\"}]}"
done
```
