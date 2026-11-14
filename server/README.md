# Visitor counter server

Run locally with `npm run dev` from this directory. The API listens on port 4000:

- `GET /api/visits` returns the shared count.
- `POST /api/visits` increments it and returns the updated count.

The count starts at 406. It is saved in `data/visits.json`; set `DATA_DIR` to a
persistent disk mount when deploying so it survives server restarts and deploys.
Set `CLIENT_ORIGINS` to the frontend origin (comma separated if there are several).
For the deployed frontend, set `VITE_API_BASE_URL` to the server URL plus `/api`,
for example `https://your-counter-server.example.com/api`, then rebuild the client.
