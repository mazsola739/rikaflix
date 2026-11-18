import { render, screen } from 'test-utils'
import { Row } from '.'

describe('Row ', () => {
  beforeEach(() => {
    render(<Row />)
  })

  it('renders without crashing', () => {
    const rowElement = screen.getByRole('img')

    expect(rowElement).toBeInTheDocument()
  })
})
