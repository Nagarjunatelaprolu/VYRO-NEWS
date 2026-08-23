# VYRO NEWS — Demo server

## Run locally

1. Install Node.js 18+.
2. Open a terminal in this `server` folder.
3. Run `npm install`
4. Set a strong `JWT_SECRET` before production.
5. Optionally set `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
6. Run `npm start`.

Default demo login:
- Email: admin@vyro.news
- Password: vyro123

The server creates `vyro-news.db` automatically and stores uploaded images in `uploads/`.

## API

- POST `/api/auth/login`
- GET `/api/news`
- GET `/api/admin/news` (Bearer token)
- POST `/api/news` (Bearer token)
- PUT `/api/news/:id` (Bearer token)
- DELETE `/api/news/:id` (Bearer token)
- POST `/api/upload` (Bearer token)
- GET `/api/health`

## Production note

This is a deployment-ready demo foundation, not a claim of an already-hosted public server. For production use a strong secret, HTTPS, managed database/storage, backups, rate limiting and secure environment variables.
