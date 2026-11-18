import notFoundImage from './404.jpg'
import pageNotFound from './error.jpg'
import fallback from './fallback-image.jpg'
import loadingImage from './loading.jpg'
import loadingLogo from './netflix-logo.png'
import wandaVisionPoster from './posters/wandavision.jpg'

export * from './netflixLogos'
export * from './icons'

/** Used by the app today. */
export { fallback, loadingLogo }

/**
 * Collected images that are kept for later use (e.g. a 404 page or a
 * poster-colour based backdrop), not referenced by components yet.
 */
export { pageNotFound, notFoundImage, loadingImage, wandaVisionPoster }
