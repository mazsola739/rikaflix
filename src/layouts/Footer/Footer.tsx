import { Logo } from 'common'
import { useShowContext } from 'helper'
import { useDispatch } from 'react-redux'
import { mediaApi } from 'store'
import { hasBrowserChanges, resetBrowserData } from 'store/service/browserBaseQuery'
import { FooterElement, FooterText, FooterLinks, FooterLink, StyledGithub, ResetButton } from './Footer.styles'

const PORTFOLIO_URL = 'https://mazsola739.github.io/mazsola739'
const GITHUB_URL = 'https://github.com/mazsola739'

export const Footer = () => {
  const dispatch = useDispatch()
  // Subscribing to the list makes the footer re-render after every add/edit/delete,
  // so the reset button shows up as soon as there are local changes.
  useShowContext()

  // Drops this visitor's local edits and reloads the original list.
  const resetData = () => {
    resetBrowserData()
    dispatch(mediaApi.util.resetApiState())
  }

  return (
    <FooterElement>
      <Logo />
      <FooterText>© 2021–2022 by Rika. Yes, I made this. No pixels were harmed in the making of this site. Powered by coffee and late-night coding sessions.</FooterText>
      <FooterLinks>
        <FooterText>Made in 2021, renovated in 2026</FooterText>
        <FooterLink href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          mazsola739
        </FooterLink>
        <FooterLink href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
          <StyledGithub />
        </FooterLink>
      </FooterLinks>
      {hasBrowserChanges() && (
        <ResetButton type="button" onClick={resetData}>
          Reset demo data
        </ResetButton>
      )}
    </FooterElement>
  )
}
