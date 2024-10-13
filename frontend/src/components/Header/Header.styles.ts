import styled from 'styled-components'

export const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  width: 1200px;
  height: 400px;
  background-color: ${(props) => props.theme.colors.bgSecondary};
`
