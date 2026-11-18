import { Logo } from 'common'
import { useShowContext } from 'helper'
import { useDispatch } from 'react-redux'
import { mediaApi, isBrowserMode } from 'store'
import { hasBrowserChanges, resetBrowserData } from 'store/service/browserBaseQuery'
import { FooterElement, FooterText, ResetButton } from './Footer.styles'

export const Footer = () => {
  const dispatch = useDispatch()
  // Subscribing to the list makes the footer re-render after every add/edit/delete,
  // so the reset button shows up as soon as there are local changes.
  useShowContext()

  // Browser mode only: drop this visitor's local edits and reload the original list.
  const resetData = () => {
    resetBrowserData()
    dispatch(mediaApi.util.resetApiState())
  }

  return (
    <FooterElement>
      <Logo />
      <FooterText>© {new Date().getFullYear()} by Rika. Yes, I made this. No pixels were harmed in the making of this site. Powered by coffee and late-night coding sessions.</FooterText>
      {isBrowserMode && hasBrowserChanges() && (
        <ResetButton type="button" onClick={resetData}>
          Reset demo data
        </ResetButton>
      )}
    </FooterElement>
  )
}
