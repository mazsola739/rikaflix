import { v4 as uuidv4 } from 'uuid'
import { userUtil } from "../utils"
import { User } from '../types'

const users = userUtil.readUsersFromFile()

const getUsers = (): User[] => {
  return users
}

const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id)
}

const addUser = (newUserData: Partial<User>): User => {
  const newUser = { id: uuidv4(), ...newUserData } as User

  users.push(newUser)
  userUtil.writeUsersToFile(users)

  return newUser
}

const updateUser = (id: string, updateData: Partial<User>): User | null => {
  const userIndex = users.findIndex(user => user.id === id)
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updateData }
    userUtil. writeUsersToFile(users)
    return users[userIndex]
  }

  return null
}

const deleteUser = (id: string): boolean => {
  const userIndex = users.findIndex(user => user.id === id)
  
  if (userIndex !== -1) {
    users.splice(userIndex, 1)
    userUtil.writeUsersToFile(users)
    return true
  }

  return false
}

export const userRepository = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
}
