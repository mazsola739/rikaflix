import { Button } from 'common'
import { Constants, ButtonText } from 'constant'
import { CongratsWrapper, CongratsIconHolder, StyledCheck, CongratsText, CongratsMessage } from './Congrats.styles'
import { CongratsProps } from './Congrats.types'

export const Congrats = ({ closeModal, title = 'The show' }: CongratsProps) => {
  return (
    <CongratsWrapper>
      <CongratsIconHolder>
        <StyledCheck />
      </CongratsIconHolder>
      <CongratsText>{Constants.CONGRATS_MESSAGE}</CongratsText>
      <CongratsMessage>
        {title}
        {Constants.MEDIA_ADDED}
      </CongratsMessage>
      <Button onClick={closeModal}>{ButtonText.OK}</Button>
    </CongratsWrapper>
  )
}
