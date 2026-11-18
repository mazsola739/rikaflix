# shared

Plain TypeScript used by **both** the backend and the frontend, so the logic exists only once:

- `show.ts` – the `Show` data model, sort options and the list query/response types.
- `showQuery.ts` – `queryShows()`: filtering, sorting and pagination of the show list.

The backend calls `queryShows()` for `GET /api/shows`; the frontend calls it in browser mode
(the GitHub Pages build, where there is no server). Keep this folder free of Node- or browser-only APIs.
