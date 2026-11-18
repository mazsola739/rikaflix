import { ModalText } from 'constant'
import { CardMenuContainer, CardMenuIconHolder, StyledClose, CardMenuOptionList, CardMenuOptionItem } from './CardMenu.styles'
import { CardMenuProps } from './CardMenu.types'

export const CardMenu = ({ openModal }: CardMenuProps) => {
  return (
    <CardMenuContainer role="menu">
      <CardMenuIconHolder>
        <StyledClose />
      </CardMenuIconHolder>
      <CardMenuOptionList>
        <CardMenuOptionItem onClick={openModal('edit')}>{ModalText.EDIT_MEDIA}</CardMenuOptionItem>
        <CardMenuOptionItem onClick={openModal('delete')}>{ModalText.DELETE_MEDIA}</CardMenuOptionItem>
      </CardMenuOptionList>
    </CardMenuContainer>
  )
}
