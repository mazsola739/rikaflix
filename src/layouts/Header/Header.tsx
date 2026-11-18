import { Background, Modal, Congrats } from 'common'
import { Constants, ModalText } from 'constant'
import { Navigation } from 'layouts'
import { Search, Add } from 'modules'
import { useState } from 'react'
import { HeaderWrapper, HeaderContainer, HeaderSearchContainer, Heading } from './Header.styles'

export const Header = () => {
  const [activeModal, setActiveModal] = useState<'none' | 'add' | 'congrats'>('none')
  const [addedTitle, setAddedTitle] = useState('')

  const showCongrats = (title: string) => {
    setAddedTitle(title)
    setActiveModal('congrats')
  }

  const closeModal = () => {
    setActiveModal('none')
  }

  const openModal = (type: 'add' | 'congrats') => () => {
    setActiveModal(type)
  }

  return (
    <HeaderWrapper>
      <Background />
      <HeaderContainer>
        <Navigation openModal={openModal} type="header" />
        <HeaderSearchContainer>
          <Heading>{Constants.SEARCH_LABEL}</Heading>
          <Search />
        </HeaderSearchContainer>
        <Modal isShown={activeModal === 'add'} hide={closeModal} title={ModalText.ADD_MEDIA}>
          <Add closeModal={closeModal} onAdded={showCongrats} />
        </Modal>
        <Modal isShown={activeModal === 'congrats'} hide={closeModal} title="">
          <Congrats closeModal={closeModal} title={addedTitle} />
        </Modal>
      </HeaderContainer>
    </HeaderWrapper>
  )
}
