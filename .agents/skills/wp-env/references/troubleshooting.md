# wp-env Troubleshooting Guide

Diagnose and fix common wp-env errors.

---

## Table of Contents
1. [General Debug Steps](#general-debug-steps)
2. [Docker Errors](#docker-errors)
3. [Port Conflicts](#port-conflicts)
4. [Plugin/Theme Mount Problems](#plugintheme-mount-problems)
5. [Database Errors](#database-errors)
6. [Performance Issues](#performance-issues)
7. [Ubuntu / Linux Issues](#ubuntu--linux-issues)
8. [Migrating from Other Dev Tools](#migrating-from-other-dev-tools)

---

## General Debug Steps

Run through these in order before deeper investigation:

### 1. Check containers are running
```bash
docker ps
# Should show: wordpress (port 8888) and mariadb
```

### 2. Check port number
```bash
# Inspect PORTS column in docker ps
# Default: 8888 dev, 8889 tests
```

### 3. Restart with updates
```bash
npx wp-env start --update
```

### 4. Restart Docker Desktop
Click Docker icon → Restart, then:
```bash
npx wp-env start
```

### 5. Reset the database
**⚠️ Deletes all content!**
```bash
npx wp-env reset all
npx wp-env start
```

### 6. Nuclear option — destroy and start fresh
**⚠️ Destroys everything!**
```bash
npx wp-env destroy
npx wp-env start
```

### Enable debug output
```bash
npx wp-env start --debug
```

---

## Docker Errors

### `Error while running docker-compose command`

**Causes:** Docker Desktop not running, or Docker daemon issue.

```bash
# Check if Docker is running
docker info

# Fix: Start Docker Desktop, then retry
npx wp-env start
```

### `Host is already in use by another container`

**Cause:** Another container is using port 8888.

```bash
# Option 1: Stop the wp-env that started on that port
# Navigate to the directory where it was started, then:
npx wp-env stop

# Option 2: Stop all Docker containers (careful!)
docker stop $(docker ps -q)

# Option 3: Use a different port
WP_ENV_PORT=9000 npx wp-env start
# or in .wp-env.json: "port": 9000

# Retry
npx wp-env start
```

### `Cannot connect to the Docker daemon`

```bash
# Check Docker daemon status (Linux)
sudo systemctl status docker

# Start if not running
sudo systemctl start docker

# Retry
npx wp-env start
```

### Container keeps restarting / crash loop

```bash
# Check logs
npx wp-env logs
docker ps -a  # shows exit codes

# Reset and restart
npx wp-env destroy
npx wp-env start
```

---

## Port Conflicts

### Check which process is using a port

```bash
# macOS/Linux
lsof -i :8888

# Kill the conflicting process (get PID from lsof output)
kill -9 <PID>

# Or: configure wp-env to use a different port
WP_ENV_PORT=9000 npx wp-env start
```

### Persistent port override in `.wp-env.json`

```json
{
  "port": 9000,
  "env": {
    "tests": {
      "port": 9001
    }
  }
}
```

---

## Plugin/Theme Mount Problems

### Plugin/theme not appearing in WordPress

**Check 1:** Run `npx wp-env start` from the plugin/theme root directory.

**Check 2:** Verify `.wp-env.json` sources are correct:
```json
{
  "plugins": ["."],
  "themes": []
}
```

**Check 3:** Run with `--update` to re-mount:
```bash
npx wp-env start --update
```

**Check 4:** Check container paths:
```bash
npx wp-env run cli wp plugin list
npx wp-env run cli bash
ls /var/www/html/wp-content/plugins/
```

### Changes to plugin/theme not reflected

wp-env mounts directories directly — file changes should be immediate. If not:

```bash
npx wp-env run cli wp cache flush
npx wp-env run cli wp rewrite flush
```

### Path mapping issues

Use `mappings` in `.wp-env.json` for non-standard directories:
```json
{
  "mappings": {
    "wp-content/plugins/shared-dep": "/Users/dev/shared-dependency"
  }
}
```

### symlinks not working inside container

Docker on macOS may not follow symlinks from outside the bind mount. Use `mappings` instead of symlinks.

---

## Database Errors

### `Database connection refused` on startup

```bash
# Wait a moment for MariaDB to initialize, then retry
# Or: check MySQL container is running
docker ps | grep mariadb

# Reset DB if corrupt
npx wp-env reset all
npx wp-env start
```

### Database credentials

| Setting | Value |
|---------|-------|
| Host | `localhost` (from host machine: mapped port shown after `npx wp-env start`) |
| User | `root` |
| Password | `password` |
| DB name | `wordpress` (dev), `wordpress_test` (tests) |

```bash
# Connect to MySQL directly
npx wp-env run mysql mysql -u root -ppassword wordpress

# Or use phpMyAdmin (if available in your environment)
# http://localhost:8080  (check docker ps for port)
```

### Export / import database

```bash
# Export
npx wp-env run cli wp db export /tmp/backup.sql
docker cp <container_id>:/tmp/backup.sql ./backup.sql

# Import
docker cp ./backup.sql <container_id>:/tmp/backup.sql
npx wp-env run cli wp db import /tmp/backup.sql
```

---

## Performance Issues

### wp-env starts slowly on macOS

Docker on macOS uses a VM — file I/O can be slower than native Linux.

**Tips:**
- Avoid mounting large node_modules directories
- Use `.wp-env.json` mappings instead of global volume mounts where possible
- Increase Docker Desktop memory/CPU: Docker → Settings → Resources

### Large plugin causing slow start

Add node_modules, vendor, etc. to exclusions if possible; alternatively only mount the built plugin output directory.

---

## Ubuntu / Linux Issues

### `ERROR: Couldn't connect to Docker daemon`

```bash
# Check Docker is running
ps -ef | grep docker

# Start Docker service
sudo systemctl start docker.service

# If still failing: configure TCP access
sudo nano /etc/systemd/system/docker.service.d/override.conf
```

`override.conf`:
```ini
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2376
```

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker.service

export DOCKER_HOST=tcp://127.0.0.1:2376
npx wp-env start
```

### `docker-compose` not found

On older Ubuntu, docker-compose may need separate installation:
```bash
sudo apt-get install docker-compose
# or
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### wp-env home directory on Linux

On Linux, wp-env stores files at `~/wp-env` (not `~/.wp-env`) for Snap compatibility.

---

## Migrating from Other Dev Tools

### From Local (by Flywheel)

1. Export database from Local: Site → Database → Export
2. Set up `.wp-env.json` with same plugins/themes
3. `npx wp-env start`
4. Import DB: `npx wp-env run cli wp db import /path/to/export.sql`
5. Fix URLs: `npx wp-env run cli wp search-replace 'old-local-url.local' 'localhost:8888'`

### From MAMP/WAMP/XAMPP

1. Export DB from phpMyAdmin or CLI
2. Copy plugin/theme to your project directory
3. Create `.wp-env.json` pointing to your plugin/theme
4. `npx wp-env start`
5. Import DB and search-replace URLs (see above)

### From Valet/Laravel Herd

```bash
# Export DB
mysqldump -u root my_wp_db > backup.sql

# Set up wp-env
cd my-plugin
npx wp-env start

# Import
npx wp-env run cli wp db import /path/to/backup.sql
npx wp-env run cli wp search-replace 'my-site.test' 'localhost:8888'
```

**Key difference:** wp-env auto-mounts the current directory as a plugin/theme — no symlinks or wp-content copying needed.
