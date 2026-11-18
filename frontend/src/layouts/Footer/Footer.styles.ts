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
