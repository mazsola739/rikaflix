import { render, screen } from '@testing-library/react'
import { LogoMark } from '.'

describe('LogoMark ', () => {
  it('renders the R as an accessible image', () => {
    render(<LogoMark />)

    expect(screen.getByRole('img', { name: 'Rikaflix' })).toBeInTheDocument()
  })

  it('keeps the shape of the letter at any width', () => {
    render(<LogoMark width={671} />)

    expect(screen.getByRole('img')).toHaveAttribute('height', '700')
  })

  it('adds the outline to draw only when animated', () => {
    const { container, rerender } = render(<LogoMark />)
    expect(container.querySelectorAll('.outline')).toHaveLength(0)

    rerender(<LogoMark animated />)
    expect(container.querySelectorAll('.outline')).toHaveLength(2)
  })
})
