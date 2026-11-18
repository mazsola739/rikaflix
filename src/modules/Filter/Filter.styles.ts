import styled from '@emotion/styled'
import { darkJungleGreen, watermelon, davyGrey, white } from 'styles/variables'

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  height: 60px;
  padding: 0 60px;

  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.2px;
`

export const FilterContents = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding-top: 10px;

  color: ${white};
`

export const FilterOptions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`

export const FilterItem = styled.p`
  opacity: 0.8;

  margin: 0;

  &:hover {
    opacity: 1.1;
  }
`

export const FilterMore = styled.p`
  opacity: 0.8;

  margin: 0px;
  padding: 0 10px;

  cursor: default;

  &:hover {
    opacity: 1.1;
  }
`

export const FilterMoreOptions = styled.div`
  position: absolute;
  z-index: 10;

  display: none;
  opacity: 0.9;

  box-shadow: 0px 5px 7px -1px #000000aa;
  border: 0;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 8px 0 4px 0;

  background-color: ${darkJungleGreen};
`

export const FilterMoreOption = styled.div`
  display: block;
  opacity: 0.8;

  padding: 10px;

  cursor: pointer;

  &:hover {
    opacity: 1.1;

    background-color: ${watermelon};
  }
`

export const FilterOverflowMenu = styled.div`
  position: relative;

  display: block;

  &:hover ${FilterMoreOptions} {
    display: block;
  }
`

export const Underline = styled.div`
  width: 100%;
  height: 4px;

  background-color: ${davyGrey};

  box-shadow: inset 0 -1px 1px black;
  border-radius: 3px;
`
