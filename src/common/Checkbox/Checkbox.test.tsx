import { render, screen } from 'test-utils'
import { Checkbox } from '.'

describe('Checkbox ', () => {
  beforeEach(() => {
    render(<Checkbox selectValues={[]} setSelectValues={() => undefined} name={'test'} />)
  })

  it('renders without crashing', async () => {
    const checkboxElement = await screen.findByRole('checkbox')

    expect(checkboxElement).toBeInTheDocument()
  })
})
