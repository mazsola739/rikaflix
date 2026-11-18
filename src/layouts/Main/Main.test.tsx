import { render, screen } from 'test-utils'
import { BrowserRouter } from 'react-router-dom'
import { Main } from '.'

describe('Main ', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    )
  })

  it('renders without crashing', async () => {
    const mainElement = await screen.findByRole('main')

    expect(mainElement).toBeInTheDocument()
  })
})
