import { createContext, useState, useEffect } from "react"
import { getShows, postShow, putShow, deleteShow } from "../../api"
import { Show } from "../../types"
import { ShowContextProps, StoreProviderProps } from "./StoreProvider.types"

export const ShowContext = createContext<ShowContextProps | undefined>(undefined)

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [shows, setShows] = useState<Show[]>([])

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const showsData = await getShows()
        setShows(showsData)
      } catch (error) {
        console.error('Error fetching shows:', error)
      }
    }

    fetchShows()
  }, [])

  const addShow = async (newShow: Show) => {
    try {
      const addedShow = await postShow(newShow)
      setShows((prevShows) => [...prevShows, addedShow])
    } catch (error) {
      console.error('Error adding show:', error)
    }
  }

  const updateShow = async (updatedShow: Show) => {
    try {
      await putShow(updatedShow)
      setShows((prevShows) => prevShows.map((show) => (show.id === updatedShow.id ? updatedShow : show)))
    } catch (error) {
      console.error('Error updating show:', error)
    }
  }

  const removeShow = async (id: string) => {
    try {
      await deleteShow(id)
      setShows((prevShows) => prevShows.filter((show) => show.id !== id))
    } catch (error) {
      console.error('Error deleting show:', error)
    }
  }

  return (
    <ShowContext.Provider value={{ shows, addShow, updateShow, removeShow }}>
      {children}
    </ShowContext.Provider>
  )
}
