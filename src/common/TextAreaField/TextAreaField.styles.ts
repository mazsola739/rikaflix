import styled from '@emotion/styled'
import { charcoalGrey, white } from 'styles/variables'

export const StyledTextArea = styled.textarea`
  border: none;
  border-radius: 4px;
  width: 100%;
  height: 200px;
  padding: 15px;

  background-color: ${charcoalGrey};

  font-size: 20px;
  font-family: Montserrat;
  font-style: normal;
  color: ${white};
`
