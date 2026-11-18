import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'

import { Show, ShowInput } from '../../../shared/show'

export interface ShowRepository {
  findAll: () => Show[]
  findById: (id: string) => Show | undefined
  create: (input: ShowInput) => Show
  update: (id: string, changes: Partial<ShowInput>) => Show | undefined
  remove: (id: string) => boolean
}

/**
 * File-backed show store. The JSON file is read once at startup and every
 * change is written back atomically (temp file + rename), so a crash in the
 * middle of a write can't leave a half-written database behind.
 */
export const createShowRepository = (dataFile: string): ShowRepository => {
  const shows: Show[] = JSON.parse(fs.readFileSync(dataFile, 'utf-8'))

  const persist = () => {
    const tempFile = path.join(path.dirname(dataFile), `.${path.basename(dataFile)}.tmp`)
    fs.writeFileSync(tempFile, JSON.stringify(shows, null, 2) + '\n')
    fs.renameSync(tempFile, dataFile)
  }

  return {
    findAll: () => shows,

    findById: id => shows.find(show => show.id === id),

    create: input => {
      const show: Show = { ...input, id: randomUUID() }
      shows.push(show)
      persist()
      return show
    },

    update: (id, changes) => {
      const index = shows.findIndex(show => show.id === id)
      if (index === -1) return undefined
      shows[index] = { ...shows[index], ...changes, id }
      persist()
      return shows[index]
    },

    remove: id => {
      const index = shows.findIndex(show => show.id === id)
      if (index === -1) return false
      shows.splice(index, 1)
      persist()
      return true
    }
  }
}
