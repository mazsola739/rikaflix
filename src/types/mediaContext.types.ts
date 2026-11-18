import { Dispatch, SetStateAction, ReactNode } from 'react'
import { GetShowsProps } from './mediaApi.types'
import { Show } from './MediaTypes'

export interface ShowContextProps {
  showsProps: GetShowsProps
  setShowsProps: Dispatch<SetStateAction<GetShowsProps>>
  foundShows: number
  allShowOfType: Show[]
  showsOnPage: Show[]
  filteredShows: Show[]
  refetchShows: () => void
}

export interface ShowProviderProps {
  children: ReactNode
  /** Plays the intro (loading) screen on start; the app turns it on, component tests don't. */
  withIntro?: boolean
}
