# Rika Netflix

A Netflix-style movie and TV show browser: search, filter by genre, sort, page through 600+ titles,
open a detail page, pick something at random, and add, edit or delete shows.

It started as the React home task of the EPAM CDP mentoring program
([Figma design](https://www.figma.com/design/fKGjrOqR6nJe6LYJopGCZ8/-CDP--Home-Task-%E2%80%93-React-v1))
and grew a lot of extra features along the way.

```
rika-netflix/
├── frontend/   React 19 + TypeScript + Vite + Emotion + RTK Query   → frontend/README.md
├── backend/    Express + TypeScript + Zod, JSON file storage         → backend/README.md
├── shared/     filtering/sorting code + types used by both           → shared/README.md
├── scripts/    maintenance scripts (image download)
└── .github/    CI: tests + GitHub Pages deployment
```

Everything the app needs is in this repository: the data, every poster and backdrop, the fonts and the icons.
It does not depend on any outside API or CDN.

## Features

From the home task:

- Card list of movies with poster, title, year and genres
- Search by title, genre tabs, sorting by release date / rating / title
- Add, edit and delete a show in modal dialogs with form validation
- Detail page of a selected show

Extras added on top:

- **Animated header**: three rows of Netflix logos and random posters scrolling in opposite directions behind a blurred overlay
- **Random** button that opens a random show
- **Movies / Series** buttons that switch between movies and TV shows (180 TV shows in the data)
- Sliding underline on the genre tabs, with a "…more" menu for the rest of the genres
- Ascending / descending sort toggle with icons
- Pagination with first / previous / next / last buttons and a result counter
- Circular **rating ring** on every card
- Loading screen with a counter and the Netflix logo
- Success ("congratulations") dialog with the added show's title
- Detail page drawn over the show's backdrop image
- Fallback poster when an image can't be loaded
- Runs **with or without a server**: a REST backend locally, a server-less build on GitHub Pages

## Two ways to run

| Mode                   | Where                         | Data and changes                                                                   |
| ---------------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| **API mode** (default) | your machine: `yarn dev`      | Express backend; add / edit / delete are saved to `backend/data/shows.json`        |
| **Browser mode**       | GitHub Pages, or `yarn --cwd frontend dev:pages` | No server; the data ships with the app, changes are saved in the visitor's browser (localStorage) and a "Reset demo data" button in the footer restores the original list |

Both modes use the same filtering, sorting and paging code (`shared/showQuery.ts`), so they behave the same.

## Getting started

Requirements: Node.js 20+ and Yarn 1.

```bash
yarn setup
```

```bash
yarn dev
```

`yarn setup` installs the dependencies of the root, the backend and the frontend.
`yarn dev` starts both: the API on <http://localhost:5000/api> and the app on <http://localhost:3000> (it opens in the browser).

You can also run them separately, each in its own terminal:

```bash
yarn --cwd backend dev
```

```bash
yarn --cwd frontend dev
```

If port 5000 is taken, start the backend on another port and point the frontend at it:
`PORT=5055 yarn --cwd backend dev` and `API_PROXY_TARGET=http://localhost:5055 yarn --cwd frontend dev`.

## Scripts (root)

| Command          | What it does                                                     |
| ---------------- | ---------------------------------------------------------------- |
| `yarn setup`     | Installs every dependency                                        |
| `yarn dev`       | Runs backend and frontend together (API mode)                    |
| `yarn test`      | Runs the backend and the frontend tests                          |
| `yarn typecheck` | Type-checks both                                                 |
| `yarn lint`      | Lints the frontend                                               |
| `yarn build`     | Type-checks the backend and builds the frontend                  |
| `yarn images`    | Downloads remote poster/backdrop URLs into the repo (see below)  |

## Publishing on GitHub Pages

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push to `main` / `master`:
it type-checks, lints and tests both parts, then builds the browser-mode frontend and publishes it.

One-time setup after creating the `rika-netflix` repository on GitHub:

1. Push the code.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. The site appears at `https://<your-github-user>.github.io/rika-netflix/`.

The Pages build expects the repository to be called `rika-netflix`; if you rename it, change `PAGES_BASE` in `frontend/vite.config.ts`.

> Note: posters and backdrops are copyrighted by their studios. They are fine in a personal learning project,
> but a public repository / site publishes them too; make the repository private if that matters to you.

## Images

All 614 posters and 64 backdrops live in `frontend/public/images/` (~69 MB) and are referenced in the data as
`images/posters/<file>.jpg` / `images/backdrops/<file>.jpg`. The frontend resolves these against its base URL,
so they work both locally and under `/rika-netflix/` on GitHub Pages.

When you add a show with a poster URL from the internet, run `yarn images`: it downloads every remote image in
`backend/data/shows.json` (TMDB images at 500 px / 1280 px width) and rewrites the data to the local copies.

## How it fits together

```
API mode:      Browser ──► Vite dev server (:3000) ──/api proxy──► Express API (:5000) ──► backend/data/shows.json
Browser mode:  Browser ──► static files (GitHub Pages): app + data + images; changes ──► localStorage
```

- The frontend keeps the current list query (type, title, genres, sort, page) in a React context and asks for data through RTK Query.
- In API mode the backend filters, sorts and pages the shows, validates every write with Zod and saves the JSON file atomically.
- In browser mode `frontend/src/store/service/browserBaseQuery.ts` answers the same requests inside the browser.

More details: [backend/README.md](backend/README.md) (API reference), [frontend/README.md](frontend/README.md) (structure, data flow, tests), [shared/README.md](shared/README.md).

## Data

`backend/data/shows.json` holds 614 shows (434 movies, 180 TV shows) with ratings, genres, posters and overviews.
550 of them have no backdrop image yet; their detail page falls back to a plain background.

## History

This repository merges three earlier versions of the same project into one:

| Version                        | What came from it                                                               |
| ------------------------------ | ------------------------------------------------------------------------------- |
| `netflix-roulette-2021`        | First version (CRA, styled-components); the 404 picture                         |
| `netflix-roulette-rika` (2025) | The feature-complete frontend, its tests, assets and the full data set          |
| `rika-roulette` (2024)         | The Express backend, Vite setup, the "R" favicon, the footer text and the WandaVision poster |

## Not implemented yet

- Authentication: in API mode anyone who can reach the API can add, edit or delete shows.
- A dedicated 404 page (the images for it are already in `frontend/src/assets`).
