import axios from 'axios'
import { Show } from '../types'
import { API_URL } from '../constants'

export const getShows = async (): Promise<Show[]> => {
  try {
    const response = await axios.get<Show[]>(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching shows:', error)
    throw error
  }
}

export const postShow = async (newShow: Show): Promise<Show> => {
  try {
    const response = await axios.post<Show>(API_URL, newShow)
    return response.data
  } catch (error) {
    console.error('Error adding show:', error)
    throw error
  }
}

export const putShow = async (updatedShow: Show): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${updatedShow.id}`, updatedShow)
  } catch (error) {
    console.error('Error updating show:', error)
    throw error
  }
}

export const deleteShow = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    console.error('Error deleting show:', error)
    throw error
  }
}
