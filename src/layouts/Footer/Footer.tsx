import { Logo } from 'common'
import { useShowContext } from 'helper'
import { useDispatch } from 'react-redux'
import { mediaApi } from 'store'
import { hasBrowserChanges, resetBrowserData } from 'store/service/browserBaseQuery'
import { FooterElement, FooterText, ResetButton } from './Footer.styles'

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
      <FooterText>Originally made in 2021, renovated in 2026.</FooterText>
      {hasBrowserChanges() && (
        <ResetButton type="button" onClick={resetData}>
          Reset demo data
        </ResetButton>
      )}
    </FooterElement>
  )
}
