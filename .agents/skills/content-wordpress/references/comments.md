# Comments API Reference

Base: `/wp/v2/comments`

## List Comments

```bash
# All approved comments
GET /wp/v2/comments

# Filter by post
GET /wp/v2/comments?post=123

# Filter by status (requires auth)
GET /wp/v2/comments?status=hold    # pending moderation
GET /wp/v2/comments?status=approve # approved
GET /wp/v2/comments?status=spam
GET /wp/v2/comments?status=trash

# Pagination
GET /wp/v2/comments?per_page=50&page=2
```

### Filter params
| Param       | Description                          |
|-------------|--------------------------------------|
| `post`      | Filter by post ID                    |
| `status`    | approve, hold, spam, trash (auth req) |
| `author_email` | Filter by email                   |
| `parent`    | Filter by parent comment ID (nested) |
| `per_page`  | Max 100                              |
| `after`/`before` | Date range filter              |
| `_fields`   | Limit returned fields                |

## Create Comment

```bash
POST /wp/v2/comments
Content-Type: application/json

{
  "post": 123,                   # required: post ID
  "content": "Comment text",     # required
  "author_name": "John Doe",     # for anonymous; not needed if authenticated
  "author_email": "john@example.com",
  "author_url": "https://example.com",
  "parent": 0                    # parent comment ID for reply, 0 = top-level
}
```

Authenticated comments are auto-approved (depending on WP settings).

## Update Comment (moderation)

```bash
POST /wp/v2/comments/<id>

{
  "status": "approve",   # approve a pending comment
  "content": "Edited text"
}
```

## Delete Comment

```bash
DELETE /wp/v2/comments/<id>           # trash
DELETE /wp/v2/comments/<id>?force=true # permanent
```

## Comment Status Values

| Status    | Meaning                      |
|-----------|------------------------------|
| `approve` | Visible on site              |
| `hold`    | Pending moderation           |
| `spam`    | Marked as spam               |
| `trash`   | Deleted                      |
