import { render, screen } from '@testing-library/react'
import { Loading } from '.'

describe('Loading ', () => {
  it('shows the R and a counter that ends at 100 %', async () => {
    const onFinished = vi.fn()
    render(<Loading onFinished={onFinished} />)

    expect(screen.getByRole('img', { name: 'Rikaflix' })).toBeInTheDocument()
    await vi.waitFor(() => expect(onFinished).toHaveBeenCalled(), { timeout: 5000 })
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  it('waits at 99 % until the data is ready', async () => {
    const { rerender } = render(<Loading isReady={false} />)

    await vi.waitFor(() => expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '99'), { timeout: 5000 })
    rerender(<Loading isReady />)
    await vi.waitFor(() => expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100'))
  })
})
