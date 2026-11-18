import { Formik } from 'formik'
import { render, screen } from 'test-utils'
import { MultiSelectField } from '.'

describe('MultiSelectField ', () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{ test: [] }} onSubmit={() => undefined}>
        <MultiSelectField name="test" labelName="test" selectItems={[]} selectValues={[]} setSelectValues={() => undefined} />
      </Formik>
    )
  })

  it('renders without crashing', async () => {
    const multiSelectFieldElement = await screen.findByRole('button', {
      name: /select genre/i
    })

    expect(multiSelectFieldElement).toBeInTheDocument()
  })
})
