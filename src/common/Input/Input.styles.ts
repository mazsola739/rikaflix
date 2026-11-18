import styled from '@emotion/styled'
import { darkJungleGreen, phoneQuery, white } from 'styles/variables'

export const StyledInput = styled.input`
  border: none;
  border-radius: 4px;
  flex: 1;
  min-width: 0;
  height: 55px;
  padding-left: 20px;

  background-color: ${darkJungleGreen + 'D8'};

  font-size: 20px;
  font-family: Montserrat;
  font-weight: 400;
  font-style: normal;
  color: ${white};

  ${phoneQuery} {
    font-size: 16px;
  }
`
