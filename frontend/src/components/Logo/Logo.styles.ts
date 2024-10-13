import styled from 'styled-components'

export const StyledLogo = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.colors.secondary};
`

export const LogoBoldText = styled.p`
  display: inline;
  font-weight: 900;
`

export const LogoNormalText = styled.p`
  display: inline;
  font-weight: 500;
`
