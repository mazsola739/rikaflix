import { render, waitFor, screen } from 'test-utils'
import { BrowserRouter } from 'react-router-dom'
import { Logo } from '.'

describe('Logo ', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    )
  })

  it(`should have "rika" value`, async () => {
    const rikaRegExp = /^rika$/i
    const rikaElement = await waitFor(() => screen.getByText(rikaRegExp))

    expect(rikaElement).toBeInTheDocument()
  })

  it(`should have "flix" value`, async () => {
    const flixRegExp = /^flix$/i
    const flixElement = await waitFor(() => screen.getByText(flixRegExp))

    expect(flixElement).toBeInTheDocument()
  })
})
