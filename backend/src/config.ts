import path from 'path'

/** Runtime settings, overridable with environment variables. */
export const config = {
  port: Number(process.env.PORT ?? 5000),
  /** Path of the JSON "database". Resolves to `backend/data/shows.json` from both `src/` and `dist/`. */
  dataFile: process.env.SHOWS_DATA_FILE ?? path.resolve(__dirname, '../data/shows.json'),
  /** Origin allowed by CORS (the Vite dev server). Requests through the Vite proxy don't need it. */
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000'
}
