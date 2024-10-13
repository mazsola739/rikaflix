import fs from "fs"
import path from "path"
import { Show } from "../types"

const filePath = path.resolve(__dirname, "../database/shows.json")

const readShowsFromFile = (): Show[] => {
  const fileContent = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(fileContent) as Show[]
}

const writeShowsToFile = (shows: Show[]) => {
  fs.writeFileSync(filePath, JSON.stringify(shows, null, 2))
}

export const showUtil = {
  readShowsFromFile,
  writeShowsToFile,
}
