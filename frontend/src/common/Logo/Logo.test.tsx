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

  it(`should have "netflix" value`, async () => {
    const nextflixRegExp = /netflix/i
    const netflixElement = await waitFor(() => screen.getByText(nextflixRegExp))

    expect(netflixElement).toBeInTheDocument()
  })

  it(`should have "roulette" value`, async () => {
    const rouletteRegExp = /roulette/i
    const rouletteElement = await waitFor(() => screen.getByText(rouletteRegExp))

    expect(rouletteElement).toBeInTheDocument()
  })
})
