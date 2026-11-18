import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ModalBackground, ModalContainer, ModalInfoBar, ModalTitleHolder, ModalTitle, ModalIcon, StyledClose, ContextWrapper } from './Modal.styles'
import { ModalProps } from './Modal.types'

export const Modal = ({ title, children, hide, isShown }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isShown ? 'hidden' : ''
  }, [isShown])

  const modal = (
    <ModalBackground>
      <ModalContainer>
        <ModalInfoBar>
          <ModalTitleHolder>
            <ModalTitle>{title}</ModalTitle>
          </ModalTitleHolder>
          <ModalIcon>
            <StyledClose onClick={hide} />
          </ModalIcon>
        </ModalInfoBar>
        <ContextWrapper>{children}</ContextWrapper>
      </ModalContainer>
    </ModalBackground>
  )

  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}
