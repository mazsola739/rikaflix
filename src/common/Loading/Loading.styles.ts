import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { darkJungleGreen, watermelon } from 'styles/variables'

const spinCircle = keyframes`
0% { 
  transform: rotate(0deg); 
}
100% { 
  transform: rotate(360deg); 
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;

  margin: auto;
  width: 100vw;
  height: 100vh;
`

export const LoadingText = styled.p`
  font-size: 24px;
  font-weight: 500;
`

export const LoadingWrapper = styled.div`
  position: relative;
  z-index: 10;

  width: 100px;
  height: 100px;
`

export const OuterCircle = styled.div`
  animation: ${spinCircle} 2s linear infinite;

  border-radius: 50%;
  width: 100%;
  height: 100%;

  background: ${`conic-gradient(${darkJungleGreen} 0deg, ${watermelon} 90deg)`};
`

export const InnerCircle = styled.div`
  border-radius: 50%;
  width: 98%;
  height: 98%;

  background-color: ${darkJungleGreen};
`

export const LoadingCounter = styled.div`
  position: relative;
  top: -56px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoadingLogo = styled.img`
  width: 180px;
`
