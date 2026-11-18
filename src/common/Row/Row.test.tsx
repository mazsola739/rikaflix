import { render, screen } from 'test-utils'
import { Row } from '.'

describe('Row ', () => {
  it('starts every group of posters with an R logo tile', async () => {
    render(<Row />)

    expect(await screen.findAllByRole('img', { name: 'Rikaflix' })).toHaveLength(5)
  })
})
