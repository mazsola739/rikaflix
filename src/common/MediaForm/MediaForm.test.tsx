import { render, screen } from 'test-utils'
import { defaultValues } from 'modules/Add/Add.data'
import { getFrontEndForm } from 'utils'
import { MediaForm } from '.'

describe('Form ', () => {
  beforeEach(() => {
    render(<MediaForm handleSubmit={async () => undefined} initialValues={getFrontEndForm(defaultValues)} />)
  })

  it('renders without crashing', async () => {
    const formElement = await screen.findByRole('form')

    expect(formElement).toBeInTheDocument()
  })
})
