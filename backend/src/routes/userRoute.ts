import { Router } from 'express'
import { userController } from '../controllers'

const userRouter = Router()

userRouter.get('/', userController.getUsers)
userRouter.get('/:id', userController.getUserById)
userRouter.post('/', userController.addUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

export { userRouter }
