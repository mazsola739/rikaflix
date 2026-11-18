import { render, screen } from 'test-utils'
import { Delete } from '.'

describe('Delete ', () => {
  beforeEach(() => {
    render(<Delete title={'Test title'} toggle={() => undefined} year={1982} id={'0'} />)
  })

  it('renders without crashing', async () => {
    const deleteShowRegExp = /Are you sure you want to delete this media/i
    const deleteShowElement = await screen.findByText(deleteShowRegExp)

    expect(deleteShowElement).toBeInTheDocument()
  })
})
