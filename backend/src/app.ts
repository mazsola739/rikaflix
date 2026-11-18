import cors from 'cors'
import express from 'express'

import { errorHandler, notFound } from './middlewares/errorHandler'
import { ShowRepository } from './repositories/showRepository'
import { createShowRouter } from './routes/showRoute'

/** Builds the Express app. Kept separate from `server.ts` so tests can use it without opening a port. */
export const createApp = (repository: ShowRepository, corsOrigin?: string) => {
  const app = express()

  if (corsOrigin) app.use(cors({ origin: corsOrigin }))
  app.use(express.json())

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' })
  })
  app.use('/api/shows', createShowRouter(repository))

  app.use(notFound)
  app.use(errorHandler)

  return app
}
