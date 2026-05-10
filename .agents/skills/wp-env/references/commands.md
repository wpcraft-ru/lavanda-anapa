# wp-env Commands Reference

Full command reference for `@wordpress/env`.

---

## Global Options (apply to all commands)

```
--debug         Enable debug output            [boolean] [default: false]
--config        Path to custom .wp-env.json    [string]
```

---

## wp-env start

Installs and starts the WordPress environment. Downloads sources on first run.

```bash
npx wp-env start
npx wp-env start --update          # Re-download sources + re-apply config
npx wp-env start --xdebug          # Enable Xdebug in debug mode
npx wp-env start --xdebug=profile,trace,debug  # Enable specific Xdebug modes
npx wp-env start --spx             # Enable SPX profiling
npx wp-env start --runtime=playground   # Use Playground instead of Docker (experimental)
npx wp-env start --auto-port       # Auto-find free ports if configured ports are busy
```

**Flags:**

| Flag | Description |
|------|-------------|
| `--update` | Download source updates and re-apply config (won't delete content) |
| `--xdebug[=modes]` | Enable Xdebug. Default mode: `debug`. Modes: `develop,coverage,debug,gcstats,profile,trace` |
| `--spx[=mode]` | Enable SPX profiler (Docker only). Default: `enabled` |
| `--runtime=docker\|playground` | Select runtime (default: `docker`) |
| `--auto-port` | Automatically use free ports when configured ones are busy |
| `--scripts` | Execute lifecycle scripts (default: `true`) |

---

## wp-env stop

Stops running containers and frees ports.

```bash
npx wp-env stop
```

---

## wp-env reset [environment]

Resets WordPress database(s). **⚠️ Permanently deletes posts, pages, media, settings.**

```bash
npx wp-env reset                   # Reset development DB
npx wp-env reset all               # Reset both development + tests DBs
npx wp-env reset development       # Reset development DB only
npx wp-env reset tests             # Reset tests DB only
```

---

## wp-env destroy

Removes all Docker containers, volumes, and generated files. Complete clean slate.

**⚠️ WARNING: All content and settings are permanently deleted.**

```bash
npx wp-env destroy
npx wp-env start   # Start fresh
```

---

## wp-env run

Run arbitrary commands inside a container. Includes WP-CLI, Composer, PHPUnit, bash.

```bash
npx wp-env run <container> [command...]
```

**Containers:**

| Container | Use for |
|-----------|---------|
| `cli` | WP-CLI commands, Composer, PHPUnit, bash |
| `wordpress` | Web server container |
| `mysql` | Database container |
| `phpmyadmin` | phpMyAdmin (web UI) |
| `composer` | Composer only |

**WP-CLI examples:**

```bash
npx wp-env run cli wp user list
npx wp-env run cli wp post create --post_title="Hello" --post_status=publish
npx wp-env run cli wp plugin list
npx wp-env run cli wp plugin activate my-plugin
npx wp-env run cli wp cache flush
npx wp-env run cli wp option get siteurl
npx wp-env run cli wp db export /tmp/backup.sql
npx wp-env run cli wp search-replace 'old.com' 'localhost:8888'
npx wp-env run cli wp core version
npx wp-env run cli wp eval 'echo get_bloginfo("name");'

# Run on tests instance
npx wp-env run tests-cli wp user list
```

**Shell / development tools:**

```bash
# Open bash shell
npx wp-env run cli bash

# Composer (plugin-relative path)
npx wp-env run cli --env-cwd=wp-content/plugins/my-plugin composer install
npx wp-env run cli --env-cwd=wp-content/plugins/my-plugin composer dump-autoload

# PHPUnit
npx wp-env run cli --env-cwd=wp-content/plugins/my-plugin phpunit

# WP shell (interactive PHP REPL)
npx wp-env run cli wp shell
```

**`--env-cwd` flag:**
Working directory inside the container. Paths without leading slash are relative to WordPress root (`/var/www/html`).

```bash
# Correct: plugin-relative
npx wp-env run cli --env-cwd=wp-content/plugins/my-plugin composer install

# Default: WordPress root
npx wp-env run cli composer install  # runs in /var/www/html
```

**Double-dash for conflicting flags:**

```bash
# Pass --help to PHP, not to wp-env
npx wp-env run cli php -- --help
```

---

## wp-env status

Show running environment status.

```bash
npx wp-env status
npx wp-env status --config=./staging.json
```

---

## wp-env logs [environment]

Display logs from the environment containers.

```bash
npx wp-env logs
npx wp-env logs development
npx wp-env logs tests
```

---

## wp-env install-path

Print the current environment's installation directory.

```bash
wp-env install-path
```

---

## Lifecycle Scripts

Configure scripts to run after environment events in `.wp-env.json`:

```json
{
  "lifecycleScripts": {
    "afterStart": "npx wp-env run cli wp rewrite flush",
    "afterClean": null,
    "afterDestroy": null
  }
}
```

Run scripts manually: `npx wp-env start --scripts`
Skip scripts: `npx wp-env start --no-scripts`

---

## package.json Scripts (local install)

```json
{
  "scripts": {
    "env:start": "wp-env start",
    "env:stop": "wp-env stop",
    "env:update": "wp-env start --update",
    "env:destroy": "wp-env destroy",
    "wp": "wp-env run cli wp",
    "composer": "wp-env run cli --env-cwd=wp-content/plugins/my-plugin composer",
    "phpunit": "wp-env run cli --env-cwd=wp-content/plugins/my-plugin phpunit"
  }
}
```

**Note:** Pass extra flags with `--`:
```bash
npm run env:start -- --xdebug
```
