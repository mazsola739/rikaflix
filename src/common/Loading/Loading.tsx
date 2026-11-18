import { loadingLogo } from 'assets'
import { Constants } from 'constant'
import { useState, useEffect } from 'react'
import { LoadingContainer, LoadingText, LoadingWrapper, OuterCircle, InnerCircle, LoadingCounter, LoadingLogo } from './Loading.styles'

export const Loading = () => {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prevCount => prevCount + 1)
    }, 50)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <LoadingContainer role="progressbar">
      <LoadingText>{Constants.LOADING}</LoadingText>
      <LoadingWrapper>
        <OuterCircle>
          <InnerCircle />
        </OuterCircle>
        <LoadingCounter>
          {counter}
          {Constants.PERCENT}
        </LoadingCounter>
      </LoadingWrapper>
      <LoadingLogo src={loadingLogo} alt={loadingLogo} />
    </LoadingContainer>
  )
}
