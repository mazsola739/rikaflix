import { render, screen } from 'test-utils'
import { Pagination } from '.'

describe('Pagination ', () => {
  beforeEach(() => {
    render(
      <Pagination
        currentPage={1}
        totalPages={99}
        paginate={function (): never {
          throw new Error('Function not implemented.')
        }}
      />
    )
  })

  it('renders without crashing', async () => {
    const paginationRegExp = /99/i
    const paginationElement = await screen.findByRole('button', {
      name: paginationRegExp
    })

    expect(paginationElement).toBeInTheDocument()
  })
})
