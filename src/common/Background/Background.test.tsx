import { render, waitForElementToBeRemoved, screen } from 'test-utils'
import { Background } from '.'

describe('Background ', () => {
  it('renders without crashing', async () => {
    const { container } = render(<Background />)
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'))

    expect(container).toBeInTheDocument()
  })
})
