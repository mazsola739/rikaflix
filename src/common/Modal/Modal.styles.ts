import { X_MARK_ICON } from 'assets'
import styled from '@emotion/styled'
import { charcoalGrey, darkJungleGreen, watermelon, white } from 'styles/variables'

export const ModalBackground = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: ${charcoalGrey + 'A6'};
`

export const ModalContainer = styled.div`
  position: relative;
  z-index: 100;

  display: inline-block;
  opacity: 1;

  overflow-y: scroll;

  box-shadow:
    0 0 2px #0000001a,
    0 2px 10px #00000012,
    0 10px 20px #0000000d,
    0 10px 50px #0000000d;
  border-radius: 4px;
  min-width: 200px;
  min-height: 200px;
  max-width: 980px;
  max-height: 700px;

  background-color: ${darkJungleGreen};

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: ${darkJungleGreen};
  }
  &::-webkit-scrollbar-thumb {
    border: none;
    border-radius: 20px;

    background-color: ${watermelon};
  }
`

export const ModalInfoBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 30px 30px 30px 60px;
`

export const ModalTitleHolder = styled.div`
  display: flex;
`

export const ModalTitle = styled.h2`
  margin: 0;
  padding: 30px 0 0 0;

  font-size: 40px;
  font-weight: 300;
  text-transform: uppercase;
`

export const ModalIcon = styled.div`
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`

export const StyledClose = styled(X_MARK_ICON)`
  font-size: 24px;
  color: ${white};
`

export const ContextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  margin: 0;
  padding: 0 60px 60px 60px;
`
