# Product Reviews — WooCommerce REST API v3

Endpoint: `/wp-json/wc/v3/products/reviews`

Источник: https://developer.woocommerce.com/docs/apis/rest-api/v3/product-reviews/

---

## Свойства отзыва

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | integer | ID. **READ-ONLY** |
| `date_created` | string | Дата создания (timezone сайта). **READ-ONLY** |
| `date_created_gmt` | string | Дата создания (GMT). **READ-ONLY** |
| `product_id` | integer | ID продукта. **Обязательное** |
| `status` | string | `approved`, `hold`, `spam`, `unspam`, `trash`, `untrash`. Default: `approved` |
| `reviewer` | string | Имя рецензента |
| `reviewer_email` | string | Email рецензента |
| `review` | string | Текст отзыва (HTML) |
| `rating` | integer | Оценка 0–5 |
| `verified` | boolean | Покупатель подтвердил. **READ-ONLY** |
| `reviewer_avatar_urls` | object | Аватары. **READ-ONLY** |

---

## Query Parameters (GET)

| Параметр | Тип | Описание |
|----------|-----|----------|
| `context` | string | `view` / `edit` |
| `page` | integer | Default: `1` |
| `per_page` | integer | Max 100. Default: `10` |
| `search` | string | Поиск по тексту |
| `after` / `before` | string | Дата фильтр (ISO8601) |
| `dates_are_gmt` | boolean | Интерпретировать after/before как UTC |
| `exclude` / `include` | array | Фильтр по ID |
| `offset` | integer | Сдвиг |
| `order` | string | `asc` / `desc` |
| `orderby` | string | `date_gmt`, `date`, `id`, `product`, `rating` |
| `reviewer` | string | Фильтр по email рецензента |
| `reviewer_email` | array | Фильтр по массиву email |
| `product` | integer | Фильтр по product ID |
| `status` | string | `approved`, `hold`, `spam`, `trash`, `all` |

---

## Примеры через curl

```bash
source <(grep -E '^(WOO_BASE_URL|WOO_CONSUMER_KEY|WOO_CONSUMER_SECRET)=' .env | sed 's/^/export /')
AUTH=$(echo -n "$WOO_CONSUMER_KEY:$WOO_CONSUMER_SECRET" | base64)
BASE="${WOO_BASE_URL}/wp-json/wc/v3/products/reviews"

# Все отзывы (одобренные)
curl -s "$BASE?per_page=20&status=approved" \
  -H "Authorization: Basic $AUTH" | jq '.[] | {id, product_id, reviewer, rating, review}'

# Отзывы конкретного продукта
curl -s "$BASE?product=22&per_page=50" \
  -H "Authorization: Basic $AUTH" | jq '.[] | {id, reviewer, rating, review}'

# На модерации
curl -s "$BASE?status=hold" \
  -H "Authorization: Basic $AUTH" | jq '.[] | {id, product_id, reviewer, review}'

# Создать отзыв
curl -s -X POST "$BASE" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{
    "product_id": 22,
    "review": "<p>Отличный товар, рекомендую!</p>",
    "reviewer": "Иван Иванов",
    "reviewer_email": "ivan@example.com",
    "rating": 5
  }'

# Обновить статус (одобрить)
curl -s -X PUT "$BASE/22" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"status": "approved"}'

# Пометить как спам
curl -s -X PUT "$BASE/22" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"status": "spam"}'

# Batch — одобрить несколько
curl -s "$BASE/batch" \
  -H "Authorization: Basic $AUTH" -H "Content-Type: application/json" \
  -d '{"update": [{"id": 20, "status": "approved"}, {"id": 21, "status": "approved"}]}'

# Удалить
curl -s -X DELETE "$BASE/22?force=true" -H "Authorization: Basic $AUTH"
```

## Средний рейтинг продукта

Средний рейтинг `average_rating` хранится на самом продукте и обновляется автоматически при изменении отзывов.

```bash
# Проверить рейтинг продукта
curl -s "${WOO_BASE_URL}/wp-json/wc/v3/products/22" \
  -H "Authorization: Basic $AUTH" | jq '{average_rating, rating_count}'
```
