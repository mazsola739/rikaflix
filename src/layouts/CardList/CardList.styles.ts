import styled from '@emotion/styled'
import { phoneQuery, tabletQuery } from 'styles/variables'

export const MoviesContainer = styled.section`
  display: flex;
  flex-direction: column;

  padding: 0 60px;

  ${tabletQuery} {
    padding: 0 24px;
  }

  ${phoneQuery} {
    padding: 0 16px;
  }
`

export const MoviesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(325px, 100%), 1fr));
  justify-items: center;
  gap: 50px;

  ${phoneQuery} {
    gap: 32px;
  }
`

export const NoPagination = styled.div`
  height: 70px;
`

export const NoResult = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  margin: auto;
  height: 230px;

  font-size: 40px;
  font-weight: 300;
  font-style: normal;
`
