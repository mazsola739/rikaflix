import { NextFunction, Request, Response } from 'express'
import { z, ZodTypeAny } from 'zod'

import { SHOW_TYPES, SORT_OPTIONS } from '../../../shared/show'

/** `action` -> `Action`, so genres sent by the form match the stored ones. */
const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

/** An absolute http(s) URL, or a local image shipped with the frontend (`images/...`, see scripts/download-images.mjs). */
const url = z
  .string()
  .trim()
  .refine(value => /^images\/[\w./-]+$/.test(value) || z.string().url().safeParse(value).success, { message: 'Must be a valid URL or an images/... path' })

/** Body of `POST /api/shows`. Unknown fields (e.g. `id`) are stripped. */
export const createShowSchema = z.object({
  type: z.enum(SHOW_TYPES),
  title: z.string().trim().min(1, 'Title is required'),
  tagline: z.string().trim().min(1, 'Tagline is required'),
  vote_average: z.number().min(0).max(10),
  release_date: z.string().regex(/^\d{4}\.\d{2}\.\d{2}$/, 'Release date must be in YYYY.MM.DD format'),
  poster_path: url,
  backdrop_path: z.union([url, z.literal('')]).default(''),
  overview: z.string().trim().default(''),
  genres: z
    .array(z.string().trim().min(1).transform(capitalize))
    .min(1, 'At least one genre is required')
    .max(10)
    .transform(genres => [...new Set(genres)]),
  runtime: z.number().int().positive()
})

/** Body of `PUT /api/shows/:id`: any subset of the create fields. */
export const updateShowSchema = createShowSchema.partial()

/** Query of `GET /api/shows`. Every parameter is optional. */
export const showQuerySchema = z.object({
  type: z.enum(['All', ...SHOW_TYPES]).default('All'),
  title: z.string().default(''),
  /** Comma-separated list; `All` (or empty) means no genre filter. */
  genres: z
    .string()
    .default('All')
    .transform(value =>
      value
        .split(',')
        .map(genre => genre.trim())
        .filter(genre => genre && genre !== 'All')
    ),
  sortBy: z.enum(SORT_OPTIONS).default('Release date desc'),
  limit: z.coerce.number().int().min(1).max(100).default(15),
  page: z.coerce.number().int().min(1).default(1)
})

/**
 * Express middleware that validates `req[source]` against `schema`.
 * On success the parsed (trimmed, defaulted) value replaces the original and
 * the request continues; on failure it answers 400 with the problems found.
 */
export const validate =
  (schema: ZodTypeAny, source: 'body' | 'query' = 'body') =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source])
    if (!result.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: result.error.issues.map(issue => ({ field: issue.path.join('.'), message: issue.message }))
      })
      return
    }
    // req.query is a getter in Express 5, so keep the parsed value on res.locals instead.
    res.locals[source] = result.data
    next()
  }
