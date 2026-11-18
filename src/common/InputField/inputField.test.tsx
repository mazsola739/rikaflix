import { Formik } from 'formik'
import { render, screen } from 'test-utils'
import { InputField } from '.'

describe('InputField ', () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{ test: '' }} onSubmit={() => undefined}>
        <InputField name="test" labelName="test" selectValues="test" />
      </Formik>
    )
  })

  it('renders without crashing', async () => {
    const inputFieldElement = await screen.findByRole('textbox')

    expect(inputFieldElement).toBeInTheDocument()
  })
})
