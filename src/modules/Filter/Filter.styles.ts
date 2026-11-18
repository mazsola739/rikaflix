import styled from '@emotion/styled'
import { darkJungleGreen, watermelon, davyGrey, white, phoneQuery, tabletQuery } from 'styles/variables'

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  height: 60px;
  padding: 0 60px;

  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.2px;

  ${tabletQuery} {
    padding: 0 24px;
  }

  /* The sort menu gets a line of its own: the spacing is set here, as the height grows. */
  ${phoneQuery} {
    justify-content: flex-start;
    gap: 9px;

    height: auto;
    padding: 0 16px 9px;
  }
`

export const FilterContents = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  padding-top: 10px;

  color: ${white};

  /* Sort by on top, so the genres stay right above the underline that marks the selected one. */
  ${phoneQuery} {
    flex-direction: column-reverse;
    gap: 14px;
  }
`

/** Takes the width the sort menu leaves: Filter.tsx shows as many genres as fit in it. */
export const FilterOptions = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  gap: 15px;

  min-width: 0;
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

  white-space: nowrap;

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

  white-space: nowrap;

  /* Opens to the left, so it doesn't run off the right edge of the screen. */
  ${phoneQuery} {
    right: 0;
  }
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

  &:hover ${FilterMoreOptions}, &:focus-within ${FilterMoreOptions} {
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
