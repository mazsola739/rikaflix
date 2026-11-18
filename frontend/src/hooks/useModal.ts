import { useState } from 'react'

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false)

  const toggle = () => setIsShown(prev => !prev)

  return {
    isShown,
    toggle
  }
}
