# Rikaflix

Rikaflix is a streaming-site-style movie and TV show browser: search, filter by genre, sort, page through 600+ titles,
open a detail page, pick something at random, and add, edit or delete shows.

**Live:** <https://mazsola739.github.io/rikaflix/>

It started as the React home task of the EPAM CDP mentoring program
([Figma design](https://www.figma.com/design/fKGjrOqR6nJe6LYJopGCZ8/-CDP--Home-Task-%E2%80%93-React-v1))
and grew a lot of extra features along the way.

It is a **static app**: there is no server. The data set, every poster and backdrop, the font and the icons
ship with the app, so it runs on GitHub Pages (or any static host) without any outside API or CDN.

## Features

From the home task:

- Card list of movies with poster, title, year and genres
- Search by title, genre tabs, sorting by release date / rating / title
- Add, edit and delete a show in modal dialogs with form validation
- Detail page of a selected show

Extras added on top:

- **Animated header**: three rows of Rikaflix logo tiles and random posters scrolling in opposite directions behind a blurred overlay
- **Random** button that opens a random show
- **Movies / Series** buttons that switch between movies and TV shows (180 TV shows in the data)
- Sliding underline on the genre tabs, with a "…more" menu for the rest of the genres
- Ascending / descending sort toggle with icons
- Pagination with first / previous / next / last buttons and a result counter
- Circular **rating ring** on every card
- **Intro screen**: the Rikaflix "R" draws its outline and fills in while a counter runs to 100 %, then the screen zooms into the R and fades into the app
- Success ("congratulations") dialog with the added show's title
- Detail page drawn over the show's backdrop image
- Fallback poster when an image can't be loaded

## Adding, editing and deleting without a server

Changes are kept **only in the visitor's own browser** (localStorage). Nobody else sees them, and nothing is
sent anywhere. They survive a page reload; the **Reset demo data** button in the footer (shown once
something has changed) throws them away and brings back the original list.

## Getting started

Requirements: Node.js 22+ (24 LTS recommended) and Yarn 1.

```bash
yarn install
```

```bash
yarn dev
```

The app opens on <http://localhost:2222>.

## Scripts

| Command           | What it does                                                                       |
| ----------------- | ---------------------------------------------------------------------------------- |
| `yarn dev`        | Dev server on <http://localhost:2222>                                              |
| `yarn build`      | Type-checks, then builds the GitHub Pages version into `dist/` (served from `/rikaflix/`) |
| `yarn preview`    | Serves the last build on <http://localhost:2222/rikaflix/>                     |
| `yarn typecheck`  | Type-checks only                                                                   |
| `yarn lint`       | ESLint                                                                             |
| `yarn format`     | Prettier on `src/`                                                                 |
| `yarn test`       | Unit and component tests (Vitest + Testing Library)                                |
| `yarn test:watch` | Tests in watch mode                                                                |
| `yarn images`     | Downloads remote poster/backdrop URLs into the repo (see [Images](#images))        |

## Publishing on GitHub Pages

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push to `main` / `master`:
it type-checks, lints and tests the app, then builds it and publishes it.

One-time setup:

1. Create a **public** repository called `rikaflix` on GitHub (free GitHub Pages needs a public repository) and push the code.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.** If the first run failed because Pages was not switched on yet, re-run it.
3. The site appears at `https://<your-github-user>.github.io/rikaflix/`.

The build expects the repository to be called `rikaflix`; if you rename it, change `PAGES_BASE` in [`vite.config.ts`](vite.config.ts).
On GitHub Pages `404.html` (a copy of `index.html`, made by `yarn build`) makes direct links and page reloads work.

> Note: posters and backdrops are copyrighted by their studios. They are fine in a personal learning project,
> but a public repository / site publishes them too.

## Project structure

```
rikaflix/
├── src/            the app (see below)
├── public/         favicons and every poster / backdrop (images/)
├── scripts/        maintenance scripts (image download)
├── .github/        CI: tests + GitHub Pages deployment
├── index.html
└── vite.config.ts  build, dev server (port 2222), path aliases, test setup
```

Folders under `src/` are imported by bare name (`import { Card } from 'common'`); the aliases live in
[`vite.config.ts`](vite.config.ts) and `baseUrl` in [`tsconfig.json`](tsconfig.json).

```
src/
├── app/          App (routes) and AppProvider (theme, Redux store, show context)
├── layouts/      page building blocks: Layout, Header, Navigation, Main, CardList, MediaInfo, Footer
├── modules/      features: Search, Filter, Sort, Switcher, Add, Edit, Delete
├── common/       reusable UI: Button, Card, Modal, Poster, RatingRing, Pagination, form fields, Loading (intro), LogoMark (the R)…
├── helper/       ShowProvider / useShowContext: the list query state shared by the page
├── store/        Redux store, the RTK Query API (mediaApi) and the in-browser data layer
├── data/         shows.json: the data set (614 shows)
├── hooks/        small reusable hooks
├── constant/     texts, labels, genre list
├── utils/        formatters (dates, runtime, genres, form ↔ data conversion, image URLs)
├── styles/       global styles and colour variables
├── providers/    Emotion theme provider
├── types/        shared TypeScript types
├── assets/       images, icon exports
└── test/         test setup, test data set, custom render()
```

Every component folder follows the same pattern: `Name.tsx`, `Name.styles.ts`, `Name.types.ts`, `Name.test.tsx` and an `index.ts`.

## How data flows

```
Browser ──► static files (GitHub Pages): app + data + images
            RTK Query ──► browserBaseQuery ──► src/data/shows.json  (+ the visitor's changes in localStorage)
```

1. `ShowProvider` (in `helper/`) keeps the list query: type, title, genres, sort, page size and page.
2. It calls `useGetShowsQuery` from **RTK Query** (`store/service/mediaApi.ts`). RTK Query is the data layer:
   it caches results and tracks loading state. The Redux store in `store/` holds nothing but this cache.
3. There is no server: [`store/service/browserBaseQuery.ts`](src/store/service/browserBaseQuery.ts) answers every request
   in the browser. It loads `src/data/shows.json` (as a separate, lazily loaded chunk), filters, sorts and pages it with
   [`store/service/showQuery.ts`](src/store/service/showQuery.ts), and keeps additions / edits / deletions in localStorage
   under `rikaflix:shows`.
4. Search, genre tabs, sorting, paging and the Movies/Series buttons only update the query state; RTK Query refetches.
5. Add / Edit / Delete call the matching mutation and then refetch the list.
6. Forms use their own field names; `utils/mediaFormatter.ts` converts between the form and the data shape
   (and turns the form's strings back into numbers for rating and runtime).
7. Image paths from the data go through `utils/imageUrl.ts`, which prefixes local `images/...` paths with the app's base URL.

## Pages

| Route        | Page                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| `/`          | Redirects to `/home`                                                   |
| `/home`      | Header with search + "add new", genre tabs, sorting, card list, paging |
| `/shows/:id` | Detail page of a show over its backdrop image                          |

On GitHub Pages every route is prefixed with `/rikaflix`.

## Tests

Tests run in jsdom against the real data layer, seeded with a small fixed data set
([`src/test/testShows.ts`](src/test/testShows.ts)) instead of the 614 bundled shows;
`browserBaseQuery.test.ts` runs the data layer against the real data set.
Use `render` from `test-utils` in component tests: it wraps the component in the theme, the store and the show context.

```tsx
import { render, screen } from 'test-utils'

render(<Header />)
expect(await screen.findByRole('banner')).toBeInTheDocument()
```

## Images

All 614 posters and 64 backdrops live in `public/images/` (~69 MB) and are referenced in the data as
`images/posters/<file>.jpg` / `images/backdrops/<file>.jpg`. The app resolves these against its base URL,
so they work both locally and under `/rikaflix/` on GitHub Pages.

If you add a show to `src/data/shows.json` with a poster URL from the internet, run `yarn images`: it downloads every
remote image in the data (TMDB images at 500 px / 1280 px width) and rewrites the data to the local copies.

Other assets:

- The Rikaflix "R" is the capital R of Montserrat Black (the font of the "rikaflix" text), stored as an SVG outline in
  [`common/LogoMark`](src/common/LogoMark/LogoMark.tsx) (intro screen, header tiles);
  `public/favicon.svg` is the same drawing, `public/favicon.ico` the older "R" icon kept as a fallback for browsers without SVG favicons.
- `src/assets/`: the fallback poster, the error / 404 / loading pictures and an extra WandaVision poster (kept for later use).
- Icons come from `@react-icons/all-files` and are re-exported with descriptive names in `assets/icons.ts`.
- The Montserrat font is bundled from `@fontsource/montserrat` (no Google Fonts request).

## Data

`src/data/shows.json` holds 614 shows (434 movies, 180 TV shows) with ratings, genres, posters and overviews.
550 of them have no backdrop image yet; their detail page falls back to a plain background.

```ts
interface Show {
  id: string               // UUID
  type: 'Movie' | 'TV show'
  title: string
  tagline: string
  vote_average: number     // 0–10
  release_date: string     // YYYY.MM.DD
  poster_path: string      // 'images/posters/…' or an http(s) URL
  backdrop_path: string    // 'images/backdrops/…', an http(s) URL, or ''
  overview: string
  genres: string[]         // e.g. ['Action', 'Sci-fi']; first letter is capitalised on save
  runtime: number          // minutes
}
```

## History

Rikaflix merges three earlier versions of the same project into one:

| Version | What came from it                                                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2021    | First version (CRA, styled-components); the 404 picture                                                                                            |
| 2024    | Vite setup, the old "R" favicon, the footer text and the WandaVision poster. It also had an Express backend; the app has since become fully static |
| 2025    | The feature-complete frontend, its tests, assets and the full data set                                                                             |

## Not implemented yet

- A dedicated 404 page (the images for it are already in `src/assets`).
