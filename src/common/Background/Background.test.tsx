import { render, screen } from 'test-utils'
import { Background } from '.'

describe('Background ', () => {
  it('renders three decorative rows', async () => {
    const { container } = render(<Background />)

    // The rows are decorative, so they are hidden from assistive technology.
    await screen.findAllByRole('img', { name: 'Rikaflix', hidden: true })
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })
})
