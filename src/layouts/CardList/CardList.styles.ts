import styled from '@emotion/styled'

export const MoviesContainer = styled.section`
  display: flex;
  flex-direction: column;

  padding: 0 60px;
`

export const MoviesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
  gap: 50px;
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
