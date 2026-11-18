import { GITHUB_ICON } from 'assets'
import styled from '@emotion/styled'
import { charcoalGrey } from 'styles/variables'

export const FooterElement = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;

  background-color: ${charcoalGrey};

  min-height: 70px;
  padding: 12px 16px;
`

export const FooterText = styled.small`
  opacity: 0.7;
  text-align: center;
`

export const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

/** Red like the footer text, a bit brighter on hover. */
export const FooterLink = styled.a`
  display: inline-flex;
  align-items: center;
  opacity: 0.7;

  color: inherit;
  font-size: 14px;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    opacity: 1;

    text-decoration: underline;
  }
`

export const StyledGithub = styled(GITHUB_ICON)`
  width: 20px;
  height: 20px;
`

export const ResetButton = styled.button`
  border: 1px solid currentColor;
  border-radius: 4px;
  padding: 2px 10px;

  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`
