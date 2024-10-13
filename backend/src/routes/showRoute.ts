import { Router } from 'express'
import { showController } from '../controllers'
import { showValidator } from '../validators'

const showRouter = Router()

showRouter.get('/', showController.getShows)
showRouter.get('/:id', showController.getShowById)
showRouter.post('/', showValidator, showController.addShow)
showRouter.put('/:id', showValidator, showController.updateShow)
showRouter.delete('/:id', showController.deleteShow)

export { showRouter }
