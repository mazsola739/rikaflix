import { Request, Response } from 'express'

import { ShowRepository } from '../repositories/showRepository'
import { queryShows } from '../../../shared/showQuery'
import { ShowInput, ShowQuery } from '../../../shared/show'

/** HTTP handlers for `/api/shows`. Request bodies/queries are already validated. */
export const createShowController = (repository: ShowRepository) => ({
  list: (_req: Request, res: Response) => {
    const query = res.locals.query as ShowQuery
    res.json(queryShows(repository.findAll(), query))
  },

  getById: (req: Request, res: Response) => {
    const show = repository.findById(req.params.id)
    if (!show) {
      res.status(404).json({ message: 'Show not found' })
      return
    }
    res.json(show)
  },

  create: (_req: Request, res: Response) => {
    const show = repository.create(res.locals.body as ShowInput)
    res.status(201).json(show)
  },

  update: (req: Request, res: Response) => {
    const show = repository.update(req.params.id, res.locals.body as Partial<ShowInput>)
    if (!show) {
      res.status(404).json({ message: 'Show not found' })
      return
    }
    res.json(show)
  },

  remove: (req: Request, res: Response) => {
    if (!repository.remove(req.params.id)) {
      res.status(404).json({ message: 'Show not found' })
      return
    }
    res.json({ id: req.params.id })
  }
})
