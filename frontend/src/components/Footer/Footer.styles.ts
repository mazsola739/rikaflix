import styled from 'styled-components'

export const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 70px;
  background-color: ${(props) => props.theme.colors.bgTertiary};
`

export const Small = styled.small`
  opacity: 0.7;
`