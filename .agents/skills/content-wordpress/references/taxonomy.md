# Categories & Tags API Reference

## Categories

Base: `/wp/v2/categories`

### List all categories

```bash
GET /wp/v2/categories?per_page=100
GET /wp/v2/categories?_fields=id,name,slug,count,parent
```

Response includes `count` — number of posts in category.

### Filter params
| Param     | Description                       |
|-----------|-----------------------------------|
| `per_page`| Up to 100                         |
| `parent`  | Filter by parent category ID      |
| `hide_empty` | true/false — exclude empty    |
| `search`  | Search by name                    |
| `orderby` | id, name, slug, count             |

### Get single category

```bash
GET /wp/v2/categories/<id>
```

### Create category

```bash
POST /wp/v2/categories
{
  "name": "Category Name",
  "slug": "category-slug",   # optional
  "parent": 0,               # parent ID for subcategory
  "description": "Optional description"
}
```

### Update / Delete

```bash
POST /wp/v2/categories/<id>   { "name": "New Name" }
DELETE /wp/v2/categories/<id>?force=true
```

---

## Tags

Base: `/wp/v2/tags`

### List all tags

```bash
GET /wp/v2/tags?per_page=100
GET /wp/v2/tags?orderby=count&order=desc   # sort by popularity
GET /wp/v2/tags?_fields=id,name,slug,count
```

### Create tag

```bash
POST /wp/v2/tags
{
  "name": "Tag Name",
  "slug": "tag-slug",        # optional
  "description": "Optional"
}
```

### Update / Delete

```bash
POST /wp/v2/tags/<id>   { "name": "New Name" }
DELETE /wp/v2/tags/<id>?force=true
```

---

## Analysis Patterns

### Find most used categories
```bash
GET /wp/v2/categories?per_page=100&orderby=count&order=desc&_fields=id,name,count
```

### Find posts without categories (only Uncategorized)
```bash
GET /wp/v2/posts?categories=1&_fields=id,title   # 1 = default Uncategorized ID
```

### Get all tags with post count > 0
```bash
GET /wp/v2/tags?hide_empty=true&per_page=100&orderby=count&order=desc
```

### Map category/tag IDs from a post
Post object has `categories: [1, 5]` and `tags: [10, 12]` — integer arrays of IDs.
Resolve to names with individual GET requests or batch fetch all + build a local map.
