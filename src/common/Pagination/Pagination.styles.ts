import { SHIFT_LEFT_ICON, LEFT_ICON, RIGHT_ICON, SHIFT_RIGHT_ICON } from 'assets'
import styled from '@emotion/styled'
import { phoneQuery } from 'styles/variables'

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;

  height: 100px;
`

export const PaginationWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${phoneQuery} {
    gap: 6px;
  }
`

export const PaginationBackward = styled.div`
  display: flex;
  gap: 10px;

  margin-right: 20px;

  /* On a phone the first and last page buttons do the jumping. */
  ${phoneQuery} {
    margin-right: 0;

    & > :first-of-type {
      display: none;
    }
  }
`

export const StyledShiftLeft = styled(SHIFT_LEFT_ICON)`
  font-size: 14px;
`

export const StyledLeft = styled(LEFT_ICON)`
  font-size: 14px;
`

export const PaginationSeparator = styled.div`
  width: 50px;

  font-size: 20px;

  ${phoneQuery} {
    width: 20px;
  }
  text-align: center;
`

export const PaginationForward = styled.div`
  display: flex;
  gap: 10px;

  margin-left: 20px;

  ${phoneQuery} {
    margin-left: 0;

    & > :last-of-type {
      display: none;
    }
  }
`

export const StyledRight = styled(RIGHT_ICON)`
  font-size: 14px;
`

export const StyledShiftRight = styled(SHIFT_RIGHT_ICON)`
  font-size: 14px;
`
