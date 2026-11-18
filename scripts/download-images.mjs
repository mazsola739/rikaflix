#!/usr/bin/env node
/**
 * Downloads every remote poster / backdrop referenced in src/data/shows.json
 * into public/images and rewrites the data to point at the local copies.
 *
 *   yarn images
 *
 * - Posters are saved at 500 px width, backdrops at 1280 px (TMDB sizes), which is
 *   plenty for the UI and ~4x smaller than the originals.
 * - Paths are stored relative to the site root without a leading slash
 *   (e.g. "images/posters/abc.jpg"), so they also work when the app is served
 *   from a sub-path such as GitHub Pages (https://<user>.github.io/rika-netflix/).
 * - Safe to run again: existing files are skipped, only remote URLs are processed.
 *   Run it after adding shows with remote image URLs to make them local too.
 *
 * Requires Node.js 18+ (built-in fetch). No dependencies.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DATA_FILE = path.join(ROOT, 'src', 'data', 'shows.json')
const PUBLIC_DIR = path.join(ROOT, 'public')

const KINDS = {
  poster_path: { folder: 'images/posters', tmdbSize: 'w500' },
  backdrop_path: { folder: 'images/backdrops', tmdbSize: 'w1280' }
}
const CONCURRENCY = 8
const RETRIES = 3

/** Builds the download URL: TMDB images are fetched from their CDN at a smaller size, others as they are. */
const sourceUrl = (url, tmdbSize) => {
  const match = url.match(/themoviedb\.org\/t\/p\/[^/]+\/(.+)$/)
  return match ? `https://image.tmdb.org/t/p/${tmdbSize}/${match[1]}` : url
}

/** File name for a remote image: keeps the TMDB file name, otherwise derives one from the URL. */
const fileNameFor = url => {
  const { pathname } = new URL(url)
  const base = path.basename(pathname).replace(/[^\w.-]/g, '_') || 'image'
  return /\.(jpe?g|png|webp|gif)$/i.test(base) ? base : `${base}.jpg`
}

const exists = file =>
  fs.access(file).then(
    () => true,
    () => false
  )

const download = async (url, target) => {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30_000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      await fs.writeFile(target, Buffer.from(await res.arrayBuffer()))
      return
    } catch (error) {
      if (attempt >= RETRIES) throw new Error(`${url}: ${error.message}`)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
    }
  }
}

const shows = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'))

// Collect the work: one job per show field that still points to a remote URL.
const jobs = []
for (const show of shows) {
  for (const [field, kind] of Object.entries(KINDS)) {
    const value = show[field]
    if (!/^https?:\/\//.test(value ?? '')) continue
    const localPath = `${kind.folder}/${fileNameFor(value)}`
    jobs.push({ show, field, url: sourceUrl(value, kind.tmdbSize), localPath })
  }
}

for (const kind of Object.values(KINDS)) await fs.mkdir(path.join(PUBLIC_DIR, kind.folder), { recursive: true })

let done = 0
let downloaded = 0
const failures = []

const worker = async () => {
  while (jobs.length) {
    const job = jobs.shift()
    const target = path.join(PUBLIC_DIR, job.localPath)
    try {
      if (!(await exists(target))) {
        await download(job.url, target)
        downloaded++
      }
      job.show[job.field] = job.localPath
    } catch (error) {
      failures.push(`${job.show.title} (${job.field}): ${error.message}`)
    }
    if (++done % 50 === 0) console.log(`  ${done} images processed…`)
  }
}

const total = jobs.length
console.log(`${total} remote images found in ${path.relative(ROOT, DATA_FILE)}`)
await Promise.all(Array.from({ length: CONCURRENCY }, worker))

await fs.writeFile(DATA_FILE, JSON.stringify(shows, null, 2) + '\n')

console.log(`Done: ${downloaded} downloaded, ${total - downloaded - failures.length} already present, ${failures.length} failed.`)
if (failures.length) {
  console.log('Failed (still pointing to the remote URL):')
  for (const failure of failures) console.log(`  - ${failure}`)
  process.exitCode = 1
}
