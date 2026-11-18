import { LogoText } from 'constant'
import { LogoWrapper, LogoBoldText, LogoNormalText } from './Logo.styles'

export const Logo = () => {
  const goUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <LogoWrapper onClick={goUp}>
      <LogoBoldText>{LogoText.BOLD_TEXT}</LogoBoldText>
      <LogoNormalText>{LogoText.LIGHT_TEXT}</LogoNormalText>
    </LogoWrapper>
  )
}
