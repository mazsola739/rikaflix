import { Router } from 'express'

import { createShowController } from '../controllers/showController'
import { ShowRepository } from '../repositories/showRepository'
import { createShowSchema, showQuerySchema, updateShowSchema, validate } from '../validators/showValidator'

export const createShowRouter = (repository: ShowRepository) => {
  const controller = createShowController(repository)
  const router = Router()

  router.get('/', validate(showQuerySchema, 'query'), controller.list)
  router.get('/:id', controller.getById)
  router.post('/', validate(createShowSchema), controller.create)
  router.put('/:id', validate(updateShowSchema), controller.update)
  router.delete('/:id', controller.remove)

  return router
}
