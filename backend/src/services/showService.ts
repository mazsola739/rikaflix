import { Request } from 'express'
import { showRepository } from '../repositories'

const getShows = async (req: Request) => {
  return await showRepository.getShows()
}

const getShowById = async (req: Request) => {
  const { id } = req.params
  return await showRepository.getShowById(id)
}

const addShow = async (req: Request) => {
  const newShowData = req.body
  return await showRepository.addShow(newShowData)
}

const updateShow = async (req: Request) => {
  const { id } = req.params
  const updateData = req.body
  return await showRepository.updateShow(id, updateData)
}

const deleteShow = async (req: Request) => {
  const { id } = req.params
  return await showRepository.deleteShow(id)
}

export const showService = {
  getShows,
  getShowById,
  addShow,
  updateShow,
  deleteShow,
}
