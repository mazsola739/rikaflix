import { render, screen } from 'test-utils'
import { BrowserRouter } from 'react-router-dom'
import { CardList } from '.'

describe('CardList ', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>
    )
  })

  it('renders without crashing', async () => {
    const cardListElement = await screen.findByRole('region', {
      name: /media list/i
    })

    expect(cardListElement).toBeInTheDocument()
  })
})
