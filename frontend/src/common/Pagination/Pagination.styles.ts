import { SHIFT_LEFT_ICON, LEFT_ICON, RIGHT_ICON, SHIFT_RIGHT_ICON } from 'assets'
import styled from '@emotion/styled'

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;

  height: 100px;
`

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const PaginationBackward = styled.div`
  display: flex;
  gap: 10px;

  margin-right: 20px;
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
  text-align: center;
`

export const PaginationForward = styled.div`
  display: flex;
  gap: 10px;

  margin-left: 20px;
`

export const StyledRight = styled(RIGHT_ICON)`
  font-size: 14px;
`

export const StyledShiftRight = styled(SHIFT_RIGHT_ICON)`
  font-size: 14px;
`
