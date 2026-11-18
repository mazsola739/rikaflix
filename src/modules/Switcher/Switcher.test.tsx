import userEvent from '@testing-library/user-event'
import { render, waitFor, screen } from 'test-utils'
import { Switcher } from '.'

it('Switcher test', async () => {
  render(<Switcher options={['Everyone', 'Anyone']} name="any" defaultSelectedItem="Anyone" renderItem={option => <div data-testid={`options`}>{option}</div>} />)

  const options = await waitFor(() => screen.getAllByTestId('options'))
  const everyone = options[0]

  await userEvent.click(everyone)

  expect(everyone.nextElementSibling as HTMLInputElement).toBeChecked()
  expect(options.length).toBe(2)
})
