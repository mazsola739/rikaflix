# Rika Netflix – frontend

The single-page app of Rika Netflix, built with **React 19**, **TypeScript**, **Vite**, **Emotion**, **Redux Toolkit Query**, **React Router**, **Formik** and **Yup**.

## Scripts

| Command            | What it does                                                                  |
| ------------------ | ----------------------------------------------------------------------------- |
| `yarn dev`         | Dev server on <http://localhost:3000>, proxies `/api` to the backend (API mode) |
| `yarn dev:pages`   | Dev server in browser mode at <http://localhost:3000/rika-netflix/>, no backend needed |
| `yarn build`       | Type-checks, then builds the API-mode bundle into `dist/`                     |
| `yarn build:pages` | Type-checks, then builds the GitHub Pages (browser-mode) bundle into `dist/`  |
| `yarn preview`     | Serves the last build locally                                                 |
| `yarn typecheck`   | Type-checks only                                                              |
| `yarn lint`        | ESLint                                                                        |
| `yarn format`      | Prettier on `src/`                                                            |
| `yarn test`        | Unit and component tests (Vitest + Testing Library + MSW)                     |
| `yarn test:watch`  | Tests in watch mode                                                           |

## Data modes

The app talks to its data through RTK Query (`src/store/service/mediaApi.ts`). Which "backend" answers is decided at build time:

| Mode         | How to start                    | Answered by                                                                  |
| ------------ | ------------------------------- | ---------------------------------------------------------------------------- |
| API          | `yarn dev`, `yarn build`        | the Express backend (`/api`, see [backend/README.md](../backend/README.md))  |
| Browser      | `yarn dev:pages`, `yarn build:pages` | `browserBaseQuery.ts`: the bundled data set + localStorage for changes |

Browser mode is switched on by `VITE_DATA_SOURCE=browser` in [`.env.pages`](.env.pages) (Vite mode `pages`), which also
serves the app from `/rika-netflix/` like GitHub Pages does. It loads `backend/data/shows.json` as a separate chunk,
runs the same `shared/showQuery.ts` the backend uses, and keeps additions / edits / deletions in `localStorage`
under `rika-netflix:shows`. The footer then shows a **Reset demo data** button.

### Environment variables

| Variable           | Default                 | Meaning                                                               |
| ------------------ | ----------------------- | --------------------------------------------------------------------- |
| `API_PROXY_TARGET` | `http://localhost:5000` | Where the dev server proxies `/api` (if the backend uses another port) |
| `VITE_API_URL`     | `/api/`                 | API base URL baked into the build, e.g. `https://example.com/api/`    |
| `VITE_DATA_SOURCE` | `api`                   | `browser` = no backend (set by `.env.pages`)                          |

## Pages

| Route        | Page                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| `/`          | Redirects to `/home`                                                   |
| `/home`      | Header with search + "add new", genre tabs, sorting, card list, paging |
| `/shows/:id` | Detail page of a show over its backdrop image                          |

On GitHub Pages every route is prefixed with `/rika-netflix`; `404.html` (a copy of `index.html`, made by `build:pages`)
makes direct links and page reloads work there.

## Project structure

Folders under `src/` are imported by bare name (`import { Card } from 'common'`); the aliases live in [`vite.config.ts`](vite.config.ts) and `baseUrl` in [`tsconfig.json`](tsconfig.json).
`shared/…` points to the repository's `shared/` folder, `shows-data` to `backend/data/shows.json`.

```
src/
├── app/          App (routes) and AppProvider (theme, Redux store, show context)
├── layouts/      page building blocks: Layout, Header, Navigation, Main, CardList, MediaInfo, Footer
├── modules/      features: Search, Filter, Sort, Switcher, Add, Edit, Delete
├── common/       reusable UI: Button, Card, Modal, Poster, RatingRing, Pagination, form fields, Loading…
├── helper/       ShowProvider / useShowContext: the list query state shared by the page
├── store/        Redux store, the RTK Query API (mediaApi) and the browser-mode base query
├── hooks/        small reusable hooks
├── constant/     texts, labels, genre list
├── utils/        formatters (dates, runtime, genres, form ↔ API conversion, image URLs)
├── styles/       global styles and colour variables
├── providers/    Emotion theme provider
├── types/        shared TypeScript types
├── assets/       images, Netflix logos, icon exports
└── test/         test setup, MSW mock API, custom render()
```

Every component folder follows the same pattern: `Name.tsx`, `Name.styles.ts`, `Name.types.ts`, `Name.test.tsx` and an `index.ts`.

## How data flows

1. `ShowProvider` (in `helper/`) keeps the list query: type, title, genres, sort, page size and page.
2. It calls `useGetShowsQuery` (RTK Query), which requests `GET /api/shows` with those parameters (or the browser-mode equivalent).
3. Search, genre tabs, sorting, paging and the Movies/Series buttons only update the query state; RTK Query refetches.
4. Add / Edit / Delete call the matching mutation and then refetch the list.
5. Forms use their own field names; `utils/mediaFormatter.ts` converts between the form and the API shape
   (and turns the form's strings back into numbers for rating and runtime).
6. Image paths from the data go through `utils/imageUrl.ts`, which prefixes local `images/...` paths with the app's base URL.

## Tests

Tests run in jsdom. Component tests talk to a mock API built with [MSW](https://mswjs.io/) ([`src/test/handlers.ts`](src/test/handlers.ts));
`browserBaseQuery.test.ts` runs the browser mode against the real data set.
Use `render` from `test-utils` in component tests: it wraps the component in the theme, the store and the show context.

```tsx
import { render, screen } from 'test-utils'

render(<Header />)
expect(await screen.findByRole('banner')).toBeInTheDocument()
```

## Assets

- `public/images/posters`, `public/images/backdrops`: every poster and backdrop of the data set (see `yarn images` in the main README).
- `public/favicon.ico`: the "R" logo; `public/favicon-netflix.ico`: the Netflix "N".
- `src/assets/`: the five Netflix logos of the animated header, the fallback poster, the loading logo,
  the error / 404 / loading pictures and an extra WandaVision poster (kept for later use).
- Icons come from `@react-icons/all-files` and are re-exported with descriptive names in `assets/icons.ts`.
- The Montserrat font is bundled from `@fontsource/montserrat` (no Google Fonts request).
