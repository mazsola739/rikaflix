import { render, screen } from 'test-utils'
import { Congrats } from '.'

describe('Congrats ', () => {
  beforeEach(() => {
    render(
      <Congrats
        closeModal={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    )
  })

  it('renders without crashing', async () => {
    const congratsRegExp = /congratulations !/i
    const congratsElement = await screen.findByText(congratsRegExp)

    expect(congratsElement).toBeInTheDocument()
  })
  it('should have button', async () => {
    const buttonElement = await screen.findByRole('button')

    expect(buttonElement).toBeInTheDocument()
  })
})
