import fs from "fs"
import path from "path"
import { User } from "../types"

const filePath = path.resolve(__dirname, "../database/users.json")

const readUsersFromFile = (): User[] => {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent) as User[]
}

const writeUsersToFile = (users: User[]) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); 
}

export const userUtil = {
  readUsersFromFile,
  writeUsersToFile,
}
