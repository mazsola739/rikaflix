import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { watermelon } from 'styles/variables'

export const LogoWrapper = styled.div`
  font-size: 20px;
  font-style: normal;
  text-transform: lowercase;
  color: ${watermelon};
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${watermelon};
`

export const LogoBoldText = styled.p`
  display: inline;
  font-weight: 900;
`

export const LogoNormalText = styled.p`
  display: inline;
  font-weight: 500;
`
