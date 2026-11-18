import { Loading } from 'common'
import { createContext, useCallback, useContext, useState } from 'react'
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

export const ShowProvider = ({ children, withIntro = false }: ShowProviderProps) => {
  const [showsProps, setShowsProps] = useState<GetShowsProps>({
    type: 'All',
    genres: ['All'],
    sortBy: 'Release date desc',
    limit: '15',
    page: '1'
  })
  const [isIntroShown, setIsIntroShown] = useState(withIntro)
  const hideIntro = useCallback(() => setIsIntroShown(false), [])

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

  return (
    <>
      {/* The page renders as soon as the data is there, behind the intro screen while it plays. */}
      {!isLoading && (
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
      )}
      {isIntroShown && <Loading isReady={!isLoading} onFinished={hideIntro} />}
    </>
  )
}
