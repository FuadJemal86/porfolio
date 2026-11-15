# Visitor counter server

Run locally with `npm run dev` from this directory. Set `DATABASE_URL` to your
PostgreSQL connection string, then generate the Prisma client with
`npm run db:generate`. The API listens on port 4000:

- `GET /api/visits` returns the shared count.
- `POST /api/visits` increments it and returns the updated count.

The API stores the count in the `Count` table at `id = 1`. If that row does not
exist, it creates it with a starting count of 406. POST increments the database
value atomically, so simultaneous requests are counted correctly. Apply schema
migrations during deployment with `npm run db:deploy`.
Set `CLIENT_ORIGINS` to the frontend origin (comma separated if there are several).
For the deployed frontend, set `VITE_API_BASE_URL` to the server URL plus `/api`,
for example `https://your-counter-server.example.com/api`, then rebuild the client.
