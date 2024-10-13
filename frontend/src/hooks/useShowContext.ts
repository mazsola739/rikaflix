import { useContext } from "react"
import { ShowContext } from "../providers"

export const useShowContext = () => {
  const context = useContext(ShowContext)
  if (!context) {
    throw new Error("useShowContext must be used within a ShowProvider")
  }
  return context
}
