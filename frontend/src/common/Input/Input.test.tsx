import { render, screen } from 'test-utils'
import { Input } from '.'

describe('Input ', () => {
  beforeEach(() => {
    render(<Input />)
  })

  it('renders without crashing', async () => {
    const inputElement = await screen.findByRole('textbox')

    expect(inputElement).toBeInTheDocument()
  })
})
