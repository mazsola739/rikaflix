import { render, screen } from '@testing-library/react'
import { LogoMark } from '.'

describe('LogoMark ', () => {
  it('renders the R as an accessible image', () => {
    render(<LogoMark />)

    expect(screen.getByRole('img', { name: 'Rikaflix' })).toBeInTheDocument()
  })

  it('gives every instance its own gradient ids', () => {
    const { container } = render(
      <>
        <LogoMark />
        <LogoMark color="white" />
      </>
    )
    const ids = [...container.querySelectorAll('linearGradient')].map(gradient => gradient.id)

    expect(new Set(ids).size).toBe(ids.length)
  })
})
