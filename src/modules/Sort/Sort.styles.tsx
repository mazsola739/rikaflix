import { DOWN_ICON, UP_ICON, NUM_ASC_ICON, NUM_DESC_ICON, ALPHA_ASC_ICON, ALPHA_DESC_ICON } from 'assets'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { SortOrderIconProps } from './Sort.types'
import { watermelon, darkJungleGreen, white } from 'styles/variables'

const MenuAnimation = keyframes`
  0% {
    bottom: 22px;

    opacity: 0;
  }
  100% {
    top: 22px;

    opacity: 0.9;
  }
`

export const SortContainer = styled.div`
  display: inline-flex;
  flex-shrink: 0;
`

export const SortBy = styled.p`
  opacity: 0.5;
  white-space: nowrap;

  margin: 0;

  text-transform: uppercase;
  color: ${white};
`

export const SortDropDown = styled.div`
  position: relative;

  user-select: none;
  color: ${white};
`

export const SortingOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.9;

  width: 180px;
  padding: 0px 10px;

  cursor: pointer;

  text-transform: uppercase;

  &:hover {
    opacity: 1.1;
  }
`

export const StyledDown = styled(DOWN_ICON)`
  color: ${watermelon};
`

export const StyledUp = styled(UP_ICON)`
  color: ${watermelon};
`

export const SortList = styled.div`
  position: absolute;
  top: 22px;
  left: 49%;
  z-index: 10;

  opacity: 0.9;
  transform: translateX(-50%);

  animation: ${MenuAnimation} 0.4s;

  box-shadow: 0px 5px 7px -1px #000000aa;
  border: 0;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  min-width: 180px;
  padding: 8px 0 4px 0;

  background-color: ${darkJungleGreen};

  font-weight: 300;
`

export const SortListWrapper = styled.ul`
  display: flex;
  flex-direction: column;

  list-style: none;

  margin: 0;
  padding: 0;
`

export const SortListItem = styled.li`
  display: flex;
  justify-content: space-between;

  padding: 8px 10px;

  cursor: pointer;

  &:hover {
    opacity: 1;

    background-color: ${watermelon};

    font-weight: 600;
  }
`

const iconMap = (className?: string) => ({
  numeric: {
    asc: <NUM_ASC_ICON className={className} />,
    desc: <NUM_DESC_ICON className={className} />
  },
  alphabetical: {
    asc: <ALPHA_ASC_ICON className={className} />,
    desc: <ALPHA_DESC_ICON className={className} />
  }
})

export const StyledSortOrderIcon = styled(({ type, sortOrder, className }: SortOrderIconProps) => iconMap(className)[type][sortOrder])`
  font-size: 20px;
`
