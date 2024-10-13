import { v4 as uuidv4 } from 'uuid'
import { Show } from "../types"
import { showUtil } from "../utils"

const shows = showUtil.readShowsFromFile()

const getShows = (): Show[] => {
  return shows
}

const getShowById = (id: string): Show | undefined => {
  return shows.find(show => show.id === id)
}

const addShow = (newShowData: Show): Show => {
  const { id, ...showWithoutId } = newShowData
  const newShow = { id: uuidv4(), ...showWithoutId }

  shows.push(newShow)
  showUtil.writeShowsToFile(shows)
  return newShow
}

const updateShow = (id: string, updateData: Partial<Show>): Show | null => {
  const showIndex = shows.findIndex(show => show.id === id)
  
  if (showIndex !== -1) {
    shows[showIndex] = { ...shows[showIndex], ...updateData }
    showUtil.writeShowsToFile(shows)
    return shows[showIndex]
  }

  return null
}

const deleteShow = (id: string): boolean => {
  const showIndex = shows.findIndex(show => show.id === id)
  
  if (showIndex !== -1) {
    shows.splice(showIndex, 1)
    showUtil.writeShowsToFile(shows)
    return true
  }

  return false
}

export const showRepository = {
  getShows,
  getShowById,
  addShow,
  updateShow,
  deleteShow,
}
