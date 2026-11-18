import { Formik } from 'formik'
import { render, screen } from 'test-utils'
import { FormField } from '.'

describe('FormField ', () => {
  beforeEach(() => {
    render(
      <Formik
        initialValues={{ username: '' }}
        onSubmit={values => {
          console.log(values)
        }}
      >
        <FormField labelName="USERNAME" name="username">
          <input name="username" />
        </FormField>
      </Formik>
    )
  })

  it('renders without crashing', async () => {
    const labelElement = await screen.findByRole('heading', {
      name: /username/i
    })

    expect(labelElement).toBeInTheDocument()
  })
})
