# .wp-env.json Configuration Reference

Full schema for configuring `@wordpress/env` environments.

---

## Table of Contents
1. [File Structure](#file-structure)
2. [Top-Level Fields](#top-level-fields)
3. [Environment-Specific Config](#environment-specific-config)
4. [Source Formats](#source-formats)
5. [.wp-env.override.json](#wp-envoverridejson)
6. [Common Configuration Examples](#common-configuration-examples)

---

## File Structure

```
project/
├── .wp-env.json           # Main config (commit to git)
└── .wp-env.override.json  # Local overrides (add to .gitignore)
```

Create `.wp-env.json` in the directory where you run `npx wp-env start`.

---

## Top-Level Fields

```jsonc
{
  // WordPress core version/source
  "core": "WordPress/WordPress#6.7.0",   // GitHub tag
  // "core": "https://wordpress.org/wordpress-6.5.zip",
  // "core": null,                        // use latest

  // PHP version for all containers
  "phpVersion": "8.3",

  // Plugins to install & activate (array of sources)
  "plugins": [
    ".",                                  // current directory (auto-detect)
    "WordPress/gutenberg",                // GitHub repo (default branch)
    "https://downloads.wordpress.org/plugin/woocommerce.zip",
    "/absolute/path/to/local-plugin"
  ],

  // Themes to install & activate
  "themes": [
    ".",
    "https://downloads.wordpress.org/theme/twentytwentyfive.zip"
  ],

  // Port for development site (default: 8888)
  "port": 8888,

  // wp-config.php constants & options
  "config": {
    "WP_DEBUG": true,
    "WP_DEBUG_LOG": true,
    "SCRIPT_DEBUG": true,
    "WP_ENVIRONMENT_TYPE": "local"
  },

  // Arbitrary filesystem mappings [to, from]
  "mappings": {
    "wp-content/plugins/my-shared-plugin": "/path/to/shared-plugin"
  },

  // Lifecycle scripts (run inside container)
  "lifecycleScripts": {
    "afterStart": null,
    "afterClean": null,
    "afterDestroy": null
  },

  // Override settings for specific environments
  "env": {
    "development": { ... },
    "tests": { ... }
  }
}
```

---

## Environment-Specific Config

Use `env.development` and `env.tests` to override any top-level setting for a specific environment:

```json
{
  "core": null,
  "plugins": ["."],
  "config": {
    "WP_DEBUG": true
  },
  "env": {
    "tests": {
      "port": 8889,
      "config": {
        "WP_DEBUG": false,
        "SCRIPT_DEBUG": false
      }
    },
    "development": {
      "port": 8888
    }
  }
}
```

Fields in `env.development` / `env.tests` **merge** with top-level (they don't replace entirely).

---

## Source Formats

wp-env accepts several source types for `core`, `plugins`, `themes`:

| Format | Example |
|--------|---------|
| `"."` | Current directory |
| Absolute path | `"/home/user/projects/my-plugin"` |
| GitHub repo | `"WordPress/gutenberg"` (default branch) |
| GitHub ref | `"WordPress/WordPress#6.7.0"` (branch/tag/commit) |
| ZIP URL | `"https://downloads.wordpress.org/plugin/woocommerce.zip"` |
| `null` | Use latest stable WordPress (for `core` only) |

---

## .wp-env.override.json

Local overrides — never commit to git. Merges on top of `.wp-env.json`:

```json
{
  "port": 9999,
  "phpVersion": "8.1",
  "config": {
    "CUSTOM_DEBUG_KEY": true
  }
}
```

Add to `.gitignore`:
```
.wp-env.override.json
```

---

## Common Configuration Examples

### Simple plugin development
```json
{
  "core": null,
  "plugins": ["."],
  "phpVersion": "8.3"
}
```

### Theme development with WooCommerce
```json
{
  "core": null,
  "plugins": [
    "https://downloads.wordpress.org/plugin/woocommerce.zip"
  ],
  "themes": ["."],
  "phpVersion": "8.2"
}
```

### Specific WordPress version (for compatibility testing)
```json
{
  "core": "WordPress/WordPress#6.4.3",
  "plugins": ["."]
}
```

### Multiple local plugins + custom port
```json
{
  "core": null,
  "plugins": [
    ".",
    "/Users/dev/projects/another-plugin"
  ],
  "port": 9000,
  "config": {
    "WP_DEBUG": true,
    "WP_DEBUG_LOG": true,
    "SAVEQUERIES": true
  }
}
```

### Full-featured development setup
```json
{
  "core": null,
  "phpVersion": "8.3",
  "plugins": [
    ".",
    "https://downloads.wordpress.org/plugin/query-monitor.zip"
  ],
  "themes": [],
  "port": 8888,
  "config": {
    "WP_DEBUG": true,
    "WP_DEBUG_LOG": true,
    "WP_DEBUG_DISPLAY": false,
    "SCRIPT_DEBUG": true,
    "WP_ENVIRONMENT_TYPE": "local"
  },
  "env": {
    "tests": {
      "port": 8889,
      "config": {
        "WP_DEBUG": false
      }
    }
  }
}
```

### Multisite
```json
{
  "core": null,
  "plugins": ["."],
  "config": {
    "WP_ALLOW_MULTISITE": true,
    "MULTISITE": true,
    "SUBDOMAIN_INSTALL": false,
    "DOMAIN_CURRENT_SITE": "localhost",
    "PATH_CURRENT_SITE": "/",
    "SITE_ID_CURRENT_SITE": 1,
    "BLOG_ID_CURRENT_SITE": 1
  }
}
```

### Parallel environments (different config files)
```bash
# Default dev environment
npx wp-env start

# Staging test on different port
WP_ENV_PORT=8890 npx wp-env start --config=./staging.wp-env.json
```

`staging.wp-env.json`:
```json
{
  "core": "WordPress/WordPress#6.5.0",
  "plugins": ["."],
  "port": 8890
}
```

Override file: `staging.wp-env.override.json` (derived automatically from config filename).

---

## phpVersion Options

Common values: `"7.4"`, `"8.0"`, `"8.1"`, `"8.2"`, `"8.3"`

**Note:** Xdebug requires PHP 7.2+. Setting a legacy `phpVersion` disables Xdebug.
