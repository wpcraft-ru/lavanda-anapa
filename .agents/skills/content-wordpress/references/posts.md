# Posts API Reference

Base: `GET/POST /wp/v2/posts`

## List Posts

```bash
# All published posts (default: 10 per page)
GET /wp/v2/posts

# With filters
GET /wp/v2/posts?per_page=20&page=1&status=publish
GET /wp/v2/posts?categories=5&tags=12
GET /wp/v2/posts?search=keyword
GET /wp/v2/posts?orderby=date&order=desc
```

### Filter params
| Param       | Description                              |
|-------------|------------------------------------------|
| `per_page`  | Results per page (max 100)               |
| `page`      | Page number                              |
| `status`    | publish, draft, pending, trash, any      |
| `categories`| Category IDs (comma-separated)           |
| `tags`      | Tag IDs (comma-separated)                |
| `search`    | Search in title + content                |
| `author`    | Author user ID                           |
| `after`/`before` | ISO8601 date filter                 |
| `orderby`   | date, title, id, relevance               |
| `_fields`   | Return only specific fields              |

### Minimal response fields
```bash
GET /wp/v2/posts?_fields=id,title,date,status,categories,tags,link
```

## Create Post

```bash
POST /wp/v2/posts
Content-Type: application/json
Authorization: Basic <token>

{
  "title": "Post Title",
  "content": "Post body HTML or plain text",
  "status": "publish",         # or "draft"
  "categories": [1, 5],        # category IDs
  "tags": [10, 12],            # tag IDs
  "excerpt": "Short summary",
  "slug": "custom-url-slug",   # optional
  "date": "2026-03-16T12:00:00" # optional, defaults to now
}
```

Returns full post object with `id`, `link`, `guid`, etc.

## Update Post

```bash
POST /wp/v2/posts/<id>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "publish"
}
```

## Delete Post

```bash
DELETE /wp/v2/posts/<id>           # moves to trash
DELETE /wp/v2/posts/<id>?force=true # permanent delete
```

## Get Single Post

```bash
GET /wp/v2/posts/<id>
GET /wp/v2/posts/<id>?_fields=id,title,content,categories,tags
```

## Post Status Values

- `publish` — live on site
- `draft` — saved, not published
- `pending` — awaiting review
- `private` — visible to logged-in users only
- `trash` — deleted (recoverable)
