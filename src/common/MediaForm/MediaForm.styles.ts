import { InputField } from 'common'
import styled from '@emotion/styled'
import { darkJungleGreen, phoneQuery } from 'styles/variables'

export const FormContainer = styled.div`
  width: 850px;
  max-width: 100%;

  background-color: ${darkJungleGreen};
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 60% 35%;
  grid-column-gap: 5%;

  ${phoneQuery} {
    grid-template-columns: 100%;
  }
`

export const StyledHttp = styled(InputField)`
  &::-webkit-input-placeholder {
    text-transform: lowercase;
  }
`

export const FormButtons = styled.div`
  display: flex;
  justify-content: right;
  gap: 20px;

  padding: 60px 0;

  ${phoneQuery} {
    gap: 12px;

    padding: 32px 0 0;

    & button {
      flex: 1;
      min-width: 0;
    }
  }
`
