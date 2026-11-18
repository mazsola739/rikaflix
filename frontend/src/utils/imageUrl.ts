/** Local images live in `public/images/...` and are stored in the data as `images/...`. */
export const LOCAL_IMAGE_PATTERN = /^images\/[\w./-]+$/

/**
 * Turns an image path from the API into something an <img> can load.
 * Absolute URLs pass through; local `images/...` paths are prefixed with the
 * app's base URL, so they keep working when the site is served from a
 * sub-path (e.g. GitHub Pages: `/rika-netflix/images/...`).
 */
export const imageUrl = (path: string) => {
  if (!path) return ''
  if (/^(https?:|data:|blob:)/.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
