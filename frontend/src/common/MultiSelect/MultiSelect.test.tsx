import userEvent from '@testing-library/user-event'
import { render, screen } from 'test-utils'
import { MultiSelect } from '.'

let values: string[] = []
const setValues = (newValues: string[]) => {
  values = newValues
}

beforeEach(() => {
  values = []
  render(
    <MultiSelect
      selectItems={[
        { name: 'horror', labelName: 'Horror' },
        { name: 'comedy', labelName: 'Comedy' },
        { name: 'action', labelName: 'Action' }
      ]}
      setSelectValues={setValues}
      selectValues={values}
    />
  )
})

describe('Select', () => {
  it(' renders without crashing', async () => {
    const SelectElement = await screen.findByRole('button', {
      name: /select genre/i
    })

    expect(SelectElement).toBeInTheDocument()
  })

  it(' dropdown list opens and closes correctly', async () => {
    const SelectElement = await screen.findByRole('button', {
      name: /select genre/i
    })

    expect(screen.queryByRole('list')).not.toBeInTheDocument()

    await userEvent.click(SelectElement)
    expect(screen.queryByRole('list')).toBeInTheDocument()

    await userEvent.click(SelectElement)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it(' items are selected correctly', async () => {
    const SelectElement = await screen.findByRole('button', {
      name: /select genre/i
    })
    await userEvent.click(SelectElement)
    const horrorLabel = screen.getByText(/horror/i).parentElement as HTMLLabelElement
    await userEvent.click(horrorLabel)
    expect(values).toStrictEqual(['Horror'])
  })

  it(' items are deselected correctly', async () => {
    const SelectElement = await screen.findByRole('button', {
      name: /select genre/i
    })
    await userEvent.click(SelectElement)
    const horrorLabel = screen.getByText(/horror/i).parentNode as HTMLLabelElement

    await userEvent.click(horrorLabel)
    await userEvent.click(horrorLabel)

    expect(values).toStrictEqual([])
  })
})
