import { Request, Response } from 'express'
import { userService } from '../services'
import { statusConstant } from '../constants'

const getUsers = (req: Request, res: Response): void => {
  try {
    const users = userService.getUsers()
    res.status(statusConstant.OK).json(users)
} catch (error) {
    res.status(statusConstant.INTERVAL_SERVER_ERROR).json({ message: 'Error fetching users' })
}
}

const getUserById = (req: Request, res: Response): void => {
  try {
    const user = userService.getUserById(req.params.id)
    if (user) {
      res.status(statusConstant.OK).json(user)
    } else {
      res.status(statusConstant.NOT_FOUND).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(statusConstant.INTERVAL_SERVER_ERROR).json({ message: 'Error fetching user' })
}
}

const addUser = (req: Request, res: Response): void => {
  try {
    const newUser = userService.addUser(req.body)
    res.status(statusConstant.CREATED).json(newUser)
} catch (error) {
    res.status(statusConstant.INTERVAL_SERVER_ERROR).json({ message: 'Error adding user' })
}
}

const updateUser = (req: Request, res: Response): void => {
  try {
    const updatedUser = userService.updateUser(req.params.id, req.body)
    if (updatedUser) {
      res.status(statusConstant.OK).json(updatedUser)
    } else {
      res.status(statusConstant.NOT_FOUND).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(statusConstant.INTERVAL_SERVER_ERROR).json({ message: 'Error updating user' })
}
}

const deleteUser = (req: Request, res: Response): void => {
  try {
    const deleted = userService.deleteUser(req.params.id)
    if (deleted) {
      res.status(statusConstant.OK).json({ message: 'User deleted' })
    } else {
      res.status(statusConstant.NOT_FOUND).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(statusConstant.INTERVAL_SERVER_ERROR).json({ message: 'Error deleting user' })
}
}

export const userController = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
}
