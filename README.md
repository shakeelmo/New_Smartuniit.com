# Smart Universe Website

React + Vite + Tailwind marketing site for Smart Universe Communication and Information Technology (Riyadh).

## Features

- Bilingual English/Arabic homepage
- Interactive shader hero and solution builder
- Services, process, partners, insights, company profile PDF, and contact lead form
- `/admin` for editing site content (JSON) and viewing leads
- Express API with file-backed JSON storage

## Domains

- **Staging:** https://new.smartuniit.com (full app + API via reverse proxy)
- **Production:** https://smartuniit.com and https://www.smartuniit.com (static publish; see deployment doc for API)

Detailed server paths, rsync, PM2, and DNS: **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

## Local development

```bash
npm install
npm run dev
```

API + built static preview:

```bash
cp .env.example .env
npm run build
npm run server
```

Default dev admin password is `admin` when `NODE_ENV` is not production and `.env` is unset.

## Environment variables

See `.env.example`: `PORT`, `DATA_DIR`, `ADMIN_USER`, `ADMIN_PASSWORD`, `ADMIN_SECRET`.
