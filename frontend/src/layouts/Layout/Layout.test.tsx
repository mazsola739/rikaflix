import { render, screen } from 'test-utils'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from '.'

describe('Layout ', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )
  })

  it('renders without crashing', async () => {
    const layoutElement = await screen.findByRole('main')

    expect(layoutElement).toBeInTheDocument()
  })
})
