import styled from '@emotion/styled'
import { phoneQuery } from 'styles/variables'

export const SearchBarContainer = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 15px;

  & button {
    flex-shrink: 0;
  }

  ${phoneQuery} {
    gap: 10px;

    & button {
      width: 110px;
    }
  }
`
