# Smart Universe — deployment

## Domains

| Role | URL |
|------|-----|
| Staging / preview | https://new.smartuniit.com |
| Production | https://smartuniit.com |
| Production alias | https://www.smartuniit.com |
| Admin UI | `/admin` on either host that proxies to the Node app |

`smartuniit.com` and `www.smartuniit.com` serve the same static site from CyberPanel.

## Repository and server paths

| Item | Path |
|------|------|
| GitHub | `git@github.com:shakeelmo/New_Smartuniit.com.git` |
| App source on VPS | `/opt/new-smartuniit` |
| Production web root | `/home/smartuniit.com/public_html` |
| Preview web root | `/home/new.smartuniit.com/public_html` (staging uses full reverse proxy; see below) |
| Runtime data | `/opt/new-smartuniit/data/` (`content.json`, `leads.json`, `.admin-secret`) |

## Stack

React 18, TypeScript, Vite, Tailwind CSS, Express (content API, leads, admin auth), OpenLiteSpeed + CyberPanel, PM2 (`new-smartuniit`).

## Recommended release flow

1. Change and test in Git; run `npm run build` locally when possible.
2. Deploy to **staging** (`new.smartuniit.com`) and verify UI, `/api/health`, contact form, and `/admin`.
3. Promote the same build to **production** static files (rsync below).
4. If production needs live API (forms/admin on www), configure OpenLiteSpeed `/api` proxy (see **Production API**).

### Build on the server

```bash
cd /opt/new-smartuniit
git pull
npm install
npm run build
```

### Publish production static files

```bash
rsync -a --delete --exclude='.htaccess' \
  /opt/new-smartuniit/dist/ \
  /home/smartuniit.com/public_html/

systemctl restart lsws
```

### PM2 (Node / Express)

```bash
pm2 status
pm2 restart new-smartuniit
pm2 logs new-smartuniit
pm2 save
```

Local health check: `curl -s http://127.0.0.1:4179/api/health`

## Staging vs production (important)

**`new.smartuniit.com`** is configured as a **full reverse proxy** to `http://127.0.0.1:4179` (PM2). The Express app serves the SPA and `/api/*`.

**Production** today serves **static files only** from `public_html` (rsync of `dist/`). `/api/*` on `www` returns the SPA HTML, so the contact form and admin API do **not** work on production until you either:

- Add an OpenLiteSpeed `extprocessor` + `context /api` (or `/`) proxy to port `4179` on the `smartuniit.com` vhost (mirror the pattern in `new.smartuniit.com/vhost.conf`), or
- Change the frontend to call an API on a host that already proxies (not ideal for same-origin cookies).

Test API on staging:

```bash
curl -s https://new.smartuniit.com/api/health
```

## Environment variables

Copy `.env.example` to `.env` on the server (never commit `.env`). Required for admin login in production:

- `PORT` (default `4179`)
- `DATA_DIR`
- `ADMIN_USER`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET` (optional; otherwise stored/generated under `data/`)

## DNS (intended)

| Type | Host | Value |
|------|------|--------|
| A | `@` (root) | Server IP |
| CNAME | `www` | `smartuniit.com` |
| A | `new` | Server IP |

Use `@` or blank for the apex record, not the hostname `root`.

## OpenLiteSpeed

Production vhost config:

`/usr/local/lsws/conf/vhosts/smartuniit.com/vhost.conf`

Staging vhost config (proxy reference):

`/usr/local/lsws/conf/vhosts/new.smartuniit.com/vhost.conf`

## Contact (site footer / contact block)

- Phone / WhatsApp: +966 50 990 2054
- Email: info@smartuniit.com

## Security

- Store VPS, CyberPanel, and admin passwords only on the server or in a secrets manager — not in Git.
- Prefer SSH keys over password login; rotate credentials if they were shared in email or chat.
