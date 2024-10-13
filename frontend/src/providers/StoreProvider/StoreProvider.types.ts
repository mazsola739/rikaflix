import { ReactNode } from "react"
import { Show } from "../../types"

export type ShowContextProps = {
  shows: Show[]
  addShow: (newShow: Show) => void
  updateShow: (updatedShow: Show) => void
  removeShow: (id: string) => void
}

export type StoreProviderProps = {
  children: ReactNode
}

