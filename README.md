# Smart Universe Website Preview

React + Vite + Tailwind website for Smart Universe Communication and Information Technology.

## Features

- Bilingual English/Arabic homepage
- Interactive shader hero and solution builder
- Services, process, partners, insights, company profile, and contact lead form
- `/admin` page for editing site content and viewing leads
- Express API with file-backed JSON storage for preview deployment

## Local Development

```bash
npm install
npm run dev
```

For the API server:

```bash
cp .env.example .env
npm run build
npm run server
```

## Production Preview

The preview target is `new.smartuniit.com`. The Node server listens locally and should be reverse proxied by CyberPanel/OpenLiteSpeed.

Required environment variables:

- `PORT`
- `DATA_DIR`
- `ADMIN_USER`
- `ADMIN_PASSWORD`
- `ADMIN_SECRET`

DNS must point `new.smartuniit.com` to `109.199.116.107` before public SSL can be issued.
