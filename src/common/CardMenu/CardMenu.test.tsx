import { render, screen } from 'test-utils'
import { CardMenu } from '.'

describe('CardMenu ', () => {
  beforeEach(() => {
    render(<CardMenu openModal={() => () => undefined} />)
  })

  it('renders without crashing', async () => {
    const dropDownMenu = await screen.findByRole('menu')

    expect(dropDownMenu).toBeInTheDocument()
  })
})
