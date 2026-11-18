import { Formik } from 'formik'
import { render, screen } from 'test-utils'
import { TextAreaField } from '.'

describe('TextAreaField ', () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{ test: '' }} onSubmit={() => undefined}>
        <TextAreaField labelName="test" name="test" />
      </Formik>
    )
  })

  it('renders without crashing', async () => {
    const TextAreaFieldElement = await screen.findByRole('textbox')

    expect(TextAreaFieldElement).toBeInTheDocument()
  })
})
