import { Loading } from 'common'
import { createContext, useContext, useState } from 'react'
import { useGetShowsQuery } from 'store'
import { ShowContextProps, ShowProviderProps, GetShowsProps } from 'types'

export const ShowContext = createContext<ShowContextProps | undefined>(undefined)

export const useShowContext = () => {
  const context = useContext(ShowContext)
  if (context === undefined) {
    throw new Error('useShowContext must be used inside ShowProvider')
  }
  return context
}

export const ShowProvider = ({ children }: ShowProviderProps) => {
  const [showsProps, setShowsProps] = useState<GetShowsProps>({
    type: 'All',
    genres: ['All'],
    sortBy: 'Release date desc',
    limit: '15',
    page: '1'
  })
  const {
    data: { allShowOfType, filteredShows, showsOnPage, foundShows } = {
      allShowOfType: [],
      filteredShows: [],
      showsOnPage: [],
      foundShows: 0
    },
    refetch: refetchShows,
    isLoading
  } = useGetShowsQuery(showsProps)

  if (isLoading) return <Loading />

  return (
    <ShowContext.Provider
      value={{
        showsProps,
        setShowsProps,
        allShowOfType,
        filteredShows,
        showsOnPage,
        foundShows,
        refetchShows
      }}
    >
      {children}
    </ShowContext.Provider>
  )
}
