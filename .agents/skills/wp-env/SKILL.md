---
name: wp-env
description: >
  Настройка и управление @wordpress/env — официальным zero-config Docker-окружением
  WordPress от Gutenberg Team. Используй при: первом запуске wp-env, создании/правке
  .wp-env.json, запуске WP-CLI внутри контейнера, отладке ошибок Docker/ports/mounts,
  переключении версий PHP/WordPress, Xdebug, PHPUnit/Composer, миграции с Local/MAMP/Valet.
  Триггеры: wp-env, @wordpress/env, локальное WordPress-окружение, WordPress Docker,
  .wp-env.json, wp-env start/stop/destroy, docker для WordPress.
metadata:
  version: "1.0.0"
  domain: development
  role: developer
---

# wp-env — Локальное WordPress-окружение

`@wordpress/env` (wp-env) — официальный инструмент Gutenberg Team для запуска локального
WordPress в Docker без конфигурации. Де-факто стандарт для разработки блоков, плагинов и тем.

**URL по умолчанию:**
- Development: http://localhost:8888 (admin / password)
- Tests: http://localhost:8889
- База: root / password (MySQL порт показывается после `wp-env start`)

---

## Быстрый старт

### Требования

1. **Docker Desktop** (или Docker Engine на Linux)
2. **Node.js LTS** + npm

### Установка

```bash
npm -g i @wordpress/env
npx wp-env --version

# Или локально в проект (рекомендуется для команды)
npm i @wordpress/env --save-dev
# тогда: npx wp-env <command>
```

### Базовый запуск

```bash
cd ~/my-plugin
npx wp-env start          # авто-монтирует и активирует плагин в текущей папке

npx wp-env stop           # остановить контейнеры
npx wp-env start --update # перезапустить + обновить исходники
```

---

## Ключевые концепции

- **Всегда создаётся два инстанса:** development (8888) + tests (8889)
- **Состояние сохраняется** между start/stop (Docker volumes)
- **`.wp-env.json`** в корне проекта — кастомизация (версии, плагины, темы, порты)
- **`.wp-env.override.json`** — локальные переопределения, не коммитить в git

---

## WP-CLI внутри контейнера

```bash
npx wp-env run cli wp user list
npx wp-env run cli wp plugin list
npx wp-env run cli wp post create --post_title="Test" --post_status=publish
npx wp-env run cli wp cache flush
npx wp-env run cli wp option get siteurl
npx wp-env run cli wp db export /tmp/backup.sql
npx wp-env run cli wp search-replace 'old.com' 'localhost:8888'
npx wp-env run cli wp core version

# Интерактивный bash
npx wp-env run cli bash

# Composer / PHPUnit (--env-cwd для путей относительно плагина)
npx wp-env run cli --env-cwd=wp-content/plugins/my-plugin composer install
npx wp-env run cli --env-cwd=wp-content/plugins/my-plugin phpunit
```

---

## Xdebug

```bash
# Режим отладки
npx wp-env start --xdebug

# Конкретные режимы
npx wp-env start --xdebug=profile,trace,debug

# Отключить (по умолчанию)
npx wp-env start
```

VS Code `launch.json`:
```json
{
  "name": "Listen for XDebug",
  "type": "php",
  "request": "launch",
  "port": 9003,
  "pathMappings": {
    "/var/www/html/wp-content/plugins/my-plugin": "${workspaceFolder}/"
  }
}
```

---

## Playground Runtime (без Docker)

```bash
npx wp-env start --runtime=playground
```

Полезно когда Docker недоступен. Ограничения: нет `wp-env run`, SQLite вместо MySQL.

---

## Переменные окружения

| Переменная | Назначение |
|-----------|-----------|
| `WP_ENV_PORT` | Порт девелопмента (по умолчанию 8888) |
| `WP_ENV_TESTS_PORT` | Порт тестов (по умолчанию 8889) |
| `WP_ENV_HOME` | Домашняя папка wp-env (по умолчанию `~/.wp-env`) |
| `DOCKER_HOST` | Кастомный Docker сокет (Linux troubleshooting) |

```bash
WP_ENV_PORT=3333 npx wp-env start
```

---

## package.json Scripts

Удобные алиасы для команды разработчиков:

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

Передача флагов через `--`:
```bash
npm run env:start -- --xdebug
```

---

## Когда читать референсы

- **Конфигурация `.wp-env.json`** → `references/config.md` — все поля, форматы источников, примеры
- **Все команды** → `references/commands.md` — полный список команд с флагами
- **Ошибки и их решение** → `references/troubleshooting.md` — Docker, порты, mounts, БД
