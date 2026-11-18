import { ButtonText } from 'constant'
import { render, screen } from 'test-utils'
import { Button } from '.'

describe('Button ', () => {
  beforeEach(() => {
    render(<Button>{ButtonText.TEST}</Button>)
  })

  it('renders without crashing', async () => {
    const buttonElement = await screen.findByRole('button')

    expect(buttonElement).toBeInTheDocument()
  })
})
