import { Request, Response } from 'express'
import { showService } from '../services'
import { statusConstant } from '../constants'

const getShows = async (req: Request, res: Response) => {
  try {
    const shows = await showService.getShows(req)
    res.status(statusConstant.OK).json(shows)
  } catch (error) {
    res.status(statusConstant.INTERVAL_SERVER_ERROR).json({ message: 'Error fetching shows', error })
  }
}

const getShowById = async (req: Request, res: Response): Promise<void> => {
  try {
    const show = await showService.getShowById(req)
    if (show) {
      res.status(statusConstant.OK).json(show)
    } else {
      res.status(statusConstant.NOT_FOUND).json({ message: 'Show not found' })
    }
  } catch (error) {
    res.status(statusConstant.INTERVAL_SERVER_ERROR).json({ message: 'Error fetching show', error })
  }
}

const addShow = async (req: Request, res: Response): Promise<void> => {
  try {
    const newShow = await showService.addShow(req)
    res.status(statusConstant.CREATED).json(newShow)
  } catch (error) {
    res.status(statusConstant.INTERVAL_SERVER_ERROR).json({ message: 'Error adding show', error })
  }
}

const updateShow = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedShow = await showService.updateShow(req)
    if (updatedShow) {
      res.status(statusConstant.OK).json(updatedShow)
    } else {
      res.status(statusConstant.NOT_FOUND).json({ message: 'Show not found or not updated' })
    }
  } catch (error) {
    res.status(statusConstant.INTERVAL_SERVER_ERROR).json({ message: 'Error updating show', error })
  }
}

const deleteShow = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await showService.deleteShow(req)
    if (deleted) {
      res.status(statusConstant.OK).json({ message: 'Show deleted successfully' })
    } else {
      res.status(statusConstant.NOT_FOUND).json({ message: 'Show not found' })
    }
  } catch (error) {
    res.status(statusConstant.INTERVAL_SERVER_ERROR).json({ message: 'Error deleting show', error })
  }
}

export const showController = {
  getShows,
  getShowById,
  addShow,
  updateShow,
  deleteShow,
}
