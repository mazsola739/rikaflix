import { CHECK_ICON } from 'assets'
import styled from '@emotion/styled'
import { white, watermelon } from 'styles/variables'

export const CongratsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 555px;

  font-size: 20px;
  font-style: normal;
  color: ${white};
`

export const CongratsIconHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  width: 60px;
  height: 60px;

  background-color: ${watermelon};
`

export const StyledCheck = styled(CHECK_ICON)`
  font-size: 40px;
  color: ${white};
`

export const CongratsText = styled.p`
  margin: 30px 0 0;

  font-size: 40px;
  font-weight: 300;
  text-transform: uppercase;
`
export const CongratsMessage = styled.p`
  opacity: 0.9;

  margin: 30px 0 30px;
  padding: 0;

  font-weight: 400;
  text-align: center;
`
