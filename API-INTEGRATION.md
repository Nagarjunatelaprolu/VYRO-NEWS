# Connecting VYRO NEWS UI to the real API

Set the API base URL in the admin/public JavaScript to the deployed server, for example:
`https://YOUR-API-DOMAIN`

Admin flow:
1. POST `/api/auth/login`
2. Store the returned JWT in sessionStorage.
3. Send `Authorization: Bearer <token>` on admin requests.
4. Use `/api/news` for the public homepage.
5. Use `/api/upload` for image upload, then save the returned URL with the news record.

The existing browser demo remains available as a no-server fallback.
