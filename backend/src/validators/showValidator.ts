import { z, ZodError } from "zod"
import { NextFunction, Request, Response } from "express"
import { statusConstant } from '../constants'

//todo type and constnants

const validGenres = ["Action", "Romance", "Thriller", "Comedy", "Drama", "Horror", "Sci-Fi", "Fantasy"] as const

const showSchema = z.object({
  id: z.string().uuid({ message: "ID must be a valid UUID." }),
  type: z.enum(["Movie", "Serie"], { message: "Type must be either 'Movie' or 'Serie'." }),
  title: z.string().min(1, { message: "Title must be at least 1 character long." }),
  tagline: z.string().min(1,  { message: "Tagline must be at least 1 character long." }),
  rating: z.number().min(0.0, { message: "Rating must be at least 0.0." }).max(10.0, { message: "Rating must be at most 10.0." }),
  released: z.string().regex(/^\d{4}\.\d{2}\.\d{2}$/, { message: "Released date must be in the format YYYY.MM.DD." }),
  poster: z.string().url({ message: "Poster must be a valid URL." }),
  backdrop: z.string().url({ message: "Backdrop must be a valid URL." }),
  synopsis: z.string().min(1, { message: "Synopsis must be at least 1 character long." }),
  genres: z.array(z.enum(validGenres)).nonempty({ message: "At least one genre must be provided." }).max(5, { message: "A maximum of 5 genres can be provided." }),
  runtime: z.number().positive({ message: "Runtime must be a positive number." }).min(1, { message: "Runtime must be at least 1 minute." }),
})

export const showValidator = (req: Request, res: Response, next: NextFunction): void => {
  try {
    showSchema.parse(req.body)
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(statusConstant.BAD_REQUEST).json({ message: "Validation failed", errors: error.errors })
    } else {
      console.error("Unexpected error during validation:", error)
      res.status(statusConstant.INTERVAL_SERVER_ERROR).json({ message: "An unexpected error occurred" })
    }
  }
}
