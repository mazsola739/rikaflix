import styled from '@emotion/styled'
import { phoneQuery } from 'styles/variables'

export const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 685px;
  max-width: 100%;

  font-size: 20px;
`

export const DeleteTextContainer = styled.div`
  align-items: center;
`

export const DeleteQuestion = styled.p`
  opacity: 0.8;
`

export const DeleteTitle = styled.p`
  font-size: 24px;
`

export const DeleteButtons = styled.div`
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
