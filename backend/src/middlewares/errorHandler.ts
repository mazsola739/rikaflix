import { NextFunction, Request, Response } from 'express'

/** Answers unknown routes with JSON instead of Express' default HTML page. */
export const notFound = (_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' })
}

/** Last-resort error handler: malformed JSON becomes 400, anything else 500. */
export const errorHandler = (error: Error & { type?: string; status?: number }, _req: Request, res: Response, _next: NextFunction) => {
  if (error.type === 'entity.parse.failed') {
    res.status(400).json({ message: 'Malformed JSON body' })
    return
  }
  console.error(error)
  res.status(error.status ?? 500).json({ message: 'Internal server error' })
}
