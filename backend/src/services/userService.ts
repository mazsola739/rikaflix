import { userRepository } from "../repositories"
import { User } from "../types"


const getUsers = (): User[] => {
  return userRepository.getUsers()
}

const getUserById = (id: string): User | undefined => {
  return userRepository.getUserById(id)
}

const addUser = (newUserData: Partial<User>): User => {
  return userRepository.addUser(newUserData)
}

const updateUser = (id: string, updateData: Partial<User>): User | null => {
  return userRepository.updateUser(id, updateData)
}

const deleteUser = (id: string): boolean => {
  return userRepository.deleteUser(id)
}

export const userService = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
}
